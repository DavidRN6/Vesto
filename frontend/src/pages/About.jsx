/* ======================
  table of contents
=========================

  1. Imports
  2. image
  3. text
*/

//==============
// 1. Imports
//==============
import Title from "../Components/Title";
import { assets } from "../assets/frontend_assets/assets";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/*=========
        2. image
      ============*/}
      <div className="my-10 flex flex-col justify-center items-center lg:flex-row gap-16">
        <img
          className="w-full md:max-w-[550px] rounded-md"
          src={assets.about_img}
          alt="img-about-us"
        />
        {/*==========
          3. text
        =============*/}
        <div className="flex flex-col justify-start gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit non
            veritatis ipsam labore dicta, nisi iste alias. Iste, impedit? Dicta
            repudiandae distinctio id animi nam explicabo illum asperiores
            reprehenderit quis. ipsum dolor sit amet consectetur adipisicing
            elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            tempore culpa repellat excepturi veritatis enim sunt accusantium
            maxime error debitis consectetur aliquam necessitatibus
            reprehenderit labore pariatur obcaecati nisi, est optio?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            aperiam commodi magnam eum voluptatibus porro, unde, cum est fugiat
            quo nostrum autem officia adipisci tempora sit? Accusantium ut cum
            odit labore pariatur
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
