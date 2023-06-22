import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalDeleteAsset from "../../../components/modal/ModalDeleteAsset";
import EditAsset from "./EditAsset";
import AddAsset from "./AddAsset";

const DataAsset = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/assets");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const deleteData = async () => {
    try {
      await axios.delete(`http://localhost:5000/asset/${selectedData.uuid}`);
      setData((prevData) =>
        prevData.filter((item) => item.uuid !== selectedData.uuid)
      );
      setOpenModalDelete(false);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getData();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const openModalDeleteData = (data) => {
    setSelectedData(data);
    setOpenModalDelete(true);
  };

  const openModalEditData = (data) => {
    setSelectedData(data);
    console.log(selectedData);
    setOpenModalEdit(true);
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="input input-bordered"
          />
          <button type="submit" className="px-4 rounded-md btn-primary">
            Search
          </button>
        </form>
      </div>
      <div className="flex justify-end my-4 ">
        {openAdd ? (
          <button
            onClick={() => setOpenAdd(!openAdd)}
            className="bg-[#27AE60] rounded-md text-[#FFFFFF] py-2 px-4"
          >
            Tutup
          </button>
        ) : (
          <button
            onClick={() => setOpenAdd(!openAdd)}
            className="bg-[#27AE60] rounded-md text-[#FFFFFF] py-2 px-4"
          >
            Tambah Data
          </button>
        )}
      </div>
      <div>{openAdd ? <AddAsset fetchData={getData} /> : null}</div>
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Gambar</th>
              <th>Nama Barang</th>
              <th>Jumlah Barang</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
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
                <td>{item.quantity}</td>
                <td>{item.quantity === 0 ? "Tidak tersedia" : "Tersedia"}</td>
                <td className="flex justify-center py-4 space-x-4">
                  <button
                    onClick={() => openModalEditData(item)}
                    className="px-4 py-2 rounded-md btn-primary"
                  >
                    Perbarui
                  </button>

                  <button
                    onClick={() => openModalDeleteData(item)}
                    className="px-4 py-2 rounded-md btn-secondary"
                  >
                    Hapus
                  </button>
                </td>
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
      <ModalDeleteAsset
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        deleteData={deleteData}
      />
      <EditAsset
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        data={selectedData}
        fetchData={getData}
      />
    </>
  );
};

export default DataAsset;
