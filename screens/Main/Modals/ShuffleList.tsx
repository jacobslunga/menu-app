import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { colors } from "../../../constants/constants";
import { useQuery } from "@apollo/client";
import {
  GET_USER_BY_ID,
  SHUFFLE_USER_LIST,
} from "../../../GraphQL/Queries/queries";
import { AuthContext } from "../../../context/Auth";
import { Feather } from "@expo/vector-icons";
import { NavigationScreenProp } from "react-navigation";
import { IUser } from "../../../util/Interfaces";

export default function ShuffleList({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  const [mealId1, setMealId1] = React.useState("");
  const [mealId2, setMealId2] = React.useState("");
  const [mealId3, setMealId3] = React.useState("");
  const [mealId4, setMealId4] = React.useState("");
  const [mealId5, setMealId5] = React.useState("");
  const [mealId6, setMealId6] = React.useState("");
  const [mealId7, setMealId7] = React.useState("");

  const { user }: IUser = useContext(AuthContext);

  const {
    data: shuffleData,
    loading: shuffleLoading,
    refetch,
    error,
  } = useQuery(SHUFFLE_USER_LIST, {
    variables: {
      userId: user.id,
    },
  });
  if (shuffleData) var { shuffleUserList: shuffledList } = shuffleData;

  const setMealIds = async () => {
    if (shuffledList && !shuffleLoading) {
      for (var i = 0; i <= shuffledList.length - 1; i++) {
        switch (i) {
          case 0:
            setMealId1(shuffledList[i].mealId);
          case 1:
            setMealId2(shuffledList[i].mealId);
          case 2:
            setMealId3(shuffledList[i].mealId);
          case 3:
            setMealId4(shuffledList[i].mealId);
          case 4:
            setMealId5(shuffledList[i].mealId);
          case 5:
            setMealId6(shuffledList[i].mealId);
          case 6:
            setMealId7(shuffledList[i].mealId);
        }
      }
    }
  };

  useEffect(() => {
    setMealIds();
  }, [shuffledList]);

  // console.log("MEAL 1 ------------", mealId1, " -----------");
  // console.log("MEAL 2 ------------", mealId2, " -----------");
  // console.log("MEAL 3 ------------", mealId3, " -----------");
  // console.log("MEAL 4 ------------", mealId4, " -----------");
  // console.log("MEAL 5 ------------", mealId5, " -----------");
  // console.log("MEAL 6 ------------", mealId6, " -----------");
  // console.log("MEAL 7 ------------", mealId7, " -----------");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.bg,
          height: Dimensions.get("screen").height,
          width: Dimensions.get("screen").width,
        }}
      >
        {shuffleLoading ? (
          <>
            <ActivityIndicator size="large" />
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
                justifyContent: "space-evenly",
                zIndex: 100,
              }}
            >
              <TouchableOpacity
                style={{
                  zIndex: 100,
                  borderRadius: 99,
                  padding: 5,
                  backgroundColor: "rgba(0,0,0,0.1)",
                  position: "absolute",
                  left: "2%",
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Feather color="#000" size={30} name="x" />
              </TouchableOpacity>
              <Text style={{ fontFamily: "tt-ex", fontSize: 18 }}>
                Shuffla en ny lista
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                height: "90%",
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
                keyboardShouldPersistTaps="handled"
              >
                {shuffledList.map((meal: any, dayIndex: number) => (
                  <View
                    key={meal.mealId + String(dayIndex)}
                    style={{
                      width: Dimensions.get("screen").width,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: colors.bg,
                      padding: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "rgba(0,0,0,0.7)",
                        fontFamily: "tt-reg",
                      }}
                    >
                      {meal.day}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "tt-semi",
                        fontSize: 16,
                        flex: 1,
                        maxWidth: "80%",
                      }}
                    >
                      {meal.title}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View
                style={{
                  width: Dimensions.get("screen").width,
                  position: "absolute",
                  bottom: "10%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 35,
                    padding: 10,
                    backgroundColor: colors.green,
                    width: "40%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    refetch();
                    setMealIds();
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: "tt-bold",
                      fontSize: 16,
                    }}
                  >
                    Shuffla igen
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 35,
                    padding: 10,
                    backgroundColor: colors.yellow,
                    width: "40%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("CreateList", {
                      mealId1,
                      mealId2,
                      mealId3,
                      mealId4,
                      mealId5,
                      mealId6,
                      mealId7,
                      shuffledList,
                      shuffleLoading,
                    });
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: "tt-bold",
                      fontSize: 16,
                    }}
                  >
                    Spara lista
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
