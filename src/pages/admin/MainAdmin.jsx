import React, { useState } from "react";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdDashboardCustomize,
  MdGroups,
} from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Logo from "../../assets/ic_logo.png";

const MainAdmin = () => {
  const menus = [
    { name: "Beranda", link: "/admin", icon: MdDashboardCustomize },
    { name: "DataPeminjam", link: "/admin", icon: MdGroups },
    { name: "Data Aset", link: "/admin", icon: HiOutlinePencilSquare },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#FFFFFF] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 shadow`}
      >
        <div
          className={`flex items-center ${
            open ? "justify-between" : "justify-end"
          }  p-3 border-b-2 border-[#EBEDF9]`}
        >
          {open ? (
            <div className="flex items-center space-x-2">
              <img src={Logo} alt="" className="w-10" />
              <h1 className="font-semibold">Pengelolaan Aset</h1>
            </div>
          ) : null}

          {open ? (
            <MdKeyboardDoubleArrowLeft
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <MdKeyboardDoubleArrowRight
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        <div className="relative flex flex-col gap-4 px-3 mt-4">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div className="text-[#040432]">
                {React.createElement(menu?.icon, { size: "20" })}
              </div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-3 text-xl font-semibold text-gray-900">{}</div>
    </section>
  );
};

export default MainAdmin;
