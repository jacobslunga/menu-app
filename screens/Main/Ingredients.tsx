import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors } from "../../constants/constants";
import { Feather } from "@expo/vector-icons";
import { IUser } from "../../util/Interfaces";
import { AuthContext } from "../../context/Auth";
import { useQuery } from "@apollo/client";
import { GET_LISTS_FOR_USER } from "../../GraphQL/Queries/queries";
import { NavigationScreenProp } from "react-navigation";
import axios from "axios";

export default function Ingredients({
  navigation,
}: {
  navigation: NavigationScreenProp<any, any>;
}) {
  const [ingredients1, setIngredients1] = useState<Array<any>>([]);
  const [ingredients2, setIngredients2] = useState<Array<any>>([]);
  const [ingredients3, setIngredients3] = useState<Array<any>>([]);
  const [ingredients4, setIngredients4] = useState<Array<any>>([]);
  const [ingredients5, setIngredients5] = useState<Array<any>>([]);
  const [ingredients6, setIngredients6] = useState<Array<any>>([]);
  const [ingredients7, setIngredients7] = useState<Array<any>>([]);
  const { user }: IUser = useContext(AuthContext);

  const { data: listData, loading: listLoading } = useQuery(
    GET_LISTS_FOR_USER,
    {
      variables: {
        userId: user.id,
      },
    }
  );
  if (listData) var { getListsForUser: lists } = listData;
  const currentList = listLoading
    ? null
    : lists.find((list: any) => list.isCurrent);

  useEffect(() => {
    if (!listLoading) {
      currentList.meals.map((meal: any, i: number) => {
        axios
          .get(
            `https://menu-python-server.herokuapp.com/api/v1/get_ingredients/${meal.title}`
          )

          .catch((e) => console.error(e));
      });
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {listLoading ? (
          <>
            <ActivityIndicator size="large" />
          </>
        ) : (
          <>
            <View
              style={{
                height: "10%",
                position: "absolute",
                top: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: Dimensions.get("screen").width,
              }}
            >
              <Pressable
                style={{ position: "absolute", left: "2%" }}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Feather name="chevron-left" color={colors.black} size={30} />
              </Pressable>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: "tt-bold",
                  fontSize: 20,
                }}
              >
                Inköpslista
              </Text>
            </View>
            <View
              style={{
                height: "90%",
                width: Dimensions.get("screen").width,
                position: "absolute",
                bottom: 0,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: Dimensions.get("screen").width,
                  flexDirection: "column",
                }}
                showsVerticalScrollIndicator={false}
              >
                {/* {currentList.meals.map((meal: any, i: number) => (
                  <Pressable
                    key={meal.mealId + String(i)}
                    style={{
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: colors.nice_beige,
                      marginTop: 10,
                      width: "90%",
                      flexDirection: "column",
                      marginBottom:
                        i === currentList.meals.length - 1 ? 30 : 10,
                    }}
                  >
                    <Text style={{ fontFamily: "tt-bold" }}>{meal.title}</Text>

                  </Pressable>
                ))} */}
                {ingredients1.map((ingredient: any, i: number) => {
                  return (
                    <View
                      key={ingredient.title + String(i)}
                      style={{
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: colors.nice_beige,
                        marginTop: 10,
                        width: "90%",
                        flexDirection: "column",
                      }}
                    >
                      <Text style={{ fontFamily: "tt-semi", marginTop: 10 }}>
                        {ingredient.title}
                      </Text>
                      {ingredient.ingredients.map((ingr: any) => (
                        <Text
                          style={{
                            fontFamily: "tt-reg",
                            marginTop: i === 0 ? 10 : 5,
                          }}
                        >
                          {ingr}
                        </Text>
                      ))}
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
