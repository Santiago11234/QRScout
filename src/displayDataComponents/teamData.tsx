import { useEffect, useState } from 'react';
import { getTeamByNumber, getGameById } from '../../outerConfig/routes';
import Team from '@/types/teams';
import Game from '@/types/game';

import CommentsModal from './commentsModal';
import WhereDefendModal from './whereDefendModal';
import GameDetailsModal from './gameModal';

const TeamData = ({ teamNumber }: { teamNumber: number }) => {
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isWhereDefendModalOpen, setIsWhereDefendModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
  const [gameDetails, setGameDetails] = useState<Game[]>([]);


  useEffect(() => {
    const fetchTeamData = async () => {
      const data = await getTeamByNumber(teamNumber);
      setTeamData(data);
    };

    fetchTeamData();
  }, [teamNumber]);

  if (!teamData) {
    return <div>No Team Selected</div>;
  }

  const dataRows = Object.entries(teamData).map(([key, value]) => ({
    title: key,
    value: value,
  }));

  const openCommentsModal = () => {
    setIsCommentsModalOpen(true);
  };

  const closeCommentsModal = () => {
    setIsCommentsModalOpen(false);
  };

  const openWhereDefendModal = () => {
    setIsWhereDefendModalOpen(true);
    console.log('whereDefend:', teamData.whereDefend);
  };
  const closeWhereDefendModal = () => {
    setIsWhereDefendModalOpen(false);
  };

  const openGameDetailsModal = (game: Game) => {
    setSelectedGame(game);
  };

  const closeGameDetailsModal = () => {
    setSelectedGame(null);
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
       if (teamData) {
         const gamePromises = teamData.gamesPlayed.map(async (gameId) => {
           const gameData = await getGameById(gameId);
           return gameData;
         });
         const games = await Promise.all(gamePromises);
         const validGames = games.filter((game): game is Game => game !== null);
         setGameDetails(validGames);
       }
    };
   
    fetchGameDetails();
   }, [teamData]);

  return (
    <div className="w-full mx-auto bg-gray-800 p-4 rounded ">
      <div className="text-center">
        <h2 className="font-semibold text-2xl">
          Averages <br></br> {teamData.teamNumber}
        </h2>
        <p className="text-gray-400">
          Games Played: {teamData.gamesPlayed.length}
        </p>
      </div>

<div className="flex justify-between items-center py-2 hover:bg-gray-700 px-3 rounded">
 <span className="font-semibold">Games Played</span>
 <div className="flex overflow-x-scroll">
    {gameDetails.map((game, index) => (
      <button
        key={index}
        className="p-1 rounded bg-gray-600 mx-1"
        onClick={() => openGameDetailsModal(game)}
      >
        Game {game.gameId}
      </button>
    ))}
 </div>
</div>

      {dataRows.map((row, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-2 hover:bg-gray-700 px-3 rounded"
        >
          <span className="font-semibold">{row.title}</span>

          {row.title === 'comments' ? (
            <button
              className="p-1 rounded bg-gray-600"
              onClick={openCommentsModal}
            >
              click
            </button>
          ) : row.title === 'whereDefend' ? (
            <button
              className="p-1 rounded bg-gray-600"
              onClick={openWhereDefendModal}
            >
              click me
            </button>
          ) : (
            <span>{row.value}</span>
          )}
        </div>
      ))}
      <CommentsModal
        isOpen={isCommentsModalOpen}
        closeModal={closeCommentsModal}
        comments={teamData.comments}
      />
      <WhereDefendModal
        isOpen={isWhereDefendModalOpen}
        closeModal={closeWhereDefendModal}
        comments={teamData.whereDefend}
      />

    <GameDetailsModal
        isOpen={gameDetails !== null && selectedGame !== null}
        closeModal={closeGameDetailsModal}
        gameDetails={selectedGame}
      />
    </div>
  );
};

export default TeamData;
