import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail, Award, Users } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SEO, { seoConfigs } from '../components/SEO';

const Teams: React.FC = () => {
  const { t, language } = useLanguage();
  const [contentVisible, setContentVisible] = useState(false);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  useEffect(() => {
    setContentVisible(false);
    const timer = setTimeout(() => setContentVisible(true), 100);
    return () => clearTimeout(timer);
  }, [language]);

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const teamMembers = [
    {
      id: 1,
      name: 'Ahmad Yasin',
      role: 'CEO & Founder',
      bio: 'Visionary AI expert and entrepreneur with deep expertise in neural networks, machine learning, and enterprise AI solutions. Leading Nexariza AI to transform businesses worldwide.',
      image: 'https://images.pexels.com/photos/3760811/pexels-photo-3760811.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      expertise: ['AI Strategy', 'Neural Networks', 'Business Leadership', 'Innovation'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'ahmad@nexariza.com'
      },
      achievements: ['AI Industry Pioneer', 'Tech Innovation Leader', 'Business Transformation Expert'],
      isLeader: true
    },
    {
      id: 2,
      name: 'Dr. Sarah Chen',
      role: 'Chief Technology Officer',
      bio: 'Former Google AI researcher with 15+ years in machine learning. PhD from Stanford, published 50+ papers in top-tier journals.',
      image: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      expertise: ['Machine Learning', 'Deep Learning', 'Research', 'Technical Leadership'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'sarah@nexariza.com'
      },
      achievements: ['Forbes 30 Under 30', 'AI Researcher of the Year', 'TEDx Speaker'],
      isLeader: true
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      role: 'Head of AI Engineering',
      bio: 'Former Tesla Autopilot engineer specializing in computer vision and autonomous systems. MS from MIT with focus on neural architectures.',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      expertise: ['Computer Vision', 'Autonomous Systems', 'Neural Architecture', 'Engineering Leadership'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'michael@nexariza.com'
      },
      achievements: ['Tech Innovation Award', 'Patent Holder (12)', 'Open Source Contributor'],
      isLeader: false
    },
    {
      id: 4,
      name: 'Dr. Emily Watson',
      role: 'Lead AI Researcher',
      bio: 'Leading AI researcher with expertise in natural language processing and conversational AI. PhD from Carnegie Mellon.',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      expertise: ['Natural Language Processing', 'Conversational AI', 'Research', 'Publications'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'emily@nexariza.com'
      },
      achievements: ['AAAI Fellow', '40+ Research Papers', 'Industry Speaker'],
      isLeader: false
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'VP of Engineering',
      bio: 'Full-stack AI engineer with experience scaling AI systems at Facebook and Microsoft. Expert in MLOps and cloud architecture.',
      image: 'https://images.pexels.com/photos/3760736/pexels-photo-3760736.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      expertise: ['MLOps', 'Cloud Architecture', 'Distributed Systems', 'Team Leadership'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'david@nexariza.com'
      },
      achievements: ['Microsoft MVP', 'Cloud Expert', 'Tech Mentor'],
      isLeader: false
    },
    {
      id: 6,
      name: 'Dr. Priya Patel',
      role: 'Lead Data Scientist',
      bio: 'Healthcare AI specialist with focus on medical imaging and diagnostic systems. MD and PhD in Biomedical Engineering.',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      expertise: ['Medical AI', 'Computer Vision', 'Healthcare Systems', 'Regulatory Compliance'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'priya@nexariza.com'
      },
      achievements: ['Healthcare AI Pioneer', 'FDA Approval Expert', 'Medical Journal Publications'],
      isLeader: false
    }
  ];

  const leaders = teamMembers.filter(member => member.isLeader);
  const teamMembers_filtered = teamMembers.filter(member => !member.isLeader);

  return (
    <div className="min-h-screen pt-16">
      <SEO {...seoConfigs.teams} />
      
      <AnimatePresence mode="wait">
        {contentVisible && (
          <motion.div
            key={language}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
          >
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
            {t('teams.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            {t('teams.hero.subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-900/30 to-blue-800/30 px-6 py-3 rounded-full border border-blue-700/30">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="text-blue-300 font-semibold">50+ AI Experts</span>
            </div>
            <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-900/30 to-purple-800/30 px-6 py-3 rounded-full border border-purple-700/30">
              <Award className="h-5 w-5 text-purple-400" />
              <span className="text-purple-300 font-semibold">PhD & Masters Degrees</span>
            </div>
            <div className="flex items-center space-x-3 bg-gradient-to-r from-green-900/30 to-green-800/30 px-6 py-3 rounded-full border border-green-700/30">
              <span className="text-green-400 font-bold text-lg">100+</span>
              <span className="text-green-300 font-semibold">Research Publications</span>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Visionary leaders driving the future of artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {leaders.map((member) => (
              <motion.div
                key={member.id}
                className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700 hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: member.id * 0.1 }}
              >
                {/* Profile Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Social Links - Show on Hover */}
                  <AnimatePresence>
                    {hoveredMember === member.id && (
                      <motion.div
                        className="absolute top-4 right-4 flex space-x-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <a href={member.social.linkedin} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors duration-300">
                          <Linkedin className="h-4 w-4" />
                        </a>
                        <a href={member.social.twitter} className="p-2 bg-sky-600 text-white rounded-full hover:bg-sky-500 transition-colors duration-300">
                          <Twitter className="h-4 w-4" />
                        </a>
                        <a href={member.social.github} className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300">
                          <Github className="h-4 w-4" />
                        </a>
                        <a href={`mailto:${member.social.email}`} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors duration-300">
                          <Mail className="h-4 w-4" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-400 font-semibold">{member.role}</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Bio */}
                  <p className="text-gray-300 mb-4 leading-relaxed">{member.bio}</p>

                  {/* Expertise */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {member.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-center space-x-2">
                          <Award className="h-3 w-3 text-yellow-400 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Our Expert Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Talented professionals driving innovation across all AI domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers_filtered.map((member, index) => (
              <motion.div
                key={member.id}
                className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Profile Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Social Links - Show on Hover */}
                  <AnimatePresence>
                    {hoveredMember === member.id && (
                      <motion.div
                        className="absolute top-4 right-4 flex space-x-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <a href={member.social.linkedin} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors duration-300">
                          <Linkedin className="h-3 w-3" />
                        </a>
                        <a href={member.social.twitter} className="p-2 bg-sky-600 text-white rounded-full hover:bg-sky-500 transition-colors duration-300">
                          <Twitter className="h-3 w-3" />
                        </a>
                        <a href={member.social.github} className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300">
                          <Github className="h-3 w-3" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-400 font-medium">{member.role}</p>
                  </div>
                </div>

                <div className="p-5">
                  {/* Bio */}
                  <p className="text-gray-300 mb-3 text-sm leading-relaxed">{member.bio}</p>

                  {/* Expertise */}
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded-full text-xs">
                          +{member.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Top Achievement */}
                  <div className="flex items-center space-x-2 text-sm">
                    <Award className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-gray-300">{member.achievements[0]}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our World-Class Team
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            We're always looking for talented individuals who share our passion for AI innovation. 
            Help us shape the future of artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
              View Open Positions
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300">
              Send Your Resume
            </button>
          </div>
        </div>
      </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Teams;