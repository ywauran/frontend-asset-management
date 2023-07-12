import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAddCircleOutline,
  MdClose,
  MdModeEditOutline,
  MdOutlineDeleteOutline,
  MdSearch,
} from "react-icons/md";

const DataLoan = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/loans");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (query) => {
    const filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredItems);
    setCurrentPage(1);
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

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="flex justify-center space-x-4">
          <input
            type="text"
            name=""
            id=""
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
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Gambar</th>
              <th>Nama Barang</th>
              <th>Nama Peminjam</th>
              <th>Kondisi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={index + 1}
                className={`${index % 2 !== 0 ? "hover" : ""}`}
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
                <td>{item.name}</td>
                <td>{item.item_condition}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-4">
        <button
          className="pagination-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
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
          Next
        </button>
      </div>
    </>
  );
};

export default DataLoan;
