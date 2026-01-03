import { ReactNode } from "react";
import { Header } from "./Header";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export function Layout({ children, showHeader = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showHeader && <Header />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex-1 ${showHeader ? "pt-16" : ""}`}
      >
        {children}
      </motion.main>
      
      <footer className="bg-[#8b5a2b] text-white text-center py-4">
        <p>© 2026 GlobeTrotter. Empowering Personalized Travel Planning.</p>
      </footer>
    </div>
  );
}
