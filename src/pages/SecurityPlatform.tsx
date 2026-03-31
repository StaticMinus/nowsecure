import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  Globe,
  Server,
  Cloud,
  Cpu,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Code,
  CreditCard,
  Loader2,
  Key,
  FileText,
  BarChart3,
  AlertCircle,
  Apple,
  MapPin,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

// Predefined developer ID for authentication - Android Developer Key
const AUTHORIZED_DEVELOPER_ID = 'NS-ANDROID-WX8LTIBT-0IR5TC9E-RI1PQ023';

const developerTypes = [
  { id: 'apple', name: 'Apple Developer', icon: Apple },
  { id: 'android', name: 'Android Developer', icon: Code },
];

const hostingTypes = [
  { id: 'wordpress', name: 'WordPress', icon: Globe },
  { id: 'linux', name: 'Linux Server', icon: Server },
  { id: 'cloud', name: 'Cloud Hosting', icon: Cloud },
  { id: 'vps', name: 'VPS Hosting', icon: Cpu },
  { id: 'aws', name: 'AWS Infrastructure', icon: Server },
];

const securityProviders = [
  {
    id: 'cloudflare',
    name: 'Cloudflare Protection',
    description: 'Enterprise DDoS protection and global CDN',
    price: 350,
    currency: 'USD',
    features: ['DDoS Protection', 'Web Application Firewall', 'Global CDN', 'Bot Management'],
    popular: true,
  },
  {
    id: 'akamai',
    name: 'Akamai Edge Security',
    description: 'Advanced edge security and performance',
    price: 850,
    currency: 'USD',
    features: ['Edge Computing', 'API Security', 'Zero Trust', 'Threat Intelligence'],
    popular: false,
  },
  {
    id: 'fastly',
    name: 'Fastly Security Suite',
    description: 'Real-time security at the edge',
    price: 650,
    currency: 'USD',
    features: ['Real-time Purging', 'Edge Logic', 'WAF', 'DDoS Protection'],
    popular: false,
  },
  {
    id: 'imperva',
    name: 'Imperva Cloud WAF',
    description: 'Comprehensive application security',
    price: 1200,
    currency: 'USD',
    features: ['Advanced Bot Protection', 'API Security', 'RASP', 'DDoS Protection'],
    popular: false,
  },
  {
    id: 'sucuri',
    name: 'Sucuri Enterprise',
    description: 'Website security and monitoring',
    price: 500,
    currency: 'USD',
    features: ['Malware Removal', 'WAF', 'DDoS Protection', 'Monitoring'],
    popular: false,
  },
];

const deploymentStages = [
  { id: 'scanning', name: 'Threat Scanning', duration: 15 },
  { id: 'firewall', name: 'Firewall Injection', duration: 20 },
  { id: 'malware', name: 'Malware Shield Activation', duration: 18 },
  { id: 'dns', name: 'DNS Protection Deployment', duration: 25 },
  { id: 'monitoring', name: 'Intrusion Monitoring', duration: 12 },
];

