import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";

import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import { CartItem } from ".";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(1);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);

    setTotal(totalPrice);
  }, [total, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-8 right-0 w-full md:w-375 h-screen  drop-shadow-md flex flex-col z-[101] bg-red-200 rounded-t-lg border-[1px] border-slate-100 hover:bg-slate-100 justify-center"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl " />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Your Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear
          <RiRefreshFill />
        </motion.p>
      </div>
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-red-100 rounded-t-[2rem] flex flex-col cursor-pointer">
          <div className="w-full h-340 md:h-42 px-6 py-4 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  item={item}
                  key={item.id}
                  flag={flag}
                  setFlag={setFlag}
                />
              ))}
          </div>
          <div className="w-full flex-1 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2 mb-12">
            <div className="w-full flex items-center justify-between">
              <p className="text-textColor text-lg">Sub Total</p>
              <p className="text-textColor text-lg">
                ${parseFloat(total).toFixed(2)}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-textColor text-lg">Delivery</p>
              <p className="text-textColor text-lg">$5.21</p>
            </div>
            <div className="w-full border-b border-gray-50 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-textColor text-xl font-normal">Total</p>
              <p className="text-textColor text-xl font-normal">
                ${parseFloat(total + 5.21).toFixed(2)}
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-[50%] p-2 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-400 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
              >
                Check Out !
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-[70%] p-2 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-400 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
              >
                Login to Check Out !
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="no-emptyCart" className="w-300" />
          <p className="text-xl text-textColor font-semibold">
            Add items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
