import { Shield, Upload, Search, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl shadow-strong">
              <Shield className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Secure Academic
            <span className="bg-gradient-primary bg-clip-text text-transparent block">
              Verification System
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Protecting academic integrity across Jharkhand with AI-powered certificate verification, 
            blockchain security, and real-time fraud detection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="xl" className="min-w-48">
              <Upload className="w-5 h-5" />
              Verify Certificate
            </Button>
            <Button variant="outline" size="xl" className="min-w-48">
              <Search className="w-5 h-5" />
              Institution Login
            </Button>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border">
              <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mb-4 mx-auto">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered Detection</h3>
              <p className="text-muted-foreground text-sm">
                Advanced OCR and machine learning algorithms detect tampered documents and forged credentials instantly.
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Blockchain Security</h3>
              <p className="text-muted-foreground text-sm">
                Immutable verification records with cryptographic validation ensure document authenticity.
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 mx-auto">
                <Upload className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Instant Verification</h3>
              <p className="text-muted-foreground text-sm">
                Real-time document processing with comprehensive database cross-referencing in seconds.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};