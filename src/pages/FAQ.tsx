import { Layout } from "@/components/layout/Layout";
import { HelpCircle, CheckCircle } from "lucide-react";

export default function FAQ() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">FAQ</h1>
          <p className="text-muted-foreground">Frequently Asked Questions</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Is GlobeTrotter free?</h3>
                <p className="text-muted-foreground">Yes, basic features are free. Premium features available for advanced planning.</p>
              </div>
            </div>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Can I share my trips?</h3>
                <p className="text-muted-foreground">Yes, you can share itineraries with the community and get feedback.</p>
              </div>
            </div>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">How do I track expenses?</h3>
                <p className="text-muted-foreground">Use the budget tracking feature in your dashboard for real-time expense monitoring.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}