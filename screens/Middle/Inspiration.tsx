import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../constants/constants";
import { Feather } from "@expo/vector-icons";
import { NavigationScreenProp } from "react-navigation";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_MEAL } from "../../GraphQL/Mutations/mutations";
import { GET_USER_BY_ID } from "../../GraphQL/Queries/queries";
import { IUser } from "../../util/Interfaces";
import { AuthContext } from "../../context/Auth";

export default function Inspiration({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  const { user }: IUser = useContext(AuthContext);
  interface IMeal {
    title: string;
  }

  const { refetch } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });

  const [meals, setMeals] = useState<Array<IMeal>>([]);
  const [meal, setMeal] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [mealsSelected, setMealsSelected] = useState<Array<string>>([]);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [showMeals, setShowMeals] = useState<boolean>(false);

  const fetchMealsFromAPI = async (meal: string) => {
    setIsLoading(true);
    await fetch(
      `https://menu-python-server.herokuapp.com/api/v1/get_meal_list_from_tl/${meal}/1`
    ).then((res) => {
      res.json().then((data) => {
        if (data.length > 0) {
          setMeals(data);
          setNoResults(false);
          setShowMeals(true);
        } else {
          setNoResults(true);
          setShowMeals(true);
        }
        setIsLoading(false);
      });
    });
  };

  const [addMeal, { loading: addMealLoading }] = useMutation(ADD_MEAL, {
    update() {
      refetch();
    },
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
        {isLoading || addMealLoading ? (
          <>
            <ActivityIndicator size="large" />
            {isLoading && (
              <Text
                style={{ fontFamily: "tt-reg", marginTop: 20, fontSize: 18 }}
              >
                Hämtar resultat
              </Text>
            )}
            {addMealLoading && (
              <Text
                style={{ fontFamily: "tt-reg", marginTop: 20, fontSize: 18 }}
              >
                Lägger till maträtter
              </Text>
            )}
          </>
        ) : (
          <>
            <View
              style={{
                height: "8%",
                top: 0,
                position: "absolute",
                width: Dimensions.get("screen").width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
                backgroundColor: colors.bg,
                zIndex: 100,
              }}
            >
              <Pressable
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 7,
                  borderRadius: 999,
                  backgroundColor: "rgba(0,0,0,0.1)",
                  position: "absolute",
                  left: "2%",
                }}
                onPress={() => navigation.goBack()}
              >
                <Feather name="x" color={colors.black} size={30} />
              </Pressable>
              <Text
                style={{
                  fontFamily: "tt-bold",
                  fontSize: 20,
                  fontStyle: "italic",
                }}
              >
                Get Inspired
              </Text>
            </View>
            <KeyboardAvoidingView
              style={{
                position: "absolute",
                height: "82%",
                width: Dimensions.get("screen").width,
                bottom: "10%",
                flexDirection: "column",
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  width: Dimensions.get("screen").width,
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: meals.length > 0 ? "flex-start" : "center",
                }}
                keyboardShouldPersistTaps="handled"
              >
                {!showMeals ? (
                  <>
                    <View
                      style={{
                        flexDirection: "column",
                        alignContent: "flex-start",
                        justifyContent: "center",
                        width: "90%",
                      }}
                    >
                      <Text style={{ fontFamily: "tt-ex", fontSize: 25 }}>
                        Sök något för att utforska!
                      </Text>
                      <View
                        style={{
                          borderRadius: 35,
                          backgroundColor: colors.white,
                          marginTop: 10,
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.2,
                          shadowRadius: 1.41,
                          elevation: 2,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          value={meal}
                          onChangeText={(t) => setMeal(t)}
                          placeholder="Sök något generellt för att få fler resultat"
                          style={{
                            borderRadius: 35,
                            padding: 10,
                            fontFamily: "tt-reg",
                            width: "80%",
                          }}
                          autoFocus
                          selectionColor={colors.black}
                        />
                        <TouchableOpacity
                          style={{
                            borderTopRightRadius: 35,
                            borderBottomRightRadius: 35,
                            padding: 10,
                            backgroundColor:
                              meal !== "" ? colors.med_purp : "rgba(0,0,0,0)",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            zIndex: 1000,
                          }}
                          disabled={meal === ""}
                          onPress={() => {
                            fetchMealsFromAPI(meal);
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "tt-semi",
                              color:
                                meal !== "" ? colors.white : "rgba(0,0,0,0.3)",
                            }}
                          >
                            Sök
                          </Text>
                          <Feather
                            name="search"
                            size={20}
                            color={
                              meal !== "" ? colors.white : "rgba(0,0,0,0.3)"
                            }
                            style={{ marginLeft: 5 }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    {noResults ? (
                      <>
                        <Text style={{ fontFamily: "tt-semi", fontSize: 17 }}>
                          Inga resultat
                        </Text>
                        <Pressable
                          style={{
                            borderRadius: 999,
                            backgroundColor: colors.med_purp,
                            padding: 7,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 20,
                            width: "40%",
                          }}
                          onPress={() => {
                            setMeal("");
                            setShowMeals(false);
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "tt-med",
                              fontSize: 14,
                              color: colors.white,
                            }}
                          >
                            Sök igen
                          </Text>
                        </Pressable>
                      </>
                    ) : (
                      <>
                        {meals.map((meal: IMeal, i: number) => (
                          <Pressable
                            key={meal + String(i)}
                            style={{
                              backgroundColor: mealsSelected.includes(
                                meal.title
                              )
                                ? colors.nice_beige
                                : colors.bg,
                              shadowColor: mealsSelected.includes(meal.title)
                                ? "transparent"
                                : "rgba(0,0,0,1)",
                              shadowOffset: {
                                width: 0,
                                height: 1,
                              },
                              shadowOpacity: 0.2,
                              shadowRadius: 5,
                              elevation: 2,
                              padding: 10,
                              marginTop: i === 0 ? 30 : 10,
                              marginBottom: i === meals.length - 1 ? 50 : 10,
                              borderRadius: 10,
                              width: "90%",
                            }}
                            onPress={() => {
                              if (mealsSelected.includes(meal.title)) {
                                setMealsSelected((prev) =>
                                  prev.filter((i) => i !== meal.title)
                                );
                              } else {
                                setMealsSelected((prev) => [
                                  ...prev,
                                  meal.title,
                                ]);
                              }
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: mealsSelected.includes(meal.title)
                                  ? "tt-bold"
                                  : "tt-reg",
                                color: mealsSelected.includes(meal.title)
                                  ? colors.black
                                  : "rgba(0,0,0,0.7)",
                              }}
                            >
                              {meal.title}
                            </Text>
                          </Pressable>
                        ))}
                      </>
                    )}
                  </>
                )}
              </ScrollView>
            </KeyboardAvoidingView>
            <View
              style={{
                width: Dimensions.get("screen").width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 0,
                height: "10%",
                backgroundColor: colors.bg,
              }}
            >
              {meals.length > 0 && (
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      mealsSelected.length > 0
                        ? colors.green
                        : "rgba(0,0,0,0.1)",
                    borderRadius: 35,
                    width: "90%",
                    padding: 10,
                    alignItems: "center",
                  }}
                  disabled={!mealsSelected.length}
                  onPress={() => {
                    for (var i = 0; i < mealsSelected.length; i++) {
                      if (mealsSelected[i] !== "") {
                        addMeal({
                          variables: {
                            userId: user.id,
                            title: mealsSelected[i],
                          },
                        });
                      }
                    }
                    navigation.goBack();
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "tt-bold",
                      fontSize: 18,
                      color:
                        mealsSelected.length > 0
                          ? colors.white
                          : "rgba(0,0,0,0.3)",
                    }}
                  >
                    {mealsSelected.length > 1
                      ? "Lägg till maträtter"
                      : "Lägg till maträtt"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
