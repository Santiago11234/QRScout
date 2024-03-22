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
    autoAutoFoul: number;
    coopertition: number;
    teleAmpScored: number;
    teleAmpMissed: number;
    teleSpeakerScored: number;
    teleSpeakerMissed: number;
    teleNoteInTrap: number;
    teleopFoul: number;
    endPosition: number;
    climbedTogether: number;
    offensiveSkill: number;
    defensiveSkill: number;
    whereDefend: number[];
    underStage: number;
    died: number;
    tippedOver: number;
    cards: number;
    comment: string;
};

export default Game;