export type Product = {
  _id: string;
  name: string;
  batch: string;
  description: string;
  disclaimers: string;
  benefits: string[];
  prices: {
    unit: string;
    quantity: number;
    price: number;
  }[];
  photo: string[];
  category: string;
  experiences: string[];
  dosage: string;
  coas: string[];
  restrictedStates: {
    state: string;
    expirationDate: string; // ISO date string
  }[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type GetAllProductsResponse = {
  success: boolean;
  data: Product[];
  count: number;
  total: number;
  page: number;
  pages: number;
};
