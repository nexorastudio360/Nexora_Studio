import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Phone, Clock, MapPin, CheckCircle, AlertCircle, 
  ArrowUpRight, ShieldCheck, Sparkles, Send, Upload, Trash2, 
  Search, Check, ChevronDown, Calendar, ArrowLeft
} from 'lucide-react';
import { Lead } from '../types';

// Zod Schema for validation
const discoveryFormSchema = z.object({
  name: z.string().min(2, 'Full Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid business email address'),
  phoneCountryCode: z.string().min(1, 'Country code is required'),
  phoneNumber: z.string().min(6, 'Phone number must be at least 6 digits'),
  country: z.string().min(2, 'Please select your country'),
  company: z.string().optional(),
  industry: z.string().min(2, 'Please select or type your industry'),
  businessType: z.string().min(2, 'Please select a business type'),
  currentWebsite: z.string()
    .url('Website must start with http:// or https://')
    .optional()
    .or(z.string().length(0)),
  budget: z.string().min(1, 'Please select your investment budget'),
  timeline: z.string().min(1, 'Please select a target timeline'),
  projectTypes: z.array(z.string()).min(1, 'Please select at least one project type'),
  pages: z.string().min(1, 'Please select your page volume estimate'),
  requiredFeatures: z.array(z.string()).min(1, 'Please select at least one integration feature'),
  brandStyle: z.array(z.string()).min(1, 'Please select at least one brand style keyword'),
  referenceWebsites: z.string().optional(),
  objectives: z.string().min(10, 'Objectives description must be at least 10 characters long'),
  additionalNotes: z.string().optional(),
  hearAboutUs: z.string().min(1, 'Please select how you heard about us')
});

type DiscoveryFormData = z.infer<typeof discoveryFormSchema>;

interface ContactProps {
  onAddLead: (lead: Lead) => void;
}

