/* ======================
  table of contents
=========================

  1. Imports
  2. Sidebar Admin Panel
*/

//==============
// 1. Imports
//==============
import { NavLink } from "react-router-dom"
import { FaPlus } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

function Sidebar() {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      {/*=======================
        2. Sidebar Admin Panel
      ==========================*/}
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">

        <NavLink to="/add" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
          <FaPlus className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink to="/list" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
          <FaRegCalendarCheck className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink to="/orders" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
          <TbTruckDelivery className="w-5 h-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar;