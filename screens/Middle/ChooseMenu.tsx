import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext } from "react";
import { colors } from "../../constants/constants";
import { Header } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../context/Auth";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../GraphQL/Queries/queries";
import { REMOVE_MEAL } from "../../GraphQL/Mutations/mutations";
import { IMeal, IUser } from "../../util/Interfaces";
import { SparklesIcon } from "react-native-heroicons/outline";

export default function ChooseMenu({ navigation }: { navigation: any }) {
  const { user }: IUser = useContext(AuthContext);
  const {
    data: userData,
    loading: userLoading,
    refetch,
  } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });
  if (userData) var { getUserById: apolloUser } = userData;

  const meals: IMeal[] = userLoading ? null : apolloUser.meals;

  const [removeMeal] = useMutation(REMOVE_MEAL);

  return (
    <View
      style={{
        backgroundColor: colors.bg,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}
    >
      <Header
        containerStyle={{
          backgroundColor: colors.bg,
          height: "10%",
          position: "absolute",
          top: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
          zIndex: 100,
        }}
        centerComponent={{
          text: "Dina första måltider",
          style: {
            color: colors.black,
            fontFamily: "tt-bold",
            fontSize: 18,
          },
        }}
      />
      {userLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: "90%",
              width: Dimensions.get("window").width,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                width: Dimensions.get("screen").width,
                marginTop: 20,
                justifyContent: meals.length > 0 ? "center" : "flex-start",
                flexDirection: "column",
              }}
            >
              {meals.length > 0 && (
                <Text
                  style={{
                    fontFamily: "tt-bold",
                    fontSize: meals.length >= 10 ? 18 : 25,
                    marginBottom: 20,
                    marginTop: 10,
                  }}
                >
                  {meals.length >= 10
                    ? "Du har 10 eller fler maträtter"
                    : `${10 - meals.length} kvar`}
                </Text>
              )}
              {meals.length === 0 ? (
                <>
                  <Text style={{ fontFamily: "tt-bold", fontSize: 25 }}>
                    Du har inga maträtter än
                  </Text>
                  <TouchableOpacity
                    style={{
                      borderRadius: 35,
                      padding: 10,
                      width: "60%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors.yellow,
                      marginTop: 20,
                    }}
                    onPress={() => {
                      navigation.navigate("AddMeals");
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: "tt-bold",
                        fontSize: 16,
                      }}
                    >
                      Lägg till din första maträtt
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderRadius: 35,
                      padding: 10,
                      width: "60%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors.med_purp,
                      marginTop: 20,
                      flexDirection: "row",
                    }}
                    onPress={() => {
                      navigation.navigate("Inspiration");
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: "tt-bold",
                        fontSize: 16,
                      }}
                    >
                      Få inspiration
                    </Text>
                    <SparklesIcon
                      width={25}
                      height={25}
                      color={colors.white}
                      style={{ marginLeft: 5 }}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  {meals.map((meal: any, i: number) => (
                    <View
                      key={meal.mealId + String(i)}
                      style={{
                        width: "90%",
                        backgroundColor: colors.nice_beige,
                        padding: 10,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Text style={{ fontFamily: "tt-bold", fontSize: 16 }}>
                        {meal.title}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          removeMeal({
                            variables: {
                              userId: user.id,
                              mealId: meal.mealId,
                            },
                          }).then(() => {
                            refetch();
                          });
                        }}
                      >
                        <Feather name="trash-2" color="red" size={20} />
                      </TouchableOpacity>
                    </View>
                  ))}
                  <View
                    style={{
                      width: "90%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 20,
                      marginBottom: 200,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderRadius: 35,
                        padding: 10,
                        width: "45%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.yellow,
                      }}
                      onPress={() => {
                        navigation.navigate("AddMeals");
                      }}
                    >
                      <Text
                        style={{ color: colors.white, fontFamily: "tt-bold" }}
                      >
                        Lägg till
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderRadius: 35,
                        padding: 10,
                        width: "45%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.med_purp,
                        flexDirection: "row",
                      }}
                      onPress={() => {
                        navigation.navigate("Inspiration");
                      }}
                    >
                      <Text
                        style={{ color: colors.white, fontFamily: "tt-bold" }}
                      >
                        Inspiration
                      </Text>
                      <SparklesIcon
                        width={20}
                        height={20}
                        color={colors.white}
                        style={{ marginLeft: 5 }}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </>
      )}
      {meals.length > 0 && (
        <TouchableOpacity
          style={{
            width: "90%",
            padding: 10,
            borderRadius: 35,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.green,
            position: "absolute",
            bottom: "2%",
          }}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "BottomTab",
                },
              ],
            });
          }}
        >
          <Text style={{ color: colors.white, fontFamily: "tt-bold" }}>
            Fortsätt till appen
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
