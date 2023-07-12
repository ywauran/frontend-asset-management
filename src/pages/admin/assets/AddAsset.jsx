import React, { useState, useRef } from "react";
import axios from "axios";

const AddAsset = ({ fetchData }) => {
  const [itemName, setItemName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const sendData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("item_name", itemName);
    formData.append("serial_number", serialNumber);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/asset", formData);
      fetchData();
      setItemName("");
      serialNumber("");
      setFile(null);
      fileInputRef.current.value = null; // Reset the file input value
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={sendData}
      className="flex flex-col items-center justify-center w-full my-6"
    >
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4 w-96">
          <label htmlFor="item_name" className="label__input">
            Nama Barang
          </label>
          <input
            type="text"
            id="item_name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full input input-bordered"
            placeholder="A"
            required
          />
        </div>
        <div className="flex flex-col space-y-4 w-96">
          <label htmlFor="quantity" className="label__input">
            Nomor Seri
          </label>
          <input
            type="text"
            id="serialNumber"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="input input-bordered"
            placeholder="K1234"
            required
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4 w-96">
        <label htmlFor="fileSubmission" className="label__input">
          File
        </label>
        <input
          type="file"
          id="fileSubmission"
          onChange={loadImage}
          className="file-input"
          ref={fileInputRef}
        />
      </div>

      <button
        type="submit"
        className="px-2 py-2 mt-4 rounded-md w-96 btn-primary"
      >
        Submit
      </button>
    </form>
  );
};

export default AddAsset;
