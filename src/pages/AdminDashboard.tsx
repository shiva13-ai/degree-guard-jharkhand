import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Shield, Building, Users, FileCheck, Plus, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Verifications', value: '12,543', icon: FileCheck, color: 'text-blue-600' },
    { label: 'Active Institutions', value: '245', icon: Building, color: 'text-green-600' },
    { label: 'Registered Users', value: '8,924', icon: Users, color: 'text-purple-600' },
    { label: 'Success Rate', value: '94.2%', icon: Shield, color: 'text-emerald-600' },
  ];

  const recentVerifications = [
    { id: '1', student: 'Rajesh Kumar', institution: 'NIT Jamshedpur', status: 'Verified', date: '2024-01-15' },
    { id: '2', student: 'Priya Sharma', institution: 'BIT Mesra', status: 'Pending', date: '2024-01-15' },
    { id: '3', student: 'Amit Singh', institution: 'IIT Dhanbad', status: 'Invalid', date: '2024-01-14' },
  ];

  const handleAddInstitution = () => {
    toast({
      title: "Add Institution",
      description: "Institution management interface would open here",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage institutions, users, and verification requests</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-gradient-card shadow-medium border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          {['overview', 'institutions', 'users', 'verifications'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-card shadow-medium border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Verifications</h3>
              <div className="space-y-3">
                {recentVerifications.map((verification) => (
                  <div key={verification.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{verification.student}</p>
                      <p className="text-sm text-muted-foreground">{verification.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        verification.status === 'Verified' ? 'text-success' :
                        verification.status === 'Pending' ? 'text-warning' : 'text-destructive'
                      }`}>
                        {verification.status}
                      </p>
                      <p className="text-xs text-muted-foreground">{verification.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-medium border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start gap-3" onClick={handleAddInstitution}>
                  <Plus className="w-4 h-4" />
                  Add New Institution
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Search className="w-4 h-4" />
                  Search Verifications
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <FileCheck className="w-4 h-4" />
                  Generate Reports
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'institutions' && (
          <Card className="p-6 bg-gradient-card shadow-medium border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Institution Management</h3>
              <Button onClick={handleAddInstitution} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Institution
              </Button>
            </div>
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Institution management interface coming soon</p>
            </div>
          </Card>
        )}

        {activeTab === 'users' && (
          <Card className="p-6 bg-gradient-card shadow-medium border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">User Management</h3>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">User management interface coming soon</p>
            </div>
          </Card>
        )}

        {activeTab === 'verifications' && (
          <Card className="p-6 bg-gradient-card shadow-medium border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Verification Management</h3>
            <div className="text-center py-12">
              <FileCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Verification management interface coming soon</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;