import React from "react";

const ModalLogout = ({ openModalLogout, onLogout, onClose }) => {
  return (
    <div
      id="modalLogout"
      tabIndex="-1"
      aria-hidden="true"
      className={`flex items-center fixed top-0 left-0 right-0 z-50 ${
        openModalLogout ? "block" : "hidden"
      } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}
    >
      <div className="relative flex items-center justify-center w-full h-max">
        <div className="relative bg-[#FFFFFF] rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-center p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-center text-gray-900">
              Keluar
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-center text-gray-500 ">
              Anda yakin ingin keluar ?
            </p>
          </div>
          <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b">
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="w-24 button__primary"
              onClick={onLogout}
            >
              Ya
            </button>
            <button
              data-modal-hide="defaultModal"
              type="button"
              onClick={onClose}
              className="w-24 button__warn"
            >
              Tidak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
