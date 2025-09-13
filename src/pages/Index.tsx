import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { VerificationUpload } from "@/components/VerificationUpload";
import { StatsSection } from "@/components/StatsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <VerificationUpload />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
