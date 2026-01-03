import { Layout } from "@/components/layout/Layout";
import { BookOpen, Calendar, User } from "lucide-react";

export default function TravelBlog() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Travel Blog</h1>
          <p className="text-muted-foreground">Stories and tips from fellow travelers</p>
        </div>
        <div className="grid gap-6 max-w-4xl mx-auto">
          <article className="p-6 border rounded-lg hover:shadow-md transition-shadow bg-card">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar className="h-4 w-4" />
              <span>January 15, 2026</span>
              <User className="h-4 w-4 ml-2" />
              <span>Travel Team</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">Top 10 Travel Destinations 2026</h2>
            <p className="text-muted-foreground mb-4">Discover the most amazing places to visit this year, from hidden gems to popular hotspots...</p>
            <button className="text-primary hover:underline font-medium">Read More →</button>
          </article>
          <article className="p-6 border rounded-lg hover:shadow-md transition-shadow bg-card">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar className="h-4 w-4" />
              <span>January 10, 2026</span>
              <User className="h-4 w-4 ml-2" />
              <span>Budget Expert</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">Budget Travel Tips</h2>
            <p className="text-muted-foreground mb-4">Learn how to travel more while spending less with these proven strategies and insider tips...</p>
            <button className="text-primary hover:underline font-medium">Read More →</button>
          </article>
        </div>
      </div>
    </Layout>
  );
}