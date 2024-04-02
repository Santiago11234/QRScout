import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where, updateDoc, doc, getDoc, setDoc } from "firebase/firestore";

import Team from "@/types/teams";
import Game from "@/types/game";


// export async function addSampleTeam(): Promise<void> {

//  const sampleTeam: Team = {
//     teamNumber: 0,
//     avgNoShow: 0,
//     avgMobility: 0,
//     avgAutoAmpScored: 0,
//     avgAutoAmpMissed: 0,
//     avgAutoSpeakerScored: 0,
//     avgAutoSpeakerMissed: 0,
//     avgAutoAutoFoul: 0,
//     avgCoopertition: 0,
//     avgTeleAmpScored: 0,
//     avgTeleAmpMissed: 0,
//     avgTeleSpeakerScored: 0,
//     avgTeleSpeakerMissed: 0,
//     avgTeleNoteInTrap: 0,
//     avgTeleopFoul: 0,
//     avgEndPosition: 0,
//     avgClimbedTogether: 0,
//     avgOffensiveSkill: 0,
//     avgDefensiveSkill: 0,
//     whereDefend: [],
//     avgUnderStage: 0,
//     avgDied: 0,
//     avgTippedOver: 0,
//     avgCards: 0,
//     gamesPlayed: [],
//     comments: []
//  };

//  const teamsCollection = collection(db, "teams");
//  try {
//     const docRef = await addDoc(teamsCollection, sampleTeam);
//     console.log("Sample team added with ID:", docRef.id);
//  } catch (error) {
//     console.error("Error adding sample team:", error);
//     throw error;
//  }
// }


export async function getAllTeams(): Promise<Team[]> {
 const teamsCollection = collection(db, "teams");
 const teamsSnapshot = await getDocs(teamsCollection);
 const teams: Team[] = [];
 teamsSnapshot.forEach((doc) => {
    teams.push(doc.data() as Team);
 });
 return teams;
}


export async function getTeamByNumber(teamNumber: number): Promise<Team | null> {
   const teamsCollection = collection(db, "teams");
   const q = query(teamsCollection, where("teamNumber", "==", teamNumber));
   const querySnapshot = await getDocs(q);
  
   if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return doc.data() as Team;
   } else {
      console.log("No team found with the provided teamNumber!");
      return null;
   }
}


