import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Shield,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Server,
  Database,
  Globe,
  Lock,
  Zap,
  Layout,
  ExternalLink,
  ChevronRight,
  Eye,
  Activity,
  AlertTriangle,
  Bug,
  Terminal,
  Cpu,
  Fingerprint,
  Copy
} from 'lucide-react';
import { getDeployment, updateDeployment, type Deployment } from '@/services/user';

export function DeploymentDetail() {
  const { id: deploymentId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deployment, setDeployment] = useState<Deployment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'status' | 'scans' | 'dns'>('status');

  useEffect(() => {
    if (deploymentId) {
      loadDeploymentData(deploymentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deploymentId]);

  const loadDeploymentData = async (depId: string) => {
    try {
      const data = await getDeployment(depId);
      if (data.success && data.data) {
        setDeployment(data.data);
      }
    } catch (err) {
      toast.error('Failed to load deployment details');
    } finally {
      setIsLoading(false);
    }
  };

  const simulateProgress = async () => {
    if (!deployment) return;

    toast.info('Initializing Neural Shield sequence...');
    
    for (const stage of deployment.stages) {
      if (stage.status !== 'completed') {
        const steps = 4;
        for (let i = 1; i <= steps; i++) {
          const progress = (i / steps) * 100;
          await updateDeployment(deployment.deploymentId, {
            stageId: stage.id,
            stageStatus: i === steps ? 'completed' : 'deploying',
            stageProgress: progress,
            status: i === steps && stage.id === 'monitoring' ? 'active' : 'deploying'
          });
          
          const freshData = await getDeployment(deployment.deploymentId);
          if (freshData.success) setDeployment(freshData.data);
          // Faster simulation for better UX
          await new Promise(r => setTimeout(r, 600));
        }
      }
    }
    toast.success('Security Environment Fully Synchronized');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!deployment) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <XCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Resource Not Found</h2>
        <p className="text-slate-400 mb-6">The requested security node could not be located in the neural link.</p>
        <Button onClick={() => navigate('/dashboard')} variant="outline" className="border-slate-800 text-slate-300">
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-300 pt-24 pb-12 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-8 p-0 text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Command Center
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Node Summary Side Panel */}
          <div className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 font-mono text-[10px]">OS: LINUX_NODE</Badge>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${deployment.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    <span className={`text-[10px] uppercase font-mono ${deployment.status === 'active' ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {deployment.status === 'active' ? 'LIVE_LINK' : 'SYNC_PENDING'}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-white tracking-tight">{deployment.domain}</CardTitle>
                <CardDescription className="font-mono text-[10px] text-slate-500">ID: {deployment.deploymentId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-3 bg-black/40 border border-slate-800/50 rounded-lg">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-[10px] text-slate-500 uppercase">Provider</span>
                     <span className="text-xs font-bold text-white">{deployment.provider}</span>
                   </div>
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-[10px] text-slate-500 uppercase">Hosting</span>
                     <span className="text-xs font-bold text-white">{deployment.hosting}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] text-slate-500 uppercase">IP Topology</span>
                     <span className="text-xs font-mono text-blue-400">Static IPv4</span>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-3">
                   <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg text-center">
                     <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">Status</p>
                     <p className="text-xs font-bold text-white uppercase">{deployment.status}</p>
                   </div>
                   <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-center">
                     <p className="text-[10px] text-emerald-400 font-bold uppercase mb-1">Security</p>
                     <p className="text-xs font-bold text-white uppercase">Nominal</p>
                   </div>
                 </div>

                 {deployment.status === 'pending' && (
                   <Button onClick={simulateProgress} className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_4px_15px_rgba(37,99,235,0.3)]">
                     <Zap className="w-4 h-4 mr-2" /> Activate Neural Shield
                   </Button>
                 )}
              </CardContent>
            </Card>

            {/* Quick Metrics */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-blue-400">
                     <Fingerprint className="w-4 h-4" />
                   </div>
                   <div>
                     <p className="text-[10px] text-slate-500 uppercase">Identity Verification</p>
                     <p className="text-xs font-bold text-white">SHA-256 Validated</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-amber-500">
                     <Cpu className="w-4 h-4" />
                   </div>
                   <div>
                     <p className="text-[10px] text-slate-500 uppercase">Node Usage</p>
                     <p className="text-xs font-bold text-white">12% / 128MB</p>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Console Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Nav Tabs */}
            <div className="flex gap-4 border-b border-slate-800">
              <button 
                onClick={() => setActiveTab('status')}
                className={`pb-4 text-sm font-bold transition-all ${activeTab === 'status' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Deployment Pipeline
              </button>
              <button 
                onClick={() => setActiveTab('scans')}
                className={`pb-4 text-sm font-bold transition-all ${activeTab === 'scans' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Forensic Analysis
              </button>
              <button 
                onClick={() => setActiveTab('dns')}
                className={`pb-4 text-sm font-bold transition-all ${activeTab === 'dns' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Network Config
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'status' && (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Card className="bg-slate-900 shadow-xl border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-blue-400" /> Pipeline Trajectories
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {deployment.stages.map((stage, idx) => (
                        <div key={stage.id} className="relative">
                          {idx !== deployment.stages.length - 1 && (
                            <div className={`absolute left-4 top-10 bottom-0 w-0.5 ${stage.status === 'completed' ? 'bg-blue-500' : 'bg-slate-800'}`} />
                          )}
                          <div className="flex items-start gap-4 mb-8 relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              stage.status === 'completed' ? 'bg-blue-500 text-white' : 
                              stage.status === 'deploying' ? 'bg-amber-500 text-white animate-pulse' : 
                              'bg-slate-800 text-slate-500 border border-slate-700'
                            }`}>
                              {stage.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : (idx + 1)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className={`text-sm font-bold ${stage.status === 'completed' ? 'text-white' : 'text-slate-400'}`}>{stage.name}</h4>
                                <Badge variant="outline" className={`text-[10px] uppercase ${
                                  stage.status === 'completed' ? 'border-blue-400/30 text-blue-400' : 
                                  stage.status === 'deploying' ? 'border-amber-400/30 text-amber-400' : 
                                  'border-slate-800 text-slate-600'
                                }`}>
                                  {stage.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-slate-500 mb-3">
                                {stage.status === 'completed' ? 'Process finalized and verified.' : 
                                 stage.status === 'deploying' ? 'Injecting security headers and balancing load...' : 
                                 'Awaiting previous node completion.'}
                              </p>
                              {(stage.status === 'deploying' || (stage.status === 'completed' && stage.progress < 100)) && (
                                <Progress value={stage.progress} className="h-1 bg-slate-800" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'scans' && (
                <motion.div
                  key="scans"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* High Level Scan Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <Card className="bg-rose-500/5 border-rose-500/20">
                       <CardContent className="p-4 flex items-center gap-4">
                         <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center">
                            <Bug className="w-5 h-5 text-rose-500" />
                         </div>
                         <div>
                            <p className="text-[10px] text-rose-400 uppercase font-bold">Botnets</p>
                            <p className="text-xl font-bold text-white">
                              {deployment.stages.find(s => s.id === 'scanning')?.status === 'completed' ? '01 ACTIVE' : '00 DETECTED'}
                            </p>
                         </div>
                       </CardContent>
                     </Card>
                     <Card className="bg-amber-500/5 border-amber-500/20">
                       <CardContent className="p-4 flex items-center gap-4">
                         <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <ShieldAlert className="w-5 h-5 text-amber-500" />
                         </div>
                         <div>
                            <p className="text-[10px] text-amber-400 uppercase font-bold">Vulnerabilities</p>
                            <p className="text-xl font-bold text-white">
                              {deployment.stages.find(s => s.id === 'scanning')?.status === 'completed' ? '04 FOUND' : '00 FOUND'}
                            </p>
                         </div>
                       </CardContent>
                     </Card>
                     <Card className="bg-emerald-500/5 border-emerald-500/20">
                       <CardContent className="p-4 flex items-center gap-4">
                         <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-emerald-500" />
                         </div>
                         <div>
                            <p className="text-[10px] text-emerald-400 uppercase font-bold">Threat Score</p>
                            <p className="text-xl font-bold text-white">
                              {deployment.stages.find(s => s.id === 'scanning')?.status === 'completed' ? 'NOMINAL' : 'CLEAN'}
                            </p>
                         </div>
                       </CardContent>
                     </Card>
                  </div>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white">Neural Scan Artifacts</CardTitle>
                      <CardDescription>Detailed forensic breakdown of current environment state.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="border-t border-slate-800">
                        {deployment.stages.find(s => s.id === 'scanning')?.status === 'completed' ? (
                          [
                            { title: 'C2 BOTNET DETECTION', severity: 'HIGH', desc: 'Attempted handshake with IP 185.24.xx.xx identified as Dridex botnet node.', icon: <Bug className="text-rose-500" /> },
                            { title: 'SSH BRUTE-FORCE', severity: 'MEDIUM', desc: 'High frequency auth attempts (14k/min) detected from AS13335 (Cloudflare). Mitigation active.', icon: <Lock className="text-amber-500" /> },
                            { title: 'SQL INJECTION VECTOR', severity: 'HIGH', desc: 'Entry point vulnerability discovered in /auth/verify_dev. Improper escaping at param index 2.', icon: <Database className="text-amber-500" /> },
                            { title: 'XSS PROTECTION BYPASS', severity: 'LOW', desc: 'CSP policy allows unsafe-eval on specific legacy endpoints.', icon: <Layout className="text-blue-500" /> }
                          ].map((scan, i) => (
                            <div key={i} className="flex gap-4 p-5 hover:bg-white/5 border-b border-slate-800 transition-colors">
                               <div className="mt-1">{scan.icon}</div>
                               <div className="flex-1">
                                 <div className="flex justify-between items-center mb-1">
                                   <h5 className="text-sm font-bold text-white">{scan.title}</h5>
                                   <Badge className={`${scan.severity === 'HIGH' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'} text-[10px]`}>
                                     {scan.severity}
                                   </Badge>
                                 </div>
                                 <p className="text-xs text-slate-500 leading-relaxed font-mono">{scan.desc}</p>
                               </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-12 text-center">
                             <Search className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                             <p className="text-slate-500 text-sm">Awaiting neural engine scanning completion...</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'dns' && (
                <motion.div
                  key="dns"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white">DNS Resolution Matrix</CardTitle>
                      <CardDescription>Configure these records at your registrar to complete the neural sync.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {deployment.dnsRecords.map((record, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-black/40 border border-slate-800 rounded-xl gap-4">
                          <div className="flex items-center gap-4">
                            <Badge variant="outline" className="bg-blue-500/10 border-blue-500/20 text-blue-400 font-mono w-16 justify-center">{record.type}</Badge>
                            <div>
                               <p className="text-xs font-mono text-slate-500">{record.name}</p>
                               <p className="text-sm font-mono text-white break-all">{record.value}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-white hover:bg-slate-800" onClick={() => {
                            navigator.clipboard.writeText(record.value);
                            toast.success('Copied to buffer');
                          }}>
                            <Copy className="w-4 h-4 mr-2" /> Copy
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-600/10 border border-blue-600/20">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-sm text-blue-400 flex items-center gap-2 underline underline-offset-4">
                         <Globe className="w-4 h-4" /> Global CDN Edge Locations
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-slate-400 leading-relaxed">
                      Your application is being replicated across 14 global edge nodes in Lagos, London, San Jose, and Singapore for maximum 
                      heuristic protection and sub-20ms latency.
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

const ShieldAlert = ({ className }: { className?: string }) => <div className={className}><AlertTriangle className="w-full h-full" /></div>;
const Search = ({ className }: { className?: string }) => <div className={className}><Eye className="w-full h-full" /></div>;
