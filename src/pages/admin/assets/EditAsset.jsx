import React, { useState } from "react";
import axios from "axios";

const EditAsset = ({ openModal, setOpenModal, data, fetchData }) => {
  const [itemName, setItemName] = useState(data?.item_name || "");
  const [serialNumber, setSerialNumber] = useState(data?.serial_number || "");
  const [file, setFile] = useState(data?.url || "");

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const editData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("item_name", itemName);
    formData.append("serial_number", serialNumber);
    formData.append("file", file);
    try {
      await axios.patch(`http://localhost:5000/asset/${data.uuid}`, formData);
      fetchData();
      setItemName("");
      setSerialNumber("");
      setFile("");
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {openModal && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
        >
          <div className="relative w-full max-w-md">
            <div className="relative bg-[#FFF] rounded-lg shadow">
              <button
                onClick={closeModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
              <div className="p-6 text-center shadow">
                <form onSubmit={editData} className="my-6">
                  <div className="grid grid-cols-1 gap-6 mb-6">
                    <div className="flex flex-col">
                      <label htmlFor="item_name" className="label__input">
                        Nama
                      </label>
                      <input
                        type="text"
                        id="item_name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="input input-bordered"
                        placeholder=""
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="serialNumber" className="label__input">
                        Nomor Seri
                      </label>
                      <input
                        type="text"
                        id="serialNumber"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        className="input input-bordered"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="fileSubmission" className="label__input">
                      File
                    </label>
                    <input
                      type="file"
                      className="w-full file-input"
                      id="fileSubmission"
                      onChange={loadImage}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 mt-6 rounded-md btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAsset;
