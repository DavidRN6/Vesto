/* ======================
  table of contents
=========================

  1. Imports
  2. Title and description
  3. Form
  4. Email Address
  5. Your Message
  6. Submit Button
  7. Success message
  8. Animation
*/

//==============
// 1. Imports
//==============
import Title from "../Components/Title";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import contactUs from "../animations/contact us.json";
import successAnimation from "../animations/done.json";

function Contact() {
  const [state, handleSubmit] = useForm("mzzzlrvw");

  return (
    <section id="contact" className="px-4 py-8">
      {/*==========================
        2. Title and description
      =============================*/}
      <h1 className="text-center text-3xl">
        <Title text1={"CONTACT"} text2={"US"} />
        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Contact us for more information and get notified when I publish
          something new.
        </p>
      </h1>

      <div id="form" className="flex flex-col lg:flex-row items-center justify-around mt-10 gap-10">
        {/*===========
          3. Form
        ==============*/}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mt-4 flex flex-col">
            {/*==================
              4. email address
            =====================*/}
            <label className="text-gray-700 mb-1" htmlFor="email">
              Email Address:
            </label>
            <input
              required
              autoComplete="off"
              className="border-gray-400 hover:border-gray-700 transition duration-300 border rounded-[4px] w-full h-10 px-2"
              type="email"
              name="email"
              id="email"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          {/*==================
            5. Your Message
          =====================*/}
          <div className="mt-6 flex flex-col">
            <label className="text-gray-700 mb-1" htmlFor="message">
              Your Message:
            </label>
            <textarea
              autoComplete="off"
              className="border-gray-400 hover:border-gray-700 transition duration-300 border rounded-[4px] w-full h-32 px-2 py-1"
              name="message"
              id="message"
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          {/*==================
            6. Submit Button
          =====================*/}
          <button
            type="submit"
            disabled={state.submitting}
            className="bg-gray-700 w-full sm:w-28 rounded-[6px] mt-6 py-3 text-white hover:bg-gray-800 transition duration-300"
          >
            {state.submitting ? "Sending..." : "Submit"}
          </button>

          {/*====================
            7. Success message
          =======================*/}
          {state.succeeded && (
            <p className="text-base text-gray-700 mt-6 flex items-center">
              <Lottie
                loop={false}
                className="h-[37px]"
                animationData={successAnimation}
              />
              Your message has been sent successfully
            </p>
          )}
        </form>

        {/*===============
          8. animation
        ==================*/}
        <div className="w-full max-w-md hidden lg:block">
          <Lottie className="h-[300px] sm:h-[375px]" animationData={contactUs} />
        </div>
      </div>
    </section>
  );
}

export default Contact;
