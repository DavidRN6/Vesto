/* ======================
  table of contents
=========================

  1. Imports
  2. Image data for the slider
  3. Slider settings
  4. text content
  5. image content
*/

//==============
// 1. Imports
//==============
import { Link } from "react-router";
import { assets } from "../assets/frontend_assets/assets";
import Slider from "react-slick";

function Hero() {
  //===============================
  // 2. Image data for the slider
  //===============================
  const imageList = [
    {
      id: 1,
      img: assets.home_1,
      title: "Upto 50% off on all Jeans",
      desc: "Discover our latest jeans collection crafted for comfort and style. Get premium quality at half the price. Limited-time offer!",
    },
    {
      id: 2,
      img: assets.home_2,
      title: "30% off on all Women's Wear",
      desc: "Stay trendy with our new women's fashion line. Dresses, tops, and sets designed for every occasion—now with 30% off.",
    },
    {
      id: 3,
      img: assets.home_3,
      title: "70% off on all Products sale",
      desc: "Don't miss our mega sale! Shop now and enjoy up to 70% off on the entire collection. Style that fits every budget.",
    },
  ];

  //======================
  // 3. Slider settings
  //======================
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <section className="w-full relative overflow-hidden bg-white">
      <div className="w-full max-w-[1350px] mx-auto">
        <Slider {...settings} className="w-full  ml-0 lg:ml-20">
          {imageList.map((data) => (
            <div key={data.id} className="w-full">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 items-center gap-6 px-4 py-5 lg:py-10">
                {/*=================
                  4. text content
                ====================*/}
                <div className="order-2 sm:order-1 text-center sm:text-left">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                    {data.title}
                  </h1>
                  <p className="mt-3 text-lg text-gray-600">{data.desc}</p>
                  <Link to="/collection">
                    <button className="mt-5 bg-black hover:scale-105 duration-200 text-white py-2 px-5 rounded-full">
                      Order Now
                    </button>
                  </Link>
                </div>

                {/*==================
                  5. image content
                =====================*/}
                <div className="order-1 sm:order-2">
                  <img
                    src={data.img}
                    alt={data.title}
                    className="mx-auto md:ml-[1%] h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-110 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Hero;
