import { createSlice } from "@reduxjs/toolkit";
import { getMeals } from "../api/get_meal_list";

const initialState = {
  meals: [],
};

export const mealListSlice = createSlice({
  name: "mealList",
  initialState,
  reducers: {
    getMealList: (state: any, action: any) => {
      try {
        const data = getMeals("pasta");
        console.log("It gets called");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const { getMealList } = mealListSlice.actions;
export default mealListSlice.reducer;
