
import React from 'react';
import { useAuth } from '../services/authContext';
import Button from '../components/ui/Button';

const SettingsPage: React.FC = () => {
  const { activeOrg } = useAuth();

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Organization Settings</h2>
        <p className="text-muted-foreground">Configure {activeOrg?.name} settings and team access.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-1">General</h3>
          <p className="text-sm text-muted-foreground">Basic info about your team workspace.</p>
        </div>
        <div className="md:col-span-2 bg-card border border-border rounded-sm p-6 space-y-4">
           <div className="space-y-2">
              <label className="text-sm font-medium">Organization Name</label>
              <input type="text" defaultValue={activeOrg?.name} className="w-full h-9 px-3 border border-input rounded-sm bg-background" />
           </div>
           <div className="space-y-2">
              <label className="text-sm font-medium">Workspace URL</label>
              <div className="flex">
                 <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-accent border border-r-0 border-input rounded-l-sm">saaspro.com/</span>
                 <input type="text" defaultValue={activeOrg?.slug} className="flex-1 h-9 px-3 border border-input rounded-r-sm bg-background" />
              </div>
           </div>
           <Button>Update Settings</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border">
        <div className="md:col-span-1">
          <h3 className="font-semibold mb-1">Team Members</h3>
          <p className="text-sm text-muted-foreground">Manage who has access to this workspace.</p>
        </div>
        <div className="md:col-span-2 space-y-4">
           <div className="bg-card border border-border rounded-sm overflow-hidden">
              <table className="w-full text-sm">
                 <thead>
                    <tr className="bg-accent/50 border-b border-border">
                       <th className="text-left p-4 font-medium">User</th>
                       <th className="text-left p-4 font-medium">Role</th>
                       <th className="text-right p-4 font-medium">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border">
                    <tr>
                       <td className="p-4 flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold">A</div>
                          <div>
                             <p className="font-medium">Alex Rivera</p>
                             <p className="text-xs text-muted-foreground">alex@acme.com</p>
                          </div>
                       </td>
                       <td className="p-4"><span className="px-2 py-0.5 bg-primary/10 text-primary rounded-sm text-xs font-medium">Owner</span></td>
                       <td className="p-4 text-right"><Button variant="ghost" size="sm">Manage</Button></td>
                    </tr>
                 </tbody>
              </table>
           </div>
           <Button variant="outline" className="w-full">Invite New Member</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
