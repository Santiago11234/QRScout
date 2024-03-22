import { useMemo, useState } from 'preact/hooks';
import { useQRScoutState } from '../../../store/store';
import { CommitButton } from './CommitButton';
import { ResetButton } from './ResetButton';

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

 // State for JSON input
 const [jsonInput, setJsonInput] = useState('');

 // Handle input change
 const handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setJsonInput(target.value);
 };

 // Handle submit
 const handleSubmit = () => {
    try {
      const game: Game = JSON.parse(jsonInput);
      addGame(game);
      // Optionally, clear the input field after successful submission
      setJsonInput('');
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


    </div>
 );
}