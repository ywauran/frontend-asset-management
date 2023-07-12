import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, LogOut, reset } from "../../features/authSlice";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdDataset } from "react-icons/md";
import { AiOutlineUser, AiFillDatabase } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Header from "../../components/shared/Header";
import DataAsset from "./assets/DataAsset";
import Dashboard from "../user/Dashboard";
import DataUser from "./user/DataUser";
import DataLoan from "./loan/DataLoan";

const MainAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(true);
  const [openModalLogout, setOpenModalLogout] = useState(false);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const Logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  const menus = [
    {
      name: "Data Aset",
      link: "/data",
      icon: MdDataset,
    },
    {
      name: "Data Pengguna",
      link: "/users",
      icon: AiOutlineUser,
    },
    {
      name: "Data Peminjaman Barang",
      link: "/loan",
      icon: AiFillDatabase,
    },
  ];

  return (
    <div className="flex overflow-y-hidden">
      <div
        className={`bg-[#FFFFFF] shadow min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="flex justify-end py-3">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex flex-col h-[90%]">
          <div className="relative flex flex-col gap-4 mt-4">
            {menus.map((menu, i) => (
              <Link
                to={menu.link}
                key={i}
                className={` ${
                  menu.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `300ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu.name}
                </h2>
                <h2
                  className={` ${
                    open && "hidden"
                  } absolute z-50 left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu.name}
                </h2>
              </Link>
            ))}
            <button
              onClick={() => setOpenModalLogout(true)}
              className="group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
            >
              <div>
                <RiLogoutBoxLine size="20" />
              </div>
              <h2
                className={`whitespace-pre duration-300 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Keluar
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute z-50 left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                Keluar
              </h2>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-hidden font-semibold text-gray-900">
        <Header />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/data" element={<DataAsset />} />
            <Route path="/users" element={<DataUser />} />
            <Route path="/loan" element={<DataLoan />} />
          </Routes>
        </div>
      </div>
      {/* Modal Logout */}
      {openModalLogout && (
        <LogoutModal
          openModalLogout={openModalLogout}
          onLogout={Logout}
          onClose={() => setOpenModalLogout(false)}
        />
      )}
    </div>
  );
};

const LogoutModal = ({ openModalLogout, onLogout, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 ${
        openModalLogout ? "block" : "hidden"
      }`}
    >
      <div className="p-4 bg-[#FFFFFF] rounded-lg shadow">
        <div className="flex items-start justify-center pb-4">
          <h3 className="text-xl font-semibold text-gray-900">Keluar</h3>
        </div>
        <div className="py-6">
          <p className="text-base leading-relaxed text-center text-gray-500">
            Anda yakin ingin keluar?
          </p>
        </div>
        <div className="flex items-center justify-center pt-4 space-x-2">
          <button
            type="button"
            className="w-24 py-2 font-medium text-white bg-blue-500 rounded btn-primary"
            onClick={onLogout}
          >
            Ya
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-24 py-2 font-medium text-white bg-red-500 rounded btn-secondary"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainAdmin;