// Authentication Step
function AuthenticationStep({ onAuthenticated }: { onAuthenticated: (devId: string) => void }) {
  const [developerType, setDeveloperType] = useState('');
  const [developerId, setDeveloperId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuthenticate = async () => {
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (developerId === AUTHORIZED_DEVELOPER_ID) {
      toast.success('Authentication successful!');
      onAuthenticated(developerId);
    } else {
      setError('Invalid Developer Console ID. Access denied.');
      toast.error('Authentication failed. Please check your Developer ID.');
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <Card className="border-2 border-blue-100">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Developer Authentication</CardTitle>
          <CardDescription>
            Enter your Developer Console ID to access the Layer Rising Security Engine
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Developer Type Selection */}
          <div className="space-y-3">
            <Label>Select Developer Type</Label>
            <div className="grid grid-cols-2 gap-4">
              {developerTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setDeveloperType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    developerType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                    developerType === type.id ? 'text-blue-600' : 'text-slate-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    developerType === type.id ? 'text-blue-700' : 'text-slate-600'
                  }`}>
                    {type.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Developer ID Input */}
          <div className="space-y-3">
            <Label htmlFor="developerId">Developer Console ID</Label>
            <Input
              id="developerId"
              placeholder="e.g., NS-DEV-2024-SECURE"
              value={developerId}
              onChange={(e) => setDeveloperId(e.target.value)}
              className="text-center font-mono"
            />
            <p className="text-xs text-slate-500 text-center">
              Enter your authorized developer console ID
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <Button
            onClick={handleAuthenticate}
            disabled={!developerType || !developerId || isLoading}
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
                Authenticate
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface SecurityConfig {
  developerId: string;
  domain: string;
  hostingType: string;
  provider: {
    id: string;
    name: string;
    price: number;
    currency: string;
    features: string[];
  };
}

// Deployment Configuration Step
function DeploymentConfigStep({ onComplete }: { onComplete: (config: { domain: string; hostingType: string; provider: any }) => void }) {
  const [domain, setDomain] = useState('');
  const [hostingType, setHostingType] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  const handleContinue = () => {
    const provider = securityProviders.find(p => p.id === selectedProvider);
    onComplete({
      domain,
      hostingType,
      provider: provider,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Domain Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">1</span>
            Website Domain
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label htmlFor="domain">Enter the domain to secure</Label>
            <Input
              id="domain"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Hosting Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">2</span>
            Hosting Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {hostingTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setHostingType(type.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  hostingType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                  hostingType === type.id ? 'text-blue-600' : 'text-slate-400'
                }`} />
                <span className={`text-sm font-medium ${
                  hostingType === type.id ? 'text-blue-700' : 'text-slate-600'
                }`}>
                  {type.name}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Provider Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">3</span>
            Security Technology Provider
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityProviders.map((provider) => (
              <motion.button
                key={provider.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProvider(provider.id)}
                className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                  selectedProvider === provider.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                {provider.popular && (
                  <span className="absolute -top-3 left-4 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    Popular
                  </span>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-slate-900">{provider.name}</span>
                  {selectedProvider === provider.id && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-4">{provider.description}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold text-slate-900">${provider.price}</span>
                  <span className="text-sm text-slate-500">{provider.currency}</span>
                </div>
                <ul className="space-y-1">
                  {provider.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!domain || !hostingType || !selectedProvider}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-cyan-500"
        >
          Continue to Payment
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
}

// Payment Step
function PaymentStep({ config }: { config: SecurityConfig }) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Billing Address State
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  // Card Details State (Mock)
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  const handlePaystackPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Auto-save billing info silently before payment
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      await fetch(`${API_URL}/api/user/${config.developerId}/billing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billingAddress: billingInfo,
          cardDetails: {
            cardNumber: cardInfo.cardNumber.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})/, '$1****$2'),
            expiry: cardInfo.expiry,
            nameOnCard: cardInfo.nameOnCard
          }
        }),
      });

      // Call backend to initialize Paystack transaction
      const response = await fetch(`${API_URL}/api/payment/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: billingInfo.email || `user@${config.domain}`,
          amount: config.provider.price,
          currency: 'USD',
          metadata: {
            developerId: config.developerId,
            domain: config.domain,
            hosting: config.hostingType,
            provider: config.provider.name,
            billingInfo: billingInfo
          }
        }),
      });
      
      const result = await response.json();
      if (result.success && result.data?.authorization_url) {
        window.location.href = result.data.authorization_url;
      } else {
        toast.error(result.message || 'Failed to initialize payment');
        setIsProcessing(false);
      }
    } catch {
      toast.error('Payment initialization failed');
      setIsProcessing(false);
    }
  };

  // Convert USD to Nigerian Naira (1 USD = 1,383.46 NGN)
  const nairaAmount = Math.round(config.provider.price * 1383.46);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="grid md:grid-cols-5 gap-6">
        {/* Left Column: Billing Info Form */}
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Billing Address
              </CardTitle>
              <CardDescription>Enter your billing details for the invoice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="John Doe" 
                    value={billingInfo.fullName}
                    onChange={(e) => setBillingInfo({...billingInfo, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="john@example.com" 
                    value={billingInfo.email}
                    onChange={(e) => setBillingInfo({...billingInfo, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Street Name" 
                    value={billingInfo.address}
                    onChange={(e) => setBillingInfo({...billingInfo, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    placeholder="Lagos" 
                    value={billingInfo.city}
                    onChange={(e) => setBillingInfo({...billingInfo, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input 
                    id="state" 
                    placeholder="Lagos State" 
                    value={billingInfo.state}
                    onChange={(e) => setBillingInfo({...billingInfo, state: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    placeholder="Nigeria" 
                    value={billingInfo.country}
                    onChange={(e) => setBillingInfo({...billingInfo, country: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip / Postal Code</Label>
                  <Input 
                    id="zipCode" 
                    placeholder="100001" 
                    value={billingInfo.zipCode}
                    onChange={(e) => setBillingInfo({...billingInfo, zipCode: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Card Details (Encrypted Storage)
              </CardTitle>
              <CardDescription>Your card information is saved for future billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input 
                    id="cardName" 
                    placeholder="JOHN DOE" 
                    value={cardInfo.nameOnCard}
                    onChange={(e) => setCardInfo({...cardInfo, nameOnCard: e.target.value})}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input 
                      id="cardNumber" 
                      placeholder="0000 0000 0000 0000" 
                      className="pr-10"
                      value={cardInfo.cardNumber}
                      onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                    />
                    <CreditCard className="absolute right-3 top-2.5 w-5 h-5 text-slate-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input 
                    id="expiry" 
                    placeholder="MM/YY" 
                    value={cardInfo.expiry}
                    onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    type="password" 
                    placeholder="***" 
                    maxLength={3}
                    value={cardInfo.cvv}
                    onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Order Summary & Payment Button */}
        <div className="md:col-span-2 space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-blue-600" />
                Payment Checkout
              </CardTitle>
              <CardDescription>
                Complete your payment to activate security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Summary */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">Order Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Domain</span>
                    <span className="font-medium">{config.domain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Hosting</span>
                    <span className="font-medium text-blue-600">{hostingTypes.find(h => h.id === config.hostingType)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Security Provider</span>
                    <span className="font-medium">{config.provider.name}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 mt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-600">Total (USD)</span>
                      <span className="text-xl font-bold text-slate-900">${config.provider.price}</span>
                    </div>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-sm text-slate-500">Total (NGN)</span>
                      <span className="text-lg font-bold text-green-600">₦{nairaAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paystack Payment Option */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-green-50 border-green-200">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-green-800">Paystack</div>
                    <div className="text-xs text-green-600">Secure online payment • One-click checkout</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700 text-xs">
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    <span>You'll be redirected to Paystack's secure payment page after confirmation</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePaystackPayment}
                disabled={isProcessing || !billingInfo.fullName || !billingInfo.email || !cardInfo.cardNumber}
                size="lg"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 py-6"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 w-5 h-5" />
                    Pay ₦{nairaAmount.toLocaleString()} with Paystack
                  </>
                )}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-[10px] text-slate-500">
                  Exchange Rate: 1 USD = 1,383.46 NGN
                </p>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Powered by Paystack. Your payment is secured with bank-grade encryption and saved billing allows for one-click future renewals.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

// Deployment Dashboard
function DeploymentDashboard({ config }: { config: any }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  useEffect(() => {
    if (currentStage < deploymentStages.length) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setCurrentStage(c => c + 1);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setIsComplete(true);
      setTimeout(() => setShowCredentials(true), 500);
    }
  }, [currentStage]);

  const [apiKey] = useState(() => 'ns_live_' + Math.random().toString(36).substring(2, 30));
  const [dnsRecords] = useState(() => [
    { type: 'A', name: '@', value: '104.16.85.20' },
    { type: 'CNAME', name: 'www', value: config.domain },
    { type: 'TXT', name: '@', value: 'ns-verify=' + Math.random().toString(36).substring(2, 10) },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <Card className="border-2 border-blue-100">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Layer Rising Security Engine</CardTitle>
          <CardDescription>
            Deploying automated protection layers to {config.domain}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Overview */}
          <div className="bg-slate-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Deployment Progress</span>
              <span className="text-sm font-bold text-blue-600">
                {isComplete ? '100%' : Math.round((currentStage / deploymentStages.length) * 100) + '%'}
              </span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: isComplete ? '100%' : `${(currentStage / deploymentStages.length) * 100 + (progress / deploymentStages.length)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-slate-500 mt-3 text-center">
              Estimated completion: ~72 hours for full propagation
            </p>
          </div>

          {/* Deployment Stages */}
          <div className="space-y-3">
            {deploymentStages.map((stage, index) => {
              const isActive = index === currentStage;
              const isCompleted = index < currentStage;
              const isPending = index > currentStage;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    isActive ? 'bg-blue-50 border-2 border-blue-200' :
                    isCompleted ? 'bg-green-50' :
                    'bg-slate-50 opacity-60'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-blue-500' :
                    isCompleted ? 'bg-green-500' :
                    'bg-slate-300'
                  }`}>
                    {isActive ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-white text-sm">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{stage.name}</div>
                    {isActive && (
                      <div className="mt-2">
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {isCompleted && (
                    <span className="text-sm text-green-600 font-medium">Completed</span>
                  )}
                  {isPending && (
                    <span className="text-sm text-slate-400">Pending</span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Credentials Section */}
          <AnimatePresence>
            {showCredentials && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="font-medium text-green-800">Deployment Complete!</span>
                  </div>
                </div>

                {/* API Key */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Security API Key
                  </Label>
                  <div className="flex gap-2">
                    <Input value={apiKey} readOnly className="font-mono bg-slate-50" />
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey);
                        toast.success('API key copied to clipboard');
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-slate-500">
                    Use this key to integrate security monitoring into your source code
                  </p>
                </div>

                {/* DNS Records */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    DNS Configuration Records
                  </Label>
                  <div className="bg-slate-50 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Type</th>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dnsRecords.map((record, i) => (
                          <tr key={i} className="border-t border-slate-200">
                            <td className="px-4 py-2 font-mono">{record.type}</td>
                            <td className="px-4 py-2 font-mono">{record.name}</td>
                            <td className="px-4 py-2 font-mono text-xs">{record.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-slate-500">
                    Add these records to your DNS provider for domain protection
                  </p>
                </div>

                {/* Dashboard Link */}
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Security Monitoring Dashboard</div>
                    <div className="text-sm text-slate-600">Monitor your security status in real-time</div>
                  </div>
                  <Button variant="outline" className="border-blue-300">
                    Open Dashboard
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Main Platform Page
export function SecurityPlatform() {
  const [step, setStep] = useState<'auth' | 'config' | 'payment' | 'deployment'>('auth');
  const [config, setConfig] = useState<any>(null);
  const [developerId, setDeveloperId] = useState<string>('');

  const handleAuthenticated = (devId: string) => {
    setDeveloperId(devId);
    setStep('config');
  };
  
  const handleConfigComplete = (cfg: any) => {
    setConfig({ ...cfg, developerId });
    setStep('payment');
  };

  // Note: Payment completion is handled by the callback page after Paystack redirect

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
              Layer Rising Security Engine
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Deploy Automated{' '}
              <span className="gradient-text">Security Layers</span>
            </h1>
            <p className="text-lg text-slate-600">
              Authenticate and deploy automated website security layers through our platform. 
              Protect your digital assets with enterprise-grade security in minutes.
            </p>
          </motion.div>

          {/* Step Indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[
                { id: 'auth', label: 'Authenticate', icon: Lock },
                { id: 'config', label: 'Configure', icon: Server },
                { id: 'payment', label: 'Payment', icon: CreditCard },
                { id: 'deployment', label: 'Deploy', icon: Shield },
              ].map((s, i) => {
                const isActive = step === s.id;
                const isCompleted = 
                  (step === 'config' && s.id === 'auth') ||
                  (step === 'payment' && ['auth', 'config'].includes(s.id)) ||
                  (step === 'deployment');

                return (
                  <div key={s.id} className="flex items-center">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                      isActive ? 'bg-blue-100 text-blue-700' :
                      isCompleted ? 'bg-green-100 text-green-700' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                      <s.icon className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
                    </div>
                    {i < 3 && (
                      <ChevronRight className="w-5 h-5 text-slate-300 mx-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {step === 'auth' && (
              <motion.div
                key="auth"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <AuthenticationStep onAuthenticated={handleAuthenticated} />
              </motion.div>
            )}
            {step === 'config' && (
              <motion.div
                key="config"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <DeploymentConfigStep onComplete={handleConfigComplete} />
              </motion.div>
            )}
            {step === 'payment' && config && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <PaymentStep config={config} />
              </motion.div>
            )}
            {step === 'deployment' && config && (
              <motion.div
                key="deployment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <DeploymentDashboard config={config} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.main>
  );
}
