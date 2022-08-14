import { gql } from "@apollo/client";

// User Mutations

export const REGISTER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmedPassword: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      confirmedPassword: $confirmedPassword
    ) {
      token
      id
      firstName
      lastName
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      id
      firstName
      lastName
    }
  }
`;

export const CHANGE_NAME = gql`
  mutation changeName($userId: String!, $newName: String!) {
    changeName(userId: $userId, newName: $newName) {
      id
      firstName
    }
  }
`;

export const CHANGE_EMAIL = gql`
  mutation changeEmail($userId: String!, $newEmail: String!) {
    changeEmail(userId: $userId, newEmail: $newEmail) {
      id
      firstName
    }
  }
`;

export const CHANGE_BIRTHDAY = gql`
  mutation changeBirthday($userId: String!, $birthday: String!) {
    changeBirthday(userId: $userId, birthday: $birthday) {
      fullName
      id
      birthday
    }
  }
`;

export const CHANGE_SEX = gql`
  mutation changeSex($userId: String!, $sex: String!) {
    changeSex(userId: $userId, sex: $sex) {
      fullName
      id
      sex
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $userId: String!
    $newPassword: String!
    $oldPassword: String!
  ) {
    changePassword(
      userId: $userId
      newPassword: $newPassword
      oldPassword: $oldPassword
    ) {
      id
      firstName
    }
  }
`;

export const CHANGE_USER_COLOR = gql`
  mutation changeUserColor($userId: String!, $color: String!) {
    changeUserColor(userId: $userId, color: $color) {
      id
      firstName
      color
    }
  }
`;

export const CHANGE_USER_IMAGE_URL = gql`
  mutation changeUserImageUrl($userId: String!, $imageUrl: String!) {
    changeUserImageUrl(userId: $userId, imageUrl: $imageUrl) {
      id
      firstName
      color
    }
  }
`;

// Meal Mutations

export const ADD_MEAL = gql`
  mutation addMeal($userId: String!, $title: String!) {
    addMeal(userId: $userId, title: $title) {
      title
    }
  }
`;

export const REMOVE_MEAL = gql`
  mutation removeMeal($userId: String!, $mealId: String!) {
    removeMeal(userId: $userId, mealId: $mealId) {
      id
      firstName
    }
  }
`;

// List Mutations

export const CREATE_LIST_FROM_MEALS = gql`
  mutation createListFromMeals(
    $userId: String!
    $title: String!
    $mealId1: String!
    $mealId2: String!
    $mealId3: String!
    $mealId4: String!
    $mealId5: String!
    $mealId6: String!
    $mealId7: String!
  ) {
    createListFromMeals(
      userId: $userId
      title: $title
      mealId1: $mealId1
      mealId2: $mealId2
      mealId3: $mealId3
      mealId4: $mealId4
      mealId5: $mealId5
      mealId6: $mealId6
      mealId7: $mealId7
    ) {
      listId
      title
    }
  }
`;

export const SET_IS_CURRENT = gql`
  mutation setIsCurrent($listId: String!, $week: Int!) {
    setIsCurrent(listId: $listId, week: $week) {
      listId
      title
    }
  }
`;

export const SET_IS_NOT_CURRENT = gql`
  mutation setIsNotCurrent($listId: String!) {
    setIsNotCurrent(listId: $listId) {
      listId
      title
    }
  }
`;

export const DELETE_LIST = gql`
  mutation deleteList($userId: String!, $listId: String!) {
    deleteList(userId: $userId, listId: $listId) {
      fullName
      id
    }
  }
`;
