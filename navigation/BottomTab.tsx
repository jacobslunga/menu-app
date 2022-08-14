import React, { useContext, useEffect, useState, useRef } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../screens/Main/Home";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../constants/constants";
import MenuLists from "../screens/Main/MenuLists";
import Meals from "../screens/Main/Meals";
import { Dimensions, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { IUser } from "../util/Interfaces";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../context/Auth";
import { GET_LISTS_FOR_USER, GET_USER_BY_ID } from "../GraphQL/Queries/queries";
import * as Device from "expo-device";

const Tab = createMaterialTopTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function BottomTab() {
  const { user }: IUser = useContext(AuthContext);
  const {
    data: listData,
    loading: listLoading,
    refetch,
  } = useQuery(GET_LISTS_FOR_USER, {
    variables: {
      userId: user.id,
    },
  });

  if (listData) var { getListsForUser: lists } = listData;
  const myLists = listLoading ? null : lists;

  const { data: userData, loading: userLoading } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });
  if (userData) var { getUserById: apolloUser } = userData;

  const meals = userLoading ? null : apolloUser.meals;

  // Handle Notifications
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener: any = useRef();
  const responseListener: any = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function scheduleNotificationAsync(
    title: string,
    body: string,
    hour: number,
    minute: number
  ) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        vibrate: [0, 255, 255, 255],
      },
      trigger: {
        hour,
        minute,
      },
    });
  }

  useEffect(() => {
    if (!userLoading && !listLoading) {
      if (myLists.length === 0 && meals.length >= 7) {
        scheduleNotificationAsync(
          "Skapa din första Menü! 🌮🍔",
          "Du har 7 eller fler maträtter. Dags att skapa din första lista",
          12,
          30
        );
      }

      if (meals.length < 7) {
        scheduleNotificationAsync(
          "Lägg till fler maträtter! 🥗🍜",
          "Du måste ha 7 eller fler rätter för att skapa din första Menü",
          13,
          0
        );
      }

      if (meals.length >= 7 && myLists.length > 0) {
        scheduleNotificationAsync(
          "Glöm inte vad du ska äta idag!",
          "Gå in och kolla upp recept och att du har allt hemma",
          16,
          10
        );
      }
    }
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.bg,
          width: Dimensions.get("screen").width,
          shadowRadius: 5,
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowColor: "#000000",
          elevation: 4,
        },
        tabBarIndicatorStyle: { display: "none" },
        tabBarLabelStyle: {
          fontFamily: "tt-bold",
          textTransform: "none",
          fontSize: 12,
        },
      }}
      tabBarPosition="bottom"
    >
      <Tab.Screen
        name="MenuLists"
        component={MenuLists}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="thumb-tack"
                size={25}
                color={focused ? colors.green : "rgba(0,0,0,0.5)"}
              />
            );
          },
          title: "Listor",
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="home"
                size={25}
                color={focused ? colors.green : "rgba(0,0,0,0.5)"}
              />
            );
          },
          tabBarLabel: "Hem",
        }}
      />
      <Tab.Screen
        name="Meals"
        component={Meals}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="book"
                size={25}
                color={focused ? colors.green : "rgba(0,0,0,0.5)"}
              />
            );
          },
          tabBarLabel: "Rätter",
        }}
      />
    </Tab.Navigator>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
