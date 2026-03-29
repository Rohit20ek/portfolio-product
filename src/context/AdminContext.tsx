import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Experience {
  id: string; company: string; logo: string; role: string; date: string; achievement: string; desc: string;
}
export interface Recommendation {
  id: string; name: string; role: string; date: string; text: string; linkedin: string; photo: string;
}
export interface Certification {
  id: string; name: string; issuer: string; date: string; desc: string; logo: string;
}

const DEFAULT_EXPERIENCES: Experience[] = [
  { id: 'e1', company: 'Findem', logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQEk3cLH6qIKlw/company-logo_100_100/B4EZz3EsEyIsAQ-/0/1773671727972/findeminc_logo?e=1776297600&v=beta&t=4lxChnxm7xnxqF_gnc4uLVbPllvX0LmZVVgi3GEkXyI', role: 'Analyst - Search Engine', date: 'Jul 2025 – Present', achievement: 'Product & Data Strategy', desc: 'Driving strategic decision-making and operational efficiency using data analysis and ETL tools at a leading talent intelligence company.' },
  { id: 'e2', company: 'Deloitte', logo: 'https://media.licdn.com/dms/image/v2/C560BAQGNtpblgQpJoQ/company-logo_100_100/company-logo_100_100/0/1662120928214/deloitte_logo?e=1776297600&v=beta&t=wKlrTLNhO-lnI0fsBHXagoGAaxKbRpOAzFtCE523klg', role: 'Analyst', date: 'Sep 2024 – May 2025', achievement: 'Instant Impact Award', desc: 'Consulting role analyzing business processes and transforming complex data into actionable strategic insights for enterprise clients.' },
  { id: 'e3', company: 'topmate.io', logo: 'https://media.licdn.com/dms/image/v2/D560BAQGsl1Ab9W3R7A/company-logo_100_100/company-logo_100_100/0/1731241647690/topmate_io_logo?e=1776297600&v=beta&t=GNOlLFNzdNES_gIQ5HzF0MoLo2N9UhxF019E0HzUV8E', role: 'Data Analyst Consultant', date: 'Jan 2024 – Present', achievement: 'Verified Creator', desc: 'Spearheaded 10+ consulting projects improving operational efficiency by 30%. Designed lead gen frameworks increasing conversion rates by 25–40%.' },
  { id: 'e4', company: 'Simplilearn', logo: 'https://media.licdn.com/dms/image/v2/D560BAQGrNBFNEIlxNg/company-logo_100_100/B56ZzhMj53KYAQ-/0/1773304692834/simplilearn_logo?e=1776297600&v=beta&t=2UW7XhVHyK1_aMfqX93-xnn0LEJcEXrb3q0H2EO9ApE', role: 'Project Manager', date: 'Jan 2023 – Mar 2024', achievement: 'Consistent Performer · 2 Quarters', desc: 'Led initiatives integrating ChatGPT across platforms, boosting course completion rates by 20%. Resolved 250+ tickets with CSAT of 4.5/5.' },
  { id: 'e5', company: 'Cashfree', logo: 'https://media.licdn.com/dms/image/v2/C560BAQF4u3uIRgM6Cg/company-logo_100_100/company-logo_100_100/0/1632367052546/cashfree_logo?e=1776297600&v=beta&t=zs0n88POohX92ytu0ZI1_NUzyd1XapKrrApTkyocm18', role: 'Product Analyst', date: 'Apr 2022 – Dec 2022', achievement: 'GEM Award — Going Extra Mile', desc: 'Boosted revenue and fostered growth for Retail Bank products using data-driven Python insights. Detected 100+ non-transacting merchants.' },
  { id: 'e6', company: 'iScholar', logo: 'https://logo.clearbit.com/ischolar.in', role: 'Business Operation & Analytics', date: 'Nov 2021 – May 2022', achievement: 'Increased Conversion by 20%', desc: 'Created advanced Power BI dashboards and automated Zoom attendance tracking; reduced customer acquisition costs by 15%.' },
];

const DEFAULT_RECOMMENDATIONS: Recommendation[] = [
  { id: 'r1', name: 'Jayaram P M', role: 'ERS LSH Practice @ HCLTech', date: 'January 1, 2026', text: 'We worked together on a key project for Automating attendance feature for a hybrid learning model. I was moved by his strong technical acumen and ability to own responsibilities.', linkedin: 'https://www.linkedin.com/in/jayarampm/', photo: 'https://media.licdn.com/dms/image/v2/D5603AQHczPbgSf0pkw/profile-displayphoto-shrink_100_100/B56ZzYgywYJ8Ag-/0/1773159002849?e=1776297600&v=beta&t=nN07c9YDJ--sTcj-yNs4JayRGHZd8f40tlIjzObNTEc' },
  { id: 'r2', name: 'Simma Shukla', role: 'Tourism Strategy | AI in Travel', date: 'March 31, 2025', text: 'I am extremely grateful to Mr. Rohit for his invaluable guidance and support in helping me shape my career path.', linkedin: 'https://www.linkedin.com/in/simma-shukla-97698b1a8/', photo: 'https://media.licdn.com/dms/image/v2/D5603AQH-hfuT3Hg1EA/profile-displayphoto-shrink_100_100/B56ZwZedwEIwAc-/0/1769953943622?e=1776297600&v=beta&t=tvJs3mvmy0nH3m90nES2CwcfmTcT2aW0tt9qzsfbcxY' },
  { id: 'r3', name: 'Likitha M', role: 'Product Operations at Stripe', date: 'January 4, 2024', text: 'Rohit is an absolute star when it comes to getting things done. What sets Rohit apart is not just his technical wizardry but also his keen eye for recognizing patterns.', linkedin: 'https://www.linkedin.com/in/likitha-m-8a4839196/', photo: 'https://media.licdn.com/dms/image/v2/D5603AQHPV5RToJeuPg/profile-displayphoto-shrink_100_100/B56ZcoRdpjHUAU-/0/1748727357364?e=1776297600&v=beta&t=l8V1Mju6grpgvVqmmbIWkDNb5eG821woL0P7f7TVIk0' },
  { id: 'r4', name: 'Abhishek Tripathy', role: 'Category Manager', date: 'December 26, 2023', text: 'I highly recommend Rohit for his exceptional curiosity, resilience, and outstanding management skills.', linkedin: 'https://www.linkedin.com/in/abhishek-tripathy/', photo: 'https://media.licdn.com/dms/image/v2/D5603AQHPV5RToJeuPg/profile-displayphoto-shrink_100_100/B56ZcoRdpjHUAU-/0/1748727357364?e=1776297600&v=beta&t=l8V1Mju6grpgvVqmmbIWkDNb5eG821woL0P7f7TVIk0' },
  { id: 'r5', name: 'Aman Chauhan', role: 'Cyber Security Analyst | Purple Teamer', date: 'September 30, 2020', text: 'Enthusiastic guy with an excellent tech knowledge.', linkedin: 'https://www.linkedin.com/in/aman31-chauhan/', photo: 'https://media.licdn.com/dms/image/v2/D4D03AQGIYyXjs8WOew/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1683014603603?e=1776297600&v=beta&t=6gUGqowxdHst70GDaOi2svLBZ-cfvsMbli4WvAZWwb8' },
];

const DEFAULT_CERTIFICATIONS: Certification[] = [
  { id: 'c1', name: 'Generative AI for Project Managers', issuer: 'PMI', date: 'Jun 2025', desc: 'Practical implementation of capacity planning, risk mitigation, scope creep management, and EVM using Generative AI.', logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHJZGa_G2gwUg/company-logo_100_100/company-logo_100_100/0/1631333024279?e=1776297600&v=beta&t=K1eblxuBqcDpvU1gl0J54A7cvapFpOCxcwo3yNZbq6U' },
  { id: 'c2', name: 'Jira Fundamentals Badge', issuer: 'Atlassian', date: 'Nov 2023', desc: 'Core proficiency in Jira for project tracking, sprint management, backlog grooming, and agile team workflows.', logo: 'https://media.licdn.com/dms/image/v2/D4E0BAGeyLL6crkJKg/company-logo_100_100/company-logo_100_100/0/1735593604612/atlassian_logo?e=1776297600&v=beta&t=ljD8Cu4yFrnD8mqbWXTHs5MY7Qw4FyQljQ4nEE4HqT0' },
  { id: 'c3', name: 'Problem Solving', issuer: 'HackerRank', date: 'Sep 2022', desc: 'Certified in algorithmic problem-solving, data structures, and computational thinking.', logo: 'https://media.licdn.com/dms/image/v2/D560BAQE8MivsmbT7Ig/company-logo_100_100/company-logo_100_100/0/1705561459405/hackerrank_logo?e=1776297600&v=beta&t=NktDP0RQ5PHPn3BnR-B6Z52mS5gIwraDIezW5A2LiGU' },
  { id: 'c4', name: 'Learn Linux from Scratch', issuer: 'EDUONIX', date: 'Nov 2021', desc: 'Comprehensive hands-on Linux training covering shell scripting, file systems, and system administration.', logo: 'https://media.licdn.com/dms/image/v2/C510BAQF3Hs1scElacA/company-logo_100_100/company-logo_100_100/0/1630567253611?e=1776297600&v=beta&t=CRcd7GriEsfdcz6mRx7tfInoak_QJNUt3Tq03gSdmZM' },
];

interface AdminContextType {
  isAdmin: boolean;
  toggleAdmin: () => void;
  experiences: Experience[];
  recommendations: Recommendation[];
  certifications: Certification[];
  setExperiences: (v: Experience[]) => void;
  setRecommendations: (v: Recommendation[]) => void;
  setCertifications: (v: Certification[]) => void;
  updateExperience: (id: string, patch: Partial<Experience>) => void;
  updateRecommendation: (id: string, patch: Partial<Recommendation>) => void;
  updateCertification: (id: string, patch: Partial<Certification>) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  addRecommendation: () => void;
  removeRecommendation: (id: string) => void;
  addCertification: () => void;
  removeCertification: (id: string) => void;
  resetAll: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; }
  catch { return fallback; }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [experiences, setExpState] = useState<Experience[]>(() => loadFromStorage('port_exp', DEFAULT_EXPERIENCES));
  const [recommendations, setRecState] = useState<Recommendation[]>(() => loadFromStorage('port_recs', DEFAULT_RECOMMENDATIONS));
  const [certifications, setCertState] = useState<Certification[]>(() => loadFromStorage('port_certs', DEFAULT_CERTIFICATIONS));

  const persist = <T,>(key: string, v: T) => localStorage.setItem(key, JSON.stringify(v));

  const setExperiences = (v: Experience[]) => { setExpState(v); persist('port_exp', v); };
  const setRecommendations = (v: Recommendation[]) => { setRecState(v); persist('port_recs', v); };
  const setCertifications = (v: Certification[]) => { setCertState(v); persist('port_certs', v); };

  const toggleAdmin = useCallback(() => setIsAdmin(p => !p), []);

  const updateExperience = (id: string, patch: Partial<Experience>) => setExperiences(experiences.map(e => e.id === id ? { ...e, ...patch } : e));
  const removeExperience = (id: string) => setExperiences(experiences.filter(e => e.id !== id));
  const addExperience = () => setExperiences([...experiences, { id: `e${Date.now()}`, company: 'New Company', logo: '', role: 'Role', date: '2024', achievement: '', desc: '...' }]);

  const updateRecommendation = (id: string, patch: Partial<Recommendation>) => setRecommendations(recommendations.map(r => r.id === id ? { ...r, ...patch } : r));
  const removeRecommendation = (id: string) => setRecommendations(recommendations.filter(r => r.id !== id));
  const addRecommendation = () => setRecommendations([...recommendations, { id: `r${Date.now()}`, name: 'New Person', role: 'Role', date: new Date().toISOString().split('T')[0], text: '...', linkedin: '', photo: '' }]);

  const updateCertification = (id: string, patch: Partial<Certification>) => setCertifications(certifications.map(c => c.id === id ? { ...c, ...patch } : c));
  const removeCertification = (id: string) => setCertifications(certifications.filter(c => c.id !== id));
  const addCertification = () => setCertifications([...certifications, { id: `c${Date.now()}`, name: 'New Certification', issuer: 'Issuer', date: '2025', desc: '...', logo: '' }]);

  const resetAll = () => { setExperiences(DEFAULT_EXPERIENCES); setRecommendations(DEFAULT_RECOMMENDATIONS); setCertifications(DEFAULT_CERTIFICATIONS); };

  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin, experiences, recommendations, certifications, setExperiences, setRecommendations, setCertifications, updateExperience, updateRecommendation, updateCertification, addExperience, removeExperience, addRecommendation, removeRecommendation, addCertification, removeCertification, resetAll }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be inside AdminProvider');
  return ctx;
}

export { DEFAULT_EXPERIENCES, DEFAULT_RECOMMENDATIONS, DEFAULT_CERTIFICATIONS };
