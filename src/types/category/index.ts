export type Category = {
  _id: string;
  id: string;
  categoryName: string;
  image: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type GetAllCategoriesResponse = {
  success: boolean;
  message: string;
  data: Category[];
};
