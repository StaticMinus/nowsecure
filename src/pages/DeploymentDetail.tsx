import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { getDeployment, updateDeployment, type Deployment } from '@/services/user';
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Clock,
  XCircle,
  Shield,
  Key,
  FileText,
  BarChart3,
  Copy,
} from 'lucide-react';

export function DeploymentDetail() {
  const { deploymentId } = useParams<{ deploymentId: string }>();
  const navigate = useNavigate();
  const [deployment, setDeployment] = useState<Deployment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (deploymentId) {
      loadDeployment();
    }
  }, [deploymentId]);

  // Simulate deployment progress
  useEffect(() => {
    if (!deployment || deployment.status === 'completed' || deployment.status === 'failed') {
      return;
    }

    const interval = setInterval(async () => {
      if (currentStage < deployment.stages.length) {
        const stage = deployment.stages[currentStage];
        
        if (stage.status === 'pending') {
          // Start deploying this stage
          await updateDeploymentStage(currentStage, 'deploying', 0);
        } else if (stage.status === 'deploying') {
          // Progress this stage
          const newProgress = stage.progress + 10;
          if (newProgress >= 100) {
            await updateDeploymentStage(currentStage, 'completed', 100);
            if (currentStage < deployment.stages.length - 1) {
              setCurrentStage(prev => prev + 1);
            }
          } else {
            await updateDeploymentStage(currentStage, 'deploying', newProgress);
          }
        }
        
        // Calculate overall progress
        const completedStages = deployment.stages.filter(s => s.status === 'completed').length;
        const deployingStage = deployment.stages.find(s => s.status === 'deploying');
        const deployingProgress = deployingStage ? deployingStage.progress / 100 : 0;
        const progress = ((completedStages + deployingProgress) / deployment.stages.length) * 100;
        setOverallProgress(progress);
        
        // Refresh deployment data
        await loadDeployment(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deployment, currentStage]);

  const loadDeployment = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const result = await getDeployment(deploymentId!);
      if (result.success && result.data) {
        setDeployment(result.data);
        
        // Find current stage
        const activeStageIndex = result.data.stages.findIndex(
          s => s.status === 'deploying' || s.status === 'pending'
        );
        setCurrentStage(activeStageIndex >= 0 ? activeStageIndex : result.data.stages.length);
        
        // Calculate progress
        const completedStages = result.data.stages.filter(s => s.status === 'completed').length;
        const progress = (completedStages / result.data.stages.length) * 100;
        setOverallProgress(progress);
      } else {
        toast.error('Deployment not found');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to load deployment');
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  const updateDeploymentStage = async (stageIndex: number, status: string, progress: number) => {
    if (!deployment) return;
    
    const stage = deployment.stages[stageIndex];
    await updateDeployment(deployment.deploymentId, {
      stageId: stage.id,
      stageStatus: status,
      stageProgress: progress,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'deploying':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      completed: 'bg-green-100 text-green-700',
      active: 'bg-green-100 text-green-700',
      deploying: 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
    };
    return variants[status] || 'bg-gray-100 text-gray-700';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-slate-600">Loading deployment...</p>
        </div>
      </div>
    );
  }

  if (!deployment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-600">Deployment not found</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="outline" onClick={() => navigate('/dashboard')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                Deployment Status
              </h1>
              <p className="text-slate-600 mt-1">
                {deployment.domain} • {deployment.provider}
              </p>
            </div>
            <Badge className={`${getStatusBadge(deployment.status)} px-4 py-2 text-sm`}>
              {deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)}
            </Badge>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Overall Progress
              </CardTitle>
              <CardDescription>
                Estimated completion: ~72 hours for full propagation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Deployment Progress</span>
                  <span className="font-bold text-blue-600">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Deployment Stages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          {deployment.stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                stage.status === 'deploying' 
                  ? 'bg-blue-50 border-2 border-blue-200' 
                  : stage.status === 'completed'
                  ? 'bg-green-50'
                  : 'bg-slate-50 opacity-60'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                stage.status === 'deploying' 
                  ? 'bg-blue-500' 
                  : stage.status === 'completed'
                  ? 'bg-green-500'
                  : 'bg-slate-300'
              }`}>
                {getStatusIcon(stage.status)}
              </div>
              <div className="flex-1">
                <div className="font-medium text-slate-900">{stage.name}</div>
                {stage.status === 'deploying' && (
                  <div className="mt-2">
                    <Progress value={stage.progress} className="h-2" />
                  </div>
                )}
              </div>
              {stage.status === 'completed' && (
                <span className="text-sm text-green-600 font-medium">Completed</span>
              )}
              {stage.status === 'pending' && (
                <span className="text-sm text-slate-400">Pending</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Credentials Section */}
        {deployment.status !== 'pending' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Security API Key
                </CardTitle>
                <CardDescription>
                  Use this key to integrate security monitoring into your source code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <code className="flex-1 p-3 bg-slate-100 rounded-lg font-mono text-sm break-all">
                    {deployment.apiKey}
                  </code>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(deployment.apiKey);
                      toast.success('API key copied to clipboard');
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  DNS Configuration Records
                </CardTitle>
                <CardDescription>
                  Add these records to your DNS provider for domain protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deployment.dnsRecords.map((record, i) => (
                        <tr key={i} className="border-t border-slate-200">
                          <td className="px-4 py-2 font-mono">{record.type}</td>
                          <td className="px-4 py-2 font-mono">{record.name}</td>
                          <td className="px-4 py-2 font-mono text-xs">{record.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Security Monitoring Dashboard</div>
                    <div className="text-sm text-slate-600">Monitor your security status in real-time</div>
                  </div>
                  <Button variant="outline" className="border-blue-300">
                    Open Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
