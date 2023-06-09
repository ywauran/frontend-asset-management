import React from "react";

const ModalDeleteAsset = ({ openModal, setOpenModal, deleteData }) => {
  return (
    <div>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`${
          openModal ? "flex" : "hidden"
        } fixed top-0 left-0 right-0 z-50 justify-center items-center  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full bg-[#FFF]">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Anda yakin menghapus data ini?
              </h3>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={deleteData}
                  className="w-20 btn btn-sm btn-primary"
                >
                  Ya
                </button>
                <button
                  onClick={() => setOpenModal(false)}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="w-20 btn btn-sm bg-[#FF0000]"
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteAsset;
