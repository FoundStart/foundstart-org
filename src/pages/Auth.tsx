
import React, { useState, useEffect } from 'react';
import { useL } from '@/hooks/useL';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { z } from 'zod';
import { GOOGLE_AUTH_ENABLED } from '@/config/features';

// Validation schemas
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(255, 'Email is too long'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(255, 'Email is too long'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name is too long')
});

// Rate limiting configuration
const RATE_LIMIT_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(() => new URLSearchParams(window.location.search).get('mode') !== 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string }>({});
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const L = useL();
  
  // Get redirect info from state
  const redirectTo = (location.state as any)?.redirectTo || '/dashboard';

  useEffect(() => {
    if (user) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);

  const validateForm = (): boolean => {
    setErrors({});
    
    try {
      if (isSignUp) {
        signUpSchema.parse({ email, password, fullName });
      } else {
        signInSchema.parse({ email, password });
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { email?: string; password?: string; fullName?: string } = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof typeof newErrors;
          if (!newErrors[field]) {
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limit lockout
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const secondsRemaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      toast({
        title: L('Too many attempts','محاولات كثيرة'),
        description: L(`Please wait ${secondsRemaining} seconds before trying again.`,`انتظر ${secondsRemaining} ثانية قبل المحاولة مرة أخرى.`),
        variant: "destructive",
      });
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      let result;
      
      if (isSignUp) {
        result = await signUp(email, password, fullName);
        if (!result.error) {
          toast({
            title: L('Account created successfully!','تم إنشاء الحساب بنجاح!'),
            description: L('Please check your email to verify your account.','تحقق من بريدك الإلكتروني لتأكيد حسابك.'),
          });
        }
      } else {
        result = await signIn(email, password);
        if (!result.error) {
          toast({
            title: L('Welcome back!','أهلاً بعودتك!'),
            description: L('You have been signed in successfully.','تم تسجيل الدخول بنجاح.'),
          });
        }
      }

      if (result.error) {
        // Increment failed attempts
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= RATE_LIMIT_ATTEMPTS) {
          setLockoutUntil(Date.now() + RATE_LIMIT_WINDOW_MS);
          setAttempts(0);
          toast({
            title: L('Too many failed attempts','محاولات فاشلة كثيرة'),
            description: L('Please wait 1 minute before trying again.','انتظر دقيقة قبل المحاولة مرة أخرى.'),
            variant: "destructive",
          });
        } else {
          toast({
            title: L('Authentication Error','خطأ في المصادقة'),
            description: result.error.message,
            variant: "destructive",
          });
        }
      } else {
        // Reset attempts on success
        setAttempts(0);
        setLockoutUntil(null);
      }
    } catch (error) {
      toast({
        title: L('Error','خطأ'),
        description: L('An unexpected error occurred. Please try again.','حدث خطأ غير متوقع. حاول مرة أخرى.'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {isSignUp ? L('Create Account','إنشاء حساب') : L('Welcome Back','أهلاً بعودتك')}
              </CardTitle>
              <CardDescription>
                {isSignUp 
                  ? L('Sign up to get started with FoundStart','سجّل لتبدأ مع FoundStart') 
                  : 'Sign in to your FoundStart account'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {GOOGLE_AUTH_ENABLED && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11"
                    onClick={async () => {
                      const { error } = await supabase.auth.signInWithOAuth({
                        provider: 'google',
                        options: { redirectTo: `${window.location.origin}${redirectTo}` },
                      });
                      if (error) toast({ title: L('Google sign-in failed', 'فشل تسجيل الدخول بجوجل'), description: error.message, variant: 'destructive' });
                    }}
                  >
                    <svg className="me-2 h-4 w-4" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>
                    {L('Continue with Google', 'المتابعة بحساب جوجل')}
                  </Button>
                  <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />{L('or', 'أو')}<span className="h-px flex-1 bg-border" /></div>
                </>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <Label htmlFor="fullName">{L('Full Name','الاسم الكامل')}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.fullName ? 'border-destructive' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
                    )}
                  </div>
                )}
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={errors.password ? 'border-destructive' : ''}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive mt-1">{errors.password}</p>
                  )}
                  {isSignUp && !errors.password && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {L('Must be 8+ characters with uppercase, lowercase, and number','8 أحرف على الأقل مع حرف كبير وحرف صغير ورقم')}
                    </p>
                  )}
                </div>
                
                {!isSignUp && (
                  <div className="flex justify-end mt-1">
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm px-0 h-auto"
                      onClick={async () => {
                        if (!email) {
                          toast({ title: L('Enter your email first','أدخل بريدك الإلكتروني أولاً'), description: L('Please enter your email address above.','أدخل بريدك الإلكتروني في الحقل أعلاه.'), variant: 'destructive' });
                          return;
                        }
                        const { error } = await supabase.auth.resetPasswordForEmail(email, {
                          redirectTo: `${window.location.origin}/reset-password`
                        });
                        if (error) {
                          toast({ title: L('Error','خطأ'), description: error.message, variant: 'destructive' });
                        } else {
                          toast({ title: L('Check your email','تحقق من بريدك'), description: L('Password reset link has been sent.','تم إرسال رابط إعادة تعيين كلمة المرور.') });
                        }
                      }}
                    >
                      Forgot Password?
                    </Button>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isSignUp ? L('Creating Account...','جارٍ إنشاء الحساب...') : L('Signing In...','جارٍ تسجيل الدخول...')}
                    </>
                  ) : (
                    isSignUp ? L('Create Account','إنشاء حساب') : L('Sign In','تسجيل الدخول')
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <Button
                  variant="link"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrors({});
                  }}
                  className="text-sm"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign In' 
                    : "Don't have an account? Sign Up"
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;
