import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

let items = [];

const CartItem = ({ item, setFlag, flag }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [{ cartItems }, dispatch] = useStateValue();

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  const updateQuantity = (action, id) => {
    if (action === "inc") {
      setQuantity(quantity + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.quantity += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      if (quantity === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQuantity(quantity - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.quantity -= 1;
            setFlag(flag + 1);
          }
        });

        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [quantity, items]);

  return (
    <div>
      <div className="w-full p-1 px-2 rounded-lg bg-red-200 flex items-center gap-2 cursor-pointer">
        <img
          src={item?.imageURL}
          alt="no-cartItem-preview"
          className="w-20 h-20 max-w[60px] rounded-full object-contain"
        />
        <div className="flex flex-col gap-2">
          <p className="text-base text-textColor">{item?.title}</p>
          <p className="text-sm block text-red-500 font-semibold">
            {(parseFloat(item?.price) * quantity).toFixed(2)}
          </p>
        </div>

        <div className="group flex items-center gap-2 ml-auto cursor-pointer px-2 text-textColor my-auto">
          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQuantity("dec", item?.id)}
          >
            <BiMinus className="text-textColor" />
          </motion.div>
          <p className="w-5 h-5 rounded-sm bg-red-100 text-textColor flex items-center justify-center">
            {item.quantity}
          </p>
          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQuantity("inc", item?.id)}
          >
            <BiPlus className="text-textColor" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
