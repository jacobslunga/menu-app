import API from "./index";

export const getMeals = async (meal: string) => {
  await API.get(`/get_meals/${meal}`).then((data) => {
    console.log(data.data);
    return data.data;
  });
};
