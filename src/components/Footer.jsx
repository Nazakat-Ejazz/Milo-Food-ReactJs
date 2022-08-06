import React from "react";

const Footer = () => {
  return (
    <footer class="w-full flex  flex-col md:flex-row items-baseline justify-between my-auto pb-5 bg-red-200">
      <div class="w-full md:w-[30%] flex flex-col items-center justify-center text-textColor ">
        <p className="px-12 py-2 ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et obcaecati
          quisquam id sit omnis explicabo voluptate aut placeat, soluta, nisi ea
          magni facere, itaque incidunt modi? Magni, et voluptatum dolorem.
        </p>

        <p className="px-12 py-2 text-sm text-red-400">
          This project is created to showcase a skill.
        </p>
      </div>
      <div class="w-full md:w-[30%] flex flex-col items-center justify-center py-auto gap-2 grow text-textColor ">
        <h4 className="text-red-400 underline mt-8 font-semibold ">
          Open Hours
        </h4>
        <ul class="flex flex-col items-center justify-center gap-2">
          <li class="flex justify-content-between">
            <span className="px-2 text-semibold">Monday</span>
            <span className="px-2 text-semibold">9:00 - 24:00</span>
          </li>
          <li class="flex justify-content-between">
            <span className="px-2 text-semibold">Tuesday</span>
            <span className="px-2 text-semibold">9:00 - 24:00</span>
          </li>
          <li class="flex justify-content-between">
            <span className="px-2 text-semibold">Wednesday</span>
            <span className="px-2 text-semibold">9:00 - 24:00</span>
          </li>
          <li class="flex justify-content-between">
            <span className="px-2 text-semibold">Thursday</span>
            <span className="px-2 text-semibold">9:00 - 24:00</span>
          </li>
          <li class="flex justify-content-between">
            <span className="px-2 text-semibold">Friday</span>
            <span className="px-2 text-semibold">9:00 - 02:00</span>
          </li>
          <li class="flex justify-content-between">
            <span className="px-2 text-semibold">Saturday</span>
            <span className="px-2 text-semibold">9:00 - 02:00</span>
          </li>
          <li class="flex justify-content-between">
            <span className="px-2 text-semibold">Sunday</span>
            <span className="px-2 text-semibold">9:00 - 02:00</span>
          </li>
        </ul>
      </div>

      <div className="w-full md:w-[30%] flex flex-col gap-4 items-center  justify-center px-12 py-2">
        <h4 className="mt-8 md:my-2 text-center text-semibold text-red-400 underline  font-semibold ">
          Newsletter
        </h4>
        <p className="py-2 text-textColor text-center w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipisicing
        </p>
        <form className="form-group w-full flex flex-col items-center justify-center">
          <div>
            <input
              type="email"
              placeholder="Enter your email ..."
              className="w-full outline-none placeholder-textColor text-red-500 border-2 border-gray-100 bg-slate-50 px-4 py-2 rounded-lg mr-4"
            />
          </div>
          <button
            type="submit"
            className="w-[50%] p-2 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-400 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
