import { useState, useEffect } from 'preact/hooks';
import { getAllTeams } from '../../outerConfig/routes';
import Team from '@/types/teams';

const CategorizeData = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [sortCategory, setSortCategory] =
    useState<keyof Team>('avgDefenseScore'); 

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const fetchedTeams = await getAllTeams();
        setTeams(fetchedTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
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
      </div>
    </div>
  );
};

export default CategorizeData;
