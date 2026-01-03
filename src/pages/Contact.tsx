import { Layout } from "@/components/layout/Layout";
import { Mail, Send, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground">We'd love to hear from you</p>
        </div>
        <div className="max-w-md mx-auto bg-card p-6 rounded-lg border shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Name</label>
              <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary" type="email" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Message</label>
              <textarea className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-primary"></textarea>
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-primary/90">
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}