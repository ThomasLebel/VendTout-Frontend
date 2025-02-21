export interface ProductType {
  _id: string;
  userID: {
    username: string;
    profilePicture: string;
  };
  title: string;
  description: string;
  photos: string[];
  gender: string;
  subCategory: string;
  brand: string;
  size: string;
  condition: string;
  color: string;
  price: number;
  nbLikes: number;
  nbViews: number;
  isSold: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ProductDefaultValues: ProductType = {
  _id: "",
  userID: {
    username: "",
    profilePicture: "",
  },
  title: "",
  description: "",
  photos: [],
  gender: "",
  subCategory: "",
  brand: "",
  size: "",
  condition: "",
  color: "",
  price: 0,
  nbLikes: 0,
  nbViews: 0,
  isSold: false,
  createdAt: "",
  updatedAt: "",
};
