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
import { CHANGE_NAME } from "../../../../GraphQL/Mutations/mutations";

export default function ChangeName({
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

  const [newName, setNewName] = useState("");

  useEffect(() => {
    setNewName(apolloUser.fullName);
  }, [userLoading]);

  const [changeName] = useMutation(CHANGE_NAME, {
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
                Byt namn
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: 35,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: newName ? colors.blue : "rgba(0,0,0,0.1)",
                  width: "20%",
                }}
                disabled={!newName}
                onPress={() => {
                  changeName({
                    variables: {
                      userId: user.id,
                      newName,
                    },
                  });
                }}
              >
                <Text
                  style={{
                    color: newName ? colors.white : "rgba(0,0,0,0.3)",
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
                value={newName}
                onChangeText={(t) => setNewName(t)}
                placeholder="Nytt namn"
                autoCompleteType="cc-csc"
                style={{ fontFamily: "tt-reg" }}
                label="Ange ett nytt namn"
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
