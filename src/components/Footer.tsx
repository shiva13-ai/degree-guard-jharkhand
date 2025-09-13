import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg shadow-medium">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">CertSecure</h3>
                <p className="text-sm text-muted-foreground">Academic Verification System</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Protecting academic integrity across Jharkhand with cutting-edge verification technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-primary">
                Verify Certificate
              </Button>
              <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-primary">
                Institution Portal
              </Button>
              <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-primary">
                Admin Dashboard
              </Button>
              <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-primary">
                API Documentation
              </Button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Support</h4>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-primary">
                Help Center
              </Button>
              <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-primary">
                User Guide
              </Button>
              <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-primary">
                Contact Support
              </Button>
              <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-muted-foreground hover:text-primary">
                System Status
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                support@certsecure.gov.in
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                +91 651-2345-678
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Higher Education Department<br />Government of Jharkhand<br />Ranchi - 834001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 CertSecure - Government of Jharkhand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};