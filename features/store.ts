import { configureStore } from "@reduxjs/toolkit";
import mealListReducer from "./mealList";

const store = configureStore({
  reducer: {
    mealList: mealListReducer,
  },
});

export default store;