// Predefined lists for pristine UX selection
const countriesList = [
  { name: 'Pakistan', flag: '🇵🇰', code: '+92' },
  { name: 'United States', flag: '🇺🇸', code: '+1' },
  { name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
  { name: 'Canada', flag: '🇨🇦', code: '+1' },
  { name: 'Australia', flag: '🇦🇺', code: '+61' },
  { name: 'Germany', flag: '🇩🇪', code: '+49' },
  { name: 'Saudi Arabia', flag: '🇸🇦', code: '+966' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: '+971' },
  { name: 'Qatar', flag: '🇶🇦', code: '+974' },
  { name: 'Singapore', flag: '🇸🇬', code: '+65' },
  { name: 'France', flag: '🇫🇷', code: '+33' },
  { name: 'Netherlands', flag: '🇳🇱', code: '+31' },
  { name: 'Switzerland', flag: '🇨🇭', code: '+41' },
  { name: 'Turkey', flag: '🇹🇷', code: '+90' },
  { name: 'Malaysia', flag: '🇲🇾', code: '+60' }
];

const businessTypes = [
  'Startup', 'Small Business', 'Medium Business', 'Enterprise', 'Personal Brand',
  'Agency', 'Restaurant', 'Clinic', 'Law Firm', 'Gym', 'Hotel', 'Real Estate',
  'Construction', 'Other'
];

const projectTypesList = [
  { name: 'Landing Page', icon: '📄' },
  { name: 'Business Website', icon: '🏢' },
  { name: 'Portfolio', icon: '🎨' },
  { name: 'Booking Website', icon: '📅' },
  { name: 'Restaurant Website', icon: '🍳' },
  { name: 'Hotel Website', icon: '🏨' },
  { name: 'Dental Website', icon: '🦷' },
  { name: 'Real Estate Website', icon: '🏡' },
  { name: 'Law Firm Website', icon: '⚖️' },
  { name: 'Dashboard', icon: '📊' },
  { name: 'Custom Web App', icon: '⚙️' },
  { name: 'AI Integration', icon: '🤖' },
  { name: 'Website Redesign', icon: '🔄' },
  { name: 'Other', icon: '🌐' }
];

const pagesOptions = ['1-3', '4-6', '7-10', '10+', 'Not Sure'];

const requiredFeaturesList = [
  'Booking System', 'Online Payments', 'WhatsApp Integration', 'Live Chat',
  'Blog', 'CMS', 'Admin Panel', 'Authentication', 'Multi Language',
  'Animations', 'SEO', 'Analytics', 'Contact Forms', 'Gallery', 'Maps',
  'Appointment Scheduling', 'CRM Integration', 'Newsletter', 'AI Chatbot'
];

const brandStyles = [
  'Luxury', 'Minimal', 'Corporate', 'Modern', 'Dark', 'Light', 'Elegant', 'Creative', 'Premium', 'Bold'
];

const timelineOptions = ['ASAP', '1 Week', '2 Weeks', '1 Month', 'Flexible'];

const hearAboutUsOptions = ['Google', 'Facebook', 'LinkedIn', 'Instagram', 'Referral', 'YouTube', 'Other'];

const budgets = [
  'Under $5,000 (Basic Landing)',
  '$5,000 – $10,000 (Premium Website)',
  '$10,000 – $25,000 (Custom Web App)',
  '$25,000+ (Enterprise System / AI Setup)',
];

const industries = [
  'Dental Clinics',
  'Law Firms',
  'Hotels',
  'Real Estate',
  'Construction',
  'Beauty Salons',
  'Restaurants',
  'Gyms',
  'Professional Service Businesses',
  'E-Commerce',
  'SaaS / Software',
  'Healthcare',
  'Education',
  'Finance',
  'Other'
];

export const Contact: React.FC<ContactProps> = ({ onAddLead }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Custom states for searchable country dropdown
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Custom states for file upload
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number; type: string; data: string }[]>([]);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // react-hook-form initialization
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<DiscoveryFormData>({
    resolver: zodResolver(discoveryFormSchema),
    defaultValues: {
      phoneCountryCode: '+92',
      country: '',
      industry: 'Dental Clinics',
      businessType: 'Startup',
      budget: '$10,000 – $25,000 (Custom Web App)',
      timeline: 'ASAP',
      pages: '4-6',
      hearAboutUs: 'Google',
      projectTypes: [],
      requiredFeatures: [],
      brandStyle: [],
      referenceWebsites: '',
      additionalNotes: ''
    }
  });

  const selectedCountry = watch('country');
  const selectedPhoneCode = watch('phoneCountryCode');
  const selectedBudget = watch('budget');
  const selectedTimeline = watch('timeline');
  const selectedPages = watch('pages');
  const selectedProjectTypes = watch('projectTypes') || [];
  const selectedFeatures = watch('requiredFeatures') || [];
  const selectedBrandStyles = watch('brandStyle') || [];

  // Close country dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Country Selection
  const handleSelectCountry = (countryName: string, countryCode: string) => {
    setValue('country', countryName);
    setValue('phoneCountryCode', countryCode);
    setIsCountryDropdownOpen(false);
    setCountrySearchQuery('');
  };

  // Drag and Drop files support
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const processFiles = (filesList: FileList) => {
    const validFiles: File[] = [];
    let hasError = false;

    Array.from(filesList).forEach((file) => {
      if (file.size > 20 * 1024 * 1024) {
        setSubmitError(`File "${file.name}" exceeds the 20MB limit.`);
        hasError = true;
        return;
      }
      validFiles.push(file);
    });

    if (hasError) return;
    setSubmitError('');

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedFiles((prev) => [
            ...prev,
            {
              name: file.name,
              size: file.size,
              type: file.type,
              data: e.target!.result as string
            }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Toggle multi-select project types
  const handleToggleProjectType = (typeName: string) => {
    const current = [...selectedProjectTypes];
    const index = current.indexOf(typeName);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(typeName);
    }
    setValue('projectTypes', current, { shouldValidate: true });
  };

  // Toggle multi-select features
  const handleToggleFeature = (featureName: string) => {
    const current = [...selectedFeatures];
    const index = current.indexOf(featureName);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(featureName);
    }
    setValue('requiredFeatures', current, { shouldValidate: true });
  };

  // Toggle multi-select brand styles
  const handleToggleBrandStyle = (styleName: string) => {
    const current = [...selectedBrandStyles];
    const index = current.indexOf(styleName);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(styleName);
    }
    setValue('brandStyle', current, { shouldValidate: true });
  };

  // Submit Handler
  const onSubmitInquiry = async (data: DiscoveryFormData) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Gather metadata
      const browser = navigator.userAgent;
      const device = navigator.platform;

      // Destination 1: Send beautiful HTML email via API route
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          phone: `${data.phoneCountryCode} ${data.phoneNumber}`,
          files: uploadedFiles,
          browser,
          device
        })
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.error || 'Failed to dispatch project discovery intake.');
      }

      // Add to local sandbox CRM to maintain full interactive fidelity
      const crmSummaryText = `[Project Discovery Intake]
- Business Type: ${data.businessType}
- Project Type: ${data.projectTypes.join(', ')}
- Pages Estimated: ${data.pages}
- Timeline Required: ${data.timeline}
- Preferred Styles: ${data.brandStyle.join(', ')}
- Mandatory Features: ${data.requiredFeatures.join(', ')}
- Primary Project Objectives: ${data.objectives}
- Reference Sites: ${data.referenceWebsites || 'None'}
- Custom Notes: ${data.additionalNotes || 'None'}
- Uploaded Files count: ${uploadedFiles.length}`;

      const newLead: Lead = {
        id: 'lead-' + Date.now(),
        name: data.name,
        email: data.email,
        company: data.company || 'Independent Business',
        industry: data.industry,
        budget: data.budget,
        message: crmSummaryText,
        timestamp: new Date().toLocaleString(),
        status: 'new'
      };

      onAddLead(newLead);

      // Destination 2: WhatsApp preparation and redirection
      const formatValue = (val: string | undefined) => {
        if (!val) return 'Not Provided';
        const trimmed = val.trim();
        if (!trimmed || trimmed.toLowerCase() === 'none' || trimmed.toLowerCase() === 'none provided') return 'Not Provided';
        return trimmed;
      };

      const buildBulletList = (arr: string[] | undefined) => {
        if (!arr || arr.length === 0) return 'Not Provided';
        return arr.map(item => `• ${item}`).join('\n');
      };

      const buildChecklist = (arr: string[] | undefined) => {
        if (!arr || arr.length === 0) return 'Not Provided';
        return arr.map(item => `✅ ${item}`).join('\n');
      };

      const formattedName = formatValue(data.name);
      const formattedEmail = formatValue(data.email);
      const formattedPhone = formatValue(`${data.phoneCountryCode} ${data.phoneNumber}`);
      const formattedCountry = formatValue(data.country);
      const formattedCompany = formatValue(data.company);
      
      const formattedIndustry = formatValue(data.industry);
      const formattedWebsite = formatValue(data.currentWebsite);

      const formattedProjectTypes = buildBulletList(data.projectTypes);
      const formattedBudget = formatValue(data.budget);
      const formattedTimeline = formatValue(data.timeline);

      const formattedStyles = buildBulletList(data.brandStyle);

      // Extract features and integrations from selected requiredFeatures array
      const selectedFeatures = data.requiredFeatures || [];
      const featuresList: string[] = [];
      if (selectedFeatures.includes('Booking System')) featuresList.push('Booking System');
      if (selectedFeatures.includes('Admin Panel')) featuresList.push('Admin Dashboard');
      if (selectedFeatures.includes('Online Payments')) featuresList.push('Online Payments');
      if (selectedFeatures.includes('AI Chatbot')) featuresList.push('AI Chatbot');
      if (selectedFeatures.includes('CMS')) featuresList.push('CMS');
      if (selectedFeatures.includes('Live Chat')) featuresList.push('Live Chat');
      if (selectedFeatures.includes('Blog')) featuresList.push('Blog');
      if (selectedFeatures.includes('Authentication')) featuresList.push('User Authentication');
      if (selectedFeatures.includes('Multi Language')) featuresList.push('Multi-Language Support');
      if (selectedFeatures.includes('Animations')) featuresList.push('Animations');
      if (selectedFeatures.includes('SEO')) featuresList.push('SEO');
      if (selectedFeatures.includes('Contact Forms')) featuresList.push('Contact Forms');
      if (selectedFeatures.includes('Gallery')) featuresList.push('Gallery');
      if (selectedFeatures.includes('Appointment Scheduling')) featuresList.push('Appointment Scheduling');

      selectedFeatures.forEach(feat => {
        if (![
          'Booking System', 'Admin Panel', 'Online Payments', 'AI Chatbot', 'CMS', 
          'Live Chat', 'Blog', 'Authentication', 'Multi Language', 'Animations', 
          'SEO', 'Contact Forms', 'Gallery', 'Appointment Scheduling',
          'WhatsApp Integration', 'CRM Integration', 'Newsletter', 'Maps', 'Analytics'
        ].includes(feat)) {
          featuresList.push(feat);
        }
      });

      const formattedFeatures = buildChecklist(featuresList);

      const integrationsList: string[] = [];
      if (selectedFeatures.includes('Online Payments')) integrationsList.push('Stripe');
      if (selectedFeatures.includes('Booking System') || selectedFeatures.includes('Appointment Scheduling')) integrationsList.push('Calendly');
      if (selectedFeatures.includes('Maps')) integrationsList.push('Google Maps');
      if (selectedFeatures.includes('WhatsApp Integration')) integrationsList.push('WhatsApp');
      if (selectedFeatures.includes('CRM Integration')) integrationsList.push('Hubspot / Salesforce CRM');
      if (selectedFeatures.includes('Newsletter')) integrationsList.push('Mailchimp / Email Integration');
      if (selectedFeatures.includes('Analytics')) integrationsList.push('Google Analytics');

      const formattedIntegrations = buildChecklist(integrationsList);

      const formattedDescription = formatValue(data.objectives);
      const formattedNotes = formatValue(data.additionalNotes);

      const projectSummaryTypes = data.projectTypes && data.projectTypes.length > 0 
        ? data.projectTypes.join(' / ') 
        : 'Not Provided';

      const submissionDate = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });

      const premiumMessage = `🚀 ═══════════════════════════════
        NEW PROJECT INQUIRY
      Nexora Studio Discovery Form
═══════════════════════════════

👤 CLIENT INFORMATION

• Full Name:
${formattedName}

• Business Email:
${formattedEmail}

• Phone Number:
${formattedPhone}

• Country:
${formattedCountry}

• Company:
${formattedCompany}

━━━━━━━━━━━━━━━━━━━━━━

🏢 BUSINESS PROFILE

• Industry:
${formattedIndustry}

• Existing Website:
${formattedWebsite}

━━━━━━━━━━━━━━━━━━━━━━

💼 PROJECT DETAILS

• Project Type:
${formattedProjectTypes}

• Estimated Budget:
${formattedBudget}

• Timeline:
${formattedTimeline}

━━━━━━━━━━━━━━━━━━━━━━

🎨 DESIGN PREFERENCES

${formattedStyles}

━━━━━━━━━━━━━━━━━━━━━━

⚙ REQUIRED FEATURES

${formattedFeatures}

━━━━━━━━━━━━━━━━━━━━━━

🔗 REQUIRED INTEGRATIONS

${formattedIntegrations}

━━━━━━━━━━━━━━━━━━━━━━

📝 PROJECT DESCRIPTION

${formattedDescription}

━━━━━━━━━━━━━━━━━━━━━━

📌 ADDITIONAL NOTES

${formattedNotes}

━━━━━━━━━━━━━━━━━━━━━━

📊 PROJECT SUMMARY

Industry:
${formattedIndustry}

Project Type:
${projectSummaryTypes}

Budget:
${formattedBudget}

Timeline:
${formattedTimeline}

Country:
${formattedCountry}

━━━━━━━━━━━━━━━━━━━━━━

🕒 Submitted:
${submissionDate}

🌐 Source:
Nexora Studio Website

🚀 Thank you for choosing Nexora Studio.

We will review your project and respond as soon as possible.

═══════════════════════`;

      const waEncodedUrl = `https://wa.me/923096432755?text=${encodeURIComponent(premiumMessage)}`;
      window.open(waEncodedUrl, '_blank');

      // Update success states
      setSubmitSuccess(true);
      reset();
      setUploadedFiles([]);
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred while transmitting your project discovery details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter country list on user search input
  const filteredCountries = countriesList.filter(c => 
    c.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) || 
    c.code.includes(countrySearchQuery)
  );

  return (
    <section id="contact" className="py-24 bg-brand-slate-950 text-white relative overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Premium Pitch & WhatsApp / Email Actions */}
          <div className="lg:col-span-5 text-left flex flex-col justify-between" id="contact-info-panel">
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-blue-400 uppercase mb-4 block">
                PARTNER CONSULTATION
              </span>
              <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
                Let’s Design <br /> the Future <span className="font-serif italic font-normal text-blue-400">of</span> <br /> Your Business<span className="text-blue-400">.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-brand-slate-400 leading-relaxed mb-10 max-w-sm">
                Capture instant authority, premier industry search rankings, and scalable lead capture loops. Submit this Project Discovery Intake to dispatch your details to our principal architects immediately.
              </p>

              {/* Direct clickable contact channels */}
              <div className="space-y-6" id="contact-details-tokens">
                {/* Clickable Email */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-brand-slate-500 uppercase tracking-wider font-bold">EMAIL INQUIRIES</span>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nexorastudio360@gmail.com" target="_blank" rel="noopener noreferrer" className="block font-sans text-xs sm:text-sm font-semibold hover:text-blue-400 transition-colors">
                      nexorastudio360@gmail.com
                    </a>
                  </div>
                </div>

                {/* Clickable WhatsApp */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-brand-slate-500 uppercase tracking-wider font-bold">WHATSAPP CONSULTATION</span>
                    <a href="https://wa.me/923096432755?text=Hello%20Nexora%20Studio!%20I%20am%20interested%20in%20your%20web%20design%20services.%20I%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer" className="block font-sans text-xs sm:text-sm font-semibold hover:text-blue-400 transition-colors">
                      +92 309 6432755
                    </a>
                  </div>
                </div>

                {/* Serving Worldwide Location Indicator */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-brand-slate-500 uppercase tracking-wider font-bold">GLOBAL STUDIO BASE</span>
                    <span className="block font-sans text-xs sm:text-sm font-semibold">
                      Serving Clients Worldwide • Remote Digital Studio
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Indicator / Pakistan Standard Hours */}
            <div className="mt-12 lg:mt-0 p-5 rounded-2xl bg-white/5 border border-white/5 text-xs font-mono space-y-3.5" id="contact-latency-meter">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-brand-slate-400">AVERAGE RESPONSE RATE</span>
                <span className="text-brand-success font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  &lt; 2 HOURS
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-brand-slate-400">BUSINESS HOURS (PKT)</span>
                <span className="text-brand-slate-200">09:00 AM – 06:00 PM (MON–FRI)</span>
              </div>
              <div className="flex items-center gap-2 text-brand-slate-500 text-[10px] pt-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-success flex-shrink-0" />
                <span>SECURED SSL DATABASE WITH END-TO-END VERIFIED VALIDATIONS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form Card / Multi-step UI */}
          <div className="lg:col-span-7" id="contact-form-panel">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 text-left backdrop-blur-md relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form
                    key="discovery-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmitInquiry)}
                    className="space-y-8"
                    id="nexora-project-discovery-form"
                  >
                    {/* Visual Section Header */}
                    <div className="border-b border-white/5 pb-4">
                      <h3 className="font-sans text-lg font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        Project Discovery Intake
                      </h3>
                      <p className="font-sans text-xs text-brand-slate-400 mt-1">
                        Please provide your business and technical specifications below. Required fields are marked with an asterisk (*).
                      </p>
                    </div>

                    {/* Error Alerts */}
                    {submitError && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* STEP 1: Basic Profile */}
                    <div className="space-y-6">
                      <h4 className="font-mono text-[10px] tracking-widest text-blue-400 font-extrabold uppercase">1. Partner Profile</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name input */}
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                            Full Name <span className="text-blue-400">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Alex Morgan"
                            className={`px-4 py-3 rounded-xl bg-white/5 border text-sm transition-all duration-200 focus:outline-hidden ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-blue-500'}`}
                            {...register('name')}
                            id="form-input-name"
                          />
                          {errors.name && <span className="text-red-400 text-[10px]">{errors.name.message}</span>}
                        </div>

                        {/* Email input */}
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                            Business Email <span className="text-blue-400">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="alex@company.com"
                            className={`px-4 py-3 rounded-xl bg-white/5 border text-sm transition-all duration-200 focus:outline-hidden ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-blue-500'}`}
                            {...register('email')}
                            id="form-input-email"
                          />
                          {errors.email && <span className="text-red-400 text-[10px]">{errors.email.message}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Country Selection (Searchable Premium Dropdown) */}
                        <div className="flex flex-col gap-2 relative" ref={countryDropdownRef}>
                          <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                            Country <span className="text-blue-400">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                            className={`px-4 py-3 rounded-xl bg-white/5 border text-sm text-left flex items-center justify-between transition-all duration-200 focus:outline-hidden cursor-pointer ${errors.country ? 'border-red-500' : 'border-white/10'}`}
                            id="country-selector-trigger"
                          >
                            <span className={selectedCountry ? 'text-white' : 'text-gray-400'}>
                              {selectedCountry ? (
                                <>
                                  <span className="mr-2">{countriesList.find(c => c.name === selectedCountry)?.flag}</span>
                                  {selectedCountry}
                                </>
                              ) : (
                                'Select your country...'
                              )}
                            </span>
                            <ChevronDown className="w-4 h-4 text-brand-slate-400" />
                          </button>
                          <input type="hidden" {...register('country')} />

                          {isCountryDropdownOpen && (
                            <div className="absolute top-[105%] left-0 right-0 z-30 bg-brand-slate-900 border border-white/15 rounded-xl shadow-xl p-2.5 overflow-hidden">
                              <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg px-2.5 py-1.5 mb-2.5">
                                <Search className="w-3.5 h-3.5 text-brand-slate-400" />
                                <input
                                  type="text"
                                  placeholder="Search countries..."
                                  value={countrySearchQuery}
                                  onChange={(e) => setCountrySearchQuery(e.target.value)}
                                  className="bg-transparent border-none text-xs focus:outline-hidden w-full text-white"
                                />
                              </div>
                              <div className="max-h-40 overflow-y-auto space-y-1">
                                {filteredCountries.length > 0 ? (
                                  filteredCountries.map((c) => (
                                    <button
                                      type="button"
                                      key={c.name}
                                      onClick={() => handleSelectCountry(c.name, c.code)}
                                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-brand-slate-200 flex items-center justify-between cursor-pointer"
                                    >
                                      <span>{c.flag} &nbsp; {c.name} ({c.code})</span>
                                      {selectedCountry === c.name && <Check className="w-3.5 h-3.5 text-blue-400" />}
                                    </button>
                                  ))
                                ) : (
                                  <span className="block text-[10px] text-brand-slate-500 p-2">No matching country</span>
                                )}
                              </div>
                            </div>
                          )}
                          {errors.country && <span className="text-red-400 text-[10px]">{errors.country.message}</span>}
                        </div>

                        {/* Phone Number (International input combo) */}
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                            Phone Number <span className="text-blue-400">*</span>
                          </label>
                          <div className="flex gap-2">
                            {/* Flag / Code static indicator */}
                            <select
                              className="px-3 py-3 rounded-xl bg-brand-slate-900 border border-white/10 text-sm text-white focus:outline-hidden cursor-pointer"
                              {...register('phoneCountryCode')}
                            >
                              {countriesList.map((c) => (
                                <option key={c.name} value={c.code}>
                                  {c.flag} {c.code}
                                </option>
                              ))}
                              <option value="+other">Other</option>
                            </select>
                            
                            <input
                              type="tel"
                              placeholder="309 6432755"
                              className={`flex-grow px-4 py-3 rounded-xl bg-white/5 border text-sm transition-all duration-200 focus:outline-hidden ${errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-blue-500'}`}
                              {...register('phoneNumber')}
                              id="form-input-phone"
                            />
                          </div>
                          {errors.phoneNumber && <span className="text-red-400 text-[10px]">{errors.phoneNumber.message}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Company input */}
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                            Company Name
                          </label>
                          <input
                            type="text"
                            placeholder="Morgan & Partners"
                            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-hidden text-sm transition-all duration-200"
                            {...register('company')}
                            id="form-input-company"
                          />
                        </div>

                        {/* Industry dropdown selection */}
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                            Sectors / Industry <span className="text-blue-400">*</span>
                          </label>
                          <select
                            className="px-4 py-3 rounded-xl bg-brand-slate-900 border border-white/10 focus:border-blue-500 focus:outline-hidden text-sm transition-all duration-200 text-white cursor-pointer"
                            {...register('industry')}
                            id="form-input-industry"
                          >
                            {industries.map((ind) => (
                              <option key={ind} value={ind}>
                                {ind}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Business Type dropdown */}
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                            Business Type <span className="text-blue-400">*</span>
                          </label>
                          <select
                            className="px-4 py-3 rounded-xl bg-brand-slate-900 border border-white/10 focus:border-blue-500 focus:outline-hidden text-sm transition-all duration-200 text-white cursor-pointer"
                            {...register('businessType')}
                            id="form-input-businessType"
                          >
                            {businessTypes.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Current Website url (Optional) */}
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                            Current Website (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="https://example.com"
                            className={`px-4 py-3 rounded-xl bg-white/5 border text-sm transition-all duration-200 focus:outline-hidden ${errors.currentWebsite ? 'border-red-500' : 'border-white/10 focus:border-blue-500'}`}
                            {...register('currentWebsite')}
                            id="form-input-website"
                          />
                          {errors.currentWebsite && <span className="text-red-400 text-[10px]">{errors.currentWebsite.message}</span>}
                        </div>
                      </div>
                    </div>

                    {/* STEP 2: Project Specifications */}
                    <div className="space-y-6 pt-2 border-t border-white/5">
                      <h4 className="font-mono text-[10px] tracking-widest text-blue-400 font-extrabold uppercase">2. Project Specifications</h4>

                      {/* Project Type Multi Select Cards */}
                      <div className="flex flex-col gap-3">
                        <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                          Project Type (Select All That Apply) <span className="text-blue-400">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" id="project-type-cards">
                          {projectTypesList.map((type) => {
                            const isSelected = selectedProjectTypes.includes(type.name);
                            return (
                              <button
                                type="button"
                                key={type.name}
                                onClick={() => handleToggleProjectType(type.name)}
                                className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2.5 cursor-pointer hover:scale-[1.01] ${
                                  isSelected 
                                    ? 'bg-blue-500/10 border-blue-400 text-white shadow-md shadow-blue-500/5' 
                                    : 'bg-white/5 border-white/5 text-brand-slate-300 hover:bg-white/10'
                                }`}
                              >
                                <span className="text-base">{type.icon}</span>
                                <span className="text-xs font-semibold leading-tight">{type.name}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.projectTypes && <span className="text-red-400 text-[10px]">{errors.projectTypes.message}</span>}
                      </div>

                      {/* Budget Selector */}
                      <div className="flex flex-col gap-2 pt-2">
                        <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold mb-1">
                          Estimated Investment Budget <span className="text-blue-400">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="form-budget-options">
                          {budgets.map((b) => (
                            <button
                              type="button"
                              key={b}
                              onClick={() => setValue('budget', b, { shouldValidate: true })}
                              className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                                selectedBudget === b
                                  ? 'bg-blue-500/15 border-blue-500 text-white shadow-md'
                                  : 'bg-white/5 border-white/5 text-brand-slate-300 hover:bg-white/10'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        {/* Number of Pages */}
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                            Number of Pages <span className="text-blue-400">*</span>
                          </label>
                          <div className="grid grid-cols-5 gap-1.5">
                            {pagesOptions.map((opt) => (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => setValue('pages', opt, { shouldValidate: true })}
                                className={`py-2 rounded-lg border text-center text-[11px] font-bold transition-all cursor-pointer ${
                                  selectedPages === opt
                                    ? 'bg-blue-500/15 border-blue-500 text-white shadow-xs'
                                    : 'bg-white/5 border-white/5 text-brand-slate-300 hover:bg-white/10'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                            Timeline Priority <span className="text-blue-400">*</span>
                          </label>
                          <div className="grid grid-cols-5 gap-1.5">
                            {timelineOptions.map((opt) => (
                              <button
                                type="button"
                                key={opt}
                                onClick={() => setValue('timeline', opt, { shouldValidate: true })}
                                className={`py-2 rounded-lg border text-center text-[10px] font-bold uppercase transition-all cursor-pointer ${
                                  selectedTimeline === opt
                                    ? 'bg-blue-500/15 border-blue-500 text-white shadow-xs'
                                    : 'bg-white/5 border-white/5 text-brand-slate-300 hover:bg-white/10'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Required Features (Chips) */}
                      <div className="flex flex-col gap-3 pt-2">
                        <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                          Required Features / Integrations (Select All That Apply) <span className="text-blue-400">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2" id="feature-multiselect-chips">
                          {requiredFeaturesList.map((feat) => {
                            const isSelected = selectedFeatures.includes(feat);
                            return (
                              <button
                                type="button"
                                key={feat}
                                onClick={() => handleToggleFeature(feat)}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-blue-500/20 border-blue-400 text-white'
                                    : 'bg-white/5 border-white/5 text-brand-slate-300 hover:bg-white/10'
                                }`}
                              >
                                {feat}
                              </button>
                            );
                          })}
                        </div>
                        {errors.requiredFeatures && <span className="text-red-400 text-[10px]">{errors.requiredFeatures.message}</span>}
                      </div>

                      {/* Brand Aesthetic Styles */}
                      <div className="flex flex-col gap-3 pt-2">
                        <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                          Brand Style / Design Aesthetic (Select All That Apply) <span className="text-blue-400">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2" id="brand-multiselect-chips">
                          {brandStyles.map((style) => {
                            const isSelected = selectedBrandStyles.includes(style);
                            return (
                              <button
                                type="button"
                                key={style}
                                onClick={() => handleToggleBrandStyle(style)}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-purple-500/20 border-purple-400 text-white'
                                    : 'bg-white/5 border-white/5 text-brand-slate-300 hover:bg-white/10'
                                }`}
                              >
                                {style}
                              </button>
                            );
                          })}
                        </div>
                        {errors.brandStyle && <span className="text-red-400 text-[10px]">{errors.brandStyle.message}</span>}
                      </div>

                      {/* Reference Websites */}
                      <div className="flex flex-col gap-2 pt-2">
                        <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                          Reference Websites (Websites you like)
                        </label>
                        <textarea
                          placeholder="e.g. apple.com, stripe.com, nexorastudio.com"
                          rows={2}
                          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-hidden text-sm transition-all duration-200 resize-none"
                          {...register('referenceWebsites')}
                          id="form-input-reference"
                        />
                      </div>
                    </div>

                    {/* STEP 3: Goals & Uploads */}
                    <div className="space-y-6 pt-2 border-t border-white/5">
                      <h4 className="font-mono text-[10px] tracking-widest text-blue-400 font-extrabold uppercase">3. Goals & Media Assets</h4>

                      {/* Project Objectives */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                          Project Objectives & Scope Description <span className="text-blue-400">*</span>
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Please formulate your primary challenges, technical scope, conversion objectives, and any required systems integrations..."
                          className={`px-4 py-3 rounded-xl bg-white/5 border text-sm transition-all duration-200 focus:outline-hidden resize-none ${errors.objectives ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-blue-500'}`}
                          {...register('objectives')}
                          id="form-input-objectives"
                        />
                        {errors.objectives && <span className="text-red-400 text-[10px]">{errors.objectives.message}</span>}
                      </div>

                      {/* File Upload Zone (Supports Logos, Brand guides, PDFs up to 20MB) */}
                      <div className="flex flex-col gap-2.5">
                        <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                          Upload Brand Assets (Logo, Guide, Wireframe, PDFs - Max 20MB)
                        </label>
                        
                        {/* Drag and Drop Zone */}
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-3 ${
                            isDraggingFile 
                              ? 'bg-blue-500/10 border-blue-400 text-white scale-[1.01]' 
                              : 'bg-white/5 border-white/10 text-brand-slate-400 hover:bg-white/10 hover:border-white/20'
                          }`}
                          id="file-dropzone-uploader"
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileInputChange}
                            multiple
                            className="hidden"
                          />
                          <Upload className="w-8 h-8 text-blue-400 animate-pulse" />
                          <div>
                            <span className="block text-xs font-bold text-white uppercase tracking-wider mb-1">
                              Drag & Drop Files Here
                            </span>
                            <span className="block text-[10px] text-brand-slate-500">
                              or click to browse from device (PDF, JPEG, PNG, DOCX, SVG)
                            </span>
                          </div>
                        </div>

                        {/* List of successfully uploaded files */}
                        {uploadedFiles.length > 0 && (
                          <div className="space-y-2 mt-2" id="uploaded-files-list">
                            {uploadedFiles.map((file, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white"
                              >
                                <div className="flex items-center gap-2.5 overflow-hidden">
                                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                  <span className="truncate font-medium">{file.name}</span>
                                  <span className="text-[10px] text-brand-slate-500">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile(idx)}
                                  className="text-brand-slate-400 hover:text-red-400 transition-colors cursor-pointer p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Anything Else */}
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                          Anything Else?
                        </label>
                        <textarea
                          placeholder="Provide any details about design references, custom functional logic, scheduling preferences, or general remarks..."
                          rows={2}
                          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-hidden text-sm transition-all duration-200 resize-none"
                          {...register('additionalNotes')}
                          id="form-input-additional"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                        {/* How did you hear about us? */}
                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] tracking-widest text-brand-slate-400 uppercase font-bold">
                            How did you hear about us? <span className="text-blue-400">*</span>
                          </label>
                          <select
                            className="px-4 py-3 rounded-xl bg-brand-slate-900 border border-white/10 focus:border-blue-500 focus:outline-hidden text-sm transition-all duration-200 text-white cursor-pointer"
                            {...register('hearAboutUs')}
                            id="form-input-hearAboutUs"
                          >
                            {hearAboutUsOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group flex items-center justify-center gap-2.5 py-4.5 rounded-xl bg-white text-brand-slate-950 font-bold text-xs tracking-wider uppercase hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-xl shadow-white/5 hover:shadow-blue-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
                      id="form-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-brand-slate-950 border-t-transparent rounded-full"></span>
                          <span>COMPILING DISCOVERY PROFILE...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Discovery Inquiry</span>
                          <Send className="w-3.5 h-3.5 text-blue-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  // Premium Success Screen
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 px-2 text-center flex flex-col items-center justify-center"
                    id="form-success-panel"
                  >
                    <div className="p-4.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6 animate-bounce shadow-lg shadow-emerald-500/5">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    
                    <span className="font-mono text-xs font-bold tracking-[0.25em] text-emerald-400 uppercase mb-3">
                      DISCOVERY INTAKE SUCCESSFUL
                    </span>
                    <h3 className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 leading-tight">
                      Thank You!
                    </h3>
                    <h4 className="font-sans text-lg sm:text-xl font-semibold text-brand-slate-200 tracking-tight mb-4">
                      Your Project Inquiry Has Been Received.
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-brand-slate-400 leading-relaxed max-w-md mb-10">
                      Our elite solutions team is already formulating your initial brand blueprint. We will review your constraints and initiate contact within 24 hours.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 text-brand-slate-400" />
                        <span>Back to Inquiry</span>
                      </button>
                      
                      <a
                        href="https://wa.me/923096432755?text=Hello%20Nexora%20Studio!%20I%20am%20interested%20in%20your%20web%20design%20services.%20I%20would%20like%20to%20discuss%20my%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Schedule a Call</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
