import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../constants/constants";
import { AuthContext } from "../../context/Auth";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../GraphQL/Queries/queries";
import { Feather } from "@expo/vector-icons";
import { NavigationScreenProp } from "react-navigation";
import * as Haptics from "expo-haptics";
import { IMeal, IUser } from "../../util/Interfaces";
import { SparklesIcon } from "react-native-heroicons/outline";

export default function Meals({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  const [query, setQuery] = React.useState<string>("");

  const { user }: IUser = useContext(AuthContext);
  const { data: userData, loading: userLoading } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });
  if (userData) var { getUserById: apolloUser } = userData;
  const myMeals = userLoading ? null : apolloUser.meals;

  const filteredMeals = userLoading
    ? null
    : myMeals.filter((meal: IMeal) => {
        if (meal.title.toLowerCase().includes(query.toLocaleLowerCase())) {
          return meal;
        }
      });

  const [shadow, setShadow] = useState(false);

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
        {userLoading ? (
          <>
            <ActivityIndicator size="large" />
            <Text style={{ fontFamily: "tt-bold", fontSize: 18, marginTop: 5 }}>
              Laddar...
            </Text>
          </>
        ) : (
          <>
            <View
              style={{
                backgroundColor: colors.bg,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                position: "absolute",
                top: 0,
                width: Dimensions.get("screen").width,
                height: "15%",
                shadowColor: shadow ? "#000" : "transparent",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
                zIndex: 1000,
              }}
            >
              <Text style={{ fontFamily: "tt-bold", fontSize: 20 }}>
                Dina Maträtter
              </Text>
              <View
                style={{
                  width: "90%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: "2%",
                  backgroundColor: colors.white,
                  borderRadius: 35,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                }}
              >
                <TextInput
                  value={query}
                  onChangeText={(t) => setQuery(t)}
                  placeholder="Sök maträtter"
                  style={{
                    width: "90%",
                    padding: 10,
                    fontFamily: "tt-med",
                    fontSize: 15,
                  }}
                  selectionColor={colors.black}
                />
                {query !== "" && (
                  <TouchableOpacity
                    onPress={() => setQuery("")}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Feather name="x-circle" color={colors.black} size={20} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                height: "85%",
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
                showsVerticalScrollIndicator={false}
                onScroll={(e) => {
                  e.nativeEvent.contentOffset.y > 10
                    ? setShadow(true)
                    : setShadow(false);
                }}
                scrollEventThrottle={5}
                keyboardShouldPersistTaps="handled"
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: "5%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.green,
                      borderRadius: 35,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      marginBottom: 20,
                      width: "45%",
                      flexDirection: "row",
                    }}
                    onPress={() => {
                      Haptics.impactAsync();
                      navigation.navigate("AddMeals");
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: "tt-bold",
                        fontSize: 15,
                      }}
                    >
                      Lägg till maträtt
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.med_purp,
                      borderRadius: 35,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      marginBottom: 20,
                      width: "45%",
                      flexDirection: "row",
                    }}
                    onPress={() => {
                      Haptics.impactAsync();
                      navigation.navigate("Inspiration");
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: "tt-bold",
                        fontSize: 15,
                      }}
                    >
                      Bli inspirerad
                    </Text>
                    <SparklesIcon
                      width={20}
                      height={20}
                      color={colors.white}
                      style={{ marginLeft: 5 }}
                    />
                  </TouchableOpacity>
                </View>
                {filteredMeals.length > 0 ? (
                  <>
                    {filteredMeals.map((meal: IMeal, i: number) => (
                      <Pressable
                        key={meal.mealId + String(i)}
                        style={{
                          width: Dimensions.get("screen").width,
                          paddingHorizontal: "5%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 10,
                          marginBottom:
                            i === filteredMeals.length - 1 ? 50 : 10,
                          backgroundColor: colors.bg,
                          padding: 10,
                          borderBottomWidth: 0.3,
                          borderBottomColor: "rgba(0,0,0,0.3)",
                        }}
                        onPress={() => {
                          navigation.navigate("SingleIngredient", {
                            meal: meal.title,
                          });
                        }}
                      >
                        <Text
                          style={{
                            color: "rgba(0,0,0,0.5)",
                            fontFamily: "tt-med",
                            fontSize: 15,
                          }}
                        >
                          {i + 1}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "tt-med",
                            fontSize: 16,
                            maxWidth: "80%",
                            flex: 1,
                          }}
                        >
                          {meal.title}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            Haptics.impactAsync();
                            navigation.navigate("DeleteModal", {
                              mealId: meal.mealId,
                            });
                          }}
                        >
                          <Feather
                            name="trash-2"
                            color="rgba(0,0,0,0.5)"
                            size={20}
                          />
                        </TouchableOpacity>
                      </Pressable>
                    ))}
                  </>
                ) : (
                  <Text style={{ color: colors.black, fontFamily: "tt-bold" }}>
                    Kunde inte hitta några maträtter
                  </Text>
                )}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
