
# SaaS Pro Starter Guide

This template is a production-ready React SPA designed to mimic a Next.js App Router structure. It features multi-tenancy, Supabase integration patterns, and a monochrome design system.

## 1. Environment Setup

### Create Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project.
2. In Project Settings > API, find your `URL` and `Anon Key`.
3. Add these to your environment (if using a local Next.js project, use `.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### Run Database Migrations
Run the following SQL in the Supabase SQL Editor to set up the multi-tenant schema:

```sql
-- Tables
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  UNIQUE(organization_id, user_id)
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Project isolation by organization_id through memberships
CREATE POLICY "Users can see projects in their orgs" ON projects
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM memberships WHERE user_id = auth.uid()
    )
  );
```

## 2. Local Development
1. **Install Dependencies**: `npm install`
2. **Run Dev Server**: `npm start`
3. **Tests**: Use Vitest/Jest for logic and Playwright for E2E flows.

## 3. Customization & Extension
- **Theming**: Modify `:root` variables in `index.html` to adjust brand colors.
- **RLS**: Always ensure new tables include an `organization_id` column and corresponding RLS policies to maintain multi-tenant isolation.
- **Layouts**: Use `MainLayout` for all protected routes to ensure sidebar/nav consistency.

## 4. Scaling Multi-Tenancy
- **Indexing**: Always index `organization_id` columns for high-performance filtering.
- **Subdomains**: For true multi-tenancy, update the middleware to extract `organization_slug` from `window.location.host`.
- **RBAC**: Use the `memberships.role` column to restrict access to settings (Owner/Admin only).

## 5. Deployment
- **Vercel**: Connect your GitHub repo. Add the environment variables.
- **Production URL**: Ensure you update your Supabase Auth callback URLs to match your production domain.
