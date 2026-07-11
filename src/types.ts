export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  upcoming?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  metric: string;
  metricLabel: string;
  accentColor: string;
  imageUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatarText: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  outcome: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  industry: string;
  budget: string;
  message: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'qualified' | 'archived';
}
