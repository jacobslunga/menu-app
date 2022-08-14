import { gql } from "@apollo/client";

// User Queries

export const GET_USER_BY_ID = gql`
  query getUserById($userId: String!) {
    getUserById(userId: $userId) {
      id
      fullName
      email
      firstName
      lastName
      imageUrl
      birthday
      sex
      meals {
        title
        mealId
      }
      color
    }
  }
`;

export const GET_LISTS_FOR_USER = gql`
  query getListsForUser($userId: String!) {
    getListsForUser(userId: $userId) {
      listId
      title
      createdAt
      isCurrent
      currentWeek
      meals {
        title
        mealId
        day
      }
    }
  }
`;

export const SHUFFLE_USER_LIST = gql`
  query shuffleUserList($userId: String!) {
    shuffleUserList(userId: $userId) {
      title
      mealId
      userId
      day
    }
  }
`;

// Meal Queries

export const GET_MEAL_BY_ID = gql`
  query getMealById($mealId: String!) {
    getMealById(mealId: $mealId) {
      title
      mealId
      createdAt
      userId
    }
  }
`;

export const GET_ALL_MEAL = gql`
  query getAllMeals {
    getAllMeals {
      title
      mealId
      createdAt
      userId
    }
  }
`;

// List Queries

export const GET_LIST_BY_ID = gql`
  query getListById($listId: String!) {
    getListById(listId: $listId) {
      isCurrent
      title
      listId
    }
  }
`;
