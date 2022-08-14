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
import {
  CHANGE_BIRTHDAY,
  CHANGE_EMAIL,
} from "../../../../GraphQL/Mutations/mutations";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ChangeBirthday({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const { user }: any = useContext(AuthContext);
  const {
    refetch,
    loading: userLoading,
    data: userData,
  } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });
  if (userData) var { getUserById: apolloUser } = userData;

  const [changeBirthday] = useMutation(CHANGE_BIRTHDAY, {
    update() {
      refetch().then(() => {
        navigation.goBack();
      });
    },
  });

  useEffect(() => {
    if (!userLoading) {
      setDate(new Date(apolloUser.birthday));
    }
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
                Ange Födelsedag
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: 35,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: date ? colors.blue : "rgba(0,0,0,0.1)",
                  width: "20%",
                }}
                disabled={date ? false : true}
                onPress={() => {
                  changeBirthday({
                    variables: {
                      userId: user.id,
                      birthday: date,
                    },
                  });
                }}
              >
                <Text
                  style={{
                    color: date ? colors.white : "rgba(0,0,0,0.3)",
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
              <DateTimePicker
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                testID="dateTimePicker"
                value={date}
                onChange={onChange}
                locale="sv"
                accentColor={colors.green}
                display="inline"
              />
            </KeyboardAvoidingView>
          </>
        )}
      </Pressable>
    </SafeAreaView>
  );
}
