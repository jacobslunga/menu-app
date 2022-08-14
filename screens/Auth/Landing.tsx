import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "../../constants/constants";
import { Feather } from "@expo/vector-icons";
import { NavigationScreenProp } from "react-navigation";
import { AVATARS } from "../../util/Avatars";
import { MotiView } from "moti";

export default function Landing({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.bg,
      }}
    >
      <View
        style={{ height: "30%", position: "absolute", top: 0, zIndex: -10 }}
      >
        {AVATARS.map((avatar, i) => (
          <MotiView
            from={{
              width: 100,
              height: 100,
              borderRadius: 999,
              zIndex: 1000,
              marginTop: 0,
              marginLeft: i % 2 === 0 ? 100 : 0,
              marginRight: i % 2 === 0 ? 0 : 100,
            }}
            animate={{ marginTop: 20 }}
            transition={{ type: "timing", duration: 2000, loop: true }}
            key={avatar.url + avatar.color + String(i)}
          >
            <Image
              source={{ uri: avatar.url }}
              style={{ width: "100%", height: "100%", borderRadius: 999 }}
            />
          </MotiView>
        ))}
      </View>
      <Text
        style={{
          fontFamily: "menu-font",
          fontSize: 30,
          color: colors.brown,
          width: "90%",
        }}
      >
        Menü
      </Text>
      <View
        style={{
          borderRadius: 10,
          padding: 20,
          width: "90%",
          marginTop: 50,
          alignItems: "flex-start",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "rgba(0,0,0,1)",
            fontFamily: "tt-bold",
            fontSize: Dimensions.get("screen").height > 800 ? 55 : 50,
            width: "100%",
            lineHeight: Dimensions.get("screen").height > 800 ? 60 : 50,
          }}
        >
          Tänk aldrig mer på vad som ska lagas!
        </Text>
        <Text
          style={{
            color: "rgba(0,0,0,0.4)",
            fontFamily: "tt-bold",
            fontSize: 20,
            width: "100%",
          }}
        >
          Låt appen göra jobbet
        </Text>
      </View>
      <View
        style={{
          width: "90%",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: 40,
          marginBottom: 100,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={{
            backgroundColor: colors.green,
            borderRadius: 35,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flexDirection: "row",
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowOpacity: 0.8,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: "tt-semi",
              fontSize: 20,
            }}
          >
            Skapa Konto
          </Text>
          <Feather
            name="chevron-right"
            style={{ marginLeft: 5 }}
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 35,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flexDirection: "row",
            marginTop: 20,
            backgroundColor: colors.yellow,
            padding: 10,
            shadowColor: "rgba(0,0,0,0.3)",
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowOpacity: 0.8,
            shadowRadius: 2,
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: "tt-semi",
              fontSize: 20,
            }}
          >
            Logga in
          </Text>
          <Feather
            name="chevron-right"
            style={{ marginLeft: 5 }}
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
