import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";

import { GrCheckboxSelected } from "react-icons/gr";
import { categories } from "../utils/Data";
import { Loader } from "./index";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { storage } from "../Firebase.config";
import { saveItem } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getAllFoods } from "../utils/firebaseFunctions";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const UploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while Uploading image : Try Again");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image Uploaded Successfully !");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image Deleted Successfully !");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !category || !imageAsset || !calories || !price) {
        setFields(true);
        setMsg("Error : kindly fill all fields");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          quantity: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded Successfully");
        clearForm();
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      setFields(true);
      setMsg("Error while uploading info , Try Again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const clearForm = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory(null);
  };

  const fetchData = async () => {
    await getAllFoods()
      .then((data) => {
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: data,
        });
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="w-full min-h-screen  flex items-center justify-center my-4">
      <div className="w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-4  ">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800 "
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-200 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700 " />
          <input
            type="text"
            required
            value={title}
            placeholder="Enter a title ..."
            className="w-full h-full text-lg bg-transparent font-normal outline-none border-none placeholder:text-stone-400 text-textColor"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-full flex items-center gap-2 py-2 border-b-2">
          <GrCheckboxSelected className="text-xl text-gray-700 " />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full  p-2 rounded-md corsor-pointer text-textColor bg-primary text-lg"
          >
            <option value="other" className="bg-white">
              Select a category...
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-textColor placeholder:text-stone-400"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex items-center justify-center flex-col border-2 border-dotted border-gray-300 w-full h-full md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex  flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex  flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700 mt-4" />
                      <p className="text-gray-500 hover:text-gray-700 pb-4">
                        Click here to Upload{" "}
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={UploadImage}
                      className="w-0 h-0 "
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full ">
                    <img
                      src={imageAsset}
                      alt="no-item-pic"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out "
                      onClick={deleteImage}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              placeholder="No of calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-stone-400 text-textColor"
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-4 py-2 ">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter the price ..."
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-stone-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full ">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-400 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
