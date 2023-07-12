import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdAddCircleOutline, MdSearch } from "react-icons/md";
import { useParams } from "react-router-dom";

const DataAssetAvailable = ({ id, openModal, setOpenModal, fetchDataUser }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/assets");
      const filteredItems = response.data.filter(
        (item) => item.status === "Tersedia"
      );
      setData(response.data);
      setFilteredData(filteredItems);
      console.log(response);
      console.log(filteredItems);
    } catch (error) {
      // Handle error
    }
  };

  const handleSearch = (query) => {
    const filteredItems = filteredData.filter((item) =>
      item.item_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const createLoan = async (assetId) => {
    if (assetId && id) {
      try {
        await axios.post("http://localhost:5000/loan", {
          assetId: assetId,
          userId: id,
        });
        fetchDataUser();
        fetchData();
        setOpenModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`${
          openModal ? "flex" : "hidden"
        } fixed top-0 left-0 right-0 z-50 justify-center items-center  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-[#FFFFFF] rounded-lg shadow dark:bg-gray-700">
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
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="flex justify-center space-x-4"
                >
                  <input
                    type="text"
                    name=""
                    id=""
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    className="input input-bordered"
                  />
                  <button type="submit" className="px-4 rounded-md btn-primary">
                    <MdSearch />
                  </button>
                </form>
              </div>
              <div className="w-full mt-4 overflow-x-auto">
                <table className="table w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Gambar</th>
                      <th>Nama Barang</th>
                      <th>Kondisi</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr
                        key={index + 1}
                        className={`${index % 2 === 0 ? null : "hover"}`}
                      >
                        <th>{index + 1}</th>
                        <td>
                          <img
                            src={item.url}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                        </td>
                        <td>{item.item_name}</td>
                        <td>{item.item_condition}</td>
                        <td>{item.status}</td>
                        <td className="flex justify-center py-4 space-x-4">
                          <button
                            className="px-4 py-2 rounded-md btn-primary"
                            onClick={() => createLoan(item.id)}
                          >
                            <MdAddCircleOutline />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAssetAvailable;
