import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/Auth";
import { useMutation, useQuery } from "@apollo/client";
import { GET_LISTS_FOR_USER } from "../../../GraphQL/Queries/queries";
import { colors } from "../../../constants/constants";
import { Feather } from "@expo/vector-icons";
import { NavigationScreenProp } from "react-navigation";
import {
  SET_IS_CURRENT,
  SET_IS_NOT_CURRENT,
} from "../../../GraphQL/Mutations/mutations";
import { weekNumber } from "../../../util/weekNumber";
import { IUser } from "../../../util/Interfaces";
import moment from "moment";

export default function SetNewWeekList({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  const date = new Date();
  const week = moment(date).isoWeek();

  const [listId, setListId] = useState("");
  const { user }: IUser = useContext(AuthContext);
  const {
    data: listsData,
    loading: listsLoading,
    refetch,
  } = useQuery(GET_LISTS_FOR_USER, {
    variables: {
      userId: user.id,
    },
  });
  if (listsData) var { getListsForUser: lists } = listsData;

  const [setIsCurrent] = useMutation(SET_IS_CURRENT);
  const [setIsNotCurrent] = useMutation(SET_IS_NOT_CURRENT);

  const thereIsCurrent = listsLoading
    ? null
    : lists.find((list: any) => list.isCurrent && list.currentWeek === week);

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
        {listsLoading ? (
          <>
            <ActivityIndicator size="large" />
          </>
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
                backgroundColor: colors.bg,
                paddingHorizontal: "2%",
                zIndex: 1000,
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 999,
                  padding: 7,
                  backgroundColor: "rgba(0,0,0,0.1)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Feather name="x" color={colors.black} size={30} />
              </TouchableOpacity>
              <Text style={{ fontFamily: "tt-bold", fontSize: 20 }}>
                Byt lista
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: 35,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: listId ? colors.blue : "rgba(0,0,0,0.1)",
                  width: "20%",
                }}
                onPress={() => {
                  setIsNotCurrent({
                    variables: {
                      listId: thereIsCurrent.listId,
                    },
                  }).then(() => {
                    setIsCurrent({
                      variables: {
                        listId,
                        week,
                      },
                    }).then(() => {
                      refetch().then(() => {
                        navigation.goBack();
                      });
                    });
                  });
                }}
                disabled={!listId}
              >
                <Text
                  style={{
                    color: listId ? colors.white : "rgba(0,0,0,0.3)",
                    fontFamily: "tt-semi",
                  }}
                >
                  Klar
                </Text>
              </TouchableOpacity>
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
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  width: Dimensions.get("screen").width,
                }}
                stickyHeaderIndices={[0]}
              >
                <View
                  style={{
                    height: 30,
                    width: "100%",
                    paddingHorizontal: "2%",
                    backgroundColor: "rgba(252,248,232,1)",
                    shadowColor: "#000",
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.5,
                    shadowRadius: 0.7,
                    elevation: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "tt-bold",
                      fontSize: 16,
                      width: "95%",
                    }}
                  >
                    Välj en ny lista
                  </Text>
                </View>
                {lists.map((list: any, i: number) => (
                  <TouchableOpacity
                    key={list.listId + String(i)}
                    style={{
                      backgroundColor:
                        listId === list.listId ? colors.nice_beige : colors.bg,
                      width: "95%",
                      borderRadius: 10,
                      padding: 10,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginTop: i === 0 ? 20 : 10,
                      marginBottom: i === lists.length - 1 ? 50 : 10,
                      shadowColor: colors.black,
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 10,
                    }}
                    onPress={() => {
                      if (listId === list.listId) {
                        setListId("");
                      } else {
                        setListId(list.listId);
                      }
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
                          fontFamily: "tt-bold",
                          fontSize: 16,
                        }}
                      >
                        {list.title}
                      </Text>
                    </View>
                    <>
                      {list.meals.map((meal: any, i: number) => {
                        return (
                          <View
                            key={meal.mealId + String(i)}
                            style={{
                              marginTop: i === 0 ? 10 : 0,
                              flexDirection: "row",
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "tt-reg",
                                fontSize: 14,
                                color: "rgba(0,0,0,0.5)",
                              }}
                            >
                              {meal.day}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "tt-semi",
                                fontSize: 14,
                                marginLeft: 15,
                              }}
                            >
                              {meal.title.length > 30
                                ? `${meal.title.substring(0, 30)}...`
                                : `${meal.title}`}
                            </Text>
                          </View>
                        );
                      })}
                    </>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
