import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Monitor,
  Lock,
  Code,
  Cloud,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Server,
  Cpu,
  Database,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const products = [
  {
    icon: Shield,
    name: 'NowSecure Platform',
    tagline: 'Unified Security Management',
    description: 'Our flagship unified security platform that provides comprehensive protection across all your digital assets. Centralized management, real-time monitoring, and automated threat response.',
    features: [
      'Centralized security dashboard',
      'Real-time threat detection',
      'Automated incident response',
      'Compliance reporting',
      'Multi-tenant architecture',
    ],
    color: 'blue',
    gradient: 'from-blue-600 to-blue-700',
  },
  {
    icon: Monitor,
    name: 'NowSecure Workstation',
    tagline: 'Endpoint Protection',
    description: 'Advanced endpoint security solution that protects workstations and devices from malware, ransomware, and advanced persistent threats.',
    features: [
      'Next-gen antivirus',
      'Behavioral analysis',
      'Device control',
      'Application whitelisting',
      'Remote management',
    ],
    color: 'cyan',
    gradient: 'from-cyan-600 to-cyan-700',
  },
  {
    icon: Lock,
    name: 'NowSecure Shield',
    tagline: 'Web Application Firewall',
    description: 'Enterprise-grade WAF that protects web applications from OWASP Top 10 threats, DDoS attacks, and malicious bot traffic.',
    features: [
      'OWASP Top 10 protection',
      'DDoS mitigation',
      'Bot management',
      'Custom rule engine',
      'Global CDN integration',
    ],
    color: 'indigo',
    gradient: 'from-indigo-600 to-indigo-700',
  },
  {
    icon: Code,
    name: 'NowSecure API Security',
    tagline: 'API Protection Gateway',
    description: 'Comprehensive API security solution that discovers, monitors, and protects all your APIs from attacks and abuse.',
    features: [
      'API discovery & inventory',
      'Schema validation',
      'Rate limiting',
      'Authentication enforcement',
      'API threat detection',
    ],
    color: 'purple',
    gradient: 'from-purple-600 to-purple-700',
  },
  {
    icon: Cloud,
    name: 'NowSecure Cloud Defense',
    tagline: 'Multi-Cloud Security',
    description: 'Unified cloud security platform for AWS, Azure, and Google Cloud. Continuous compliance monitoring and threat detection.',
    features: [
      'Multi-cloud visibility',
      'CSPM & CWPP',
      'Container security',
      'Serverless protection',
      'Compliance automation',
    ],
    color: 'teal',
    gradient: 'from-teal-600 to-teal-700',
  },
];

const capabilities = [
  {
    icon: Zap,
    title: 'Real-time Detection',
    description: 'Instant threat detection with sub-second response times',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Security nodes across 50+ countries worldwide',
  },
  {
    icon: Server,
    title: 'Scalable Architecture',
    description: 'Handles millions of requests per second',
  },
  {
    icon: Cpu,
    title: 'AI-Powered',
    description: 'Machine learning for advanced threat detection',
  },
  {
    icon: Database,
    title: 'Threat Intelligence',
    description: 'Global threat database updated every minute',
  },
  {
    icon: CheckCircle,
    title: '99.99% Uptime',
    description: 'Enterprise-grade reliability and availability',
  },
];

export function Products() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/30 to-transparent" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
              Our Products
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Enterprise Security{' '}
              <span className="gradient-text">Products</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Comprehensive cybersecurity product suite designed to protect every aspect of your digital infrastructure. 
              From endpoints to cloud, we have you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/platform">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  Explore Platform
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Request Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12"
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-${product.color}-50 rounded-full mb-6`}>
                    <product.icon className={`w-5 h-5 text-${product.color}-600`} />
                    <span className={`text-sm font-medium text-${product.color}-700`}>{product.tagline}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h2>
                  <p className="text-lg text-slate-600 mb-6">{product.description}</p>
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={`w-6 h-6 bg-${product.color}-100 rounded-full flex items-center justify-center`}>
                          <CheckCircle className={`w-4 h-4 text-${product.color}-600`} />
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/platform">
                    <Button className={`bg-gradient-to-r ${product.gradient} text-white`}>
                      Learn More
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className={`relative bg-gradient-to-br ${product.gradient} rounded-2xl p-8 text-white`}>
                    <div className="absolute inset-0 bg-white/10 rounded-2xl" />
                    <div className="relative">
                      <product.icon className="w-16 h-16 mb-6 opacity-90" />
                      <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
                      <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="bg-white/10 rounded-lg p-4">
                          <div className="text-3xl font-bold">99.9%</div>
                          <div className="text-sm opacity-80">Uptime</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <div className="text-3xl font-bold">&lt;50ms</div>
                          <div className="text-sm opacity-80">Response</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium mb-4">
              Platform Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Built for Enterprise Scale
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our products are designed to meet the demanding requirements of enterprise organizations.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <capability.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{capability.title}</h3>
                <p className="text-slate-600">{capability.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-4">
                Integrations
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Seamless Integration with Your Stack
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                NowSecure products integrate seamlessly with your existing security tools, 
                SIEM platforms, and DevOps workflows. Our open API makes custom integrations easy.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['SIEM Integration', 'SOAR Platforms', 'DevOps Tools', 'Ticketing Systems'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-slate-50 rounded-2xl p-8">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins',
                    'Splunk', 'ServiceNow', 'Slack'
                  ].map((tech, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-sm font-medium text-slate-700">{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Choose the Right Security Solution
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Our security experts can help you select and implement the perfect combination 
              of products for your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/platform">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
