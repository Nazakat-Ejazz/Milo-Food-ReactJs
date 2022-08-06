// save new data

import {
  setDoc,
  doc,
  getDocs,
  query,
  orderBy,
  collection,
} from "firebase/firestore";
import { firestore } from "../Firebase.config";

// save new items
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// getAll items
export const getAllFoods = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};
