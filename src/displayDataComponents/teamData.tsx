import { useEffect, useState } from 'react';
import { getTeamByNumber, getGameById } from '../../outerConfig/routes';
import Team from '@/types/teams';
import Game from '@/types/game';
type TeamKeys = keyof Team;

import CommentsModal from './commentsModal';
import GameDetailsModal from './gameModal';

const TeamData = ({ teamNumber }: { teamNumber: number }) => {
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isFoulCommentsModalOpen, setIsFoulCommentsModalOpen] = useState(false);
  const [isShuttleCommentsModalOpen, setIsShuttleCommentsModalOpen] = useState(false);
  const [isWhereShotModalOpen, setIsWhereShotModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  //   const [currentSlide, setCurrentSlide] = useState(0);
  const [gameDetails, setGameDetails] = useState<Game[]>([]);

  const orderedTeamKeys: TeamKeys[] = [
    'teamNumber',
    'avgNoShow',
    'avgMobility',
    'avgAutoAmpScored',
    'avgAutoAmpMissed',
    'avgAutoSpeakerScored',
    'avgAutoSpeakerMissed',
    // 'avgAutoAutoFoul',
    'avgCoopertition',
    'avgTeleAmpScored',
    'avgTeleAmpMissed',
    'avgTeleSpeakerScored',
    'avgTeleSpeakerMissed',
    'avgTeleNoteInTrap',
    // 'avgTeleopFoul',
    'avgEndPosition',
    'avgClimbedTogether',
    'avgTimeForIntake',
    // 'avgAmpRating',
    // 'avgSpeakerRating',
    // 'whereDefend',
    'avgDefenseScore',
    // 'avgOffenseScore',
    'avgUnderStage',
    'avgDied',
    'avgTippedOver',
    'avgCards',
    'gamesPlayed',
    'whereShot',
    'comments',
    'foulComments',
    'shuttleComments',
  ];

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

  // const dataRows = Object.entries(teamData).map(([key, value]) => ({
  //   title: key,
  //   value: value,
  // }));

  const openCommentsModal = () => {
    setIsCommentsModalOpen(true);
  };

  const closeCommentsModal = () => {
    setIsCommentsModalOpen(false);
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
        const gamePromises = teamData.gamesPlayed.map(async gameId => {
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


const mapTeamDataToJSX = (teamData: Team) => {
 return orderedTeamKeys.map(key => {
    if (key === 'comments') {
      return (
        <div
          className="flex justify-between items-center py-2 hover:bg-gray-700 px-3 rounded"
        >
          <span className="font-semibold">Comments</span>
          <button
            key={key}
            className="p-1 rounded bg-gray-600"
            onClick={openCommentsModal}
          >
            {key}
          </button>
        </div>
      );
    }
    else  if (key === 'foulComments') {
      return (
        <div
          className="flex justify-between items-center py-2 hover:bg-gray-700 px-3 rounded"
        >
          <span className="font-semibold">Foul Comments</span>
          <button
            key={key}
            className="p-1 rounded bg-gray-600"
            onClick={() => setIsFoulCommentsModalOpen(true)}
          >
            {key}
          </button>
        </div>
      );
    } else  if (key === 'shuttleComments') {
      return (
        <div
          className="flex justify-between items-center py-2 hover:bg-gray-700 px-3 rounded"
        >
          <span className="font-semibold">Shuttling Comments</span>
          <button
            key={key}
            className="p-1 rounded bg-gray-600"
            onClick={() => setIsShuttleCommentsModalOpen(true)}
          >
            {key}
          </button>
        </div>
      );
    } else  if (key === 'whereShot') {
      return (
        <div
          className="flex justify-between items-center py-2 hover:bg-gray-700 px-3 rounded"
        >
          <span className="font-semibold">Where Shot</span>
          <button
            key={key}
            className="p-1 rounded bg-gray-600"
            onClick={() => setIsWhereShotModalOpen(true)}
          >
            {key}
          </button>
        </div>
      );
    } else if (key === 'gamesPlayed') {
      return (
        <div className="flex justify-between items-center py-2 hover:bg-gray-700 px-3 rounded">
          <span className="font-semibold">Games Played</span>
          <div className="flex overflow-x-scroll">
            {gameDetails.map((game, index) => (
              <button
                key={index}
                className="p-1 rounded bg-gray-600 mx-1"
                onClick={() => openGameDetailsModal(game)}
              >
                Game {game.gameId.substring(game.gameId.indexOf('-') + 1)}
              </button>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={key}
          className="flex justify-between items-center py-2 hover:bg-gray-700 px-3 rounded"
        >
          <span className="font-semibold">{key}</span>
          <span>{Number(teamData[key]).toFixed(2)}</span>
        </div>
      );
    }
 });
};

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
      
      {mapTeamDataToJSX(teamData)}

      <CommentsModal
        isOpen={isCommentsModalOpen}
        closeModal={closeCommentsModal}
        comments={teamData.comments}
      />

      <CommentsModal
        isOpen={isFoulCommentsModalOpen}
        closeModal={() => setIsFoulCommentsModalOpen(false)}
        comments={teamData.foulComments}
      />

      <CommentsModal
        isOpen={isShuttleCommentsModalOpen}
        closeModal={() => setIsShuttleCommentsModalOpen(false)}
        comments={teamData.shuttleComments}
      />

      <CommentsModal
        isOpen={isWhereShotModalOpen}
        closeModal={()=> setIsWhereShotModalOpen(false)}
        comments={teamData.whereShot}
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
