import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Cloud,
  Server,
  Globe,
  CheckCircle,
  ArrowRight,
  Building2,
  Landmark,
  Wallet,
  Award,
  TrendingUp,
  Handshake,
  Users,
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

const techPartners = [
  {
    icon: Cloud,
    name: 'Amazon Web Services',
    description: 'Native integration with AWS services including CloudTrail, GuardDuty, and Security Hub for comprehensive cloud security.',
    features: ['CloudTrail Integration', 'GuardDuty Support', 'Security Hub', 'Lambda Protection'],
    color: 'orange',
  },
  {
    icon: Server,
    name: 'Microsoft Azure',
    description: 'Seamless security integration with Microsoft cloud services and Azure Security Center.',
    features: ['Azure Sentinel', 'Defender Integration', 'Active Directory', 'Office 365 Security'],
    color: 'blue',
  },
  {
    icon: Globe,
    name: 'Cloudflare',
    description: 'Edge security integration providing DDoS protection, WAF, and global CDN capabilities.',
    features: ['DDoS Mitigation', 'Web Application Firewall', 'Global CDN', 'Bot Management'],
    color: 'orange',
  },
];

const enterpriseCollaborations = [
  {
    icon: Landmark,
    title: 'Financial Institutions',
    description: 'Partnering with leading banks and financial services to deliver compliant security solutions that meet regulatory requirements.',
    stats: '50+ Financial Partners',
  },
  {
    icon: Wallet,
    title: 'Fintech Companies',
    description: 'Supporting innovative fintech startups with scalable security infrastructure that grows with their business.',
    stats: '100+ Fintech Partners',
  },
  {
    icon: Building2,
    title: 'Global Enterprises',
    description: 'Enterprise-grade security partnerships with Fortune 500 companies and multinational corporations.',
    stats: '200+ Enterprise Clients',
  },
];

const partnerBenefits = [
  {
    icon: Handshake,
    title: 'Partner Program',
    description: 'Join our partner ecosystem and expand your security offerings with NowSecure solutions.',
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Get certified as a NowSecure partner and demonstrate your security expertise.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Growth',
    description: 'Generate new revenue streams by offering enterprise security solutions to your customers.',
  },
  {
    icon: Users,
    title: 'Joint Marketing',
    description: 'Collaborate on marketing initiatives and reach new audiences together.',
  },
];

const integrationLogos = [
  'AWS', 'Azure', 'GCP', 'Cloudflare', 'Akamai', 'Fastly',
  'Splunk', 'ServiceNow', 'Datadog', 'New Relic', 'PagerDuty', 'Slack',
];

export function Partnerships() {
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
              Partnerships
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Global Technology{' '}
              <span className="gradient-text">Partners</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              NowSecure partners with leading technology companies worldwide to deliver 
              comprehensive security solutions to enterprises of all sizes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  Become a Partner
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Contact Partnership Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Partners Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium mb-4">
              Technology Partners
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Integrated with Leading Platforms
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our security solutions integrate seamlessly with the world's leading cloud and technology platforms.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {techPartners.map((partner, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100"
              >
                <div className={`w-16 h-16 bg-${partner.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                  <partner.icon className={`w-8 h-8 text-${partner.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{partner.name}</h3>
                <p className="text-slate-600 mb-6">{partner.description}</p>
                <ul className="space-y-2">
                  {partner.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enterprise Collaborations */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-4">
              Enterprise Collaborations
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Delivering Security to Industries Worldwide
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our partnerships span across multiple industries, delivering tailored security solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {enterpriseCollaborations.map((collab, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <collab.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{collab.title}</h3>
                <p className="text-slate-600 mb-6">{collab.description}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">{collab.stats}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium mb-4">
                Integration Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Seamless Integration with Your Stack
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                NowSecure integrates with over 100+ tools and platforms, making it easy to 
                incorporate security into your existing workflows and toolchains.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['SIEM Integration', 'SOAR Platforms', 'DevOps Tools', 'Ticketing Systems'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  View All Integrations
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-slate-50 rounded-2xl p-8">
                <div className="grid grid-cols-3 gap-4">
                  {integrationLogos.map((tech, i) => (
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

      {/* Partner Benefits */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Become a NowSecure Partner
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Join our partner program and grow your business with enterprise security solutions.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {partnerBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-slate-400">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
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
              Ready to Partner with NowSecure?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join our global partner ecosystem and deliver enterprise-grade security solutions to your customers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
