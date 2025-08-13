"use client";
import {
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { usePurchaseHistory } from "@/hooks/use-purchase-history";

// interface PurchaseItem {
//   name: string;
//   id: string;
//   amount: string;
//   date: string;
//   points: number;
// }

// interface PaginationInfo {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   itemsPerPage: number;
// }

interface PurchaseHistoryTabProps {
  page?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export function PurchaseHistoryTab({
  page = 1,
  limit = 10,
  onPageChange,
  onLimitChange,
}: PurchaseHistoryTabProps) {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken as string;

  const { purchaseHistory, pagination, isLoading, error, refetch } =
    usePurchaseHistory(page, limit, token);
  console.log("Purchase History:", purchaseHistory);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2 text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Loading session...</span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="py-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please sign in to view your purchase history.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2 text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Loading purchase history...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error.message}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              className="ml-4 bg-transparent"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (purchaseHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-muted-foreground mb-4">
          <svg
            className="h-12 w-12 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h3 className="text-lg font-medium mb-2">No purchases yet</h3>
          <p className="text-sm">
            Your purchase history will appear here once you make your first
            purchase.
          </p>
        </div>
        <Button variant="outline" onClick={refetch}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Purchase History</h2>
          {pagination && (
            <span className="text-sm text-muted-foreground">
              {pagination.totalItems} total items
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Items per page selector */}
          {onLimitChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show:</span>
              <Select
                value={pagination?.itemsPerPage.toString() || "10"}
                onValueChange={(value) => onLimitChange(Number.parseInt(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button variant="outline" size="sm" onClick={refetch}>
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="bg-[#6B46C1] text-white">
                <th className="text-left py-3 px-4 font-medium rounded-tl-lg">
                  Product Name
                </th>
                <th className="text-left py-3 px-4 font-medium">Product ID</th>
                <th className="text-left py-3 px-4 font-medium">Amount</th>
                <th className="text-left py-3 px-4 font-medium">
                  Purchase Date
                </th>
                <th className="text-left py-3 px-4 font-medium rounded-tr-lg">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((item, index) => (
                <tr
                  key={index}
                  className="bg-[#F0EDF9] border-b border-[#6B46C1] hover:bg-[#E8E3F3] transition-colors"
                >
                  <td className="py-3 px-4 text-[#000000] font-semibold text-lg">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 text-[#645949] text-sm font-medium font-mono">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 text-[#645949] text-base font-medium">
                    {item.amount}
                  </td>
                  <td className="py-3 px-4 text-[#645949] text-base font-medium">
                    {item.date}
                  </td>
                  <td className="py-3 px-4 text-[#645949] text-base font-medium">
                    {item.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {purchaseHistory.map((item, index) => (
          <div
            key={index}
            className="bg-[#F0EDF9] border border-[#6B46C1] rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-[#000000] font-semibold text-lg leading-tight">
                {item.name}
              </h3>
              <span className="text-[#645949] text-base font-medium bg-white px-2 py-1 rounded">
                {item.amount}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#645949] font-medium">Product ID:</span>
                <span className="text-[#645949] font-mono text-xs">
                  {item.id}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#645949] font-medium">
                  Purchase Date:
                </span>
                <span className="text-[#645949]">{item.date}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#645949] font-medium">Points:</span>
                <span className="text-[#645949]">{item.points}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
            to{" "}
            {Math.min(
              pagination.currentPage * pagination.itemsPerPage,
              pagination.totalItems
            )}{" "}
            of {pagination.totalItems} results
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {/* Show page numbers */}
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  let pageNum: number;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (
                    pagination.currentPage >=
                    pagination.totalPages - 2
                  ) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={
                        pageNum === pagination.currentPage
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => onPageChange?.(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                }
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 p-4 bg-[#F0EDF9] border border-[#6B46C1] rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="text-[#645949] font-medium">
            {pagination
              ? `Page ${pagination.currentPage} of ${pagination.totalPages}`
              : `Total Purchases: ${purchaseHistory.length}`}
          </span>
          <span className="text-[#645949] font-medium">
            Page Total: $
            {purchaseHistory
              .reduce((sum, item) => {
                const amount = Number.parseFloat(item.amount.replace("$", ""));
                return sum + amount;
              }, 0)
              .toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
