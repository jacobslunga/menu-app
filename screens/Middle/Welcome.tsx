import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { colors } from "../../constants/constants";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../GraphQL/Queries/queries";
import { IUser } from "../../util/Interfaces";

export default function Welcome({ navigation }: { navigation: any }) {
  const { user }: IUser = useContext(AuthContext);
  const { data: userData, loading: userLoading } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });
  if (userData) var { getUserById: apolloUser } = userData;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.bg,
      }}
    >
      {userLoading ? (
        <ActivityIndicator size={"small"} />
      ) : (
        <>
          <View
            style={{
              width: Dimensions.get("screen").width,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colors.black,
                fontFamily: "tt-bold",
                fontSize: apolloUser.firstName.length > 10 ? 25 : 30,
              }}
            >
              Välkommen{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                  textDecorationStyle: "double",
                }}
              >
                {apolloUser.firstName}
              </Text>
            </Text>
            <Text
              style={{
                color: colors.black,
                fontFamily: "tt-reg",
                fontSize: 16,
                width: "80%",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Vi hoppas att du äter många goda rätter med oss och får ihop en
              lättare vardag. Vi rekommenderar att lägga till minst 10 maträtter
              för att få ihop tillräckligt många maträtter till din första
              lista!
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.green,
              borderRadius: 35,
              width: "90%",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "ChooseMenu" }],
              });
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontFamily: "tt-bold",
                fontSize: 16,
              }}
            >
              Fortsätt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "transparent",
              borderRadius: 35,
              width: "90%",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "BottomTab" }],
              });
            }}
          >
            <Text
              style={{
                color: colors.black,
                fontFamily: "tt-reg",
                fontSize: 16,
              }}
            >
              Lägg till senare
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
