/* ======================
  table of contents
=========================

  1. Imports
  2. Fetch List & APIS Product List
  3. Remove Product
  4. Update Stock Status
  5. List Table Title
  6. Product List
*/

//==============
// 1. Imports
//==============
import axios from "axios";
import { useEffect } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

function List({ token }) {
  const queryClient = useQueryClient();

  //====================================
  // 2. Fetch List & APIS Product List
  //====================================
  const {
    data: list = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product-list"],
    queryFn: async () => {
      try {
        const response = await axios.get(backendUrl + "/api/product/list");
        if (response.data.success) {
          return response.data.products;
        } else {
          toast.error(response.data.message);
          return [];
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  //=====================
  // 3. Remove Product
  //=====================
  const removeProductMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["product-list"]);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const removeProduct = (id) => {
    removeProductMutation.mutate(id);
  };

  //=========================
  // 4. Update Stock Status
  //=========================
  const updateStockMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const response = await axios.post(
        backendUrl + "/api/product/update-stock",
        { id, stockStatus: newStatus },
        { headers: { token } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Stock status updated");
        queryClient.invalidateQueries(["product-list"]);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("Failed to update stock status");
      console.log(error);
    },
  });

  const handleStockChange = (id, newStatus) => {
    updateStockMutation.mutate({ id, newStatus });
  };

  //===============================
  // JSX
  //===============================
  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products.</p>;

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/*====================
          5. List Table Title
        =======================*/}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Stock</b>
          <b className="text-center">Action</b>
        </div>

        {/*================
          6. Product List
        ===================*/}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img src={item.images[0]} alt="product-image" className="w-12" />
            <p>{item.name}</p>

            <p>{item.category}</p>
            <p>
              {item.price}
              {currency}
            </p>
            <select
              value={item.stockStatus}
              onChange={(e) => handleStockChange(item._id, e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="in stock">In Stock</option>
              <option value="out of stock">Out of Stock</option>
            </select>
            <button
              onClick={() => removeProduct(item._id)}
              disabled={removeProductMutation.isPending}
              className="px-3 py-1 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition"
            >
              {removeProductMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default List;
