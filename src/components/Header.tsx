import { Shield, FileCheck, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, userType, signOut } = useAuth();
  const navigate = useNavigate();
  
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
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary"
              onClick={() => navigate('/')}
            >
              Verify Certificate
            </Button>
            {userType === 'institution' && (
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary"
                onClick={() => navigate('/institution')}
              >
                Institution Portal
              </Button>
            )}
            {userType === 'admin' && (
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary"
                onClick={() => navigate('/admin')}
              >
                Admin Dashboard
              </Button>
            )}
            
            <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{user?.email}</span>
            </div>
            
            <Button 
              variant="outline" 
              onClick={signOut}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};