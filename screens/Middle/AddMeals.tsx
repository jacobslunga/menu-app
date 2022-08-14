import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../constants/constants";
import { NavigationScreenProp } from "react-navigation";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../context/Auth";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_MEAL } from "../../GraphQL/Mutations/mutations";
import { GET_ALL_MEAL, GET_USER_BY_ID } from "../../GraphQL/Queries/queries";
import { IMeal, IUser } from "../../util/Interfaces";

export default function AddMeals({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  let hasTitles: Array<string> = [];
  const { user }: IUser = useContext(AuthContext);

  const {
    refetch,
    data: userData,
    loading: userLoading,
  } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });
  if (userData) var { getUserById: apolloUser } = userData;
  const myMeals = userLoading ? null : apolloUser.meals;

  const { data: mealData, loading: mealLoading } = useQuery(GET_ALL_MEAL);
  if (mealData) var { getAllMeals: allMeals } = mealData;

  const [title, setTitle] = useState("");

  if (!userLoading) {
    for (var i = 0; i < myMeals.length; i++) {
      hasTitles.push(myMeals[i].title);
    }
  }

  const matches =
    userLoading || mealLoading
      ? null
      : allMeals.filter((meal: IMeal) => {
          if (title !== "") {
            if (meal.title.toLowerCase().includes(title.toLowerCase())) {
              return meal;
            }
          }
        });

  const [showLoading, setShowLoading] = useState(false);
  const [addMeal] = useMutation(ADD_MEAL, {
    update() {
      setShowLoading(true);
      refetch().then(() => {
        navigation.goBack();
        setShowLoading(false);
      });
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.bg,
          }}
        >
          {userLoading ? (
            <>
              <ActivityIndicator size="large" />
              <Text
                style={{
                  fontFamily: "tt-bold",
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                Laddar...
              </Text>
            </>
          ) : (
            <>
              <View
                style={{
                  position: "absolute",
                  width: Dimensions.get("screen").width,
                  height: "10%",
                  top: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: "5%",
                  zIndex: 100,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      zIndex: 100,
                      borderRadius: 99,
                      padding: 5,
                      backgroundColor: "rgba(0,0,0,0.1)",
                    }}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Feather color="#000" size={30} name="x" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: title ? colors.yellow : "rgba(0,0,0,0.1)",
                    borderRadius: 35,
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  disabled={!title}
                  onPress={() => {
                    addMeal({
                      variables: {
                        title,
                        userId: user.id,
                      },
                    });
                  }}
                >
                  <Text
                    style={{
                      color: title ? colors.white : "rgba(0,0,0,0.3)",
                      fontFamily: "tt-bold",
                      fontSize: 14,
                    }}
                  >
                    Lägg till
                  </Text>
                </TouchableOpacity>
              </View>
              {showLoading ? (
                <>
                  <ActivityIndicator size="large" />
                  <Text
                    style={{
                      fontFamily: "tt-bold",
                      fontSize: 18,
                      marginTop: 5,
                    }}
                  >
                    Laddar...
                  </Text>
                </>
              ) : (
                <>
                  <KeyboardAvoidingView
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors.bg,
                      width: "100%",
                      height: "90%",
                      position: "absolute",
                      bottom: 0,
                    }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <ScrollView
                      contentContainerStyle={{
                        flexGrow: 1,
                        width: Dimensions.get("screen").width,
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      keyboardShouldPersistTaps="handled"
                    >
                      <View
                        style={{
                          width: "90%",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: colors.black,
                            fontFamily: "tt-bold",
                            fontSize: 25,
                          }}
                        >
                          Namnge din maträtt
                        </Text>
                        <View
                          style={{
                            borderRadius: 10,
                            padding: 10,
                            width: "100%",
                            backgroundColor: colors.white,
                            shadowColor: "rgba(0,0,0,0.2)",
                            shadowOffset: {
                              width: 0,
                              height: 0,
                            },
                            shadowOpacity: 0.4,
                            shadowRadius: 10,
                            marginTop: 10,
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            marginBottom: 20,
                          }}
                        >
                          <TextInput
                            value={title}
                            onChangeText={(t) => setTitle(t)}
                            placeholder="Namn på din maträtt"
                            style={{
                              fontFamily: "tt-med",
                              width: "100%",
                              fontSize: 16,
                              borderBottomWidth: 0,
                              borderBottomColor: colors.brown,
                            }}
                            autoFocus
                            selectionColor={colors.black}
                          />
                          {matches && matches.length > 0 && (
                            <>
                              {matches.map((meal: IMeal, index: number) => (
                                <TouchableOpacity
                                  key={meal.title + String(index)}
                                  style={{
                                    marginTop: index === 0 ? 20 : 5,
                                    borderRadius: 10,
                                    padding: 7,
                                    backgroundColor: hasTitles.includes(
                                      meal.title
                                    )
                                      ? "rgba(0,0,0,0.1)"
                                      : colors.yellow,
                                    marginBottom: 20,
                                    shadowColor: hasTitles.includes(meal.title)
                                      ? "transparent"
                                      : "rgba(0,0,0,0.5)",
                                    shadowOffset: {
                                      width: 1,
                                      height: 1,
                                    },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    zIndex: 10000,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  onPress={() => {
                                    if (!hasTitles.includes(meal.title)) {
                                      setTitle(meal.title);
                                    }
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: hasTitles.includes(meal.title)
                                        ? "rgba(0,0,0,0.3)"
                                        : colors.white,
                                      fontFamily: "tt-bold",
                                    }}
                                  >
                                    {meal.title}
                                  </Text>
                                  {hasTitles.includes(meal.title) && (
                                    <Feather
                                      name="check-circle"
                                      color="rgba(0,0,0,0.3)"
                                      size={20}
                                      style={{ marginLeft: 5 }}
                                    />
                                  )}
                                </TouchableOpacity>
                              ))}
                            </>
                          )}
                        </View>
                      </View>
                    </ScrollView>
                  </KeyboardAvoidingView>
                </>
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
