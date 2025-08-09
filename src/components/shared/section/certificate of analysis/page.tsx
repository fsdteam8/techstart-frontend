import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CertificateOfAnalysis = () => {
  return (
    <div>
      <Card className="bg-primary text-white p-2 md:p-5 my-auto">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start gap-y-[30px] md:items-center justify-between">
            <div>
              <CardTitle className="mb-5">Certificate of Analysis</CardTitle>
              <CardDescription className="text-white/80">
                Each of our products is independently tested by third-party
                laboratories to confirm compliance with federal laws and health
                regulations.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="text-white w-fit border-white/50 hover:bg-white/10"
            >
              See analysis certificate
            </Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default CertificateOfAnalysis;
