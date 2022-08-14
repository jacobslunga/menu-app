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
import { CHANGE_EMAIL } from "../../../../GraphQL/Mutations/mutations";

export default function ChangeEmail({
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

  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    setNewEmail(apolloUser.email);
  }, [userLoading]);

  const [changeEmail] = useMutation(CHANGE_EMAIL, {
    update() {
      refetch().then(() => {
        navigation.goBack();
      });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Pressable
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        onPress={() => Keyboard.dismiss()}
      >
        {userLoading ? (
          <>
            <ActivityIndicator size="large" />
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
                Byt Email
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: 35,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: newEmail ? colors.blue : "rgba(0,0,0,0.1)",
                  width: "20%",
                }}
                disabled={!newEmail}
                onPress={() => {
                  changeEmail({
                    variables: {
                      userId: user.id,
                      newEmail,
                    },
                  });
                }}
              >
                <Text
                  style={{
                    color: newEmail ? colors.white : "rgba(0,0,0,0.3)",
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
              <Input
                value={newEmail}
                onChangeText={(t) => setNewEmail(t)}
                placeholder="Ny email"
                autoCompleteType="cc-csc"
                style={{ fontFamily: "tt-reg" }}
                label="Ange en ny Email"
                autoFocus
                labelStyle={{ fontFamily: "tt-semi" }}
                selectionColor={colors.black}
              />
            </KeyboardAvoidingView>
          </>
        )}
      </Pressable>
    </SafeAreaView>
  );
}
