
import React from 'react';
import { useAuth } from '../services/authContext';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  const { user, activeOrg } = useAuth();

  const stats = [
    { label: 'Total Projects', value: '12', trend: '+2 this month' },
    { label: 'Team Members', value: '8', trend: 'Active' },
    { label: 'Active Tasks', value: '43', trend: '12 overdue' },
    { label: 'Monthly Growth', value: '18%', trend: '+4% vs LW' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.full_name?.split(' ')[0]}</h2>
        <p className="text-muted-foreground mt-1">Here is what's happening with {activeOrg?.name} today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-card border border-border rounded-sm shadow-sm transition-all hover:shadow-md">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-sm">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-card border border-border rounded-sm">
          <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex space-x-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary ring-4 ring-primary/10"></div>
                <div>
                  <p className="text-sm font-medium">New project "Design System" created by Alex</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-sm bg-gradient-to-br from-primary/5 to-transparent">
          <h3 className="text-lg font-semibold mb-2">Upgrade Pro</h3>
          <p className="text-sm text-muted-foreground mb-4">Get unlimited projects, advanced analytics and custom domain support.</p>
          <Button className="w-full">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
