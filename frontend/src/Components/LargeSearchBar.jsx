/* ======================
  table of contents
=========================

  1. Imports
  2. onFocus SearchBar go to collection page
*/

//==============
// 1. Imports
//==============
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiSearch } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

function LargeSearchBar() {
  const { search, setSearch } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  //==============================================
  //  2. onFocus SearchBar go to collection page
  //==============================================
  const handleFocus = () => {
    if (location.pathname !== "/collection") {
      navigate("/collection");
    }
  };

  return (
    <div className="bg-gray-50 text-center hidden lg:inline-flex">
      <div className="inline-flex items-center justify-center border-b border-gray-400 px-1 py-2 mx-3">
        <input
          value={search}
          onFocus={handleFocus}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <FiSearch />
      </div>
    </div>
  );
}

export default LargeSearchBar;