export async function addGame(gameData: Game): Promise<void> {
 const teamsCollection = collection(db, "teams");
 const teamNumber = gameData.teamNumber;

 const teamDocRef = doc(teamsCollection, teamNumber.toString());
 const teamDocSnap = await getDoc(teamDocRef);

 const gamesCollection = collection(db, "games");
 const gameDocRef = await addDoc(gamesCollection, gameData);

 let id = gameDocRef.id;
 console.log(id)
 if (teamDocSnap.exists()) {
    const teamData = teamDocSnap.data() as Team;
    const newGamesPlayed = teamData.gamesPlayed.length;

    const newAverages: Partial<Team> = {
      avgNoShow: (teamData.avgNoShow * newGamesPlayed + gameData.noShow) / (newGamesPlayed + 1),
      avgMobility: (teamData.avgMobility * newGamesPlayed + gameData.mobility) / newGamesPlayed,
      avgAutoAmpScored: (teamData.avgAutoAmpScored * newGamesPlayed + gameData.autoAmpScored) / (newGamesPlayed + 1),
      avgAutoAmpMissed: (teamData.avgAutoAmpMissed * newGamesPlayed + gameData.autoAmpMissed) / (newGamesPlayed + 1),
      avgAutoSpeakerScored: (teamData.avgAutoSpeakerScored * newGamesPlayed + gameData.autoSpeakerScored) / (newGamesPlayed + 1),
      avgAutoSpeakerMissed: (teamData.avgAutoSpeakerMissed * newGamesPlayed + gameData.autoSpeakerMissed) / (newGamesPlayed + 1),
      avgAutoAutoFoul: (teamData.avgAutoAutoFoul * newGamesPlayed + gameData.autoAutoFoul) / (newGamesPlayed + 1),
      avgCoopertition: (teamData.avgCoopertition * newGamesPlayed + gameData.coopertition) / (newGamesPlayed + 1),
      avgTeleAmpScored: (teamData.avgTeleAmpScored * newGamesPlayed + gameData.teleAmpScored) / (newGamesPlayed + 1),
      avgTeleAmpMissed: (teamData.avgTeleAmpMissed * newGamesPlayed + gameData.teleAmpMissed) / (newGamesPlayed + 1),
      avgTeleSpeakerScored: (teamData.avgTeleSpeakerScored * newGamesPlayed + gameData.teleSpeakerScored) / (newGamesPlayed + 1),
      avgTeleSpeakerMissed: (teamData.avgTeleSpeakerMissed * newGamesPlayed + gameData.teleSpeakerMissed) / (newGamesPlayed + 1),
      avgTeleNoteInTrap: (teamData.avgTeleNoteInTrap * newGamesPlayed + gameData.teleNoteInTrap) / (newGamesPlayed + 1),
      avgTeleopFoul: (teamData.avgTeleopFoul * newGamesPlayed + gameData.teleopFoul) / (newGamesPlayed + 1),
      avgEndPosition: (teamData.avgEndPosition * newGamesPlayed + gameData.endPosition) / (newGamesPlayed + 1),
      avgClimbedTogether: (teamData.avgClimbedTogether * newGamesPlayed + gameData.climbedTogether) / (newGamesPlayed + 1),
      avgTimeForIntake: (teamData.avgTimeForIntake * newGamesPlayed + gameData.timeForIntake) / (newGamesPlayed + 1),
      avgAmpRating: (teamData.avgAmpRating * newGamesPlayed + gameData.ampRating) / (newGamesPlayed + 1),
      avgSpeakerRating: (teamData.avgSpeakerRating * newGamesPlayed + gameData.speakerRating) / (newGamesPlayed + 1),
      whereDefend: [...teamData.whereDefend, ...gameData.whereDefend], 
      avgDefenseScore: (teamData.avgDefenseScore * newGamesPlayed + gameData.defenseScore) / (newGamesPlayed + 1),
      avgOffenseScore: (teamData.avgOffenseScore * newGamesPlayed + gameData.offenseScore) / (newGamesPlayed + 1),
      avgUnderStage: (teamData.avgUnderStage * newGamesPlayed + gameData.underStage) / (newGamesPlayed + 1),
      avgDied: (teamData.avgDied * newGamesPlayed + gameData.died) / (newGamesPlayed + 1),
      avgTippedOver: (teamData.avgTippedOver * newGamesPlayed + gameData.tippedOver) / (newGamesPlayed + 1),
      avgCards: (teamData.avgCards * newGamesPlayed + gameData.cards) / (newGamesPlayed + 1),
      gamesPlayed: [...teamData.gamesPlayed, gameData.gameId],
      comments: [...teamData.comments, gameData.comment],
    };

    await updateDoc(teamDocRef, {
      ...newAverages,
      gamesPlayed: [...teamData.gamesPlayed, gameData.gameId],
    });
 } else {
    const newTeam: Team = {
      teamNumber: teamNumber,
      avgNoShow: gameData.noShow,
      avgMobility: gameData.mobility,
      avgAutoAmpScored: gameData.autoAmpScored,
      avgAutoAmpMissed: gameData.autoAmpMissed,
      avgAutoSpeakerScored: gameData.autoSpeakerScored,
      avgAutoSpeakerMissed: gameData.autoSpeakerMissed,
      avgAutoAutoFoul: gameData.autoAutoFoul,
      avgCoopertition: gameData.coopertition,
      avgTeleAmpScored: gameData.teleAmpScored,
      avgTeleAmpMissed: gameData.teleAmpMissed,
      avgTeleSpeakerScored: gameData.teleSpeakerScored,
      avgTeleSpeakerMissed: gameData.teleSpeakerMissed,
      avgTeleNoteInTrap: gameData.teleNoteInTrap,
      avgTeleopFoul: gameData.teleopFoul,
      avgEndPosition: gameData.endPosition,
      avgClimbedTogether: gameData.climbedTogether,
      avgTimeForIntake: gameData.timeForIntake,
      avgAmpRating: gameData.ampRating,
      avgSpeakerRating: gameData.speakerRating,
      whereDefend: gameData.whereDefend,
      avgDefenseScore: gameData.defenseScore,
      avgOffenseScore: gameData.offenseScore,
      avgUnderStage: gameData.underStage,
      avgDied: gameData.died,
      avgTippedOver: gameData.tippedOver,
      avgCards: gameData.cards,
      gamesPlayed: [gameData.gameId], 
      comments: [gameData.comment],
    };


    await setDoc(teamDocRef, newTeam);
 }
}

export async function getGameById(gameId: string): Promise<Game | null> {
 const gamesCollection = collection(db, "games");
 const q = query(gamesCollection, where("gameId", "==", gameId));
 const querySnapshot = await getDocs(q);

 if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return doc.data() as Game;
 } else {
    console.log("No game found with the provided gameId!");
    return null;
 }
}


