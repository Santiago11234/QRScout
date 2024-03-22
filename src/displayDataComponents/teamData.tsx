import React, { useEffect, useState } from 'react';
import { getTeamByNumber } from '../../outerConfig/routes'; 
import Team from '@/types/teams';

const TeamData = ({ teamNumber }: { teamNumber: number }) => {
 const [teamData, setTeamData] = useState<Team | null>(null);

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



 return (
    <div className="w-full mx-auto bg-gray-800 p-4 rounded">
      {dataRows.map((row, index) => (
        <div key={index} className="flex justify-between items-center py-2">
          <span className="font-semibold">{row.title}</span>
          <span>{row.value}</span>
        </div>
      ))}
    </div>
 );
};

export default TeamData;