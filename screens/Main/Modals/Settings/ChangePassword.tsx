import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors } from "../../../../constants/constants";
import { AuthContext } from "../../../../context/Auth";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../../../GraphQL/Queries/queries";
import { Feather } from "@expo/vector-icons";
import { NavigationScreenProp } from "react-navigation";
import { Input } from "react-native-elements";
import { CHANGE_PASSWORD } from "../../../../GraphQL/Mutations/mutations";

export default function ChangePassword({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  const { user }: any = useContext(AuthContext);
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

  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [changePassword, { error }] = useMutation(CHANGE_PASSWORD, {
    update() {
      refetch().then(() => {
        setIsSuccess(true);
      });
    },
  });

  const [showPassword, setShowPassword] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Pressable
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        onPress={() => Keyboard.dismiss()}
      >
        {userLoading ? (
          <>
            <ActivityIndicator size="large" />
          </>
        ) : (
          <>
            {isSuccess ? (
              <>
                <Text style={{ fontFamily: "tt-bold", fontSize: 30 }}>
                  Lösenordet är ändrat!
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.black,
                    borderRadius: 35,
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50%",
                    marginTop: 20,
                  }}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "tt-med",
                      fontSize: 15,
                      color: colors.white,
                    }}
                  >
                    Stäng
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    width: Dimensions.get("screen").width,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: "2%",
                    height: "10%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderRadius: 999,
                      padding: 7,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0,0,0,0.1)",
                    }}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Feather name="x" color={colors.black} size={30} />
                  </TouchableOpacity>
                  <Text style={{ fontFamily: "tt-bold", fontSize: 20 }}>
                    Byt Lösenord
                  </Text>
                  <TouchableOpacity
                    style={{
                      borderRadius: 35,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        newPassword === confirmedNewPassword && oldPassword
                          ? colors.blue
                          : "rgba(0,0,0,0.1)",
                      width: "20%",
                    }}
                    disabled={
                      newPassword === confirmedNewPassword && oldPassword
                        ? false
                        : true
                    }
                    onPress={() => {
                      changePassword({
                        variables: {
                          userId: user.id,
                          newPassword,
                          oldPassword,
                        },
                      });
                    }}
                  >
                    <Text
                      style={{
                        color:
                          newPassword === confirmedNewPassword && oldPassword
                            ? colors.white
                            : "rgba(0,0,0,0.3)",
                        fontFamily: "tt-semi",
                      }}
                    >
                      Klar
                    </Text>
                  </TouchableOpacity>
                </View>
                <KeyboardAvoidingView
                  style={{
                    height: "90%",
                    position: "absolute",
                    bottom: 0,
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
                      width: Dimensions.get("screen").width,
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {error && (
                      <Text
                        style={{
                          color: colors.orange,
                          fontFamily: "tt-med",
                          fontSize: 20,
                          marginBottom: 20,
                          marginTop: 10,
                        }}
                      >
                        {error.message}
                      </Text>
                    )}
                    <Input
                      value={oldPassword}
                      onChangeText={(t) => setOldPassword(t)}
                      placeholder="Gammalt lösenord"
                      autoCompleteType="cc-csc"
                      style={{ fontFamily: "tt-reg" }}
                      label="Ange ditt gamla lösenord"
                      autoFocus
                      labelStyle={{ fontFamily: "tt-semi" }}
                      selectionColor={colors.black}
                      containerStyle={{ marginTop: 20 }}
                    />
                    <Input
                      value={newPassword}
                      onChangeText={(t) => setNewPassword(t)}
                      placeholder="Nytt lösenord"
                      autoCompleteType="cc-csc"
                      style={{ fontFamily: "tt-reg" }}
                      label="Ange det nya lösenordet"
                      labelStyle={{ fontFamily: "tt-semi" }}
                      selectionColor={colors.black}
                      secureTextEntry={!showPassword}
                      rightIcon={
                        <TouchableOpacity
                          onPress={() => setShowPassword((prev) => !prev)}
                        >
                          <Feather
                            name={showPassword ? "unlock" : "lock"}
                            color="#000"
                            size={25}
                          />
                        </TouchableOpacity>
                      }
                    />
                    <Input
                      value={confirmedNewPassword}
                      onChangeText={(t) => setConfirmedNewPassword(t)}
                      placeholder="Nytt lösenord"
                      autoCompleteType="cc-csc"
                      style={{ fontFamily: "tt-reg" }}
                      label="Ange det nya lösenordet igen"
                      labelStyle={{ fontFamily: "tt-semi" }}
                      selectionColor={colors.black}
                      secureTextEntry={!showPassword}
                      rightIcon={
                        <TouchableOpacity
                          onPress={() => setShowPassword((prev) => !prev)}
                        >
                          <Feather
                            name={showPassword ? "unlock" : "lock"}
                            color="#000"
                            size={25}
                          />
                        </TouchableOpacity>
                      }
                      inputContainerStyle={{ marginBottom: 100 }}
                    />
                  </ScrollView>
                </KeyboardAvoidingView>
              </>
            )}
          </>
        )}
      </Pressable>
    </SafeAreaView>
  );
}
