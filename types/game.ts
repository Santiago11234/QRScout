type Game = {
    gameId: string;
    scouterInitials: string;
    teamNumber: number;
    noShow: number;
    mobility: number;
    autoAmpScored: number;
    autoAmpMissed: number;
    autoSpeakerScored: number;
    autoSpeakerMissed: number;
    // autoAutoFoul: number;
    coopertition: number;
    teleAmpScored: number;
    teleAmpMissed: number;
    teleSpeakerScored: number;
    teleSpeakerMissed: number;
    teleNoteInTrap: number;
    // teleopFoul: number;
    endPosition: number;
    climbedTogether: number;
    timeForIntake: number;
    // ampRating: number;
    // speakerRating: number;
    // whereDefend: number[];
    defenseScore: number;
    // offenseScore: number;
    underStage: number;
    died: number;
    tippedOver: number;
    cards: number;
    whereShot: string;
    comment: string;
    foulComment: string;
    shuttleComment: string;
    
};

export default Game;