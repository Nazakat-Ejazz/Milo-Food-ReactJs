import React from "react";
import Delivery from "../img/delivery.png";
import heroBg from "../img/heroBg.png";
import { prodsDisplay as Data } from "../utils/Data.js";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 gap-2 md:grid-cols-2  w-full "
      id="home"
    >
      <div className="py-2  flex-1 flex flex-col items-start justify-center gap-4">
        <div className="flex items-center justify-center gap-2 bg-orange-200 p-2 rounded">
          <p className="text-base text-orange-400 font-semibold">
            Bike Delivery
          </p>
          <div className="w-7 h-7 md:w-9 md:h-9 rounded-full overflow-hidden bg-white">
            <img
              src={Delivery}
              className="w-full h-full object-cover font-bolder"
              alt="no-delivery-preview"
            />
          </div>
        </div>

        <p className="text-[2.5rem] font-bold tracking-wide text-headingColor px-4  md:px-0   lg:text-[4.5rem] lg:leading-[5rem]">
          The Fastest Delivery in
          <span className="text-orange-500 text-[3rem] lg:text-[5rem] pl-2">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor text-center md-text-left md:w-[80%] sm:w-[70%] sm:text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel , non ea
          voluptatum vitae tenetur delectus debitis distinctio! Maiores neceibus
          quaerat consetur amet iusto ea obcaecati quam eaque. Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Quaerat, nobis!
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-400   to-orange-600 w-full  md:w-auto text-white font-semibold px-3 py-2 rounded-lg hover:shadow-lg  transition-all ease-in-out duration-100"
        >
          Order Now!
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center   relative">
        <img
          src={heroBg}
          alt="no-hero-bg-preview"
          className="ml-auto lg:h-650 lg:w-auto h-420 w-full  "
        />

        <div className="w-full md:w-[80%] h-full md:h-[80%] lg-h-500 absolute md:top-20  top-0 left-0  flex items-center justify-center  py-2  gap-4 flex-wrap">
          {Data &&
            Data.map((item) => (
              <div
                key={item.id}
                className="lg:w-190 lg:min-w-[230px] lg:min-h-[200px] px-4 py-2 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center mt-4 lg:mt-0  "
              >
                <img
                  src={item.img}
                  alt="no-currew-homeContainer"
                  className="lg:w-40 w-20 -mt-8 lg:-mt-16 "
                />
                <p className="text-base lg:text-lg font-semibold text-textColor lg:mt-3 mt-2">
                  {item.name}
                </p>
                <p className="text-[12px] lg:text-sm text-light text-gray-500 font-semibold my-1 lg:my-3">
                  {item.desc}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span>
                  {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
