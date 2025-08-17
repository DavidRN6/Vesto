/* ======================
  table of contents
=========================

  1. Imports
  2. Filter Category Function
  3. Filter Type Function
  4. Apply Filter
  5. Filter Products
  6. Lunch Filter Functions
  7. Filter Options
  8. Category Filter
  9. SubCategory Filter
  10. Right site
  11. Product Sort
  12. Map Products
*/

//==============
// 1. Imports
//==============
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { MdKeyboardArrowRight } from "react-icons/md";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";

function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const categories = [
    "Blazers",
    "Dresses",
    "Tops",
    "T-Shirts",
    "Blouses",
    "Jackets",
    "Jeans",
    "Trousers",
    "Skirts",
    "Shorts",
  ];

  //==============================
  // 2. Filter Category Function
  //==============================
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  //==========================
  // 3. Filter Type Function
  //==========================
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  //====================
  // 4. Apply Filter
  //====================

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  //=====================
  // 5. Filter Products
  //=====================
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  //============================
  // 6. Lunch Filter Functions
  //============================
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <section className="flex flex-col sm:flex-row gap-1 sm:gap-10  pt-4 sm:pt-7 lg:pt-10 border-t">
      {/*===================
        7. Filter Options
      ======================*/}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <span
            className={`text-2xl text-gray-400 sm:hidden ${
              showFilter ? "-rotate-90" : ""
            }`}
          >
            <MdKeyboardArrowRight />
          </span>
        </p>

        {/*====================
          8. Category Filter
        =======================*/}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 sm:gap-4 text-sm font-light text-gray-700">
            {categories.map((category, index) => (
              <p key={index} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={category}
                  onChange={toggleCategory}
                />{" "}
                {category}
              </p>
            ))}
          </div>
        </div>

        {/*=======================
          9. SubCategory Filter
        ==========================*/}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />{" "}
              Winterwear
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Summerwear"}
                onChange={toggleSubCategory}
              />{" "}
              Summerwear
            </p>
          </div>
        </div>
      </div>

      {/*=================
        10. Right site
      ====================*/}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/*=================
            11. Product Sort
          ====================*/}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Relavent</option>
            <option value="low-high">Low to high</option>
            <option value="high-low">High to low</option>
          </select>
        </div>

        {/*==================
          12. Map Products
        =====================*/}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.images}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Collection;
