import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyPayment } from '@/services/payment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [deploymentId, setDeploymentId] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const reference = searchParams.get('reference');
  const trxref = searchParams.get('trxref');

  useEffect(() => {
    const verify = async () => {
      try {
        const paymentRef = reference || trxref;
        
        if (!paymentRef) {
          setStatus('error');
          setMessage('No payment reference found in URL');
          setDebugInfo('Missing reference or trxref parameter');
          return;
        }

        console.log('Verifying payment:', paymentRef);
        setDebugInfo(`Verifying reference: ${paymentRef}`);

        const result = await verifyPayment(paymentRef);
        console.log('Verification result:', result);
        
        if (result.success && result.data?.status === 'success') {
          setStatus('success');
          setMessage(`Payment of ${result.data.currency} ${result.data.amount} was successful!`);
          
          const depId = result.data?.deploymentId;
          console.log('Deployment ID:', depId);
          
          if (depId) {
            setDeploymentId(depId);
            setDebugInfo(`Deployment ID: ${depId}`);
          } else {
            setDebugInfo('No deployment ID returned - purchase may still be processing');
          }
          
          // Redirect to deployment page after 3 seconds
          setTimeout(() => {
            const redirectId = result.data?.deploymentId || depId;
            if (redirectId) {
              navigate(`/deployment/${redirectId}`);
            } else {
              navigate('/dashboard');
            }
          }, 3000);
        } else if (result.success && result.data?.status === 'pending') {
          setStatus('loading');
          setMessage('Payment is still being processed...');
          setDebugInfo('Status: pending - will retry');
          // Retry after 2 seconds
          setTimeout(() => verify(), 2000);
        } else {
          setStatus('error');
          setMessage(result.message || 'Payment verification failed');
          setDebugInfo(`Error: ${result.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('error');
        setMessage('An error occurred while verifying payment');
        setDebugInfo(`Exception: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    verify();
  }, [reference, trxref, navigate]);

  const handleGoToDeployment = () => {
    if (deploymentId) {
      navigate(`/deployment/${deploymentId}`);
    } else {
      navigate('/dashboard');
    }
  };

  // If there's a critical error, show fallback UI
  if (!searchParams) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">Unable to process callback</p>
            <Button onClick={() => navigate('/')} className="w-full mt-4">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Payment Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {status === 'loading' && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
              <p className="text-gray-600">Verifying your payment...</p>
              <p className="text-xs text-gray-400">{debugInfo}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="text-center">
                <p className="text-lg font-semibold text-green-600">Payment Successful!</p>
                <p className="text-gray-600 mt-2">{message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Redirecting to deployment status...
                </p>
                {debugInfo && (
                  <p className="text-xs text-gray-400 mt-1">{debugInfo}</p>
                )}
              </div>
              <Button onClick={handleGoToDeployment} className="w-full">
                View Deployment Status
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center space-y-4">
              <XCircle className="h-16 w-16 text-red-500" />
              <div className="text-center">
                <p className="text-lg font-semibold text-red-600">Payment Failed</p>
                <p className="text-gray-600 mt-2">{message}</p>
                {debugInfo && (
                  <p className="text-xs text-gray-400 mt-2">{debugInfo}</p>
                )}
              </div>
              <Button onClick={() => navigate('/platform')} variant="outline" className="w-full">
                Back to Platform
              </Button>
              <Button onClick={() => navigate('/dashboard')} variant="ghost" className="w-full">
                Go to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
