"use client";

import { useQuery } from "@tanstack/react-query";

interface PurchaseItem {
  name: string;
  id: string;
  amount: string;
  date: string;
  points: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Array<{
    _id: string;
    userId: {
      _id: string;
      firstName: string | null;
      lastName: string | null;
      userName: string;
      points: number;
    };
    orderId: {
      _id: string;
      product: {
        _id: string;
        name: string;
        batch: string;
        id: string;
      };
      quantity: number;
      totalAmount: number;
      purchaseDate: string;
    };
    quantity: number;
    amount: number;
    transactionId: string;
    status: string;
    __v: number;
  }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface UsePurchaseHistoryResult {
  purchaseHistory: PurchaseItem[];
  pagination: PaginationInfo | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const fetchPurchaseHistory = async (
  page = 1,
  limit = 10,
  token?: string
): Promise<{ items: PurchaseItem[]; pagination: PaginationInfo }> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log("Token is present:", token.slice(0, 10) + "...");
  } else {
    console.log("No token provided");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/my-payment?page=${page}&limit=${limit}`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse = await response.json();
  console.log("API Response:", data);

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch purchase history");
  }

  console.log("API Data before transformation:", data.data);

  // Transform API data to match component interface
  const transformedData: PurchaseItem[] = data.data.map((item) => ({
    name: item.orderId.product?.name || "Product Unavailable",
    id: item.orderId.product?.id || item.orderId._id,
    amount: `$${item.amount.toFixed(2)}`,
    date: new Date(item.orderId.purchaseDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    points: item.userId.points,
  }));

  console.log("Transformed Data:", transformedData);

  return {
    items: transformedData,
    pagination: data.pagination,
  };
};

export function usePurchaseHistory(
  page = 1,
  limit = 10,
  token?: string
): UsePurchaseHistoryResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["purchase-history", page, limit, token],
    queryFn: () => fetchPurchaseHistory(page, limit, token),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!token, // Only run query if token is available
  });

  return {
    purchaseHistory: data?.items || [],
    pagination: data?.pagination || null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
