import React, { useState, useEffect } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/Data";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { RowContainer } from "./index";

const MenuContainer = () => {
  const [filter, setfilter] = useState("chicken");
  const [{ foodItems }, dispatch] = useStateValue();

  useEffect(() => {}, [filter]);
  return (
    <section className="w-full  my-6" id="menu">
      <div
        className="w-full flex flex-col items-center justify-center"
        id="menuContainer"
      >
        <p className="font-semibold capitalize relative text-headingColor text-2xl before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-300 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          What we serve
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-4 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((cat) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={cat.id}
                className={`group ${
                  filter === cat.urlParamName ? "bg-red-500" : "bg-red-50"
                } w-28 min-w-[100px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-4 items-center justify-center hover:bg-red-500 `}
                onClick={() => setfilter(cat.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    filter === cat.urlParamName ? "bg-yellow-400" : "bg-red-500"
                  }  hover group-hover:bg-red-100 flex items-center justify-center`}
                >
                  <IoFastFood className="text-white text-xl group-hover:text-red-700 " />
                </div>
                <p
                  className={`text-sm
                     ${
                       filter === cat.urlParamName
                         ? "text-white font-semibold"
                         : "text-red-500"
                     } 
                  group-hover:text-slate-100`}
                >
                  {cat.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
