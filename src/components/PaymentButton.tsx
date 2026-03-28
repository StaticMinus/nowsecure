import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard } from 'lucide-react';
import { initializePayment } from '@/services/payment';
import { toast } from 'sonner';

interface PaymentButtonProps {
  email: string;
  amount: number;
  currency?: 'USD' | 'NGN';
  metadata?: Record<string, any>;
  buttonText?: string;
  className?: string;
  onSuccess?: (reference: string) => void;
  onError?: (error: string) => void;
}

export function PaymentButton({
  email,
  amount,
  currency = 'USD',
  metadata = {},
  buttonText = 'Pay Now',
  className = '',
  onSuccess,
  onError,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!email) {
      toast.error('Please provide an email address');
      return;
    }

    setIsLoading(true);

    try {
      const result = await initializePayment({
        email,
        amount,
        currency,
        metadata,
      });

      if (result.success && result.data?.authorization_url) {
        toast.success('Redirecting to Paystack...');
        // Redirect to Paystack payment page
        window.location.href = result.data.authorization_url;
        onSuccess?.(result.data.reference);
      } else {
        toast.error(result.message || 'Payment initialization failed');
        onError?.(result.message || 'Payment initialization failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className={`${className}`}
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          {buttonText}
        </>
      )}
    </Button>
  );
}
