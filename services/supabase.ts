
import { Project, User, Organization } from '../types';

/**
 * In a real Next.js environment, you'd use @supabase/supabase-js.
 * Here we provide a production-ready interface that can be easily plugged into real Supabase.
 */

const IS_MOCKED = !process.env.NEXT_PUBLIC_SUPABASE_URL;

// Mock Data
const MOCK_USER: User = {
  id: 'u1',
  email: 'founder@example.com',
  full_name: 'Alex Rivera',
  avatar_url: 'https://picsum.photos/seed/user/200',
  created_at: new Date().toISOString()
};

const MOCK_ORGS: Organization[] = [
  { id: 'o1', name: 'Acme Corp', slug: 'acme', owner_id: 'u1', created_at: new Date().toISOString() },
  { id: 'o2', name: 'Stark Industries', slug: 'stark', owner_id: 'u1', created_at: new Date().toISOString() }
];

let MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'Website Redesign', description: 'Modernizing the marketing landing page.', status: 'active', organization_id: 'o1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'p2', name: 'Mobile App API', description: 'Internal endpoints for the iOS app.', status: 'active', organization_id: 'o1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'p3', name: 'Arc Reactor Monitor', description: 'Real-time telemetry for reactor units.', status: 'active', organization_id: 'o2', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];

export const supabase = {
  auth: {
    getUser: async () => ({ data: { user: MOCK_USER }, error: null }),
    signOut: async () => ({ error: null }),
  },
  
  projects: {
    list: async (orgId: string): Promise<Project[]> => {
      // Simulation of RLS: Filter by organization_id
      return MOCK_PROJECTS.filter(p => p.organization_id === orgId);
    },
    create: async (project: Partial<Project>): Promise<Project> => {
      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        name: project.name || 'New Project',
        description: project.description || '',
        status: 'active',
        organization_id: project.organization_id!,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      MOCK_PROJECTS = [...MOCK_PROJECTS, newProject];
      return newProject;
    },
    delete: async (id: string): Promise<void> => {
      MOCK_PROJECTS = MOCK_PROJECTS.filter(p => p.id !== id);
    }
  },

  organizations: {
    list: async (): Promise<Organization[]> => MOCK_ORGS,
  }
};
