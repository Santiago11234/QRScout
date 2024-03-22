
import Team from '@/types/teams';

const TeamItem = ({ team, onClick }: { team: Team, onClick: () => void }) => {

    return (
        <div className="w-full flex items-center bg-gray-800 p-4 rounded-md hover:bg-gray-900 hover:cursor-pointer" onClick={onClick}>
        <div className="w-1/3 text-left">
        <h3 className="text-lg font-semibold">Team Number: {team.teamNumber}</h3>
      </div>
      <div className="w-2/3 text-right">
        <p className="text-sm">Matches Played: {team.gamesPlayed.length}</p>
      </div>
    </div>
 );
};

export default TeamItem;