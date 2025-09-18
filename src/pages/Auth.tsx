import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, Shield, LogIn, UserPlus, Building, User, Settings } from 'lucide-react';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<'user' | 'institution' | 'admin' | 'employer'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validDomains, setValidDomains] = useState<string[]>([]);
  
  const { signUp, signIn, user } = useAuth();
  const { toast } = useToast();

  // Fetch valid institution domains
  useEffect(() => {
    const fetchValidDomains = async () => {
      const { data } = await supabase
        .from('institutions_domains')
        .select('domain')
        .eq('is_verified', true);
      
      if (data) {
        setValidDomains(data.map(item => item.domain));
      }
    };
    
    fetchValidDomains();
  }, []);

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const validateInstitutionEmail = (email: string): boolean => {
    const domain = email.split('@')[1];
    return validDomains.includes(domain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate institution email domain
      if (isSignUp && userType === 'institution') {
        if (!validateInstitutionEmail(email)) {
          toast({
            title: "Invalid Institution Email",
            description: "Please use your official institution email address. Contact support if your institution is not listed.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      }

      let result;
      if (isSignUp) {
        result = await signUp(email, password, fullName, userType);
      } else {
        result = await signIn(email, password);
      }

      if (result.error) {
        toast({
          title: isSignUp ? "Sign Up Failed" : "Sign In Failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: isSignUp ? "Sign Up Successful" : "Welcome Back",
          description: isSignUp 
            ? "Please check your email to confirm your account" 
            : "You have been signed in successfully",
        });
        
        if (!isSignUp) {
          // signIn success will trigger redirect via AuthContext
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">VerifyEd</h1>
          </div>
          <p className="text-muted-foreground">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        <Card className="p-8 bg-gradient-card shadow-elegant border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Type Selection for both Login and Sign Up */}
            <div className="space-y-4">
              <Label>Account Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={userType === 'user' ? 'default' : 'outline'}
                  className="p-3 h-auto flex-col gap-2 text-xs"
                  onClick={() => setUserType('user')}
                >
                  <User className="w-5 h-5" />
                  <span>Personal User</span>
                  <span className="text-xs text-muted-foreground">Verify certificates</span>
                </Button>
                <Button
                  type="button"
                  variant={userType === 'employer' ? 'default' : 'outline'}
                  className="p-3 h-auto flex-col gap-2 text-xs"
                  onClick={() => setUserType('employer')}
                >
                  <Building className="w-5 h-5" />
                  <span>Employer</span>
                  <span className="text-xs text-muted-foreground">Verify candidates</span>
                </Button>
                <Button
                  type="button"
                  variant={userType === 'institution' ? 'default' : 'outline'}
                  className="p-3 h-auto flex-col gap-2 text-xs"
                  onClick={() => setUserType('institution')}
                >
                  <Building className="w-5 h-5" />
                  <span>Institution</span>
                  <span className="text-xs text-muted-foreground">Issue certificates</span>
                </Button>
                <Button
                  type="button"
                  variant={userType === 'admin' ? 'default' : 'outline'}
                  className="p-3 h-auto flex-col gap-2 text-xs"
                  onClick={() => setUserType('admin')}
                >
                  <Settings className="w-5 h-5" />
                  <span>Admin</span>
                  <span className="text-xs text-muted-foreground">System management</span>
                </Button>
              </div>
            </div>
            
            {isSignUp && (
              <>
                <div className="space-y-4">
                  <Label>Account Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={userType === 'user' ? 'default' : 'outline'}
                      className="p-3 h-auto flex-col gap-2 text-xs"
                      onClick={() => setUserType('user')}
                    >
                      <User className="w-5 h-5" />
                      <span>Personal User</span>
                      <span className="text-xs text-muted-foreground">Verify certificates</span>
                    </Button>
                    <Button
                      type="button"
                      variant={userType === 'employer' ? 'default' : 'outline'}
                      className="p-3 h-auto flex-col gap-2 text-xs"
                      onClick={() => setUserType('employer')}
                    >
                      <Building className="w-5 h-5" />
                      <span>Employer</span>
                      <span className="text-xs text-muted-foreground">Verify candidates</span>
                    </Button>
                    <Button
                      type="button"
                      variant={userType === 'institution' ? 'default' : 'outline'}
                      className="p-3 h-auto flex-col gap-2 text-xs"
                      onClick={() => setUserType('institution')}
                    >
                      <Building className="w-5 h-5" />
                      <span>Institution</span>
                      <span className="text-xs text-muted-foreground">Issue certificates</span>
                    </Button>
                    <Button
                      type="button"
                      variant={userType === 'admin' ? 'default' : 'outline'}
                      className="p-3 h-auto flex-col gap-2 text-xs"
                      onClick={() => setUserType('admin')}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Admin</span>
                      <span className="text-xs text-muted-foreground">System management</span>
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    {userType === 'institution' ? 'Institution Name' : 
                     userType === 'admin' ? 'Admin Name' : 
                     userType === 'employer' ? 'Company Name' : 'Full Name'}
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={
                      userType === 'institution' ? 'Enter institution name' : 
                      userType === 'admin' ? 'Enter admin name' : 
                      userType === 'employer' ? 'Enter company name' : 
                      'Enter your full name'
                    }
                    required={isSignUp}
                  />
                </div>
                {userType === 'institution' && (
                  <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                    <p className="font-medium">Institution Email Required</p>
                    <p>You must use your official institution email address (e.g., @harvard.edu, @mit.edu). Contact support if your institution domain is not recognized.</p>
                  </div>
                )}
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              variant="hero"
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  {isSignUp ? <UserPlus className="w-4 h-4 mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
                  {isSignUp ? "Create Account" : "Sign In"}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setEmail('');
                setPassword('');
                setFullName('');
                setUserType('user');
              }}
            >
              {isSignUp 
                ? "Already have an account? Sign in" 
                : "Don't have an account? Sign up"
              }
            </Button>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Secure document verification platform</p>
          <p>Your certificates, verified with confidence</p>
          
          {/* Example Accounts for Judges */}
          <div className="mt-4 p-4 bg-muted/30 rounded-lg text-left">
            <p className="font-semibold mb-2">Example Accounts for Demo:</p>
            <div className="space-y-2 text-xs">
              <div>
                <p><strong>Student:</strong> student@example.com / password123</p>
                <p><strong>Employer:</strong> hr@techcorp.com / password123</p>
                <p><strong>Institution:</strong> admin@harvard.edu / password123</p>
                <p><strong>Admin:</strong> admin@verifyed.com / password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;