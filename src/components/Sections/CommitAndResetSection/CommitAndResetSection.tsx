import { useMemo, useState, useEffect } from 'preact/hooks';
import { useQRScoutState } from '../../../store/store';
import { CommitButton } from './CommitButton';
import { ResetButton } from './ResetButton';
import { getQRCodeData } from '../../QR/QRModal'; 

import { addGame } from '../../../../outerConfig/routes';

import Game from "@/types/game"

export type CommitAndResetSectionProps = {
 onCommit: () => void;
};

export function CommitAndResetSection({
  onCommit,
 }: CommitAndResetSectionProps) {
  const formData = useQRScoutState(state => state.formData);
  const missingRequiredFields = useMemo(() => {
     return formData.sections
       .map(s => s.fields)
       .flat()
       .filter(
         f =>
           f.required &&
           (f.value === null || f.value === undefined || f.value === ``),
       );
  }, [formData]);
 
  const [jsonInput, setJsonInput] = useState(getQRCodeData(formData));
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    setJsonInput(getQRCodeData(formData));
  }, [formData]);
 
  const handleInputChange = (event: Event) => {
     const target = event.target as HTMLInputElement;
     setJsonInput(target.value);
  };
 
  const handleSubmit = async () => {
     try {
       const game: Game = JSON.parse(jsonInput);
       await addGame(game);
       setJsonInput('');
       setShowSuccessPopup(true);
       setTimeout(() => setShowSuccessPopup(false), 2000);
     } catch (error) {
       console.error('Invalid JSON format', error);
     }
  };


 return (
    <div className="mb-4 flex flex-col justify-center rounded bg-white py-2 shadow-md dark:bg-gray-600">

      <CommitButton
        disabled={missingRequiredFields.length > 0}
        onClick={onCommit}
      />
      <ResetButton />

      <input
        type="text"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Enter JSON here"
        className="mx-4 py-2 border border-gray-300 rounded-md mb-4 text-black rounded-md dark:bg-gray-800 dark:text-white"
      />


<button
      className="focus:shadow-outline mx-2 my-6 rounded bg-white py-2 font-bold uppercase text-red-rhr hover:bg-red-200 focus:outline-none dark:bg-gray-500 dark:text-white dark:hover:bg-gray-700"
      type="button" onClick={handleSubmit}>
        Submit
      </button>

      {showSuccessPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 success-popup">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-center text-lg font-bold text-black">Submission Successful</p>
          </div>
        </div>
      )}
    </div>
 );
}