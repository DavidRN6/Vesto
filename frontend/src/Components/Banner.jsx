/* ======================
  table of contents
=========================

  1. Imports
  2. Banner Component
*/

//==============
// 1. Imports
//==============
import { assets } from "../assets/frontend_assets/assets";
import { ImQuotesLeft } from "react-icons/im";

function Banner() {
  return (
    //=======================
    // 2. Banner Component
    //=======================
    <div className="w-full mt-16 relative h-[200px] sm:h-[300px] lg:h-[600px] xl:h-[450px]">
      {/* background image*/}
      <img
        src={assets.Banner_img}
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Shadows */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* text*/}
      <div className="absolute inset-0 flex text-xl items-center gap-1 justify-center text-white">
        <ImQuotesLeft />
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center">
          <span className="text-red-600">V</span>esto Fashion For Women
        </h1>
        <ImQuotesLeft className="rotate-180" />
      </div>
    </div>
  );
}

export default Banner;
