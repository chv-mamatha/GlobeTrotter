import { Layout } from "@/components/layout/Layout";
import { Mail, Bell } from "lucide-react";

export default function Newsletter() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Bell className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Newsletter</h1>
          <p className="text-muted-foreground">Stay updated with travel tips and destinations</p>
        </div>
        <div className="max-w-md mx-auto bg-card p-6 rounded-lg border shadow-sm">
          <div className="text-center mb-6">
            <Mail className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <p className="text-muted-foreground">Get weekly travel inspiration and exclusive deals!</p>
          </div>
          <div className="space-y-4">
            <input 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" 
              placeholder="Enter your email"
              type="email"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-lg w-full hover:bg-primary/90 transition-colors">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}