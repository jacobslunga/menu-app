import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { colors } from "../../constants/constants";
import { AuthContext } from "../../context/Auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_LISTS_FOR_USER,
  GET_USER_BY_ID,
} from "../../GraphQL/Queries/queries";
import { NavigationScreenProp } from "react-navigation";
import * as Haptics from "expo-haptics";
import { SET_IS_CURRENT } from "../../GraphQL/Mutations/mutations";
import { IList, IUser } from "../../util/Interfaces";
import moment from "moment";
import { Feather } from "@expo/vector-icons";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  const { user }: IUser = useContext(AuthContext);
  const {
    data: listData,
    loading: listLoading,
    refetch,
  } = useQuery(GET_LISTS_FOR_USER, {
    variables: {
      userId: user.id,
    },
  });

  if (listData) var { getListsForUser: lists } = listData;
  const myLists = listLoading ? null : lists;

  const { data: userData, loading: userLoading } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });
  if (userData) var { getUserById: apolloUser } = userData;

  const meals = userLoading ? null : apolloUser.meals;

  const [listId, setListId] = useState("");

  const [shadow, setShadow] = useState(false);

  const date = new Date();
  const week = moment(date).isoWeek();

  const currentList: IList = listLoading
    ? null
    : myLists.find(
        (list: IList) => list.isCurrent && list.currentWeek === week
      );

  const [setIsCurrent] = useMutation(SET_IS_CURRENT);

  // Refresh Control
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      wait(2000).then(() => setRefreshing(false));
    });
  }, []);

  const scrollRef: any = useRef();

  const d = new Date().getDay();
  const dayIndex = d === 0 ? 6 : d - 1;

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.bg, zIndex: 100 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.bg,
          }}
        >
          {userLoading || listLoading ? (
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
                  width: Dimensions.get("screen").width,
                  height: "10%",
                  position: "absolute",
                  top: 0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: colors.bg,
                  paddingHorizontal: "2%",
                  shadowColor: shadow ? "#000" : "transparent",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                  zIndex: 100,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    scrollRef.current.scrollTo({ y: 0, animation: true });
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "menu-font",
                      fontSize: 20,
                      color: colors.brown,
                    }}
                  >
                    Menü
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <Text style={{ fontFamily: "tt-semi", fontSize: 14 }}>
                    Lista för vecka
                  </Text>
                  <Text style={{ fontFamily: "tt-bold", fontSize: 18 }}>
                    {week}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Haptics.selectionAsync();
                    navigation.navigate("Profile");
                  }}
                  style={{
                    backgroundColor: colors.orange,
                    width: 50,
                    height: 50,
                    borderRadius: 999,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {apolloUser.imageUrl ? (
                    <Image
                      source={{ uri: apolloUser.imageUrl }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderWidth: 1,
                        borderColor: colors.black,
                        borderRadius: 999,
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: "tt-bold",
                      }}
                    >
                      {user.firstName[0]}
                    </Text>
                  )}
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
                {/* Display when there are no lists for the current user */}
                {lists.length === 0 ? (
                  <>
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
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                      ref={scrollRef}
                      onScroll={(e) => {
                        e.nativeEvent.contentOffset.y > 10
                          ? setShadow(true)
                          : setShadow(false);
                      }}
                    >
                      {/* Show ticker that you dont have enough meals to make a list */}
                      {meals.length < 7 && (
                        <View
                          style={{
                            height: 40,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              width: Dimensions.get("screen").width,
                              alignItems: "center",
                              justifyContent: "space-between",
                              height: 40,
                              paddingHorizontal: "5%",
                              borderBottomWidth: 0.3,
                              borderBottomColor: "rgba(0,0,0,0.3)",
                              backgroundColor: colors.bg,
                            }}
                          >
                            <Text
                              style={{
                                color: "rgba(0,0,0,0.7)",
                                fontFamily: "tt-bold",
                              }}
                            >
                              {meals.length} / 7 maträtter
                            </Text>
                          </View>
                        </View>
                      )}
                      {/* If you don't have enough meals, display this to add more */}
                      {meals.length < 7 && (
                        <>
                          {meals && (
                            <>
                              {meals.map((meal: any, dayIndex: number) => (
                                <View
                                  key={meal.mealId + String(dayIndex)}
                                  style={{
                                    width: Dimensions.get("screen").width,
                                    paddingHorizontal: "5%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 10,
                                    marginBottom: 10,
                                    backgroundColor: colors.bg,
                                    padding: 10,
                                    borderBottomWidth:
                                      dayIndex === meals.length ? 0.3 : 0,
                                    borderBottomColor: "rgba(0,0,0,0.3)",
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
                                      fontSize: 18,
                                    }}
                                  >
                                    {meal.title.length > 30
                                      ? `${meal.title.substring(0, 30)}...`
                                      : `${meal.title}`}
                                  </Text>
                                </View>
                              ))}
                            </>
                          )}
                        </>
                      )}
                      {/* Create your first list, when you have enough meals */}
                      {meals.length >= 7 && lists.length === 0 && (
                        <View
                          style={{
                            alignItems: "flex-start",
                            justifyContent: "center",
                            flexDirection: "column",
                            position: "absolute",
                            top: "20%",
                          }}
                        >
                          <Text style={{ fontFamily: "tt-bold", fontSize: 30 }}>
                            Skapa din första lista
                          </Text>
                          <Text
                            style={{
                              fontFamily: "tt-med",
                              fontSize: 16,
                              maxWidth: "80%",
                              marginTop: 10,
                            }}
                          >
                            Nu när du har mer än 7 maträtter kan du skapa din
                            första lista. Vi kommer att "shuffla" listor till
                            dig tills du hittar den du gillar bäst!
                          </Text>
                          <TouchableOpacity
                            style={{
                              borderRadius: 35,
                              padding: 10,
                              width: "40%",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: colors.green,
                              marginTop: 20,
                            }}
                            onPress={() => {
                              Haptics.impactAsync();
                              navigation.navigate("ShuffleList");
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "tt-bold",
                                fontSize: 16,
                                color: colors.white,
                              }}
                            >
                              Börja nu
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      {/* Again, if not enough meals, show add meal button */}
                      {meals.length < 7 && (
                        <TouchableOpacity
                          style={{
                            backgroundColor: colors.green,
                            width: "90%",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 35,
                            padding: 10,
                            marginTop: 20,
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
                      )}
                    </ScrollView>
                  </>
                ) : (
                  <>
                    {/* Display when user has at least 1 list */}
                    <ScrollView
                      contentContainerStyle={{
                        width: Dimensions.get("screen").width,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingHorizontal: "5%",
                      }}
                      showsVerticalScrollIndicator={false}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                      ref={scrollRef}
                      scrollEventThrottle={5}
                      onScroll={(e) => {
                        e.nativeEvent.contentOffset.y > 10
                          ? setShadow(true)
                          : setShadow(false);
                      }}
                    >
                      {/* Conditional checking if there is a list for this week */}
                      {!currentList && (
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            width: "100%",
                            marginTop: 20,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "tt-bold",
                              fontSize: 20,
                            }}
                          >
                            Välj en lista för vecka {week}
                          </Text>
                          <TouchableOpacity
                            style={{
                              backgroundColor: listId
                                ? colors.green
                                : "rgba(0,0,0,0.1)",
                              borderRadius: 35,
                              padding: 10,
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: 10,
                            }}
                            onPress={() => {
                              setIsCurrent({
                                variables: {
                                  listId,
                                  week: Number(week),
                                },
                              }).then(() => {
                                refetch();
                              });
                            }}
                            disabled={!listId}
                          >
                            <Text
                              style={{
                                color: listId
                                  ? colors.white
                                  : "rgba(0,0,0,0.3)",
                                fontFamily: "tt-bold",
                              }}
                            >
                              Använd Lista
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      {/* Displaying is there is a list for this week */}
                      {currentList ? (
                        <>
                          <View
                            style={{
                              width: "100%",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "tt-ex",
                                fontSize: 35,
                                color: colors.brown,
                                marginTop: 20,
                                textDecorationLine: "underline",
                              }}
                            >
                              {currentList.title}
                            </Text>
                            {currentList.meals.map((meal: any, i: number) => {
                              return (
                                <TouchableOpacity
                                  key={meal.mealId + String(i)}
                                  style={{
                                    width: Dimensions.get("screen").width,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                    marginBottom: 5,
                                    backgroundColor:
                                      dayIndex === i
                                        ? colors.nice_beige
                                        : colors.bg,
                                    padding: 10,
                                    borderBottomColor:
                                      dayIndex === i
                                        ? "transparent"
                                        : "rgba(0,0,0,0.3)",
                                    borderBottomWidth: 0.3,
                                  }}
                                  onPress={() => {
                                    if (dayIndex === i) {
                                      Haptics.impactAsync();
                                    }
                                    navigation.navigate("SingleIngredient", {
                                      meal: meal.title,
                                    });
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "rgba(0,0,0,0.7)",
                                      fontFamily: "tt-med",
                                    }}
                                  >
                                    {meal.day}
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily:
                                        dayIndex === i ? "tt-semi" : "tt-med",
                                      fontSize: dayIndex === i ? 18 : 16,
                                      flex: 1,
                                      maxWidth: "80%",
                                    }}
                                  >
                                    {meal.title}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                          {/* Display this button when there is a list for the current week and you have more than 1 list */}
                          <TouchableOpacity
                            style={{
                              backgroundColor: colors.yellow,
                              borderRadius: 35,
                              padding: 10,
                              alignItems: "center",
                              justifyContent: "center",
                              width: "45%",
                              marginTop: 30,
                              marginBottom: 50,
                              flexDirection: "row",
                            }}
                            onPress={() => {
                              navigation.navigate("SetNewWeekList");
                            }}
                          >
                            <Text
                              style={{
                                color: colors.white,
                                fontFamily: "tt-bold",
                                fontSize: 16,
                              }}
                            >
                              Byt lista
                            </Text>
                            <Feather
                              name="refresh-cw"
                              color={colors.white}
                              size={20}
                              style={{ marginLeft: 10 }}
                            />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          {/* Display lists to pick for the current week */}
                          {myLists.map((list: any, i: number) => (
                            <TouchableOpacity
                              key={list.listId + String(i)}
                              style={{
                                backgroundColor:
                                  listId === list.listId
                                    ? colors.nice_beige
                                    : colors.bg,
                                width: "100%",
                                borderRadius: 10,
                                padding: 10,
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginTop: i === 0 ? 20 : 10,
                                marginBottom:
                                  i === myLists.length - 1 ? 50 : 10,
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
                                    fontFamily: "tt-ex",
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
                                          fontFamily: "tt-med",
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
                        </>
                      )}
                    </ScrollView>
                  </>
                )}
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
