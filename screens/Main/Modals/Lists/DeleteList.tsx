import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { NavigationScreenProp } from "react-navigation";
import { AuthContext } from "../../../../context/Auth";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_LIST } from "../../../../GraphQL/Mutations/mutations";
import { colors } from "../../../../constants/constants";
import { BlurView } from "expo-blur";
import { RouteProp } from "@react-navigation/native";
import {
  GET_LISTS_FOR_USER,
  GET_LIST_BY_ID,
} from "../../../../GraphQL/Queries/queries";

export default function DeleteList({
  navigation,
  route,
}: {
  navigation: NavigationScreenProp<any, any>;
  route: RouteProp<{ params: { listId: string } }, "params">;
}) {
  const { user }: any = useContext(AuthContext);
  const [showLoading, setShowLoading] = useState(false);

  const { listId } = route.params;

  const {
    refetch,
    data: listData,
    loading: listLoading,
  } = useQuery(GET_LIST_BY_ID, {
    variables: {
      listId,
    },
  });
  if (listData) var { getListById: list } = listData;

  const { refetch: listsRefetch } = useQuery(GET_LISTS_FOR_USER, {
    variables: {
      userId: user.id,
    },
  });

  const [deleteList] = useMutation(DELETE_LIST, {
    update() {
      setShowLoading(true);
      refetch();
      listsRefetch();
      setShowLoading(false);
      navigation.goBack();
    },
  });

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
      {listLoading || showLoading ? (
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
              Är du säker på att du vill ta bort listan{" "}
              <Text style={{ fontFamily: "tt-bold" }}>{list.title}</Text>?
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
                deleteList({
                  variables: {
                    userId: user.id,
                    listId,
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
