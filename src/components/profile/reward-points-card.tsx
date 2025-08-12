import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RewardPointsCardProps {
  points: number;
}

export function RewardPointsCard({ points }: RewardPointsCardProps) {
  return (
    <Card className="bg-[#D1C6EC] border-[#d1c6ec]  md:m-8 !mr-0 w-[341px] ">
      <CardContent className="p-4 text-center space-y-5">
        <p className="md:text-[24px] font-semibold text-[#645949]">
          Reward Points
        </p>
        <p className="md:text-[48px] text-2xl font-black text-[#645949]">
          {points}
        </p>
        <Button
          size="lg"
          className=" p-4 bg-[#6B46C1] hover:bg-[#301f57] font-medium"
        >
          💎 Use points
        </Button>
      </CardContent>
    </Card>
  );
}
