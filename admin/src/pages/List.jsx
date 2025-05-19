import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [toastId, setToastId] = useState(null); // Track single loading toast

  const fetchList = async () => {
    if (loading) return; // Prevent multiple simultaneous fetches
    setLoading(true);

    const id = toast.loading("Loading list...", {
      toastId: "fetch-list-toast",
    }); // prevent duplicates
    setToastId(id);

    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
        toast.update("fetch-list-toast", {
          render: "List fetched successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update("fetch-list-toast", {
          render: "Error fetching list",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
      setLoading(false);
    } catch (error) {
      toast.update("fetch-list-toast", {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      console.error("Error fetching list:", error);
    }
  };

  const handleDelete = async (id) => {
    if (loading) return; // Prevent multiple simultaneous fetches
    setLoading(true);

    const toastId = toast.loading("Deleting...", {
      toastId: "delete-toast",
    });

    try {
      const response = await axios.delete(backendUrl + "/api/product/remove", {
        headers: { token },
        data: { id },
      });
      if (response.data.success) {
        setList((prevList) => prevList.filter((item) => item._id !== id));
        toast.update(toastId, {
          render: "Product deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(toastId, {
          render: "Error deleting product",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
      setLoading(false);
    } catch (error) {
      toast.update(toastId, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          {" "}
          <p className="mb-2 bg-green">All Products List</p>
          <div className="flex flex-col gap-2">
            {/* List Table Title */}
            <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 bg-gray-200 py-1 px-2 text-sm">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b className="text-center">Action</b>
            </div>
            {list.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 bg-gray-100 py-1 px-2 text-sm"
              >
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>
                  {currency}
                  {item.price}
                </p>
                <div className="flex gap-2 justify-center">
                  <button className="bg-gray-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-400 text-white px-2 py-1 rounded"
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default List;
