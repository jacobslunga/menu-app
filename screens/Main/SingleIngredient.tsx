import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NavigationScreenProp } from "react-navigation";
import { RouteProp } from "@react-navigation/native";
import { IUser } from "../../util/Interfaces";
import { AuthContext } from "../../context/Auth";
import { colors } from "../../constants/constants";
import { Feather, Entypo } from "@expo/vector-icons";
import { Easing } from "react-native-reanimated";
import { MotiView, useAnimationState } from "moti";

export default function SingleIngredient({
  navigation,
  route,
}: {
  navigation: NavigationScreenProp<any, any>;
  route: RouteProp<{ params: { meal: string } }, "params">;
}) {
  interface IMeal {
    title: string;
    ingredients: [];
    recipe: [];
  }

  const [meals, setMeals] = useState<Array<IMeal>>([]);
  const [mealCount, setMealCount] = useState<number>(0);
  const { user }: IUser = useContext(AuthContext);

  const { meal } = route.params;
  const [page, setPage] = useState<number>(1);

  const animationState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0.9,
    },
    to: {
      opacity: 1,
      scale: 1.1,
    },
    expanded: {
      scale: 2,
    },
  });

  const getMealData = () => {
    fetch(
      `https://menu-python-server.herokuapp.com/api/v1/get_meals_from_tl/${meal
        .toLowerCase()
        .replace("&", "och")}/${page}`
    ).then(async (res) => {
      res.json().then((data) => {
        if (data) {
          setIsLoading(false);
          setMeals(data);
        }
      });
    });
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(
      `https://menu-python-server.herokuapp.com/api/v1/get_meal_count_from_tl/${meal}`
    ).then(async (res) => {
      res.json().then((data) => {
        if (data) {
          setMealCount(data);
        }
      });
    });

    getMealData();
  }, []);

  // const maxPage = Math.ceil(mealCount / meals.length);

  const [showIndex, setShowIndex] = useState<number | null>(null);

  const [showTitleInHeader, setShowTitleInHeader] = useState<boolean>(false);

  const animated = new Animated.Value(0);

  // First set up animation
  Animated.timing(animated, {
    toValue: 1,
    duration: 200,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.bg,
        }}
      >
        <View
          style={{
            height: "8%",
            position: "absolute",
            top: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: Dimensions.get("screen").width,
            zIndex: 100,
          }}
        >
          <View
            style={{
              width: "90%",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <MotiView
              style={{
                display:
                  meals.length > 0
                    ? showTitleInHeader
                      ? "none"
                      : "flex"
                    : "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              state={animationState}
            >
              <Text
                style={{
                  color: colors.black,
                  fontFamily: "tt-bold",
                  fontSize: 20,
                }}
              >
                Recept
              </Text>
            </MotiView>
            <MotiView
              style={{
                display:
                  meals.length > 0
                    ? showTitleInHeader
                      ? "flex"
                      : "none"
                    : "none",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.black,
                  fontFamily: "tt-bold",
                  fontSize: meal.length > 20 ? 15 : 20,
                  maxWidth: "100%",
                }}
              >
                {meal}
              </Text>
            </MotiView>
            <Pressable
              style={{
                borderRadius: 999,
                padding: 7,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Feather name="x" color={colors.black} size={30} />
            </Pressable>
          </View>
        </View>
        {isLoading ? (
          <>
            <ActivityIndicator size="large" />
            <Text style={{ fontFamily: "tt-reg", marginTop: 10 }}>
              Hämtar förslag på recept
            </Text>
          </>
        ) : (
          <>
            <View
              style={{
                height: "92%",
                width: Dimensions.get("screen").width,
                position: "absolute",
                bottom: 0,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: meals.length > 0 ? "flex-start" : "center",
                  width: Dimensions.get("screen").width,
                  flexDirection: "column",
                }}
                onScroll={(e) => {
                  e.nativeEvent.contentOffset.y > 40
                    ? setShowTitleInHeader(true)
                    : setShowTitleInHeader(false);
                }}
                scrollEventThrottle={5}
                showsVerticalScrollIndicator={false}
              >
                {meals.length > 0 ? (
                  <>
                    <Text
                      style={{
                        fontFamily: "tt-bold",
                        fontSize: 25,
                        width: "90%",
                        marginTop: 20,
                      }}
                    >
                      {meal}
                    </Text>
                    {meals.map((ingredient: IMeal, i: number) => (
                      <Pressable
                        key={ingredient.title + String(i)}
                        style={{
                          borderRadius: 10,
                          backgroundColor: colors.nice_beige,
                          width: "90%",
                          padding: 10,
                          marginTop: i === 0 ? 20 : 10,
                          marginBottom: i === meals.length - 1 ? 50 : 10,
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                        onPress={() => {
                          setShowIndex(i);
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "tt-semi",
                              fontSize: ingredient.title.length > 20 ? 14 : 16,
                              flex: 1,
                              maxWidth: "80%",
                            }}
                          >
                            {ingredient.title}
                          </Text>
                          <Pressable
                            onPress={() => {
                              if (showIndex === i) {
                                setShowIndex(null);
                              } else setShowIndex(i);
                            }}
                          >
                            <Animated.View
                              style={{
                                transform: [
                                  { rotate: showIndex === i ? spin : "0deg" },
                                ],
                              }}
                            >
                              <Feather
                                name="chevron-down"
                                color={colors.black}
                                size={30}
                              />
                            </Animated.View>
                          </Pressable>
                        </View>
                        {showIndex === i && (
                          <>
                            <Text
                              style={{
                                fontFamily: "tt-bold",
                                fontSize: 25,
                                marginTop: 10,
                              }}
                            >
                              Ingredienser
                            </Text>
                            {ingredient.ingredients.map(
                              (ingr: string, ingrIndex: number) => (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: ingrIndex === 0 ? 10 : 5,
                                  }}
                                  key={ingr + String(ingrIndex + i)}
                                >
                                  <Entypo
                                    name="dot-single"
                                    size={25}
                                    color="black"
                                    style={{ marginRight: 5 }}
                                  />
                                  <Text
                                    style={{
                                      fontFamily: "tt-reg",
                                    }}
                                  >
                                    {ingr}
                                  </Text>
                                </View>
                              )
                            )}
                            <Text
                              style={{
                                fontFamily: "tt-bold",
                                fontSize: 25,
                                marginTop: 20,
                              }}
                            >
                              Gör så här
                            </Text>
                            {ingredient.recipe.map(
                              (recipe: string, recipeIndex: number) => (
                                <View
                                  key={recipe + String(recipeIndex)}
                                  style={{
                                    marginTop: recipeIndex === 0 ? 10 : 5,
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    marginBottom: 5,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "tt-ex",
                                      fontSize: 13,
                                    }}
                                  >
                                    {recipeIndex + 1}.
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "tt-med",
                                      fontSize: 14,
                                      marginLeft: 10,
                                      maxWidth: "90%",
                                    }}
                                  >
                                    {recipe}
                                  </Text>
                                </View>
                              )
                            )}
                          </>
                        )}
                      </Pressable>
                    ))}
                    {/* {maxPage > page && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.black,
                          borderRadius: 10,
                          padding: 15,
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 100,
                          width: "80%",
                        }}
                        onPress={() => {
                          setIsLoading(true);
                          getMealData(page);
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "tt-bold",
                            fontSize: 16,
                            color: colors.white,
                          }}
                        >
                          Visa mer
                        </Text>
                      </TouchableOpacity>
                    )} */}
                  </>
                ) : (
                  <>
                    <Feather name="inbox" color="rgba(0,0,0,0.5)" size={120} />
                    <Text
                      style={{
                        fontFamily: "tt-semi",
                        fontSize: 18,
                        marginTop: 20,
                        marginBottom: 70,
                      }}
                    >
                      Inga resultat
                    </Text>
                  </>
                )}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
