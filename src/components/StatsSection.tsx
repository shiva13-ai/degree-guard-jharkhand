import { TrendingUp, Shield, Users, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    icon: FileCheck,
    value: "50,000+",
    label: "Certificates Verified",
    description: "Successfully authenticated documents",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Shield,
    value: "99.8%",
    label: "Accuracy Rate",
    description: "AI-powered fraud detection",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    value: "200+",
    label: "Partner Institutions",
    description: "Across Jharkhand state",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: TrendingUp,
    value: "85%",
    label: "Fraud Reduction",
    description: "Since implementation",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

export const StatsSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted by Educational Institutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our verification system has become the gold standard for academic credential authentication across Jharkhand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 border-border text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bgColor} rounded-lg mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="font-semibold text-foreground">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};