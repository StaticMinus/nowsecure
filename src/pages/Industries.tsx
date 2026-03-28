import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Landmark,
  Wallet,
  Building,
  Cloud,
  Rocket,
  Globe,
  CheckCircle,
  ArrowRight,
  Shield,
  FileCheck,
  Award,
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

const industries = [
  {
    icon: Landmark,
    name: 'Commercial Banks',
    description: 'Comprehensive security solutions for financial institutions, ensuring compliance with banking regulations and protecting sensitive customer data.',
    challenges: [
      'Regulatory compliance (PCI DSS, GDPR)',
      'Customer data protection',
      'Fraud prevention',
      'Online banking security',
    ],
    solutions: [
      'End-to-end encryption',
      'Multi-factor authentication',
      'Real-time threat monitoring',
      'Compliance reporting',
    ],
    color: 'blue',
    stats: { value: '200+', label: 'Banking Clients' },
  },
  {
    icon: Wallet,
    name: 'Fintech Companies',
    description: 'Scalable security infrastructure designed for fast-growing fintech startups and established payment processors.',
    challenges: [
      'Rapid scaling requirements',
      'API security',
      'Mobile app protection',
      'Transaction security',
    ],
    solutions: [
      'Cloud-native security',
      'API gateway protection',
      'Mobile SDK security',
      'Tokenization',
    ],
    color: 'green',
    stats: { value: '500+', label: 'Fintech Partners' },
  },
  {
    icon: Building,
    name: 'Government Agencies',
    description: 'FedRAMP-authorized security solutions that meet the stringent requirements of government and public sector organizations.',
    challenges: [
      'Strict compliance standards',
      'Data sovereignty',
      'Insider threat detection',
      'Critical infrastructure protection',
    ],
    solutions: [
      'FedRAMP authorization',
      'On-premise deployment',
      'Classified data protection',
      'SOC 2 compliance',
    ],
    color: 'indigo',
    stats: { value: '50+', label: 'Government Clients' },
  },
  {
    icon: Cloud,
    name: 'Cloud Platforms',
    description: 'Security solutions designed for cloud service providers and SaaS companies protecting multi-tenant environments.',
    challenges: [
      'Multi-tenant isolation',
      'Container security',
      'DevSecOps integration',
      'Cloud compliance',
    ],
    solutions: [
      'Container security platform',
      'CI/CD integration',
      'Infrastructure as code scanning',
      'Cloud posture management',
    ],
    color: 'cyan',
    stats: { value: '300+', label: 'Cloud Providers' },
  },
  {
    icon: Rocket,
    name: 'Technology Startups',
    description: 'Affordable, easy-to-deploy security solutions that grow with your startup from seed stage to IPO.',
    challenges: [
      'Limited security resources',
      'Rapid development cycles',
      'Investor due diligence',
      'Security awareness',
    ],
    solutions: [
      'Automated security scanning',
      'Developer-friendly tools',
      'Security scorecards',
      'Cost-effective pricing',
    ],
    color: 'purple',
    stats: { value: '1000+', label: 'Startup Clients' },
  },
  {
    icon: Globe,
    name: 'Global Enterprises',
    description: 'Unified security platform for multinational corporations with complex, distributed IT environments.',
    challenges: [
      'Global threat landscape',
      'Distributed workforce',
      'M&A security integration',
      'Board-level reporting',
    ],
    solutions: [
      'Global threat intelligence',
      'Zero trust architecture',
      'Unified security dashboard',
      'Executive reporting',
    ],
    color: 'orange',
    stats: { value: '150+', label: 'Fortune 500' },
  },
];

const complianceFrameworks = [
  { name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard' },
  { name: 'GDPR', description: 'General Data Protection Regulation' },
  { name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act' },
  { name: 'SOC 2', description: 'Service Organization Control 2' },
  { name: 'ISO 27001', description: 'Information Security Management' },
  { name: 'FedRAMP', description: 'Federal Risk and Authorization Management Program' },
];

const caseStudyStats = [
  { value: '99.9%', label: 'Threat Detection Rate' },
  { value: '60%', label: 'Reduction in Security Incidents' },
  { value: '4h', label: 'Average Response Time' },
  { value: '50M+', label: 'Daily Threats Blocked' },
];

export function Industries() {
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
              Industries
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Security for Every{' '}
              <span className="gradient-text">Industry</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              NowSecure delivers tailored cybersecurity solutions across diverse industries, 
              addressing unique challenges and compliance requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/platform">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  Get Industry Solution
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-${industry.color}-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <industry.icon className={`w-8 h-8 text-${industry.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-slate-900">{industry.name}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{industry.stats.value}</div>
                        <div className="text-xs text-slate-500">{industry.stats.label}</div>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-6">{industry.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-red-500" />
                          Key Challenges
                        </h4>
                        <ul className="space-y-2">
                          {industry.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Our Solutions
                        </h4>
                        <ul className="space-y-2">
                          {industry.solutions.map((solution, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-4">
                Compliance
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Meet Industry Compliance Requirements
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                NowSecure helps organizations meet and maintain compliance with major industry 
                standards and regulations. Our platform provides automated compliance monitoring 
                and detailed reporting.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Automated compliance scans', 'Audit-ready reports', 'Policy enforcement', 'Continuous monitoring'].map((item, i) => (
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
            >
              <div className="grid grid-cols-2 gap-4">
                {complianceFrameworks.map((framework, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FileCheck className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-slate-900">{framework.name}</span>
                    </div>
                    <p className="text-sm text-slate-600">{framework.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Stats */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Proven Results Across Industries
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Our customers achieve measurable security improvements with NowSecure.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {caseStudyStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium mb-4">
              Customer Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Industry Leaders
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "NowSecure transformed our security posture. We achieved compliance in record time and significantly reduced our risk exposure.",
                author: "Chief Information Security Officer",
                company: "Fortune 500 Bank",
              },
              {
                quote: "The platform's automation capabilities allowed our small team to manage enterprise-level security across our entire infrastructure.",
                author: "VP of Engineering",
                company: "Leading Fintech Startup",
              },
              {
                quote: "NowSecure's government-grade security gave us the confidence to handle sensitive data while meeting all regulatory requirements.",
                author: "IT Director",
                company: "Federal Agency",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Award key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
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
              Secure Your Industry
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Get a customized security solution tailored to your industry's unique requirements and compliance needs.
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
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
