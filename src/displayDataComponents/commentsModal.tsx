import React from 'react';

interface CommentsModalProps {
 isOpen: boolean;
 closeModal: () => void;
 comments: string[];
}

const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, closeModal, comments }) => {
 if (!isOpen) return null;

 return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all mb-10  w-full lg:w-1/2 md:w-2/3 ">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Comments
              </h3>
              <div className="mt-2">
                <ul className="divide-y divide-gray-200">
                 {comments.map((comment, index) => (
                    <li key={index} className="py-4 text-black">
                      <p className="text-sm">{comment}</p>
                    </li>
                  ))}
                </ul>
              </div>
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

export default CommentsModal;