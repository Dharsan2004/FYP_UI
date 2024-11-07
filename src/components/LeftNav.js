import React, { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuPanelLeftClose } from "react-icons/lu";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
import { ContextApp } from "../utils/Context";

function LeftNav() {
  const { setShowSlide, showSlide, handleQuery } = useContext(ContextApp);
  return (
    <div
      className={
        !showSlide
          ? "h-screen w-[300px] border-r lg:bg-gray-900 bg-white lg:text-white text-black lg:flex hidden flex-col items-center justify-between p-2 translate-x-0"
          : "hidden"
      }
    >
      <div className="flex items-start justify-between w-full">
        <span
          className="border lg:border-gray-600 border-gray-300 rounded w-[80%] py-2 text-xs flex gap-1 items-center justify-center cursor-pointer lg:bg-gray-900 bg-white lg:hover:bg-gray-800 hover:bg-gray-100 transition-all duration-300"
          onClick={() => window.location.reload()}
        >
          <AiOutlinePlus fontSize={18} />
          New Chat
        </span>
        <span
          className="border lg:border-gray-600 border-gray-300 rounded px-3 py-[9px] flex items-center justify-center cursor-pointer lg:bg-gray-900 bg-white lg:hover:bg-gray-800 hover:bg-gray-100 transition-all duration-300"
          title="Close sidebar"
          onClick={() => setShowSlide(!showSlide)}
        >
          <LuPanelLeftClose />
        </span>
      </div>

      {/* Middle section */}
      <div className="h-[80%] w-full p-2 flex items-start justify-start flex-col overflow-hidden overflow-y-auto text-sm scroll my-2">
        <span
          className="rounded w-full py-3 px-2 text-xs my-2 flex gap-1 items-center justify-between cursor-pointer lg:hover:bg-gray-800 hover:bg-gray-100 transition-all duration-300 overflow-hidden truncate whitespace-nowrap lg:text-white text-black"
          value={"Tulasi"}
          onClick={handleQuery}
        >
          <span className="flex gap-2 items-center justify-center text-base">
            <FiMessageSquare />
            <span className="text-sm">Tulasi</span>
          </span>
        </span>
      </div>

      {/* Bottom section */}
      <div className="w-full border-t lg:border-gray-600 border-gray-300 flex flex-col gap-2 items-center justify-center p-2">
        <span className="rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer lg:hover:bg-gray-800 hover:bg-gray-100 transition-all duration-300 lg:text-white text-black">
          <span className="flex gap-2 items-center justify-center text-sm font-bold">
            <img
              src="/user.jpeg"
              alt="user"
              className="w-8 h-8 object-cover rounded-sm"
            />
            User
          </span>
          <span className="rounded-md px-1.5 py-0.5 text-xs font-medium uppercase text-gray-500">
            <SlOptions />
          </span>
        </span>
      </div>
    </div>
  );
}

export default LeftNav;
