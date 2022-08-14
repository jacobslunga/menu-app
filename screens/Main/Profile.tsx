import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { colors } from "../../constants/constants";
import { NavigationScreenProp } from "react-navigation";
import { AuthContext } from "../../context/Auth";
import { useQuery } from "@apollo/client";
import {
  GET_LISTS_FOR_USER,
  GET_USER_BY_ID,
} from "../../GraphQL/Queries/queries";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { IMeal, IUser } from "../../util/Interfaces";

export default function Profile({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  const { user }: IUser = useContext(AuthContext);

  const { data: userData, loading: userLoading } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });
  if (userData) var { getUserById: apolloUser } = userData;

  const myMeals: IMeal[] = userLoading ? null : apolloUser.meals;

  const { data: listData, loading: listLoading } = useQuery(
    GET_LISTS_FOR_USER,
    {
      variables: {
        userId: user.id,
      },
    }
  );
  if (listData) var { getListsForUser: lists } = listData;

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
        {userLoading || listLoading ? (
          <>
            <ActivityIndicator size="large" />
          </>
        ) : (
          <>
            <View
              style={{
                backgroundColor: colors.bg,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                position: "absolute",
                top: 0,
                width: Dimensions.get("screen").width,
                height: "8%",
                paddingHorizontal: "2%",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" color={colors.black} size={30} />
              </TouchableOpacity>
              <Text style={{ fontFamily: "tt-bold", fontSize: 20 }}>
                Din Profil
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ProfileSettings")}
              >
                <Feather name="settings" color={colors.black} size={25} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                height: "92%",
                width: Dimensions.get("screen").width,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  width: Dimensions.get("screen").width,
                  flexGrow: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                showsVerticalScrollIndicator={false}
              >
                {apolloUser.imageUrl ? (
                  <View
                    style={{
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 2,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={{ uri: apolloUser.imageUrl }}
                      style={{
                        borderRadius: 999,
                        width: 120,
                        height: 120,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        Haptics.notificationAsync();
                        navigation.navigate("ChangeImageUrl");
                      }}
                      style={{
                        borderRadius: 999,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        backgroundColor: colors.white,
                        justifyContent: "center",
                        position: "absolute",
                        top: "70%",
                        right: "2%",
                        shadowColor: colors.black,
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 10,
                      }}
                    >
                      <Feather name="edit-3" color={colors.black} size={20} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: colors.orange,
                      width: 120,
                      height: 120,
                      borderRadius: 999,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: "tt-bold",
                        fontSize: 45,
                      }}
                    >
                      {apolloUser.firstName[0]}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Haptics.notificationAsync();
                        navigation.navigate("ChangeImageUrl");
                      }}
                      style={{
                        borderRadius: 999,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        backgroundColor: colors.white,
                        justifyContent: "center",
                        position: "absolute",
                        top: "70%",
                        right: "2%",
                        shadowColor: colors.black,
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 10,
                      }}
                    >
                      <Feather name="edit-3" color={colors.black} size={20} />
                    </TouchableOpacity>
                  </View>
                )}
                <View
                  style={{
                    width: Dimensions.get("screen").width,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: "tt-bold",
                      fontSize: 25,
                    }}
                  >
                    {apolloUser.fullName}
                  </Text>
                  <View
                    style={{
                      width: "90%",
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: colors.nice_beige,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 30,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "tt-med",
                        fontSize: 16,
                        color: "rgba(0,0,0,0.7)",
                      }}
                    >
                      {myMeals.length} maträtter
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "90%",
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: colors.nice_beige,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "tt-med",
                        fontSize: 16,
                        color: "rgba(0,0,0,0.7)",
                      }}
                    >
                      {lists.length} listor
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
