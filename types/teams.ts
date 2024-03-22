type Team = {
    teamNumber: number;
    avgNoShow: number;
    avgMobility: number;
    avgAutoAmpScored: number;
    avgAutoAmpMissed: number;
    avgAutoSpeakerScored: number;
    avgAutoSpeakerMissed: number;
    avgAutoAutoFoul: number;
    avgCoopertition: number;
    avgTeleAmpScored: number;
    avgTeleAmpMissed: number;
    avgTeleSpeakerScored: number;
    avgTeleSpeakerMissed: number;
    avgTeleNoteInTrap: number;
    avgTeleopFoul: number;
    avgEndPosition: number;
    avgClimbedTogether: number;
    avgOffensiveSkill: number;
    avgDefensiveSkill: number;
    whereDefend: number[];
    avgUnderStage: number;
    avgDied: number;
    avgTippedOver: number;
    avgCards: number;
    gamesPlayed: string[]; 
    comments: string[];
   };
   
   export default Team;