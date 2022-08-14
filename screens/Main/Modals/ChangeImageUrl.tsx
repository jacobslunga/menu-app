import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../../constants/constants";
import { Feather } from "@expo/vector-icons";
import { NavigationScreenProp } from "react-navigation";
import { AVATARS } from "../../../util/Avatars";
import { AuthContext } from "../../../context/Auth";
import { useMutation, useQuery } from "@apollo/client";
import {
  CHANGE_USER_COLOR,
  CHANGE_USER_IMAGE_URL,
} from "../../../GraphQL/Mutations/mutations";
import { GET_USER_BY_ID } from "../../../GraphQL/Queries/queries";
import { IUser } from "../../../util/Interfaces";

export default function ChangeImageUrl({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user }: IUser = useContext(AuthContext);
  const { refetch } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });

  const [changeUserImageUrl] = useMutation(CHANGE_USER_IMAGE_URL, {
    update() {
      setIsLoading(true);
      refetch();
      setTimeout(() => {
        setIsLoading(false);
        navigation.goBack();
      }, 1000);
    },
  });

  const [changeUserColor] = useMutation(CHANGE_USER_COLOR, {});

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
        {isLoading ? (
          <>
            <ActivityIndicator size="large" />
            <Text
              style={{ fontFamily: "tt-bold", fontSize: 16, marginTop: 10 }}
            >
              Sparar Avatar
            </Text>
          </>
        ) : (
          <>
            <View
              style={{
                height: "10%",
                width: Dimensions.get("screen").width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                position: "absolute",
                top: 0,
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  left: "5%",
                  borderRadius: 999,
                  backgroundColor: "rgba(0,0,0,0.1)",
                  padding: 10,
                }}
                onPress={() => navigation.goBack()}
              >
                <Feather name="x" color={colors.black} size={30} />
              </TouchableOpacity>
              <Text style={{ fontFamily: "tt-bold", fontSize: 20 }}>
                Välj en Avatar
              </Text>
            </View>
            <View
              style={{
                height: "90%",
                position: "absolute",
                bottom: 0,
                width: Dimensions.get("screen").width,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: imageUrl ? colors.green : "rgba(0,0,0,0.1)",
                  borderRadius: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60%",
                  padding: 10,
                  flexDirection: "row",
                }}
                disabled={imageUrl ? false : true}
                onPress={() => {
                  changeUserImageUrl({
                    variables: {
                      userId: user.id,
                      imageUrl,
                    },
                  });
                  changeUserColor({
                    variables: {
                      userId: user.id,
                      color,
                    },
                  });
                }}
              >
                <Text
                  style={{
                    fontFamily: "tt-bold",
                    color: imageUrl ? colors.white : "rgba(0,0,0,0.3)",
                    fontSize: 16,
                  }}
                >
                  Spara
                </Text>
                <Feather
                  name="check"
                  color={imageUrl ? colors.white : "rgba(0,0,0,0.3)"}
                  style={{ marginLeft: 5 }}
                  size={25}
                />
              </TouchableOpacity>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  width: Dimensions.get("screen").width,
                }}
                showsVerticalScrollIndicator={false}
              >
                {AVATARS.map((avatar, i) => (
                  <TouchableOpacity
                    key={avatar.url + String(i)}
                    onPress={() => {
                      if (imageUrl === avatar.url) {
                        setImageUrl("");
                      } else {
                        setImageUrl(avatar.url);
                      }
                      setColor(avatar.color);
                    }}
                    style={{
                      shadowColor:
                        imageUrl === avatar.url
                          ? "rgba(0,0,0,0.9)"
                          : "transparent",
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      shadowOpacity: i === 0 ? 0.1 : 0.3,
                      shadowRadius: 10,
                      marginTop: i === 0 ? 20 : 5,
                      marginBottom: i === AVATARS.length - 1 ? 150 : 10,
                      backgroundColor: colors.bg,
                      padding: 15,
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={{ uri: avatar.url }}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
