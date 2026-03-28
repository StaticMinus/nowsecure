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

  const reference = searchParams.get('reference');
  const trxref = searchParams.get('trxref');

  useEffect(() => {
    const verify = async () => {
      const paymentRef = reference || trxref;
      
      if (!paymentRef) {
        setStatus('error');
        setMessage('No payment reference found');
        return;
      }

      try {
        const result = await verifyPayment(paymentRef);
        
        if (result.success && result.data?.status === 'success') {
          setStatus('success');
          setMessage(`Payment of ${result.data.currency} ${result.data.amount} was successful!`);
          
          // @ts-ignore - deploymentId comes from backend but isn't in type
          const depId = result.data?.deploymentId;
          if (depId) {
            setDeploymentId(depId);
          }
          
          // Redirect to deployment page after 2 seconds
          setTimeout(() => {
            // @ts-ignore - deploymentId comes from backend
            const redirectId = result.data?.deploymentId || depId;
            if (redirectId) {
              navigate(`/deployment/${redirectId}`);
            } else {
              navigate('/dashboard');
            }
          }, 2000);
        } else {
          setStatus('error');
          setMessage(result.message || 'Payment verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred while verifying payment');
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
              </div>
              <Button onClick={() => navigate('/platform')} variant="outline" className="w-full">
                Back to Platform
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
