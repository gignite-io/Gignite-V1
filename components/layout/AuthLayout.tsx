
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-primary-foreground">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-white text-black rounded-sm flex items-center justify-center font-bold">S</div>
          <span className="font-bold text-xl">SaaS Pro</span>
        </Link>
        
        <div className="space-y-6">
          <blockquote className="text-3xl font-medium leading-tight">
            "This template saved us 3 months of development time. The monochrome UI is stunning and professional."
          </blockquote>
          <div>
            <p className="font-semibold">Sofia Anderson</p>
            <p className="text-primary-foreground/60">CEO, Acme Dynamics</p>
          </div>
        </div>

        <div className="text-sm text-primary-foreground/60">
          © 2024 SaaS Pro. All rights reserved.
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:hidden flex justify-center mb-8">
            <div className="h-10 w-10 bg-primary text-primary-foreground rounded-sm flex items-center justify-center font-bold text-xl">S</div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
