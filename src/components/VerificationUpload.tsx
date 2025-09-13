import { useState, useRef } from "react";
import { Upload, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

type VerificationStatus = "idle" | "uploading" | "processing" | "verified" | "invalid" | "error";

interface VerificationResult {
  status: VerificationStatus;
  studentName?: string;
  rollNumber?: string;
  institution?: string;
  degree?: string;
  year?: string;
  grade?: string;
  certificateId?: string;
  confidence?: number;
  issues?: string[];
}

export const VerificationUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<VerificationResult>({ status: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile.type.includes("pdf") && !selectedFile.type.includes("image")) {
      toast({
        title: "Invalid file type",
        description: "Please select a PDF or image file",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    setResult({ status: "idle" });
    setProgress(0);
  };

  const simulateVerification = async () => {
    if (!file) return;

    setResult({ status: "uploading" });
    setProgress(10);

    // Simulate upload
    setTimeout(() => {
      setResult({ status: "processing" });
      setProgress(30);
    }, 1000);

    // Simulate processing
    setTimeout(() => {
      setProgress(70);
    }, 2000);

    // Simulate result
    setTimeout(() => {
      setProgress(100);
      
      // Simulate different verification outcomes
      const outcomes = [
        {
          status: "verified" as const,
          studentName: "Rajesh Kumar Singh",
          rollNumber: "2019BCE001",
          institution: "National Institute of Technology Jamshedpur",
          degree: "Bachelor of Computer Engineering",
          year: "2023",
          grade: "First Class with Distinction",
          certificateId: "NIT-J-2023-BCE-001",
          confidence: 98,
        },
        {
          status: "invalid" as const,
          issues: [
            "Certificate ID not found in institutional database",
            "Signature verification failed",
            "Document tampering detected in grade field"
          ],
          confidence: 15,
        }
      ];
      
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      setResult(randomOutcome);

      if (randomOutcome.status === "verified") {
        toast({
          title: "Certificate Verified",
          description: "Document authentication successful",
        });
      } else {
        toast({
          title: "Verification Failed",
          description: "Document could not be authenticated",
          variant: "destructive",
        });
      }
    }, 3500);
  };

  const getStatusIcon = () => {
    switch (result.status) {
      case "uploading":
      case "processing":
        return <Clock className="w-6 h-6 text-primary animate-spin" />;
      case "verified":
        return <CheckCircle className="w-6 h-6 text-success" />;
      case "invalid":
      case "error":
        return <AlertCircle className="w-6 h-6 text-destructive" />;
      default:
        return <FileText className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    switch (result.status) {
      case "uploading":
        return "Uploading document...";
      case "processing":
        return "Analyzing certificate...";
      case "verified":
        return "Certificate Verified";
      case "invalid":
        return "Certificate Invalid";
      case "error":
        return "Verification Error";
      default:
        return "Ready to verify";
    }
  };

  const getStatusColor = () => {
    switch (result.status) {
      case "verified":
        return "text-success";
      case "invalid":
      case "error":
        return "text-destructive";
      case "processing":
      case "uploading":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Verify Academic Certificate</h2>
            <p className="text-lg text-muted-foreground">
              Upload your certificate for instant verification against our secure database
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="p-8 bg-gradient-card shadow-medium border-border">
              <div className="text-center">
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-8 mb-6 transition-colors hover:border-primary cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const droppedFile = e.dataTransfer.files[0];
                    if (droppedFile) handleFileSelect(droppedFile);
                  }}
                >
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Drop your certificate here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, JPG, PNG (max 10MB)
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) handleFileSelect(selectedFile);
                  }}
                  className="hidden"
                />

                {file && (
                  <div className="mb-6">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-foreground flex-1 text-left truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(1)}MB
                      </span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={simulateVerification}
                  disabled={!file || result.status === "uploading" || result.status === "processing"}
                  variant="hero"
                  size="lg"
                  className="w-full"
                >
                  {result.status === "uploading" || result.status === "processing" 
                    ? "Verifying..." 
                    : "Verify Certificate"
                  }
                </Button>
              </div>
            </Card>

            {/* Results Section */}
            <Card className="p-8 bg-gradient-card shadow-medium border-border">
              <div className="flex items-center gap-3 mb-6">
                {getStatusIcon()}
                <h3 className={`text-lg font-semibold ${getStatusColor()}`}>
                  {getStatusText()}
                </h3>
              </div>

              {(result.status === "uploading" || result.status === "processing") && (
                <div className="mb-6">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {result.status === "uploading" ? "Uploading document..." : "Analyzing with AI..."}
                  </p>
                </div>
              )}

              {result.status === "verified" && result.studentName && (
                <div className="space-y-4">
                  <div className="p-4 bg-success-light rounded-lg border border-success/20">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-semibold text-success">Verified Authentic</span>
                      <span className="text-sm text-success ml-auto">{result.confidence}% confidence</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Student Name</p>
                        <p className="font-medium text-foreground">{result.studentName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Roll Number</p>
                        <p className="font-medium text-foreground">{result.rollNumber}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Institution</p>
                        <p className="font-medium text-foreground">{result.institution}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Degree</p>
                        <p className="font-medium text-foreground">{result.degree}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Year</p>
                        <p className="font-medium text-foreground">{result.year}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Grade</p>
                        <p className="font-medium text-foreground">{result.grade}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Certificate ID</p>
                        <p className="font-medium text-foreground">{result.certificateId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {result.status === "invalid" && result.issues && (
                <div className="p-4 bg-destructive-light rounded-lg border border-destructive/20">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <span className="font-semibold text-destructive">Authentication Failed</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">Issues detected:</p>
                    {result.issues.map((issue, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-foreground">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.status === "idle" && (
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Upload a certificate to begin verification
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};