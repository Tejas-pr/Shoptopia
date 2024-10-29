import { useState } from "react";
import upload_area from "../assets/upload_area.svg";
import { MdAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(upload_area);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    const product = { ...productDetails };
    const formData = new FormData();
    formData.append("product", image);

    try {
      // Upload image
      const uploadResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/upload`, {
        method: "POST",
        body: formData,
      });
      const responseData = await uploadResponse.json();

      if (responseData.success) {
        product.image = responseData.image_url;

        // Add product
        const addProductResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/add-product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
        const result = await addProductResponse.json();

        result.success
          ? toast.success("Product added successfully")
          : toast.error("Product not added");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred while adding the product.");
    }
  };

  return (
    <>
      <ToastContainer autoClose={1200}/>
      <div className="p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7">
        <div className="mb-3">
          <h4 className="bold-18 pb-2">Product title:</h4>
          <input
            type="text"
            name="name"
            placeholder="Type here ..."
            value={productDetails.name}
            onChange={changeHandler}
            className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
          />
        </div>

        <div className="mb-3">
          <h4 className="bold-18 pb-2">Price:</h4>
          <input
            type="text"
            name="old_price"
            placeholder="Type here ..."
            value={productDetails.old_price}
            onChange={changeHandler}
            className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
          />
        </div>

        <div className="mb-3">
          <h4 className="bold-18 pb-2">Offer Price:</h4>
          <input
            type="text"
            name="new_price"
            placeholder="Type here ..."
            value={productDetails.new_price}
            onChange={changeHandler}
            className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
          />
        </div>

        <div className="mb-3 flex items-center gap-x-4">
          <h4 className="bold-18 pb-2">Product Category:</h4>
          <select
            name="category"
            value={productDetails.category}
            onChange={changeHandler}
            className="bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none"
          >
            <option value="">Choose Category</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div>
          <label htmlFor="file-input">
            <img
              src={imagePreview}
              alt="Upload"
              className="rounded-sm w-20 inline-block hover:cursor-pointer"
            />
          </label>
          <input
            type="file"
            name="image"
            id="file-input"
            onChange={imageHandler}
            hidden
            className="bg-primary max-w-80 w-full py-3 px-4"
          />
        </div>

        <button
          onClick={addProduct}
          className="btn_dark_rounded mt-4 flexCenter gap-x-1"
        >
          <MdAdd />
          Add Product
        </button>
      </div>
    </>
  );
};

export default AddProduct;
