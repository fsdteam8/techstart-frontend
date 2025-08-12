interface RewardPointsCardProps {
  points: number;
}

export function RewardPointsCard({ points }: RewardPointsCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 min-w-[200px]">
      <div className="text-center">
        <div className="text-2xl font-bold text-[#6B46C1] mb-1">
          {points.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">Reward Points</div>
      </div>
    </div>
  );
}
