import React, { useState, useEffect } from "react";
import {
  RowContainer,
  HomeContainer,
  CartContainer,
  MenuContainer,
  Footer,
} from "./index";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";

const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState();

  useEffect(() => {}, [scrollValue, foodItems, cartShow]);

  // console.log({ foodItems });
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      <HomeContainer />
      <section className="w-full  my-6">
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold capitalize relative text-headingColor text-2xl before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-300 to-orange-600 transition-all ease-in-out duration-100">
            Our Fresh & Healthy Fruits
          </p>
          <div className="hidden md:flex gap-3 items-center ">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronLeft
                className="text-lg text-white"
                onClick={() => setScrollValue(-200)}
              />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronRight
                className="text-lg text-white"
                onClick={() => setScrollValue(200)}
              />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((item) => item.category === "fruits")}
        />

        {/* Soft Drinks */}
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold capitalize relative text-headingColor text-2xl before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-300 to-orange-600 transition-all ease-in-out duration-100">
            Energetic and Chilled Drinks
          </p>
          <div className="hidden md:flex gap-3 items-center ">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronLeft
                className="text-lg text-white"
                onClick={() => setScrollValue(-200)}
              />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronRight
                className="text-lg text-white"
                onClick={() => setScrollValue(200)}
              />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((item) => item.category === "drinks")}
        />
      </section>
      <MenuContainer />

      {cartShow && <CartContainer />}
      <Footer />
    </div>
  );
};

export default MainContainer;
