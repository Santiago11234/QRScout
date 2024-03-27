import React from 'react';
import Game from '@/types/game';
type GameKeys = keyof Game;

interface GameDetailsModalProps {
 isOpen: boolean;
 closeModal: () => void;
 gameDetails: Game | null;
}

const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ isOpen, closeModal, gameDetails }) => {
 if (!isOpen || !gameDetails) return null;

 // Define the order in which you want the properties to be displayed
 const orderedKeys: GameKeys[] = [
   'gameId',
   'scouterInitials',
   'teamNumber',
   'noShow',
   'mobility',
   'autoAmpScored',
   'autoAmpMissed',
   'autoSpeakerScored',
   'autoSpeakerMissed',
   'autoAutoFoul',
   'coopertition',
   'teleAmpScored',
   'teleAmpMissed',
   'teleSpeakerScored',
   'teleSpeakerMissed',
   'teleNoteInTrap',
   'teleopFoul',
   'endPosition',
   'climbedTogether',
   'offensiveSkill',
   'defensiveSkill',
   'whereDefend',
   'underStage',
   'died',
   'tippedOver',
   'cards',
   'comment',
 ];

 return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all mb-10 w-full lg:w-1/2 md:w-2/3 ">

          <div className="bg-white px-4 pt-5 pb-4 sm:p-2 sm:pb-4 text-black">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Game {gameDetails.gameId.substring(gameDetails.gameId.indexOf("-") + 1)} Details
            </h3>
            <div className="mt-2">
            {orderedKeys.map(key => (
 <p key={key} className="text-sm">
    {key}: {gameDetails[key]}
 </p>
))}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
 );
};

export default GameDetailsModal;