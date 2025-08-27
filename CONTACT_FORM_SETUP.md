# 🚀 Contact Form Setup Guide - Nexariza AI

## ✅ Complete Contact Form System

Your contact form system includes:
- **Frontend**: React component with validation and error handling
- **Backend**: Node.js API with Supabase integration and dual email system
- **Database**: Supabase table for storing all submissions
- **Email**: Dual email system (admin notification + user confirmation)
- **Security**: Input validation, rate limiting, and XSS protection

## 📋 Required Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# SMTP Configuration (Required for emails)
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_USER=contact@nexariza.com
SMTP_PASS=Nexariza@Ahmad1122

# Admin Configuration
ADMIN_EMAIL=contact@nexariza.com
CONTACT_EMAIL=contact@nexariza.com

# Supabase Configuration (Required for database)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Site Configuration
VITE_SITE_URL=https://www.nexariza.com
NODE_ENV=production
```

## 🗄️ Database Setup

### 1. Run the Migration
The migration file `create_contact_submissions_table.sql` will create:
- `contact_submissions` table with all required fields
- Row Level Security (RLS) policies
- Indexes for performance
- Automatic timestamp updates

### 2. Verify Table Structure
Your `contact_submissions` table includes:
- `id` (UUID, primary key)
- `name` (text, required)
- `email` (text, required)
- `company` (text, optional)
- `service` (text, service interest)
- `message` (text, required)
- `status` (text, default: 'new')
- `ip_address` (text, for security)
- `user_agent` (text, browser info)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## 📧 Email System Features

### Admin Notification Email (to contact@nexariza.com):
- ✅ Professional Nexariza AI branding
- ✅ Complete contact information display
- ✅ Service interest and company details
- ✅ Full message content with formatting
- ✅ Quick reply button with pre-filled email
- ✅ Submission timestamp and reference ID
- ✅ Client IP and browser information

### User Confirmation Email (to form submitter):
- ✅ Professional welcome message with branding
- ✅ Submission confirmation and summary
- ✅ Clear next steps and 24-hour response timeline
- ✅ Company introduction featuring Ahmad Yasin
- ✅ Contact information and website links
- ✅ Professional footer with company details

## 🔒 Security Features

### Input Validation:
- ✅ Required field validation
- ✅ Email format validation
- ✅ Message length limits (10-2000 characters)
- ✅ XSS protection and input sanitization
- ✅ SQL injection prevention

### Rate Limiting:
- ✅ 5 submissions per minute per IP
- ✅ Automatic cooldown periods
- ✅ User-friendly error messages

### Data Protection:
- ✅ IP address logging for security
- ✅ User agent tracking
- ✅ Secure SMTP with TLS encryption
- ✅ Environment variable protection

## 🧪 Testing Instructions

### Development Mode:
1. Run `npm run dev`
2. Navigate to `/contact`
3. Fill out the form completely
4. Submit and check browser console
5. You'll see an alert confirming submission
6. Console shows what would happen in production

### Production Mode:
1. Deploy with environment variables
2. Submit a real form
3. Check contact@nexariza.com for admin notification
4. Check submitter's email for confirmation
5. Verify database entry in Supabase dashboard

## 📊 Form Workflow

### User Experience:
1. **User fills form** → Client-side validation
2. **Form submits** → Loading state with spinner
3. **Success message** → Confirmation with email notice
4. **Form clears** → Ready for next submission

### Backend Process:
1. **Validation** → Comprehensive input validation
2. **Sanitization** → Clean and secure all inputs
3. **Database Storage** → Store in Supabase (with fallback)
4. **Email Sending** → Send both admin and user emails
5. **Response** → Return success/error with details

## 🚀 Deployment Checklist

### Before Deployment:
- [ ] Set all environment variables in hosting platform
- [ ] Run Supabase migration to create table
- [ ] Test SMTP credentials
- [ ] Verify Supabase connection
- [ ] Test form submission in development

### After Deployment:
- [ ] Submit test form with real data
- [ ] Check admin email delivery
- [ ] Check user confirmation email
- [ ] Verify database storage in Supabase
- [ ] Test error handling scenarios

## 🔧 Troubleshooting

### Common Issues:

**Form not submitting:**
- Check browser console for JavaScript errors
- Verify all required fields are filled
- Check network tab for failed API requests

**Emails not sending:**
- Verify SMTP environment variables
- Check email credentials are correct
- Test SMTP connection with `node test-email.js`

**Database not storing:**
- Check Supabase URL and API key
- Verify table exists and RLS policies are correct
- Check Supabase logs for errors

**Validation errors:**
- Ensure email format is correct
- Check message length (10-2000 characters)
- Verify no special characters in name field

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are set
3. Test individual components (database, email, validation)
4. Contact support at contact@nexariza.com

## 🎉 Success Metrics

After setup, you should see:
- ✅ Form submissions stored in Supabase
- ✅ Admin notifications delivered instantly
- ✅ User confirmations sent automatically
- ✅ Professional email templates
- ✅ Comprehensive error handling
- ✅ Security measures active

Your contact form is now production-ready with enterprise-grade reliability! 🚀