/* ======================
  table of contents
=========================

  1. Imports
  2. Footer details
  3. Footer Links
  4. social links
*/

//==============
// 1. Imports
//==============
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function Footer() {
  return (
    <div className="bg-gray-950">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 py-12 text-sm">
          {/*==================
            2. Footer details
          =====================*/}
          <div>
            <Link to="/" className="cursor-pointer">
              <h1 id="logo" className="text-4xl text-gray-200">
                <span className="font-bold">V</span>esto
              </h1>
            </Link>
            <p className="text-xl mt-1 text-gray-500">Fashion For Women</p>
            <div className="flex items-center gap-2 text-white mt-5 text-lg">
              <FaLocationDot />
              <p>ملوى شارع ثروت محل الحقونا سابقا</p>
            </div>
          </div>

          {/*==================
            3.Footer Links
          ===================*/}
          <div>
            <p className="text-xl font-medium mb-5 text-gray-500">LINKS</p>
            <ul className="flex flex-col gap-2 text-gray-200">
              <Link to="/" className="hover:text-gray-400">
                <p>HOME</p>
              </Link>
              <Link
                to="/collection"
                className="hover:text-gray-400 transition duration-300"
              >
                <p>COLLECTION</p>
              </Link>
              <Link
                to="/about"
                className="hover:text-gray-400 transition duration-300"
              >
                <p>ABOUT</p>
              </Link>
              <Link
                to="/contact"
                className="hover:text-gray-400 transition duration-300"
              >
                <p>CONTACT</p>
              </Link>
            </ul>
          </div>

          {/*===================
            4. Social Links
          ===================*/}
          <div>
            <div className="flex items-center gap-2 mb-5 text-gray-500">
              <a
                href="https://www.facebook.com/groups/246406036068385"
                target="_blank"
              >
                <FaFacebookSquare className="text-3xl hover:scale-105 transition-all duration-300 hover:text-gray-300" />
              </a>
            </div>
            <div className="w-full md:w-2/3 text-gray-200 text-base">
              <h2 className="flex items-center gap-2 mb-2 mt-5">
                <HiOutlineMail />
                Gogoelhaqona@gmail.com
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 h-[1px] w-full bg-gray-600" />
      <div className="text-center text-gray-500 py-4">
        <h4>&copy; Vesto | All Rights Reserved</h4>
      </div>
    </div>
  );
}

export default Footer;
