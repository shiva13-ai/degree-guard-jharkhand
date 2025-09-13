import { Shield, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-gradient-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg shadow-medium">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CertSecure</h1>
              <p className="text-sm text-muted-foreground">Jharkhand Academic Verification System</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Verify Certificate
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Institution Portal
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Admin Dashboard
            </Button>
            <Button variant="outline">
              <FileCheck className="w-4 h-4" />
              Quick Verify
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};