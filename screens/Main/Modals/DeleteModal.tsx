import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { NavigationScreenProp } from "react-navigation";
import { AuthContext } from "../../../context/Auth";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_MEAL } from "../../../GraphQL/Mutations/mutations";
import { colors } from "../../../constants/constants";
import { BlurView } from "expo-blur";
import { RouteProp } from "@react-navigation/native";
import {
  GET_MEAL_BY_ID,
  GET_USER_BY_ID,
} from "../../../GraphQL/Queries/queries";
import { IUser } from "../../../util/Interfaces";

export default function DeleteModal({
  navigation,
  route,
}: {
  navigation: NavigationScreenProp<any, any>;
  route: RouteProp<{ params: { mealId: string } }, "params">;
}) {
  const { user }: IUser = useContext(AuthContext);
  const [showLoading, setShowLoading] = useState(false);
  const { refetch } = useQuery(GET_USER_BY_ID, {
    variables: {
      userId: user.id,
    },
  });

  const { mealId } = route.params;

  const [removeMeal] = useMutation(REMOVE_MEAL, {
    update() {
      setShowLoading(true);
      refetch();
      setShowLoading(false);
      navigation.goBack();
    },
  });

  const { data: mealData, loading: mealLoading } = useQuery(GET_MEAL_BY_ID, {
    variables: {
      mealId,
    },
  });
  if (mealData) var { getMealById: meal } = mealData;

  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      {mealLoading || showLoading ? (
        <>
          <ActivityIndicator size="large" color={colors.white} />
          {showLoading && (
            <Text
              style={{
                fontFamily: "tt-bold",
                fontSize: 18,
                marginTop: 5,
                color: colors.white,
              }}
            >
              Raderar...
            </Text>
          )}
        </>
      ) : (
        <>
          <View
            style={{
              height: 300,
              width: 300,
              borderRadius: 10,
              backgroundColor: "rgba(255,255,255,1)",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colors.black,
                fontFamily: "tt-med",
                fontSize: 18,
                maxWidth: "90%",
                textAlign: "center",
              }}
            >
              Är du säker på att du vill ta bort{" "}
              <Text style={{ fontFamily: "tt-bold" }}>{meal.title}</Text>?
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.orange,
                borderRadius: 35,
                padding: 10,
                width: "40%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
              onPress={() => {
                removeMeal({
                  variables: {
                    mealId,
                    userId: user.id,
                  },
                });
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontFamily: "tt-semi",
                  fontSize: 15,
                }}
              >
                Ta bort
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={{ fontFamily: "tt-med" }}>Avbryt</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
