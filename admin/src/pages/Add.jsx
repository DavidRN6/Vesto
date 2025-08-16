/* ======================
  table of contents
=========================

  1. Imports
  2. Image State
  3. available Colors => بزود الكالار من هنا اللى بيختارة الادمن للمنتج
  4. Inputs & type State
  5. APIS Product add
  6. Upload Image
  7. Inputs Field
  8. Product Type & Price
  9. Product Size
  10. Product Color
  11. Add To Bestseller
  12. Add Button
*/

//==============
// 1. Imports
//==============
import { useState } from "react";
import uploadArea from "../assets/upload_area.webp";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function Add({ token }) {
  /*=================
    2. Image State
  ===================*/
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  //==========================================================================
  // 3. available Size => بزود المقاسات من هنا اللى بيختارة الادمن للمنتج
  //==========================================================================
  const availableSizes = ["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];

  //==========================================================================
  // 3. available Colors => بزود الكالار من هنا اللى بيختارة الادمن للمنتج
  //==========================================================================
  const availableColors = [
    { label: "Black", value: "Black" },
    { label: "White", value: "White" },
    { label: "Mint Green", value: "mintGreen" },
    { label: "Baby Blue", value: "babyBlue" },
    { label: "Gray", value: "Gray" },
    { label: "Beige", value: "Beige" },
    { label: "Pink", value: "Pink" },
    { label: "Red", value: "Red" },
  ];

  /*======================== 
    4. Inputs & type State
  ==========================*/
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Hoodies");
  const [subCategory, setSubCategory] = useState("Winterwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState([]);

  //======================
  // 5. APIS Product add
  //======================
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes)); // JSON.stringify => array لان سايز ده
      formData.append("color", JSON.stringify(color)); // JSON.stringify => array لان كالار ده

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/Product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/*================
        6. Upload Image
      ===================*/}
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={!image1 ? uploadArea : URL.createObjectURL(image1)}
              alt="upload-area"
              className="w-20 cursor-pointer"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              src={!image2 ? uploadArea : URL.createObjectURL(image2)}
              alt="upload-area"
              className="w-20 cursor-pointer"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              src={!image3 ? uploadArea : URL.createObjectURL(image3)}
              alt="upload-area"
              className="w-20 cursor-pointer"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              src={!image4 ? uploadArea : URL.createObjectURL(image4)}
              alt="upload-area"
              className="w-20 cursor-pointer"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      {/*================
        7. Inputs Field
      ===================*/}
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Write content here"
          required
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      {/*========================
        8. Product Type & Price
      ===========================*/}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Blazers">Blazers</option>
            <option value="Dresses">Dresses</option>
            <option value="Shirts">Shirts</option>
            <option value="Tops">Tops</option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Blouses">Blouses</option>
            <option value="Jackets">Jackets</option>
            <option value="Jeans">Jeans</option>
            <option value="Trousers">Trousers</option>
            <option value="Skirts">Skirts</option>
            <option value="Shorts">Shorts</option>
          </select>
        </div>

        <div>
          <p className="mb-2">sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Winterwear">Winterwear</option>
            <option value="Summerwear">Summerwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
            type="number"
            placeholder="600"
            className="w-full px-3 py-2 sm:w-[120px]"
          />
        </div>
      </div>
      {/*================
        9. Product Size
      ===================*/}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex flex-wrap gap-3">
          {availableSizes.map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/*=================
        10. Product Color
      ====================*/}
      <div>
        <p className="mb-2">Product Color</p>
        <div className="flex flex-wrap gap-3">
          {availableColors.map((item) => (
            <div
              key={item.value}
              onClick={() =>
                setColor((prev) =>
                  prev.includes(item.value)
                    ? prev.filter((c) => c !== item.value)
                    : [...prev, item.value]
                )
              }
            >
              <p
                className={`${
                  color.includes(item.value)
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } px-3 py-1 cursor-pointer`}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*=====================
        11. Add To Bestseller
      ========================*/}
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      {/*================
        12. Add Button
      ===================*/}
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
}

export default Add;
