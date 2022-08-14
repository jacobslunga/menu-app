import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Auth Pages
import Landing from "../screens/Auth/Landing";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";

// Main Pages & Modals
import BottomTab from "./BottomTab";
import ChooseMenu from "../screens/Middle/ChooseMenu";
import Welcome from "../screens/Middle/Welcome";
import { AuthContext } from "../context/Auth";
import AddMeals from "../screens/Middle/AddMeals";
import Profile from "../screens/Main/Profile";
import DeleteModal from "../screens/Main/Modals/DeleteModal";
import ShuffleList from "../screens/Main/Modals/ShuffleList";
import ChangeImageUrl from "../screens/Main/Modals/ChangeImageUrl";
import CreateList from "../screens/Main/Modals/CreateList";
import ProfileSettings from "../screens/Main/Modals/ProfileSettings";
import ChangeName from "../screens/Main/Modals/Settings/ChangeName";
import DeleteList from "../screens/Main/Modals/Lists/DeleteList";
import SetNewWeekList from "../screens/Main/Modals/SetNewWeekList";
import SingleMeal from "../screens/Main/Meals/SingleMeal";
import ChangeEmail from "../screens/Main/Modals/Settings/ChangeEmail";
import ChangePassword from "../screens/Main/Modals/Settings/ChangePassword";
import { IUser } from "../util/Interfaces";
import Ingredients from "../screens/Main/Ingredients";
import SingleIngredient from "../screens/Main/SingleIngredient";
import Inspiration from "../screens/Middle/Inspiration";
import ChangeBirthday from "../screens/Main/Modals/Settings/ChangeBirtday";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const { user }: IUser = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "BottomTab" : "Landing"}
        screenOptions={{ headerShown: false }}
      >
        {/* Auth */}
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ presentation: "fullScreenModal" }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        {/* Middle */}
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="ChooseMenu" component={ChooseMenu} />
        <Stack.Screen
          name="AddMeals"
          component={AddMeals}
          options={{ presentation: "fullScreenModal" }}
        />

        {/* Main */}
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Ingredients" component={Ingredients} />
        <Stack.Screen
          name="SingleIngredient"
          component={SingleIngredient}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="Inspiration"
          component={Inspiration}
          options={{ presentation: "fullScreenModal" }}
        />
        <Stack.Screen
          name="DeleteList"
          component={DeleteList}
          options={{ presentation: "transparentModal" }}
        />
        <Stack.Screen
          name="DeleteModal"
          component={DeleteModal}
          options={{ presentation: "transparentModal" }}
        />
        <Stack.Screen
          name="ShuffleList"
          component={ShuffleList}
          options={{ presentation: "fullScreenModal" }}
        />
        <Stack.Screen
          name="CreateList"
          component={CreateList}
          options={{ presentation: "transparentModal" }}
        />
        <Stack.Screen
          name="ChangeImageUrl"
          component={ChangeImageUrl}
          options={{ presentation: "fullScreenModal" }}
        />
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettings}
          options={{ presentation: "fullScreenModal" }}
        />
        <Stack.Screen
          name="SetNewWeekList"
          component={SetNewWeekList}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="ChangeName"
          component={ChangeName}
          options={{ presentation: "formSheet" }}
        />
        <Stack.Screen
          name="ChangeEmail"
          component={ChangeEmail}
          options={{ presentation: "formSheet" }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ presentation: "formSheet" }}
        />
        <Stack.Screen
          name="ChangeBirthday"
          component={ChangeBirthday}
          options={{ presentation: "formSheet" }}
        />
        <Stack.Screen
          name="SingleMeal"
          component={SingleMeal}
          options={{ presentation: "formSheet" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
