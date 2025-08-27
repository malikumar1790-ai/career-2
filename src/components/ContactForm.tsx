import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, User, Building, MessageSquare, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactService, type ContactSubmission } from '../lib/supabase';
import LoadingSpinner from './LoadingSpinner';
import EnhancedFormValidation, { ValidationRules } from './EnhancedFormValidation';
import SecurityManager from '../utils/security';

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  className = '', 
  onSuccess, 
  onError 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  const services = [
    'Custom AI/ML Development',
    'Neural Networks & LLMs',
    'NLP & Agentic AI Systems',
    'Full-Stack AI Integration',
    'Next.js & React Development',
    'Django & FastAPI Solutions',
    'Enterprise DevOps & Cloud',
    'AWS & Google Cloud Deployment',
    'Kubernetes & Docker',
    'Lifetime Partnership Support',
    'AI Consultation & Strategy',
    'Custom AI Solution'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push('Name is required');
    } else if (formData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    const emailValidation = SecurityManager.validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.push(emailValidation.reason || 'Invalid email');
    }

    if (!formData.message.trim()) {
      errors.push('Message is required');
    } else if (formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters');
    } else if (formData.message.trim().length > 2000) {
      errors.push('Message must be less than 2000 characters');
    }

    // Security validation
    const allFields = [formData.name, formData.email, formData.company, formData.message, formData.service];
    const hasSecurityIssue = allFields.some(field => 
      field && !SecurityManager.validateInput(field)
    );

    if (hasSecurityIssue) {
      errors.push('Invalid characters detected in form data');
    }

    return { isValid: errors.length === 0, errors };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    setError('');
    
    // Client-side validation
    const validation = validateForm();
    if (!validation.isValid) {
      setError(validation.errors.join(', '));
      return;
    }

    // Rate limiting check
    const userIP = 'user-' + Date.now(); // In production, get real IP
    if (!SecurityManager.rateLimiter.isAllowed(userIP, 5, 60000)) {
      const remainingTime = SecurityManager.rateLimiter.getRemainingTime(userIP, 60000);
      setError(`Too many attempts. Please wait ${Math.ceil(remainingTime / 1000)} seconds before trying again.`);
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize form data
      const sanitizedData = SecurityManager.sanitizeFormData(formData);
      
      // Check if we're in development or production
      const isDevelopment = import.meta.env.DEV || 
                           window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1';
      
      if (isDevelopment) {
        // Development mode: Show console logs and alert
        console.log('📧 DEVELOPMENT MODE - Form submitted:', sanitizedData);
        console.log('✅ In production, emails will be sent to:');
        console.log('   → Admin notification: contact@nexariza.com');
        console.log('   → User confirmation:', sanitizedData.email);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        alert('✅ DEVELOPMENT MODE\n\nForm submitted successfully!\n\nIn production, this will:\n• Store data in Supabase\n• Send admin notification to contact@nexariza.com\n• Send confirmation email to user\n\nCheck console for details.');
        
        setIsSuccess(true);
        onSuccess?.();
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: ''
        });
        
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
        
        return;
      }
      
      // Production mode: Store in database and send emails
      try {
        // Store in Supabase database
        const submissionData: ContactSubmission = {
          name: sanitizedData.name,
          email: sanitizedData.email,
          company: sanitizedData.company,
          service: sanitizedData.service,
          message: sanitizedData.message
        };
        
        await contactService.submitContactForm(submissionData);
        console.log('✅ Contact form saved to database');
      } catch (dbError) {
        console.warn('⚠️ Database storage failed, continuing with email:', dbError);
        // Continue with email sending even if database fails
      }
      
      // Send emails via API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setIsSuccess(true);
        onSuccess?.();
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: ''
        });
        
        setTimeout(() => {
          setIsSuccess(false);
        }, 8000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
      setError(errorMessage);
      onError?.(errorMessage);
      
      // Clear error after 10 seconds
      setTimeout(() => {
        setError('');
      }, 10000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700 p-8 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Get Your Free AI Consultation</h2>
          <p className="text-gray-400 text-sm">We'll respond within 24 hours</p>
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="mb-6 p-6 bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-700/50 rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-green-300 font-semibold mb-2">Message Sent Successfully! 🎉</h3>
                <p className="text-green-200 text-sm leading-relaxed">
                  Thank you for contacting Nexariza AI! We've received your message and will respond within 24 hours. 
                  Please check your email for a detailed confirmation with next steps.
                </p>
                <div className="mt-3 p-3 bg-green-800/20 rounded-lg">
                  <p className="text-green-300 text-xs">
                    📧 Emails sent to: contact@nexariza.com (admin) and {formData.email || 'your email'} (confirmation)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg flex items-start space-x-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-300 font-semibold mb-1">Submission Error</h4>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              <User className="h-4 w-4 inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              aria-required="true"
              aria-describedby="name-validation"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="John Doe"
            />
            <div id="name-validation">
              <EnhancedFormValidation
                value={formData.name}
                rules={[
                  ValidationRules.required('Name is required'),
                  ValidationRules.minLength(2, 'Name must be at least 2 characters'),
                  ValidationRules.maxLength(100, 'Name must be less than 100 characters'),
                  ValidationRules.noSpecialChars('Name cannot contain special characters')
                ]}
                showValidation={showValidation}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="h-4 w-4 inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              aria-required="true"
              aria-describedby="email-validation"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="john@company.com"
            />
            <div id="email-validation">
              <EnhancedFormValidation
                value={formData.email}
                rules={[
                  ValidationRules.required('Email is required'),
                  ValidationRules.email('Please enter a valid email address'),
                  ValidationRules.maxLength(254, 'Email is too long')
                ]}
                showValidation={showValidation}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              <Building className="h-4 w-4 inline mr-2" />
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Your Company"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
              <Settings className="h-4 w-4 inline mr-2" />
              Service Interest
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            <MessageSquare className="h-4 w-4 inline mr-2" />
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            aria-required="true"
            aria-describedby="message-validation message-counter"
            minLength={10}
            maxLength={2000}
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
            placeholder="Tell us about your project, goals, and how we can help transform your business with AI..."
          />
          <div id="message-counter" className="mt-1 text-right">
            <span className={`text-xs ${formData.message.length > 1800 ? 'text-red-400' : 'text-gray-400'}`}>
              {formData.message.length}/2000 characters
            </span>
          </div>
          <div id="message-validation">
            <EnhancedFormValidation
              value={formData.message}
              rules={[
                ValidationRules.required('Message is required'),
                ValidationRules.minLength(10, 'Please provide a more detailed message (minimum 10 characters)'),
                ValidationRules.maxLength(2000, 'Message is too long (maximum 2000 characters)')
              ]}
              showValidation={showValidation}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.email || !formData.message || formData.message.length < 10}
          aria-describedby="submit-status"
          className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" text="Sending..." type="dots" />
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </>
          )}
        </button>

        <div id="submit-status" className="sr-only" aria-live="polite">
          {isSubmitting && "Form is being submitted"}
          {isSuccess && "Form submitted successfully"}
          {error && `Error: ${error}`}
        </div>

        <p className="text-center text-gray-400 text-sm">
          By submitting this form, you agree to receive communications from Nexariza AI. 
          We respect your privacy and will never share your information.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;