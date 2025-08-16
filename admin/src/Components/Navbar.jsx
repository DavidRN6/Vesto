function Navbar({ setToken }) {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <h1 id="logo" className="text-4xl">
        <span className="text-primary font-bold">V</span>esto
      </h1>
      <button onClick={() => setToken("")} className="bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm">
        Logout
      </button>
    </div>
  );
}

export default Navbar;
