import {
  View,
  Text,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext } from "react";
import { colors } from "../../../constants/constants";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../../context/Auth";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../../GraphQL/Queries/queries";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../../util/Interfaces";

export default function ProfileSettings({ navigation }: { navigation: any }) {
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

  const birthday = userLoading ? null : new Date(apolloUser.birthday);
  const settingsConfig: Array<any> = [
    {
      setting: "Namn",
      value: userLoading ? "" : apolloUser.fullName,
    },
    {
      setting: "Email",
      value: userLoading ? "" : apolloUser.email,
    },
    // {
    //   setting: "Födelsedag",
    //   value: userLoading
    //     ? ""
    //     : apolloUser.birthday
    //     ? `${birthday?.getFullYear()}-${birthday?.getMonth()}-${birthday?.getDate()}`
    //     : "Ingen",
    // },
    // {
    //   setting: "Kön",
    //   value: userLoading ? "" : apolloUser.sex ? apolloUser.sex : "Inget",
    // },
    {
      setting: "Lösenord",
      value: "Byt Lösenord",
    },
  ];

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
          </>
        ) : (
          <>
            {Platform.OS === "ios" ? (
              <>
                <View
                  style={{
                    height: "8%",
                    top: 0,
                    position: "absolute",
                    width: Dimensions.get("screen").width,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                      position: "absolute",
                      left: "2%",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 999,
                      padding: 7,
                    }}
                  >
                    <Feather name="x" color={colors.black} size={30} />
                  </TouchableOpacity>
                  <Text style={{ fontFamily: "tt-bold", fontSize: 20 }}>
                    Inställningar
                  </Text>
                </View>
                <View
                  style={{
                    height: "92%",
                    width: Dimensions.get("screen").width,
                    flexDirection: "column",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 0,
                  }}
                >
                  <ScrollView
                    contentContainerStyle={{
                      flexGrow: 1,
                      alignItems: "center",
                      justifyContent: "flex-start",
                      width: Dimensions.get("screen").width,
                      paddingHorizontal: "5%",
                    }}
                    showsVerticalScrollIndicator={false}
                  >
                    {settingsConfig.map((item: any, i: number) => (
                      <TouchableOpacity
                        key={item.setting + String(i)}
                        style={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                          width: "100%",
                          marginTop: i === 0 ? 40 : 10,
                        }}
                        onPress={() => {
                          if (i === 0) {
                            navigation.navigate("ChangeName");
                          } else if (i === 1) {
                            navigation.navigate("ChangeEmail");
                          } else if (i === 2) {
                            navigation.navigate("ChangePassword");
                          }
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "tt-bold",
                            fontSize: 14,
                            color: "rgba(0,0,0,0.6)",
                          }}
                        >
                          {item.setting}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "tt-med",
                            fontSize: 16,
                            color: "rgba(0,0,0,1)",
                          }}
                        >
                          {item.value}
                          <Feather
                            name="chevron-right"
                            color={colors.black}
                            size={20}
                            style={{ marginLeft: 10 }}
                          />
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: 10,
                    padding: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: "10%",
                    width: "90%",
                  }}
                  onPress={() => {
                    AsyncStorage.clear().then(() => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Landing" }],
                      });
                    });
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "tt-semi",
                      fontSize: 16,
                      color: colors.black,
                    }}
                  >
                    Logga ut
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "tt-reg",
                    fontSize: 14,
                    color: "rgba(0,0,0,0.4)",
                    marginTop: 50,
                    position: "absolute",
                    bottom: "2%",
                  }}
                >
                  Version {Constants.manifest?.version}
                </Text>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
