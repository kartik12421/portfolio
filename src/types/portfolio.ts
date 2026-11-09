export type ProjectCategory = 'all' | 'ai-saas' | 'full-stack' | 'web-apps';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  image?: string;
  featured?: boolean;
  highlights?: string[];
  badge?: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  iconName: string;
  skills: {
    name: string;
    level?: string;
    isPrimary?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  techStack: string[];
  highlights?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  highlight?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  image: string;
  verificationUrl?: string;
  badge?: string;
}

export interface CommentItem {
  _id?: string;
  name: string;
  role?: string;
  message: string;
  avatarSeed?: string;
  createdAt: string;
  isPinned?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}
