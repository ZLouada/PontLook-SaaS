export interface SubDomain {
  id: string;
  title: string;
  description?: string;
  tags: string[];
}

export interface TrainingCategory {
  id: string;
  title: string;
  shortDescription: string;
  targetBuyers: string;
  icon: string; // Lucide icon name (e.g., 'Users', 'Cpu', 'ShieldCheck', 'Lightbulb')
  badge: string;
  subDomains: SubDomain[];
}

export const TRAINING_CATEGORIES: TrainingCategory[] = [
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    shortDescription: 'Leadership, communication, emotional intelligence & people management.',
    targetBuyers: 'HR departments, business unit leaders, sales teams, government entities',
    icon: 'Users',
    badge: 'PEOPLE & LEADERSHIP',
    subDomains: [
      { id: 'leadership-management', title: 'Leadership & People Management', tags: ['C-Suite', 'Executive Coaching', 'Mentoring', 'Succession Planning'] },
      { id: 'communication-influence', title: 'Communication, Negotiation & Influencing', tags: ['Presentation', 'Business Writing', 'Public Speaking'] },
      { id: 'problem-solving-decision', title: 'Problem-Solving, Critical Thinking & Decision-Making', tags: ['Time Management', 'Conflict Resolution'] },
      { id: 'sales-customer-service', title: 'Sales, Relationship Management & Customer Service', tags: ['Client Success', 'B2B Sales'] },
      { id: 'change-resilience', title: 'Change Management & Workplace Resilience', tags: ['Stress Management', 'Cultural Awareness'] }
    ]
  },
  {
    id: 'hard-skills',
    title: 'Hard Skills',
    shortDescription: 'Technical, professional, digital, operational, financial & engineering capabilities.',
    targetBuyers: 'Technical departments, Finance, IT, Operations, Engineering',
    icon: 'Cpu',
    badge: 'TECHNICAL & PROFESSIONAL',
    subDomains: [
      { id: 'technology-digital', title: 'Technology, AI & Digital Transformation', tags: ['Generative AI', 'Data Analytics', 'Power BI', 'Cybersecurity', 'Cloud', 'Software'] },
      { id: 'business-management', title: 'Business Management & Operations', tags: ['Project Management (PMP)', 'Agile / Scrum', 'Lean Six Sigma', 'Supply Chain'] },
      { id: 'finance-accounting', title: 'Finance, Accounting & Compliance', tags: ['Financial Modelling', 'Islamic Finance', 'VAT & Tax', 'AML / Compliance'] },
      { id: 'engineering-industry', title: 'Engineering & Industrial Operations', tags: ['Civil', 'Mechanical', 'Electrical', 'Asset Management', 'Industry 4.0'] },
      { id: 'commercial-admin', title: 'Commercial, Procurement & Logistics', tags: ['Strategic Sourcing', 'Contract Management', 'Warehouse', 'HR Analytics'] }
    ]
  },
  {
    id: 'qhse',
    title: 'QHSE (Quality, Health, Safety & Environment)',
    shortDescription: 'Regulatory compliance, occupational safety, ESG, risk management & international certifications.',
    targetBuyers: 'HSE directors, contractors, energy, construction, manufacturing, healthcare',
    icon: 'ShieldCheck',
    badge: 'REGULATORY & COMPLIANCE',
    subDomains: [
      { id: 'occupational-safety', title: 'Health & Occupational Safety', tags: ['Risk Assessment', 'Job Safety Analysis', 'Permit-to-Work', 'PPE', 'Ergonomics'] },
      { id: 'quality-management', title: 'Quality Management Systems (QMS)', tags: ['ISO 9001', 'Total Quality Management', 'Lead Auditor', 'Continuous Improvement'] },
      { id: 'environment-esg', title: 'Environmental Management & ESG', tags: ['ISO 14001', 'Sustainability', 'Carbon Management', 'Waste Management', 'Compliance'] },
      { id: 'fire-emergency', title: 'Fire & Emergency Management', tags: ['Fire Safety', 'First Aid / CPR', 'Crisis Management', 'Disaster Recovery'] },
      { id: 'qhse-certifications', title: 'Accredited Certifications', tags: ['NEBOSH', 'IOSH', 'ISO 45001', 'ISO 22000 / HACCP'] }
    ]
  },
  {
    id: 'collaborative-innovative',
    title: 'Collaborative & Innovative Skills',
    shortDescription: 'Cross-functional teamwork, design thinking, ideation & business model innovation.',
    targetBuyers: 'Executives, Innovation teams, Transformation departments, Startups',
    icon: 'Lightbulb',
    badge: 'INNOVATION & TEAMWORK',
    subDomains: [
      { id: 'collaborative-teamwork', title: 'Cross-Functional & Agile Teamwork', tags: ['Team Building', 'Remote Collaboration', 'Stakeholder Management', 'Scrum'] },
      { id: 'design-thinking-creativity', title: 'Design Thinking & Customer-Centric Innovation', tags: ['Ideation', 'Brainstorming', 'Prototyping', 'Service Design'] },
      { id: 'strategic-foresight', title: 'Strategic Foresight & Future Thinking', tags: ['Trend Analysis', 'Digital Innovation', 'Business Model Innovation'] },
      { id: 'entrepreneurship-agile', title: 'Intrapreneurship & Lean Innovation', tags: ['Lean Startup', 'AI Innovation', 'Sustainability Innovation'] }
    ]
  }
];

export interface SelectedDomainsPayload {
  categories: string[];
  subDomains: string[];
}

export function findCategory(id: string): TrainingCategory | undefined {
  return TRAINING_CATEGORIES.find((cat) => cat.id === id);
}

export function findSubDomain(id: string): SubDomain | undefined {
  for (const cat of TRAINING_CATEGORIES) {
    const found = cat.subDomains.find((sub) => sub.id === id);
    if (found) return found;
  }
  return undefined;
}

export function resolveDomainLabel(idOrTag: string): string {
  const category = findCategory(idOrTag);
  if (category) return category.title;

  const subDomain = findSubDomain(idOrTag);
  if (subDomain) return subDomain.title;

  return idOrTag;
}

export function formatSelectedDomains(
  selectedDomains?: string[] | SelectedDomainsPayload | null
): string {
  if (!selectedDomains) return 'General / Unspecified';

  if (Array.isArray(selectedDomains)) {
    if (selectedDomains.length === 0) return 'General / Unspecified';
    return selectedDomains.map(resolveDomainLabel).join(', ');
  }

  const { categories = [], subDomains = [] } = selectedDomains;
  const labels: string[] = [];

  for (const catId of categories) {
    const cat = findCategory(catId);
    if (cat) {
      labels.push(cat.title);
    } else {
      labels.push(catId);
    }
  }

  for (const subIdOrTag of subDomains) {
    labels.push(resolveDomainLabel(subIdOrTag));
  }

  return labels.length > 0 ? labels.join(', ') : 'General / Unspecified';
}
