import React from "react";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { BsBasket3Fill } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { MdAdd, MdLogout, MdOutlineWorkOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { app } from "../Firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useState } from "react";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({ type: actionType.SET_USER, user: providerData[0] });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  // logout method
  const logout = () => {
    // hide menu
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  // show cart
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  // render section
  return (
    <header className="w-screen z-50 fixed bg-red-100 px-4 md:p-6 md:py-2 md:px-16">
      {/* for screens -> desktop , tablet */}
      <div className="hidden md:flex w-full h-full  items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-7 object-cover" src={Logo} alt="no-logo" />
          <p className="text-gray-500 text-xl font-bold">Milo Foods</p>
        </Link>

        <div className="flex  items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            eixt={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center "
            onClick={showCart}
          >
            <BsBasket3Fill className="text-textColor hover:text-headingColor text-2xl  ml-8 cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer drop-shadow-xl rounded-full"
              src={user ? user.photoURL : Avatar}
              alt="no-avatar"
              onClick={login}
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-35 lg:w-44  bg-primary shadow-xl rounded-lg absolute flex flex-col px-3 py-2 top-16 right-24 lg:right-8 lg:top-12"
              >
                {user && user.email === "nazakatejaz.work@gmail.com" && (
                  <Link to={"/createItem"} onClick={() => setIsMenu(false)}>
                    <p className="px-4 py-2  flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base hover:rounded-full">
                      <MdAdd />
                      New Item
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base hover:rounded-full"
                  onClick={logout}
                >
                  {" "}
                  <MdLogout />
                  Logout
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* for screens -> mobiles */}
      <div className="flex items-center justify-between md:hidden w-full h-full bg-red-100 mt-3">
        <div
          className="relative flex items-center justify-center "
          onClick={showCart}
        >
          <BsBasket3Fill className="text-textColor hover:text-headingColor text-2xl   cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMenu(false)}
        >
          <img className="w-7 object-cover" src={Logo} alt="no-logo" />
          <p className="text-headingColor text-xl font-bold">Milo</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer drop-shadow-xl rounded-full"
            src={user ? user.photoURL : Avatar}
            alt="no-avatar"
            onClick={login}
          />

          {isMenu && (
            <div className="w-40 bg-primary shadow-xl rounded-lg absolute flex flex-col px-3 py-2 top-16 right-8 ">
              {user && user.email === "nazakatejaz.work@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-stone-500 text-base hover:rounded-full"
                    onClick={() => setIsMenu(false)}
                  >
                    <MdAdd />
                    New Item
                  </p>
                </Link>
              )}
              <ul className="flex flex-col gap-2">
                <li
                  className="flex items-center gap-3 text-base text-stone-500 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:rounded-full hover:bg-slate-200 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <AiOutlineHome />
                  Home
                </li>
                <li
                  className="flex items-center gap-3 text-base text-stone-500 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:rounded-full hover:bg-slate-200 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <AiOutlineMenu />
                  Menu
                </li>
                <li
                  className="flex items-center gap-3 text-base text-stone-500 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:rounded-full hover:bg-slate-200 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <AiOutlineInfoCircle />
                  About Us
                </li>
                <li
                  className="flex items-center gap-3 text-base text-stone-500 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:rounded-full hover:bg-slate-200 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <MdOutlineWorkOutline />
                  Service
                </li>
              </ul>
              <p
                className="px-4 py-2 flex items-center gap-3 cursor-pointer bg-stone-300 hover:bg-slate-300 transition-all duration-100 ease-in-out text-stone-500 text-base rounded hover:rounded-full mt-1"
                onClick={logout}
              >
                {" "}
                <MdLogout />
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
