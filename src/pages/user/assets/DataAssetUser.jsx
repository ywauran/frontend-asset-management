import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAddCircleOutline,
  MdSearch,
} from "react-icons/md";
import DataAssetAvailable from "./DataAssetAvailable";
import { getMe } from "../../../features/authSlice";

const DataAssetUser = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/loans-user/${id}`
      );
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (query) => {
    const filteredItems = data.filter((item) =>
      item.item_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="btn bg-[#27AE60] hover:bg-[#FFF] hover:text-[#27AE60] border-[#27AE60]"
        >
          <MdAddCircleOutline />
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex justify-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered"
          />
          <button type="submit" className="px-4 rounded-md btn-primary">
            <MdSearch />
          </button>
        </form>
      </div>
      <div className="w-full mt-4 overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Gambar</th>
              <th>Nama Barang</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index + 1} className={index % 2 === 0 ? null : "hover"}>
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
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center my-4">
          <button
            className="pagination-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft />
          </button>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <li
                  key={pageNumber}
                  className={`pagination-item ${
                    pageNumber === currentPage ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </li>
              )
            )}
          </ul>
          <button
            className="pagination-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
      <DataAssetAvailable
        openModal={openModal}
        id={id}
        setOpenModal={setOpenModal}
        fetchDataUser={fetchData}
      />
    </>
  );
};

export default DataAssetUser;
