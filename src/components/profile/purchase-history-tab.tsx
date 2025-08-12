interface PurchaseItem {
  name: string;
  id: string;
  amount: string;
  date: string;
  points: number;
}

interface PurchaseHistoryTabProps {
  purchaseHistory: PurchaseItem[];
}

export function PurchaseHistoryTab({
  purchaseHistory,
}: PurchaseHistoryTabProps) {
  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#6B46C1] !rounded-lg text-white">
              <th className="text-left py-3 px-4 font-medium">Product Name</th>
              <th className="text-left py-3 px-4 font-medium">Product ID</th>
              <th className="text-left py-3 px-4 font-medium">Amount</th>
              <th className="text-left py-3 px-4 font-medium">Purchase Date</th>
              <th className="text-left py-3 px-4 font-medium">Points</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory.map((item, index) => (
              <tr
                key={index}
                className="bg-[#F0EDF9] border border-[#6B46C1] p-5"
              >
                <td className="py-3 px-4 text-[#000000] font-semibold text-2xl">
                  {item.name}
                </td>
                <td className="py-3 px-4 text-[#645949] text-base font-medium">
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
  );
}
