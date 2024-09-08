import { useState, useEffect } from 'preact/hooks';
import { getAllTeams, getAllGames } from '../../outerConfig/routes';
import Team from '@/types/teams';
import Game from '@/types/game';


import GameDetailsModal from './gameModal';


const CategorizeData = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [sortCategory, setSortCategory] =
    useState<keyof Team>('avgDefenseScore'); 
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [gameDetails, setGameDetails] = useState<Game[]>([]);


    const [searchTerm, setSearchTerm] = useState('');



    const openGameDetailsModal = (game: Game) => {
        setSelectedGame(game);
      };
    
      const closeGameDetailsModal = () => {
        setSelectedGame(null);
      };

      const handleSearch = (event: Event) => {
        const inputValue = (event.target as HTMLInputElement).value;
        const searchString = "skibidi ";
        const index = inputValue.indexOf(searchString);
        if (index !== -1) {
           setSearchTerm(inputValue.substring(index + searchString.length));
        } else {
           setSearchTerm(inputValue);
        }
       };

     const filteredInitialGames = allGames
 .filter((game) => game.scouterInitials === searchTerm)
 
     let value = 1;
    
  useEffect(() => {
    if(value == 1) {
        console.log("fetching teams")
        const fetchTeams = async () => {
            try {
              const fetchedTeams = await getAllTeams();
              setTeams(fetchedTeams);
            } catch (error) {
              console.error('Error fetching teams:', error);
            }
          };
          fetchTeams();
    }
  }, []);

  const sortTeams = (category: keyof Team) => {
    setSortCategory(category);
    const sortedTeams = [...teams].sort((a, b) => {
      const aValue = typeof a[category] === 'number' ? a[category] : 0;
      const bValue = typeof b[category] === 'number' ? b[category] : 0;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return bValue - aValue; 
      }
      return 0;
    });
    setTeams(sortedTeams);
  };

  let gameValue = 1;
  useEffect(() => {
    if(gameValue == 1) {
        gameValue++;
        const fetchGames = async () => {
            try {
                console.log("fetching games")
              const fetchedGames = await getAllGames();
              setAllGames(fetchedGames);
            } catch (error) {
              console.error('Error fetching games:', error);
            }
          };
          fetchGames();
    }
  }, []);

  return (
    <div className="px-4 w-full">
      <select
        value={sortCategory}
        onChange={e => {
          if (e.target) {
            const target = e.target as HTMLSelectElement;
            sortTeams(target.value as keyof Team);
          }
        }}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
      >
        <option value="avgDefenseScore">Average Defense Score</option>
        <option value="avgAutoAmpScored">Average Auto Amp Scored</option>
        <option value="avgAutoAmpMissed">Average Auto Amp Missed</option>
        <option value="avgAutoSpeakerScored">
          Average Auto Speaker Scored
        </option>
        <option value="avgAutoSpeakerMissed">
          Average Auto Speaker Missed
        </option>
        <option value="avgCoopertition">Average Coopertition</option>
        <option value="avgTeleAmpScored">Average Tele Amp Scored</option>
        <option value="avgTeleAmpMissed">Average Tele Amp Missed</option>
        <option value="avgTeleSpeakerScored">
          Average Tele Speaker Scored
        </option>
        <option value="avgTeleSpeakerMissed">
          Average Tele Speaker Missed
        </option>
        <option value="avgTeleNoteInTrap">Average Tele Note In Trap</option>
        {/* <option value="avgTeleopFoul">Average Teleop Foul</option> */}
        <option value="avgEndPosition">Average End Position</option>
        <option value="avgClimbedTogether">Average Climbed Together</option>
        <option value="avgTimeForIntake">Average Time For Intake</option>
        {/* <option value="avgAmpRating">Average Amp Rating</option>
        <option value="avgSpeakerRating">Average Speaker Rating</option> */}
        <option value="avgUnderStage">Average Under Stage</option>
        <option value="avgDied">Average Died</option>
        <option value="avgTippedOver">Average Tipped Over</option>
        <option value="avgCards">Average Cards</option>
      </select>
      <div>
        {teams.map((team, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>{team.teamNumber}</span>
            <div className="justify-center items-center">
            <span>{Number(team[sortCategory]).toFixed(2)}</span>

            </div>
            <span className="text-lg font-bold">Rank: {index + 1}</span>
          </div>
        ))}

<input
        type="text"
        placeholder="Search teams..."
        value={searchTerm}
        onInput={handleSearch}
        className="w-full py-2 border border-gray-300 rounded-md mb-4 text-black"
      />

{filteredInitialGames.map((game, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <button
                key={index}
                className="p-1 rounded bg-gray-600 mx-1"
                onClick={() => openGameDetailsModal(game)}
              >
                Game {game.gameId.substring(game.gameId.indexOf('-') + 1)}
              </button>
          <div className="justify-center items-center">
            <span>{game.scouterInitials}</span>
          </div>
          {/* Add more game details here as needed */}
        </div>
      ))}
      </div>   

      <GameDetailsModal
        isOpen={gameDetails !== null && selectedGame !== null}
        closeModal={closeGameDetailsModal}
        gameDetails={selectedGame}
      />
    </div>
  );
};

export default CategorizeData;
