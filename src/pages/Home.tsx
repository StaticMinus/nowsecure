import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  Shield,
  Globe,
  Server,
  Cloud,
  Lock,
  Zap,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Animated Section Component
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/30 to-transparent" />
      
      {/* Animated Background Shapes */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-700">Trusted by 10,000+ Enterprises</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
            >
              Advanced Security for{' '}
              <span className="gradient-text">Web Platforms</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-slate-600 mb-8 max-w-xl"
            >
              NowSecure delivers automated protection for websites, servers, and cloud infrastructure. 
              Defend against cyber threats with enterprise-grade security solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/platform">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25">
                  Protect Your Website
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-slate-300">
                  Explore Services
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-200"
            >
              {[
                { value: '99.9%', label: 'Uptime' },
                { value: '50M+', label: 'Threats Blocked' },
                { value: '24/7', label: 'Monitoring' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-slate-100">
              {/* Security Dashboard Preview */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm text-slate-400 ml-2">Security Dashboard</span>
              </div>

              <div className="space-y-4">
                {/* Status Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Protected</span>
                    </div>
                    <div className="text-2xl font-bold text-green-800">12,847</div>
                    <div className="text-xs text-green-600">Active protections</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Threats</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-800">0</div>
                    <div className="text-xs text-blue-600">In last 24h</div>
                  </div>
                </div>

                {/* Activity Graph */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-700">Traffic Analysis</span>
                    <span className="text-xs text-slate-500">Real-time</span>
                  </div>
                  <div className="flex items-end gap-1 h-20">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
                      />
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-2">
                  {[
                    { icon: Lock, text: 'Firewall rule updated', time: '2 min ago', color: 'blue' },
                    { icon: CheckCircle, text: 'Malware scan completed', time: '15 min ago', color: 'green' },
                    { icon: Shield, text: 'DDoS attack mitigated', time: '1 hour ago', color: 'cyan' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <div className={`p-2 rounded-lg bg-${item.color}-100`}>
                        <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-700">{item.text}</div>
                        <div className="text-xs text-slate-400">{item.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-slate-100"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Secure</div>
                  <div className="text-xs text-slate-500">All systems</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Platform Architecture Section
function PlatformSection() {
  const features = [
    {
      icon: Globe,
      title: 'Website Protection',
      description: 'Advanced firewall and WAF protection for all web applications.',
      color: 'blue',
    },
    {
      icon: Server,
      title: 'Server Security',
      description: 'Comprehensive protection for Linux servers and VPS hosting.',
      color: 'cyan',
    },
    {
      icon: Cloud,
      title: 'Cloud Defense',
      description: 'Multi-layered security for AWS, Azure, and cloud infrastructure.',
      color: 'teal',
    },
    {
      icon: Lock,
      title: 'Data Encryption',
      description: 'End-to-end encryption and secure data transmission.',
      color: 'indigo',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
            Platform Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Unified Security Platform
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our integrated platform delivers comprehensive protection across your entire digital infrastructure.
          </p>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="group relative bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100"
            >
              <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Protection Layers Section
function ProtectionLayersSection() {
  const layers = [
    {
      title: 'Firewall Protection',
      description: 'Intelligent web application firewall that blocks malicious traffic before it reaches your servers.',
      icon: Shield,
      stats: '10M+ attacks blocked daily',
    },
    {
      title: 'Malware Detection',
      description: 'Real-time scanning and removal of malware, viruses, and suspicious code.',
      icon: Lock,
      stats: '99.8% detection rate',
    },
    {
      title: 'DNS Protection',
      description: 'Secure DNS infrastructure with DDoS protection and threat intelligence.',
      icon: Globe,
      stats: '50ms response time',
    },
    {
      title: 'Threat Monitoring',
      description: '24/7 security monitoring with instant alerts and automated response.',
      icon: Clock,
      stats: 'Real-time alerts',
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium mb-4">
            Protection Layers
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Multi-Layered Defense System
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our security architecture employs multiple defense layers to ensure comprehensive protection.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {layers.map((layer, index) => (
            <AnimatedSection key={index}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <layer.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{layer.title}</h3>
                    <p className="text-slate-600 mb-4">{layer.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">{layer.stats}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Hosting Coverage Section
function HostingCoverageSection() {
  const platforms = [
    { name: 'WordPress', icon: Globe, description: 'Specialized security for WordPress sites' },
    { name: 'Linux Servers', icon: Server, description: 'Comprehensive Linux server protection' },
    { name: 'Cloud Infrastructure', icon: Cloud, description: 'Multi-cloud security solutions' },
    { name: 'VPS Hosting', icon: Shield, description: 'Dedicated VPS security measures' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-4">
              Hosting Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Protection for Every Environment
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              NowSecure provides automated defense for all major hosting platforms and environments. 
              Whether you run WordPress, Linux servers, or cloud infrastructure, we have you covered.
            </p>
            <Link to="/services">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-slate-100"
              >
                <platform.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{platform.name}</h3>
                <p className="text-sm text-slate-600">{platform.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Trust Section
function TrustSection() {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Enterprise Clients' },
    { icon: Shield, value: '50M+', label: 'Threats Blocked' },
    { icon: Award, value: '99.9%', label: 'Uptime SLA' },
    { icon: TrendingUp, value: '24/7', label: 'Expert Support' },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join thousands of organizations that rely on NowSecure for their cybersecurity needs.
          </p>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-4">
                <stat.icon className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-cyan-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Secure Your Digital Assets?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Get started with NowSecure today and protect your websites, servers, and cloud infrastructure 
            with enterprise-grade security solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/platform">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Main Home Component
export function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <PlatformSection />
      <ProtectionLayersSection />
      <HostingCoverageSection />
      <TrustSection />
      <CTASection />
    </motion.main>
  );
}
