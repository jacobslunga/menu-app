import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../constants/constants";
import { Header, Input } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { checkEmail } from "../../util/checkEmail";
import { AuthContext } from "../../context/Auth";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../GraphQL/Mutations/mutations";

export default function Login({ navigation }: { navigation: any }) {
  // Signup variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);

  const loginIsValid = checkEmail(email) && password.length > 5;

  // Login method
  const context = useContext(AuthContext);
  const [login, { error: loginError, loading: loginLoading }] = useMutation(
    LOGIN,
    {
      update(_: any, { data: { login: userData } }) {
        context.login(userData);
        navigation.reset({
          index: 0,
          routes: [{ name: "BottomTab" }],
        });
      },
      variables: {
        email,
        password,
      },
    }
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Pressable
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.bg,
        }}
        onPress={() => Keyboard.dismiss()}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            height: "8%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            backgroundColor: colors.bg,
            width: Dimensions.get("screen").width,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", left: "2%" }}
          >
            <Feather name="chevron-left" color="#000" size={30} />
          </TouchableOpacity>
          <Text style={{ fontFamily: "tt-bold", fontSize: 20 }}>
            Välkommen tillbaka
          </Text>
        </View>
        {loginLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <>
            <KeyboardAvoidingView
              style={{
                height: "90%",
                position: "absolute",
                bottom: 0,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: Dimensions.get("screen").width,
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView
                contentContainerStyle={{
                  width: Dimensions.get("screen").width,
                  alignItems: "center",
                  flexDirection: "column",
                  flexGrow: 1,
                  paddingHorizontal: "5%",
                }}
                horizontal={false}
                keyboardShouldPersistTaps="handled"
              >
                {loginError && (
                  <Text
                    style={{
                      color: colors.orange,
                      fontFamily: "tt-med",
                      fontSize: 25,
                      marginTop: 10,
                      marginBottom: 20,
                    }}
                  >
                    {loginError.message}
                  </Text>
                )}
                <Input
                  label="Email"
                  selectionColor={colors.black}
                  value={email}
                  containerStyle={{
                    width: "100%",
                    marginTop: 20,
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(t) => setEmail(t)}
                  placeholder="Email"
                  labelStyle={{ fontFamily: "tt-bold" }}
                  style={{ fontFamily: "tt-med" }}
                  rightIcon={<Feather name="mail" color="#000" size={25} />}
                  autoCompleteType="cc-csc"
                  autoFocus
                />
                <Input
                  label="Lösenord"
                  selectionColor={colors.black}
                  value={password}
                  containerStyle={{
                    width: "100%",
                  }}
                  autoCapitalize="none"
                  onChangeText={(t) => setPassword(t)}
                  placeholder="Lösenord"
                  labelStyle={{ fontFamily: "tt-bold" }}
                  style={{ fontFamily: "tt-med" }}
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
                  secureTextEntry={!showPassword}
                  autoCompleteType="cc-csc"
                />
              </ScrollView>
              <TouchableOpacity
                style={{
                  backgroundColor: loginIsValid
                    ? colors.green
                    : "rgba(0,0,0,0.1)",
                  borderRadius: 35,
                  width: "90%",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
                disabled={!loginIsValid}
                onPress={() => {
                  login();
                }}
              >
                <Text
                  style={{
                    color: loginIsValid
                      ? colors.white
                      : "rgba(255,255,255,0.3)",
                    fontFamily: "tt-bold",
                    fontSize: 16,
                  }}
                >
                  Logga in
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </>
        )}
      </Pressable>
    </SafeAreaView>
  );
}
