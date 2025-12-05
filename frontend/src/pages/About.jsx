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
    <div className="animate-fadeIn">
      <div className="text-2xl text-center pt-10 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/*=========
        2. image
      ============*/}
      <div className="my-14 flex flex-col justify-center items-center lg:flex-row gap-20 px-4 md:px-0">
        <img
          className="w-full md:max-w-[550px] rounded-lg shadow-md"
          src={assets.about_img}
          alt="img-about-us"
        />

        {/*==========
          3. text
        =============*/}
        <div className="flex flex-col justify-start gap-7 md:w-2/4 leading-relaxed text-[17px] md:text-lg">
          <p>
            <b>فيستو</b> هو بداية جديدة لرحلة بدأها{" "}
            <b>جوزيف مرزوق</b>، اللي معظم الناس في
            ملوى يعرفوه باسم <b>"جوزيف الحقونا"</b>.
            القصة بدأت من محل "الحقونا" اللي كان ليه اسم وسمعة حلوة، ومع نجاحه
            قرّر يوسع الشغل ويفتح براند مختلف يقدم لبس حريمي شيك، وجودته تعيش،
            وبسعر يناسب كل البنات.
          </p>

          <p>
            المحل موجود في{" "}
            <b>
              ملوى – شارع ثروت متفرع من شارع ماريا
            </b>
            ، وكمان فيه <b>فرعين قدام بعض</b> علشان
            نقدر نخدم الناس أسرع وأحسن. الويب سايت ده معمول علشان يجمع الفرعين
            ويخلّي تجربة الشراء أسهل، ويوصلّك كل الجديد أول بأول.
          </p>

          <b>Our Mission — رسالتنا</b>

          <p>
            في Vesto، إحنا مش بس بنبيع لبس… إحنا بنحاول نخلق مكان البنات تلاقي
            فيه حاجة تعجبها من غير ما تلف كتير. همّنا دايمًا إن العميل يبقى
            راضي، سواء من الجودة أو السعر أو التعامل. بننزل موديلات جديدة طول
            الوقت، وبنسمع رأي العملاء لأن رأيهم هو اللي بيخلّينا نطوّر نفسنا كل
            يوم.
          </p>

          <p>
            هدفنا إن كل بنت تشتري من <b>فيستو</b> تحس
            إنها لقت المكان اللي بيريّحها وتقدر تختار منه بثقة، وتطلع من التجربة
            وهي مبسوطة.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
