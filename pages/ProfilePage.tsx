
import React from 'react';
import { useAuth } from '../services/authContext';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your personal information and account preferences.</p>
      </div>

      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Personal Information</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
             <img src={user?.avatar_url} className="h-16 w-16 rounded-full" alt="" />
             <Button variant="outline" size="sm">Change Avatar</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input type="text" defaultValue={user?.full_name} className="w-full h-9 px-3 border border-input rounded-sm bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email address</label>
              <input type="email" defaultValue={user?.email} className="w-full h-9 px-3 border border-input rounded-sm bg-background" disabled />
            </div>
          </div>
        </div>
        <div className="p-6 bg-accent/30 flex justify-end">
           <Button>Save Changes</Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
        </div>
        <div className="p-6">
           <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
           <Button variant="danger">Delete Account</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
