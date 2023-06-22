import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//Icon
import { MdOutlineDashboard, MdDescription } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiFolder } from "react-icons/fi";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [openModalLogout, setOpenModalLogout] = useState(false);
  let navigate = useNavigate();
  const Logout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
  };
  const menus = [
    {
      name: "Dashboard",
      link: "/pages/dashboard",
      icon: MdOutlineDashboard,
      isAdmin: true,
    },
    {
      name: "Data Kriteria",
      link: "/pages/data-criteria",
      icon: MdDescription,
    },
    {
      name: "Data Subkriteria",
      link: "/pages/data-subcriteria",
      icon: MdDescription,
    },
    {
      name: "Data Alternatif",
      link: "/pages/data-alternative",
      icon: FiFolder,
    },
  ];
  return (
    <>
      <div className="flex overflow-y-hidden">
        <div
          className={`bg-[#0e0e0e] min-h-screen ${
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
          <div className="flex flex-col justify-between h-[90%]">
            <div className="relative flex flex-col gap-4 mt-4">
              {menus?.map((menu, i) => (
                <Link
                  to={menu?.link}
                  key={i}
                  className={` ${
                    menu?.margin && "mt-5"
                  } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute z-50 left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu?.name}
                  </h2>
                </Link>
              ))}
            </div>
            <button
              onClick={() => setOpenModalLogout(true)}
              className="text-sm  gap-3.5 font-medium p-2 bg-gray-800 rounded-md"
            >
              Keluar
            </button>
          </div>
        </div>
        <div className="w-full overflow-x-hidden font-semibold text-gray-900">
          <div></div>
          <div className="p-5"></div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
