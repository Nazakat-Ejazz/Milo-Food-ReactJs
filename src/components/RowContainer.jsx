import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  //console.log("Inside RowContainer ", data);
  const rowContainer = useRef();
  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });

    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft =
      rowContainer.current.scrollLeft + scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-4 my-12 bg-gray-100 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none "
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-300 h-[270px] min-w-[300px] md:w-300 md:min-w-[300px] my-12 bg-red-50 rounded-lg p-2  shadow-md backdrop-blur-lg hover:drop-shadow-md cursor-pointer bg-cardOverlay flex flex-col  justify-between"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.3 }}
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
              >
                <img
                  src={item?.imageURL}
                  alt="no-item-pic"
                  className="w-40 h-full  object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                div
                className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-md mr-4"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white " />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end pr-4">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {item?.calories} calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">${item?.price}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <p className="font-semibold text-red-500 text-2xl">
            Sorry! NO items Available
          </p>
          <img
            src={NotFound}
            alt=""
            className="h-420 border-spacing-4 border border-slate-200 "
          />
        </div>
      )}
    </div>
  );
};

export default RowContainer;
