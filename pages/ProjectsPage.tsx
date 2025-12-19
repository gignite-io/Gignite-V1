
import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/authContext';
import { supabase } from '../services/supabase';
import { Project } from '../types';
import Button from '../components/ui/Button';

const ProjectsPage: React.FC = () => {
  const { activeOrg } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const fetchProjects = async () => {
    if (!activeOrg) return;
    setLoading(true);
    try {
      const data = await supabase.projects.list(activeOrg.id);
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeOrg]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim() || !activeOrg) return;

    try {
      await supabase.projects.create({
        name: newProjectName,
        organization_id: activeOrg.id,
        description: 'No description provided.'
      });
      setNewProjectName('');
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await supabase.projects.delete(id);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Manage your organization's projects and resources.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-40 bg-muted animate-pulse rounded-sm"></div>)
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="p-6 bg-card border border-border rounded-sm group hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 bg-accent rounded-sm flex items-center justify-center font-bold text-lg">
                  {project.name[0]}
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                  <svg className="w-4 h-4 text-muted-foreground hover:text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </Button>
              </div>
              <h3 className="font-semibold text-lg">{project.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{project.status}</span>
                <span className="text-xs text-muted-foreground">Created {new Date(project.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-sm">
            <p className="text-muted-foreground">No projects found for this organization.</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsModalOpen(true)}>Create your first project</Button>
          </div>
        )}
      </div>

      {/* Basic Modal Implementation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="bg-card border border-border w-full max-w-md p-6 rounded-sm shadow-xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-4">Create New Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <input 
                  type="text" 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full h-9 px-3 border border-input bg-background rounded-sm focus:outline-none focus:ring-1 focus:ring-ring text-sm"
                  placeholder="e.g. Marketing Launch"
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Create Project</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
