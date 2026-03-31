import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Loader2,
  Server,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
  Shield,
  Terminal,
  Activity,
  Code2,
  KeyRound,
  Database,
  Zap,
  Cpu,
  ShieldAlert,
  Save,
  Trash2,
  Copy,
  Plus,
  Globe
} from 'lucide-react';
import { getUserData, loginUser, type UserData, type Deployment } from '@/services/user';

// Mock function for API status update (frontend only for now)
const updateApiStatus = async (devId: string, status: boolean) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    await fetch(`${API_URL}/api/deployment/update-all-api-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ developerId: devId, status: status ? 'enabled' : 'disabled' }),
    });
  } catch (e) { console.error('API toggle failed', e); }
};

export function UserDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [developerId, setDeveloperId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState('');
  const [isApiEnabled, setIsApiEnabled] = useState(true);
  const [sshKeys] = useState<{id: string, name: string, key: string, date: string}[]>([
    { id: '1', name: 'Production_Server_01', key: 'ssh-rsa AAAAB3Nza...[REDACTED]', date: '2024-03-20' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyContent, setNewKeyContent] = useState('');
  const [apiPolicies, setApiPolicies] = useState([
    { id: 'webhook', title: "Webhook Reception", desc: "Receive real-time threat alerts via POST", active: true },
    { id: 'dns', title: "Dynamic DNS", desc: "Automated IP propagation for protected domains", active: true },
    { id: 'bot', title: "Bot Scrubber", desc: "Heuristic filtering for high-frequency bots", active: false },
    { id: 'metrics', title: "Intrusion Metrics", desc: "Expose Prometheus/Grafana metrics endpoint", active: true }
  ]);

  // Check for stored session
  useEffect(() => {
    const storedDevId = localStorage.getItem('developerId');
    if (storedDevId) {
      loadUserData(storedDevId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserData = async (devId: string) => {
    try {
      const data = await getUserData(devId);
      if (data.success && data.data) {
        // Mocking status logic: if created more than 2 minutes ago (simulating 48h for demo), mark as active
        const processedDeployments: Deployment[] = data.data.deployments.map(d => {
          const createdAt = new Date(d.createdAt).getTime();
          const now = new Date().getTime();
          if (d.status === 'pending' && (now - createdAt > 120000)) {
            return { ...d, status: 'active' as const };
          }
          return d;
        });

        setUserData({ ...data.data, deployments: processedDeployments });
        setIsAuthenticated(true);
        localStorage.setItem('developerId', devId);
      }
    } catch {
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
        localStorage.setItem('developerId', developerId.trim());
        window.location.reload();
      } else {
        setError(result.message || 'Authentication failed');
      }
    } catch {
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
    navigate('/');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'success':
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'pending':
      case 'deploying':
        return <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-rose-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      deploying: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      failed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    };
    return variants[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  };

  // Login Form
  if (!isAuthenticated && !localStorage.getItem('developerId')) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.15),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="max-w-md w-full px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <Terminal className="w-8 h-8 text-blue-400" />
                </div>
                <CardTitle className="text-2xl text-white font-bold tracking-tight">Security Core</CardTitle>
                <CardDescription className="text-slate-400">
                  Authenticate with your Developer ID to access the neural engine.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <span className="block text-sm font-medium text-slate-300">Identity Token</span>
                  <Input
                    placeholder="e.g. NS-ANDROID-..."
                    value={developerId}
                    onChange={(e) => setDeveloperId(e.target.value)}
                    className="bg-black/50 border-slate-700 text-white font-mono text-center h-12 focus:ring-blue-500/50 focus:border-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-3 text-rose-400 text-sm"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}

                <Button
                  onClick={handleLogin}
                  disabled={!developerId || isLoading}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  ) : (
                    <Zap className="mr-2 w-5 h-5 fill-current" />
                  )}
                  Initialize Engine
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-200 pt-24 pb-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation / Stats Overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">System Online</span>
                </div>
                <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-2">
                  System <span className="text-blue-500">Node</span> Dashboard
                </h1>
                <p className="text-slate-400 mt-1 max-w-xl">
                  Unified control interface for {userData?.user.domain || "authenticated developers"}. 
                  Monitor neural security state and API entropy.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <Badge variant="outline" className="font-mono bg-blue-500/5 border-blue-500/20 text-blue-400 py-1.5 px-3">
                  DEV_UID: {userData?.user?.developerId?.split('-')?.[2] || 'WAITING'}
                </Badge>
                <Link to="/services">
                  <Button variant="ghost" className="text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800">
                    Services
                  </Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="text-rose-400 hover:text-white border border-rose-900/30 hover:bg-rose-900/20">
                  Logout
                </Button>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="bg-slate-900/50 border border-slate-800 p-1.5 rounded-2xl backdrop-blur-xl">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 rounded-xl transition-all px-6 py-2.5">
                  <Activity className="w-4 h-4 mr-2" />
                  Telemetry
                </TabsTrigger>
                <TabsTrigger value="deployments" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 rounded-xl transition-all px-6 py-2.5">
                  <Server className="w-4 h-4 mr-2" />
                  Nodes
                </TabsTrigger>
                <TabsTrigger value="dev_ops" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 rounded-xl transition-all px-6 py-2.5">
                  <Terminal className="w-4 h-4 mr-2" />
                  DevOps
                </TabsTrigger>
                <TabsTrigger value="api" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 rounded-xl transition-all px-6 py-2.5">
                  <Zap className="w-4 h-4 mr-2" />
                  API Toggles
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-slate-900/50 border-slate-800 border-l-4 border-l-blue-500 shadow-[0_0_30px_rgba(30,58,138,0.1)]">
                    <CardHeader>
                      <CardTitle className="text-sm font-mono text-blue-400 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          Layer-7 Threat Intelligence
                        </div>
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px]">redaidnigeria.org</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="p-4 bg-black/60 border border-slate-800/50 rounded-xl space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Infection Vector</p>
                            <p className="text-sm font-mono text-rose-400">WP_CORP_MALWARE (Detected)</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Risk Score</p>
                            <p className="text-sm font-mono text-amber-500">88.4 / 100</p>
                          </div>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '88%' }}
                            className="bg-gradient-to-r from-amber-500 to-rose-500 h-full"
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center justify-between py-1 border-b border-slate-800/30">
                            <span className="text-[10px] text-slate-400">PHP Payload injection</span>
                            <Badge className="bg-rose-500/10 text-rose-400 border-none h-4 text-[9px]">Blocked</Badge>
                          </div>
                          <div className="flex items-center justify-between py-1 border-b border-slate-800/30">
                            <span className="text-[10px] text-slate-400">Reverse Shell Attempts</span>
                            <Badge className="bg-rose-500/10 text-rose-400 border-none h-4 text-[9px]">Terminated</Badge>
                          </div>
                          <div className="flex items-center justify-between py-1">
                            <span className="text-[10px] text-slate-400">XSS Sanitizer Activity</span>
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-none h-4 text-[9px]">Active</Badge>
                          </div>
                        </div>
                      </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-black/40 border border-slate-800 rounded-lg group hover:border-blue-500/30 transition-all">
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">SQLi Filter</p>
                            <p className="text-lg font-mono text-white">4.2k <span className="text-[8px] text-slate-500">Hits</span></p>
                          </div>
                          <div className="p-3 bg-black/40 border border-slate-800 rounded-lg group hover:border-blue-500/30 transition-all">
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Malware Scrub</p>
                            <p className="text-lg font-mono text-emerald-400">99.2%</p>
                          </div>
                        </div>
                      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-3">
                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Active Resolution Services</p>
                        <div className="space-y-2">
                          {[
                            { name: "WP Malware Removal", status: "Active" },
                            { name: "Neural PHP Sanitizer", status: "Active" },
                            { name: "Live Traffic Scrubber", status: "Active" }
                          ].map((s, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="text-xs text-slate-300 flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-blue-500" /> {s.name}
                              </span>
                              <span className="text-[10px] font-mono text-emerald-500">{s.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* API Connectivity Status */}
                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-sm font-mono text-amber-400 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Infrastructure State
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-black/40 border border-slate-800 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${isApiEnabled ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-slate-600'}`} />
                          <div>
                            <p className="text-sm font-semibold text-white">Public API Access</p>
                            <p className="text-xs text-slate-500">{isApiEnabled ? "Requests allowlisted" : "Traffic blocked"}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => {
                            const newState = !isApiEnabled;
                            setIsApiEnabled(newState);
                            updateApiStatus(userData?.user.developerId || '', newState);
                            toast(newState ? "API Core Resumed" : "API Core Halted", { icon: <Zap className="w-4 h-4" /> });
                          }}
                          className={`${isApiEnabled ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-600/20 text-rose-400 border-rose-500/30'} border hover:bg-opacity-30`}
                        >
                          {isApiEnabled ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 border border-blue-500/10 rounded-xl bg-blue-500/5">
                        <Cpu className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-xs text-blue-400 uppercase tracking-wider font-bold">Heuristic Engine</p>
                          <p className="text-xs text-slate-400">v2.4.0-alpha.9 active</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="deployments">
                <div className="space-y-4">
                  {!userData?.deployments || userData.deployments.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-12 border border-dashed border-slate-800 rounded-2xl text-center bg-slate-900/20"
                    >
                      <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Server className="w-8 h-8 text-blue-500/50" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">No Active Nodes</h3>
                      <p className="text-slate-400 max-w-sm mx-auto mb-6">
                        You don't have any active security nodes. Add a domain to start protecting your infrastructure.
                      </p>
                      <Button onClick={() => navigate('/platform')} className="bg-blue-600 hover:bg-blue-500">
                        <Plus className="w-4 h-4 mr-2" /> Provision New Node
                      </Button>
                    </motion.div>
                  ) : (
                    userData.deployments.map((deployment) => (
                      <motion.div 
                        key={deployment.deploymentId}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/30 transition-all cursor-pointer group" onClick={() => navigate(`/deployment/${deployment.deploymentId}`)}>
                          <CardContent className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-black border border-slate-800 rounded-xl flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                                <Database className="w-6 h-6 text-blue-500" />
                              </div>
                              <div>
                                <h3 className="font-bold text-white text-lg">{deployment.domain}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs font-mono text-slate-500">{deployment.provider}</span>
                                  <span className="text-slate-700">|</span>
                                  <span className="text-xs font-mono text-slate-500">{deployment.hosting}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="hidden md:block text-right">
                                <p className="text-[10px] text-slate-500 uppercase mb-1">Uptime</p>
                                <p className="text-sm font-mono text-emerald-400">99.98%</p>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge className={`${getStatusBadge(deployment.status)} font-mono`}>
                                  <span className="flex items-center gap-1.5 uppercase text-[10px]">
                                    {getStatusIcon(deployment.status)}
                                    {deployment.status}
                                  </span>
                                </Badge>
                                <span className="text-[10px] text-slate-600 font-mono">
                                  CREATED: {new Date(deployment.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <ArrowRight className="w-5 h-5 text-slate-700 group-hover:text-blue-500 transition-colors" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="dev_ops" className="space-y-8">
                {/* SSH Keys Management */}
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <KeyRound className="w-5 h-5 text-blue-400" />
                      SSH Public Keys
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Manage cryptographic access keys for automated deployments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {sshKeys.map(key => (
                        <div key={key.id} className="flex items-center justify-between p-4 bg-black/40 border border-slate-800 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center">
                              <Shield className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">{key.name}</p>
                              <code className="text-[10px] text-slate-500 font-mono">{key.key.substr(0, 32)}...</code>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white hover:bg-slate-800">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-rose-500 hover:bg-rose-500/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <span className="block text-xs text-slate-400 uppercase font-bold">Key Alias</span>
                        <Input 
                          placeholder="e.g. Master_Relay" 
                          value={newKeyName}
                          onChange={e => setNewKeyName(e.target.value)}
                          className="bg-black border-slate-800 text-white font-mono h-10" 
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="block text-xs text-slate-400 uppercase font-bold">Public Key (OpenSSH)</span>
                        <Input 
                          placeholder="ssh-rsa ..." 
                          value={newKeyContent}
                          onChange={e => setNewKeyContent(e.target.value)}
                          className="bg-black border-slate-800 text-white font-mono h-10" 
                        />
                      </div>
                      <Button className="md:col-span-2 bg-blue-600 hover:bg-blue-500 mt-2">
                        <Plus className="w-4 h-4 mr-2" /> Register Access Key
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Integration Snippets */}
                <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
                  <div className="px-6 py-4 bg-slate-800/30 border-b border-slate-800 flex items-center justify-between">
                    <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Client SDK Implementation
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-500/20 text-blue-400 text-[10px] border-blue-500/20">Node.js</Badge>
                      <Badge className="bg-slate-800 text-slate-400 text-[10px]">Python</Badge>
                    </div>
                  </div>
                  <div className="p-0">
                    <pre className="p-6 text-xs font-mono text-blue-300 bg-black overflow-x-auto leading-relaxed">
{`const layerSecure = require('@nowsecure/engine');

// Initialize with your Identity Token
const client = layerSecure.init({
    apiKey: process.env.NS_API_KEY,
    domain: '${userData?.user.domain || "your-domain.com"}',
    heuristics: true
});

// Implementation: Automated traffic scrubbing
app.use(client.middleware());

console.log('Neural Shield Active [Port 443]');`}
                    </pre>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="api">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white">API Toggles & Access Policy</CardTitle>
                    <CardDescription>Advanced control over your public endpoints and webhook receivers.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {apiPolicies.map((pol) => (
                        <div 
                          key={pol.id} 
                          className="flex items-center justify-between p-4 bg-black/40 border border-slate-800 rounded-xl hover:border-blue-500/30 transition-all cursor-pointer"
                          onClick={() => {
                            setApiPolicies(prev => prev.map(p => p.id === pol.id ? { ...p, active: !p.active } : p));
                            toast(`${pol.title} ${!pol.active ? 'Enabled' : 'Disabled'}`, { icon: <Zap className="w-4 h-4" /> });
                          }}
                        >
                          <div>
                            <p className="text-sm font-semibold text-white">{pol.title}</p>
                            <p className="text-xs text-slate-500">{pol.desc}</p>
                          </div>
                          <div className={`w-10 h-5 rounded-full relative transition-colors ${pol.active ? 'bg-blue-600' : 'bg-slate-800'}`}>
                            <motion.div 
                              animate={{ left: pol.active ? '1.5rem' : '0.25rem' }}
                              className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => {
                        toast.success("Security protocols synchronized to node edge");
                      }}
                      variant="outline" 
                      className="w-full border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300"
                    >
                      <Save className="w-4 h-4 mr-2" /> Commit Protocol Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <Card className="bg-blue-600 border-none shadow-[0_10px_40px_rgba(37,99,235,0.2)]">
              <CardContent className="p-6">
                <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Protection Coverage</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-white">94%</span>
                  <span className="text-blue-100/60 text-sm font-mono">+2.1%</span>
                </div>
                <div className="w-full bg-blue-700/50 h-2 rounded-full mb-6">
                  <div className="bg-white h-full rounded-full w-[94%]" />
                </div>
                <Button size="sm" className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold" onClick={() => navigate('/platform')}>
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3 px-6">
                <CardTitle className="text-sm text-slate-400 font-mono uppercase tracking-widest">Global Activity</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-orange-500/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Lagos, NG</p>
                    <p className="text-[10px] text-slate-500">Node Sync Complete</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">London, UK</p>
                    <p className="text-[10px] text-slate-500">Heuristic Analysis (Running)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Purchase History Summary */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3 px-6 text-center">
                <CardTitle className="text-xs text-slate-500 uppercase font-mono">Ledger History</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0 space-y-3">
                  {userData?.purchases && userData.purchases.length > 0 ? (
                    userData.purchases.slice(0, 5).map(p => (
                      <div key={p.purchaseId} className="flex justify-between items-center text-[10px] font-mono border-b border-slate-800 pb-2 hover:bg-white/5 transition-colors">
                        <span className="text-slate-400">TX_{p.purchaseId?.toString().substr(0, 8)}</span>
                        <span className="text-white font-bold">${p.amountUsd}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-slate-600 text-center italic">No transaction records found</p>
                  )}
                 <Button variant="link" size="sm" className="w-full text-[10px] text-blue-500 hover:text-blue-400 p-0 h-auto">
                    View Full Transaction Logs
                 </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
