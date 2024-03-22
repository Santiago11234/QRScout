import { useState, useEffect } from 'preact/hooks';
import { getAllTeams } from '../../outerConfig/routes';
import Team from '@/types/teams';
import TeamItem from './teamItem';
import TeamData from './teamData';

const DataMain = () => {
 const [teams, setTeams] = useState<Team[]>([]);
 const [searchTerm, setSearchTerm] = useState('');
 const [teamNumber, setTeamNumber] = useState<number>(0); 

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

 const handleSearch = (event: Event) => {
    setSearchTerm((event.target as HTMLInputElement).value);
 };

 const filteredTeams = teams.filter((team) =>
    team.teamNumber.toString().includes(searchTerm)
 );

 const handleTeamClick = (teamNumber: number) => {
    console.log('Team clicked:', teamNumber)
    setTeamNumber(teamNumber);
 };

 return (
    <div className="px-4 w-full ">
      <input
        type="text"
        placeholder="Search teams..."
        value={searchTerm}
        onInput={handleSearch}
        className="w-full py-2 border border-gray-300 rounded-md mb-4 text-black"
      />

      <div className="flex flex-col md:flex-row gap-x-2">
        <div className="w-full md:w-1/2">
          <TeamData teamNumber={teamNumber} />
        </div>
        <div className="w-full md:w-1/2">
          <ul className="divide-y divide-gray-200">
            {filteredTeams.map((team) => (
              <li key={team.teamNumber} className="py-4">
                <TeamItem team={team} onClick={() => handleTeamClick(team.teamNumber)} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
 );
};

export default DataMain;