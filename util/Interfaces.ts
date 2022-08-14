// User Interface
interface IUser {
  user: {
    fullName: string;
    token: string;
    email: string;
    imageUrl: string | null;
    id: string;
    firstName: string;
    lastName: string;
  };
}

// Ingredient Interface
interface Ingredient {
  title: string;
  ingredients: any;
}

// List Interface
interface IList {
  title: string;
  listId: string;
  userId: string;
  isCurrent: boolean;
  currentWeek: number;
  createdAt: string;
  meals: [];
}

interface IMeal {
  title: string;
  userId: string;
  createdAt: string;
  mealId: string;
}

export { IUser, Ingredient, IList, IMeal };
