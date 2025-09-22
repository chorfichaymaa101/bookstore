import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="w-full max-w-md">
        <Card className="text-center">
          <CardHeader>
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <CardTitle>Order Submitted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>✔ Please verify your email and keep your phone active for updates.</p>
            <Button onClick={goHome} size="lg" className="mt-4 w-full">
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
