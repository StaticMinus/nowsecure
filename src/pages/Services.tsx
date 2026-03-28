import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Search,
  Bug,
  CloudLightning,
  Wrench,
  Eye,
  Server,
  Globe,
  Cloud,
  Cpu,
  Database,
  CheckCircle,
  ArrowRight,
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
    transition: { staggerChildren: 0.1 },
  },
};

const services = [
  {
    icon: Shield,
    title: 'Website Firewall Protection',
    description: 'Advanced Web Application Firewall (WAF) that filters and monitors HTTP traffic between your web application and the internet. Blocks SQL injection, XSS, and other common attacks.',
    features: ['Real-time threat blocking', 'Custom rule configuration', 'DDoS protection', 'Bot management'],
    color: 'blue',
  },
  {
    icon: Search,
    title: 'Advanced Antivirus Scanning',
    description: 'Comprehensive malware detection and removal system that continuously scans your files, databases, and applications for malicious code.',
    features: ['Deep file scanning', 'Signature-based detection', 'Heuristic analysis', 'Quarantine management'],
    color: 'cyan',
  },
  {
    icon: Bug,
    title: 'Malware Removal & Detection',
    description: 'Expert malware removal services with automated detection systems that identify and eliminate threats before they cause damage.',
    features: ['Automated cleanup', 'Threat intelligence', 'File restoration', 'Security hardening'],
    color: 'red',
  },
  {
    icon: CloudLightning,
    title: 'DDoS Mitigation',
    description: 'Enterprise-grade DDoS protection that absorbs and distributes attack traffic across our global network, keeping your services online.',
    features: ['Layer 3/4 protection', 'Layer 7 mitigation', 'Global scrubbing centers', '24/7 response team'],
    color: 'orange',
  },
  {
    icon: Wrench,
    title: 'Automated Vulnerability Patching',
    description: 'Stay protected with automatic security patches and updates. Our system monitors for new vulnerabilities and applies fixes immediately.',
    features: ['Zero-day protection', 'Patch management', 'Rollback capability', 'Compliance reporting'],
    color: 'green',
  },
  {
    icon: Eye,
    title: 'Security Monitoring & Threat Intelligence',
    description: '24/7 security operations center with real-time threat detection, incident response, and comprehensive security analytics.',
    features: ['SIEM integration', 'Threat hunting', 'Incident response', 'Security dashboards'],
    color: 'purple',
  },
];

const hostingEnvironments = [
  {
    icon: Globe,
    title: 'WordPress Hosting',
    description: 'Specialized security solutions designed specifically for WordPress websites, including plugin vulnerability scanning and theme security.',
  },
  {
    icon: Server,
    title: 'Linux Servers',
    description: 'Comprehensive protection for Linux-based servers with kernel-level security, file integrity monitoring, and intrusion detection.',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Multi-cloud security for AWS, Azure, and Google Cloud with native integration and centralized management.',
  },
  {
    icon: Cpu,
    title: 'VPS Hosting',
    description: 'Dedicated virtual private server security with isolated protection, resource monitoring, and dedicated firewall rules.',
  },
  {
    icon: Database,
    title: 'AWS Environments',
    description: 'Native AWS security integration with CloudTrail, GuardDuty, and custom security groups for comprehensive cloud protection.',
  },
];

export function Services() {
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
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Enterprise Security{' '}
              <span className="gradient-text">Services</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Comprehensive cybersecurity solutions designed to protect your digital assets 
              from evolving threats. From firewall protection to threat intelligence, we have you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/platform">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-${service.color}-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hosting Environments */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium mb-4">
              Hosting Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Protection for Multiple Hosting Environments
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              NowSecure supports all major hosting platforms and environments, ensuring comprehensive protection regardless of your infrastructure.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {hostingEnvironments.map((env, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <env.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{env.title}</h3>
                <p className="text-slate-600">{env.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Simple 4-Step Security Process
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Assessment', description: 'We analyze your current security posture and identify vulnerabilities.' },
              { step: '02', title: 'Deployment', description: 'Our security solutions are deployed across your infrastructure.' },
              { step: '03', title: 'Monitoring', description: '24/7 monitoring detects and responds to threats in real-time.' },
              { step: '04', title: 'Optimization', description: 'Continuous improvement based on threat intelligence and analytics.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-slate-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-slate-200 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Secure Your Infrastructure?
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Get a customized security solution tailored to your specific needs and infrastructure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/platform">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
