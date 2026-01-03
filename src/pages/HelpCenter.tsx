import { Layout } from "@/components/layout/Layout";
import { HelpCircle, MessageCircle, Book, Mail } from "lucide-react";

export default function HelpCenter() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Help Center</h1>
          <p className="text-muted-foreground">Find answers to common questions</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <Book className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold mb-2">How to plan a trip?</h3>
            <p className="text-muted-foreground">Use our trip planning tool to create detailed itineraries with budget tracking.</p>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <MessageCircle className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-semibold mb-2">Budget tracking</h3>
            <p className="text-muted-foreground">Track expenses and set budgets for your travels with real-time updates.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}