import Game from "@/types/game"

export default interface BaseInputProps extends InputProps {
  section: string;
  onChange: (value: any) => void;
}
export interface Config {
  title: string;
  page_title: string;
  sections: SectionProps[];
}

export interface SectionProps {
  name: string;
  preserveDataOnReset?: boolean;
  fields: InputProps[];
}

export interface InputProps {
  title: string;
  type: InputTypes;
  required: boolean;
  // A shorthand code for this input
  code: string;
  disabled?: boolean;
  preserveDataOnReset?: boolean;
  value?: any;
  choices?: Record<string, string>;
  defaultValue?: any;
  min?: number;
  max?: number;
}

export function mapConfigToGame(config: Config, teamNumber: number, matchNumber: number): Game {
  console.log('config:', config)
  const game: Game = {
     gameId: '', 
     scouterInitials: '',
     teamNumber: teamNumber,
     noShow: 0,
     mobility: 0,
     autoAmpScored: 0,
     autoAmpMissed: 0,
     autoSpeakerScored: 0,
     autoSpeakerMissed: 0,
    //  autoAutoFoul: 0,
     coopertition: 0,
     teleAmpScored: 0,
     teleAmpMissed: 0,
     teleSpeakerScored: 0,
     teleSpeakerMissed: 0,
     teleNoteInTrap: 0,
    //  teleopFoul: 0,
     endPosition: 0,
     climbedTogether: 0,
     timeForIntake: 0,
    //  ampRating: 0,
    //  speakerRating: 0,
    //  whereDefend: [],
     defenseScore: 0,
    //  offenseScore: 0,
     underStage: 0,
     died: 0,
     tippedOver: 0,
     cards: 0,
     whereShot: 'No Comment',
     comment: 'No Comment',
     foulComment: 'No Comment',
     shuttleComment: 'No Comment',
  };
 
  for (const section of config.sections) {
    for (const field of section.fields) {
       console.log(field);
       if (field.title === 'Scouter Initials') {
          game.scouterInitials = field.value;
       } else if (field.title === 'Match Number') {
         game.gameId = game.teamNumber + '-' + field.value ;
       } else if (field.title === 'Team Number') {
         game.teamNumber = parseInt(field.value, 10);
       } else if (field.title === 'No Show') {
         game.noShow =(field.value);
       } else if (field.title === 'Mobility?') {
         game.mobility = (field.value);
       } else if (field.title === 'Amp Scored') {
         if (section.name.toLowerCase().includes('auto')) {
           game.autoAmpScored = parseInt(field.value, 10);
         } else if (section.name.toLowerCase().includes('tele')) {
           game.teleAmpScored = parseInt(field.value, 10);
         }
       } else if (field.title === 'Amp Missed') {
         if (section.name.toLowerCase().includes('auto')) {
           game.autoAmpMissed = parseInt(field.value, 10);
         } else if (section.name.toLowerCase().includes('tele')) {
           game.teleAmpMissed = parseInt(field.value, 10);
         }
       } else if (field.title === 'Speaker Scored') {
         if (section.name.toLowerCase().includes('auto')) {
           game.autoSpeakerScored = parseInt(field.value, 10);
         } else if (section.name.toLowerCase().includes('tele')) {
           game.teleSpeakerScored = parseInt(field.value, 10);
         }
       } else if (field.title === 'Speaker Missed') {
         if (section.name.toLowerCase().includes('auto')) {
           game.autoSpeakerMissed = parseInt(field.value, 10);
         } else if (section.name.toLowerCase().includes('tele')) {
           game.teleSpeakerMissed = parseInt(field.value, 10);
         }
       } else if (field.title === 'Coopertition') {
         game.coopertition = (field.value);
       } else if (field.title === 'Note in Trap?') {
         game.teleNoteInTrap = parseInt(field.value, 10);
       } else if (field.title === 'End Position') {
         game.endPosition = parseInt(field.value, 10);
       } else if (field.title === 'Total Robots Climbed On One Chain') {
         game.climbedTogether = parseInt(field.value, 10);
       } else if (field.title === 'Defense Score') {
         game.defenseScore = parseInt(field.value, 10);
       } else if (field.title === 'Died') {
         game.died = (field.value);
       } else if (field.title === 'Tipped Over') {
         game.tippedOver = (field.value);
       } else if (field.title === 'Comments' && field.value) {
         game.comment = matchNumber + ": " + field.value;
       } 
       else if (field.title === "Time For Intake From Source" && field.value) {
         game.timeForIntake = parseInt(field.value, 10);
       } 
       else if(field.title === "Under Stage" && field.value) {
          game.underStage = parseInt(field.value, 10);
       }

       else if(field.title === "Where Shot" && field.value) {
          game.whereShot = matchNumber + ": " + field.value;
       }

       else if (field.title === 'Foul Comments' && field.value) {
        game.foulComment = matchNumber + ": " + field.value;
       } 
      else if (field.title === 'Shuttling Comments' && field.value) {
        game.shuttleComment = matchNumber + ": " + field.value; 
      }
    }
  }
  console.log('game:', game)
 
  return game;
}

export type InputTypes =
  | 'text'
  | 'number'
  | 'boolean'
  | 'range'
  | 'select'
  | 'counter'
  | 'image';
