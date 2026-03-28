import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Lock, 
  Loader2, 
  AlertCircle, 
  ShoppingCart, 
  Server, 
  CheckCircle, 
  Clock, 
  XCircle,
  ArrowRight,
  Shield,
  ExternalLink,
  CreditCard,
  Package
} from 'lucide-react';
import { getUserData, loginUser, type UserData } from '@/services/user';

export function UserDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [developerId, setDeveloperId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState('');

  // Check for stored session
  useEffect(() => {
    const storedDevId = localStorage.getItem('developerId');
    if (storedDevId) {
      loadUserData(storedDevId);
    }
  }, []);

  const loadUserData = async (devId: string) => {
    try {
      const data = await getUserData(devId);
      if (data.success && data.data) {
        setUserData(data.data);
        setIsAuthenticated(true);
        localStorage.setItem('developerId', devId);
      }
    } catch (err) {
      localStorage.removeItem('developerId');
    }
  };

  const handleLogin = async () => {
    if (!developerId.trim()) {
      toast.error('Please enter your Developer ID');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await loginUser(developerId.trim());
      
      if (result.success) {
        toast.success('Authentication successful!');
        await loadUserData(developerId.trim());
      } else {
        setError(result.message || 'Authentication failed');
        toast.error(result.message || 'Invalid Developer ID');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('developerId');
    setIsAuthenticated(false);
    setUserData(null);
    setDeveloperId('');
    toast.success('Logged out successfully');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'completed':
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
      case 'deploying':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      success: 'bg-green-100 text-green-700',
      completed: 'bg-green-100 text-green-700',
      active: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      deploying: 'bg-blue-100 text-blue-700',
      failed: 'bg-red-100 text-red-700',
    };
    return variants[status] || 'bg-gray-100 text-gray-700';
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20">
        <div className="max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-2 border-blue-100">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Developer Login</CardTitle>
                <CardDescription>
                  Enter your Developer Console ID to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Developer Console ID</label>
                  <Input
                    placeholder="e.g., NS-DEV-2024-SECURE"
                    value={developerId}
                    onChange={(e) => setDeveloperId(e.target.value)}
                    className="text-center font-mono"
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                  <p className="text-xs text-slate-500 text-center">
                    New user? Use your authorized developer ID to get started
                  </p>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                )}

                <Button
                  onClick={handleLogin}
                  disabled={!developerId || isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 w-5 h-5" />
                      Access Dashboard
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Button 
                    variant="link" 
                    onClick={() => navigate('/platform')}
                    className="text-sm"
                  >
                    Don't have an ID? Go to Platform
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Developer Dashboard</h1>
              <p className="text-slate-600 mt-1">
                Welcome back! Manage your security deployments and purchases.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-mono">
                ID: {userData?.user.developerId}
              </Badge>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Purchases</p>
                  <p className="text-2xl font-bold">{userData?.purchases.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Server className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Active Deployments</p>
                  <p className="text-2xl font-bold">
                    {userData?.deployments.filter(d => d.status === 'active').length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Protected Domains</p>
                  <p className="text-2xl font-bold">
                    {new Set(userData?.deployments.map(d => d.domain)).size || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="deployments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="deployments">
                <Server className="w-4 h-4 mr-2" />
                Deployments
              </TabsTrigger>
              <TabsTrigger value="purchases">
                <CreditCard className="w-4 h-4 mr-2" />
                Purchase History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deployments" className="mt-6">
              {userData?.deployments.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Server className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600">No deployments yet</p>
                    <Button 
                      onClick={() => navigate('/platform')} 
                      className="mt-4"
                    >
                      Create New Deployment
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {userData?.deployments.map((deployment) => (
                    <Card key={deployment.deploymentId} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                              <Package className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{deployment.domain}</h3>
                              <p className="text-sm text-slate-600">
                                {deployment.provider} • {deployment.hosting}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {new Date(deployment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusBadge(deployment.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(deployment.status)}
                                {deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)}
                              </span>
                            </Badge>
                            <Button 
                              size="sm" 
                              onClick={() => navigate(`/deployment/${deployment.deploymentId}`)}
                            >
                              View
                              <ExternalLink className="ml-2 w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="purchases" className="mt-6">
              {userData?.purchases.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600">No purchases yet</p>
                    <Button 
                      onClick={() => navigate('/platform')} 
                      className="mt-4"
                    >
                      Make a Purchase
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {userData?.purchases.map((purchase) => (
                    <Card key={purchase.purchaseId}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{purchase.domain}</h3>
                              <p className="text-sm text-slate-600">
                                {purchase.provider} • {purchase.hosting}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {new Date(purchase.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">
                              ₦{purchase.amount?.toLocaleString()}
                            </p>
                            <p className="text-sm text-slate-500">
                              ${purchase.amountUsd}
                            </p>
                            <Badge className={`mt-2 ${getStatusBadge(purchase.status)}`}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(purchase.status)}
                                {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                              </span>
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
