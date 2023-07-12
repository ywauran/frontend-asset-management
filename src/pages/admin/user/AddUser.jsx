import React, { useState, useRef } from "react";
import axios from "axios";

const AddUser = ({ fetchData }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const role = "guest";

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const sendData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/user", formData);
      fetchData();
      setName("");
      setUsername("");
      setPassword("");
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
      <div className="flex flex-col space-y-4 w-96">
        <label htmlFor="name" className="label__input">
          Nama
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full input input-bordered"
          placeholder="Nama"
          required
        />
      </div>
      <div className="flex flex-col space-y-4 w-96">
        <label htmlFor="username" className="label__input">
          Nama Pengguna
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered"
          placeholder="Username"
          required
        />
      </div>
      <div className="flex flex-col space-y-4 w-96">
        <label htmlFor="password" className="label__input">
          Kata Sandi
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered"
          placeholder="Password"
          required
        />
      </div>
      <div className="flex flex-col space-y-4 w-96">
        <label htmlFor="fileSubmission" className="label__input">
          Gambar
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

export default AddUser;
