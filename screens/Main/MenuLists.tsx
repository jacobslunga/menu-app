import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../constants/constants";
import { AuthContext } from "../../context/Auth";
import { useQuery } from "@apollo/client";
import { GET_LISTS_FOR_USER } from "../../GraphQL/Queries/queries";
import { Feather } from "@expo/vector-icons";
import { NavigationScreenProp } from "react-navigation";
import { IList, IUser } from "../../util/Interfaces";

export default function MenuLists({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  const { user }: IUser = useContext(AuthContext);
  const { data: listsData, loading: listsLoading } = useQuery(
    GET_LISTS_FOR_USER,
    {
      variables: {
        userId: user.id,
      },
    }
  );
  if (listsData) var { getListsForUser: lists } = listsData;
  const myLists: IList[] = listsLoading ? null : lists;

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
        {listsLoading ? (
          <>
            <ActivityIndicator size="large" />
          </>
        ) : (
          <>
            <View
              style={{
                height: "8%",
                width: Dimensions.get("screen").width,
                position: "absolute",
                top: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: "5%",
                shadowColor: shadow ? "#000" : "transparent",
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
              <Text style={{ fontFamily: "tt-bold", fontSize: 25 }}>
                Dina Listor
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: 999,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  navigation.navigate("ShuffleList");
                }}
              >
                <Feather
                  name="file-plus"
                  color={colors.black}
                  size={Dimensions.get("screen").height > 800 ? 30 : 25}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                height: "92%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: Dimensions.get("screen").width,
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  paddingHorizontal: "5%",
                  width: Dimensions.get("screen").width,
                }}
                onScroll={(e) => {
                  e.nativeEvent.contentOffset.y > 10
                    ? setShadow(true)
                    : setShadow(false);
                }}
                scrollEventThrottle={5}
                showsVerticalScrollIndicator={false}
              >
                {myLists.length > 0 ? (
                  <>
                    {myLists.map((list: IList, i: number) => (
                      <Pressable
                        key={list.listId + String(i)}
                        style={{
                          backgroundColor: colors.nice_beige,
                          width: "100%",
                          borderRadius: 10,
                          padding: 10,
                          flexDirection: "column",
                          alignItems: "flex-start",
                          marginTop: i === 0 ? 20 : 10,
                          marginBottom: i === myLists.length - 1 ? 50 : 10,
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
                              fontSize: 18,
                              maxWidth: "90%",
                            }}
                          >
                            {list.title}
                          </Text>
                          <TouchableOpacity
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onPress={() => {
                              navigation.navigate("DeleteList", {
                                listId: list.listId,
                              });
                            }}
                          >
                            <Feather
                              name="x"
                              color="rgba(0,0,0,0.5)"
                              size={20}
                            />
                          </TouchableOpacity>
                        </View>
                        <>
                          {list.meals.map((meal: any, i: number) => {
                            return (
                              <View
                                key={meal.mealId + String(i)}
                                style={{
                                  marginTop: i === 0 ? 10 : 0,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  width: "100%",
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
                                    fontFamily: "tt-med",
                                    fontSize: 16,
                                    marginLeft: 20,
                                    flex: 1,
                                    marginTop: 10,
                                    maxWidth: "80%",
                                  }}
                                >
                                  {meal.title}
                                </Text>
                              </View>
                            );
                          })}
                        </>
                      </Pressable>
                    ))}
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        height: "100%",
                        width: Dimensions.get("screen").width,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Feather
                        name="inbox"
                        color="rgba(0,0,0,0.5)"
                        size={100}
                      />
                      <Text
                        style={{
                          fontFamily: "tt-semi",
                          fontSize: 25,
                          color: colors.black,
                          marginTop: 10,
                        }}
                      >
                        Du har inga listor än!
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.green,
                          borderRadius: 35,
                          padding: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 20,
                        }}
                        onPress={() => {
                          navigation.navigate("ShuffleList");
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "tt-bold",
                            fontSize: 15,
                            color: colors.white,
                          }}
                        >
                          Skapa din första lista
                        </Text>
                      </TouchableOpacity>
                    </View>
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
