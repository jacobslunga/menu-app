import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { NavigationScreenProp } from "react-navigation";
import { RouteProp } from "@react-navigation/native";
import { AuthContext } from "../../../context/Auth";
import { useQuery } from "@apollo/client";
import { GET_MEAL_BY_ID } from "../../../GraphQL/Queries/queries";
import { colors } from "../../../constants/constants";
import { Feather } from "@expo/vector-icons";
import { RECIPES } from "../../../config";
import * as WebBrowser from "expo-web-browser";

export default function SingleMeal({
  navigation,
  route,
}: {
  navigation: NavigationScreenProp<any, any>;
  route: RouteProp<{ params: { mealId: string } }, "params">;
}) {
  const { user }: any = useContext(AuthContext);
  const { mealId } = route.params;

  const { data: mealData, loading: mealLoading } = useQuery(GET_MEAL_BY_ID, {
    variables: {
      mealId,
    },
  });
  if (mealData) var { getMealById: meal } = mealData;

  const mealLinks: any = mealLoading
    ? null
    : RECIPES.find((recipe) =>
        recipe.title.toLowerCase().includes(meal.title.toLowerCase())
      );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {mealLoading ? (
          <></>
        ) : (
          <>
            <View
              style={{
                width: Dimensions.get("screen").width,
                height: "10%",
                position: "absolute",
                top: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "transparent",
                paddingHorizontal: "2%",
                zIndex: 100,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 7,
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.white,
                }}
                onPress={() => navigation.goBack()}
              >
                <Feather name="x" color={colors.black} size={30} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                height: "100%",
                width: Dimensions.get("screen").width,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  width: Dimensions.get("screen").width,
                }}
                scrollEventThrottle={5}
                showsVerticalScrollIndicator={false}
              >
                <View
                  style={{
                    height: 400,
                    width: Dimensions.get("screen").width,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: mealLinks.imageUrl }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      backgroundColor: colors.black,
                      opacity: 0.4,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: "tt-bold",
                      fontSize: meal.title.length > 25 ? 45 : 35,
                      color: colors.white,
                    }}
                  >
                    {meal.title}
                  </Text>
                </View>
                <View
                  style={{
                    width: Dimensions.get("screen").width - 20,
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingHorizontal: "5%",
                    marginTop: 40,
                    marginBottom: 200,
                    backgroundColor: colors.nice_beige,
                    borderRadius: 10,
                    padding: 10,
                    shadowColor: "rgba(0,0,0,0.5)",
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "tt-semi",
                      fontSize: 25,
                      textDecorationLine: "underline",
                    }}
                  >
                    Länkar till recept
                  </Text>
                  {mealLinks.recipes.map((recipe: any, i: number) => (
                    <TouchableOpacity
                      key={recipe + String(i)}
                      style={{
                        width: "100%",
                        marginBottom: i === mealLinks.length - 1 ? 50 : 10,
                        marginTop: i === 0 ? 20 : 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                      onPress={() => {
                        WebBrowser.openBrowserAsync(recipe);
                      }}
                    >
                      <Feather name="link" color="rgba(0,0,0,0.5)" size={20} />
                      <Text
                        style={{
                          fontFamily: "tt-reg",
                          textDecorationLine: "underline",
                          marginLeft: 5,
                        }}
                      >
                        {recipe}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
