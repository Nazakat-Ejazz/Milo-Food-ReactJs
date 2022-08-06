import { Header, MainContainer, CreateContainer } from "./components/index";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFoods } from "./utils/firebaseFunctions";
import React, { useEffect } from "react";
import { actionType } from "./context/reducer";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    //console.log(getAllFoods());
    await getAllFoods()
      .then((data) => {
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: data,
        });
      })
      .then((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-8 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
