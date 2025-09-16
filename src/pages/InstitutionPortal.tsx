import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Building, Upload, Search, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const InstitutionPortal = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { toast } = useToast();

  const institutionStats = [
    { label: 'Certificates Issued', value: '1,234', icon: FileText },
    { label: 'Verified This Month', value: '156', icon: CheckCircle },
    { label: 'Pending Verifications', value: '23', icon: AlertCircle },
  ];

  const handleUploadCertificate = () => {
    toast({
      title: "Upload Certificate",
      description: "Certificate upload interface would open here",
    });
  };

  const handleBulkUpload = () => {
    toast({
      title: "Bulk Upload",
      description: "Bulk certificate upload interface would open here",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Institution Portal</h1>
          <p className="text-muted-foreground">Manage your institution's certificates and verification requests</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {institutionStats.map((stat, index) => (
            <Card key={index} className="p-6 bg-gradient-card shadow-medium border-border">
              <div className="flex items-center gap-4">
                <stat.icon className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-6">
          {['dashboard', 'upload', 'search', 'reports'].map((section) => (
            <Button
              key={section}
              variant={activeSection === section ? "default" : "outline"}
              onClick={() => setActiveSection(section)}
              className="capitalize"
            >
              {section}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        {activeSection === 'dashboard' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card shadow-medium border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Certificate Verified</p>
                    <p className="text-sm text-muted-foreground">Rajesh Kumar - BCE-2023-001</p>
                  </div>
                  <span className="text-xs text-success">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">New Certificate Added</p>
                    <p className="text-sm text-muted-foreground">Priya Sharma - BCE-2023-002</p>
                  </div>
                  <span className="text-xs text-muted-foreground">5 hours ago</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-medium border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start gap-3" onClick={handleUploadCertificate}>
                  <Upload className="w-4 h-4" />
                  Upload Single Certificate
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" onClick={handleBulkUpload}>
                  <FileText className="w-4 h-4" />
                  Bulk Upload Certificates
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Search className="w-4 h-4" />
                  Search Certificates
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'upload' && (
          <Card className="p-8 bg-gradient-card shadow-medium border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Add New Certificate</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input id="studentName" placeholder="Enter student full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateNumber">Certificate Number</Label>
                  <Input id="certificateNumber" placeholder="Enter certificate number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input id="courseName" placeholder="Enter course name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completionDate">Completion Date</Label>
                  <Input id="completionDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/Marks</Label>
                  <Input id="grade" placeholder="Enter grade or marks" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documentType">Document Type</Label>
                  <Input id="documentType" placeholder="e.g., Degree, Diploma" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metadata">Additional Information</Label>
                <Textarea id="metadata" placeholder="Any additional information about the certificate" />
              </div>
              <Button type="submit" className="w-full">
                Add Certificate to Database
              </Button>
            </form>
          </Card>
        )}

        {activeSection === 'search' && (
          <Card className="p-6 bg-gradient-card shadow-medium border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Search Certificates</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input placeholder="Search by student name, certificate number, or course" className="flex-1" />
                <Button variant="outline">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Enter search criteria to find certificates</p>
              </div>
            </div>
          </Card>
        )}

        {activeSection === 'reports' && (
          <Card className="p-6 bg-gradient-card shadow-medium border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Reports & Analytics</h3>
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Reports and analytics interface coming soon</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InstitutionPortal;