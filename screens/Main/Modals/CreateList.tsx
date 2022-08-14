import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import { NavigationScreenProp } from "react-navigation";
import { RouteProp } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_LIST_FROM_MEALS } from "../../../GraphQL/Mutations/mutations";
import { colors } from "../../../constants/constants";
import { AuthContext } from "../../../context/Auth";
import { Feather } from "@expo/vector-icons";
import {
  GET_LISTS_FOR_USER,
  GET_USER_BY_ID,
} from "../../../GraphQL/Queries/queries";
import { Input } from "react-native-elements";
import { IUser } from "../../../util/Interfaces";

export default function CreateList({
  navigation,
  route,
}: {
  navigation: NavigationScreenProp<any, any>;
  route: RouteProp<
    {
      params: {
        mealId1: string;
        mealId2: string;
        mealId3: string;
        mealId4: string;
        mealId5: string;
        mealId6: string;
        mealId7: string;
        shuffledList: Array<any>;
        shuffledLoading: boolean;
      };
    },
    "params"
  >;
}) {
  const {
    mealId1,
    mealId2,
    mealId3,
    mealId4,
    mealId5,
    mealId6,
    mealId7,
    shuffledList,
    shuffledLoading,
  } = route.params;
  const [title, setTitle] = React.useState<string>("");
  const { user }: IUser = useContext(AuthContext);
  const { refetch: userRefetch } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });
  const { refetch } = useQuery(GET_LISTS_FOR_USER, {
    variables: {
      userId: user.id,
    },
  });

  const { data: listsData, loading: listsLoading } = useQuery(
    GET_LISTS_FOR_USER,
    {
      variables: {
        userId: user.id,
      },
    }
  );
  if (listsData) var { getListsForUser: myLists } = listsData;

  const [createListFromMeals] = useMutation(CREATE_LIST_FROM_MEALS);

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
          flexDirection: "column",
          backgroundColor: colors.bg,
        }}
      >
        {shuffledLoading || listsLoading ? (
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
                Skapa en ny lista
              </Text>
            </View>
            <KeyboardAvoidingView
              style={{
                position: "absolute",
                bottom: 0,
                height: "90%",
                width: Dimensions.get("screen").width,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  width: Dimensions.get("screen").width,
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <Input
                  value={title}
                  onChangeText={(t) => setTitle(t)}
                  placeholder="Listans namn"
                  style={{ fontFamily: "tt-med" }}
                  autoCompleteType="cc-csc"
                  autoFocus
                  containerStyle={{ width: "90%" }}
                  selectionColor={colors.black}
                  rightIcon={
                    title ? (
                      <>
                        <TouchableOpacity
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onPress={() => setTitle("")}
                        >
                          <Feather
                            name="x-circle"
                            color={colors.black}
                            size={25}
                          />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <></>
                    )
                  }
                />
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
              <TouchableOpacity
                style={{
                  backgroundColor: title ? colors.green : "rgba(0,0,0,0.1)",
                  padding: 10,
                  width: "90%",
                  borderRadius: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
                disabled={!title}
                onPress={() => {
                  createListFromMeals({
                    variables: {
                      title,
                      userId: user.id,
                      mealId1,
                      mealId2,
                      mealId3,
                      mealId4,
                      mealId5,
                      mealId6,
                      mealId7,
                    },
                  }).then(() => {
                    refetch();
                    userRefetch();
                    if (myLists.length === 0) {
                      navigation.navigate("Home");
                    } else {
                      navigation.navigate("MenuLists");
                    }
                  });
                }}
              >
                <Text
                  style={{
                    color: title ? colors.white : "rgba(0,0,0,0.3)",
                    fontFamily: "tt-bold",
                    fontSize: 18,
                  }}
                >
                  Skapa lista
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
