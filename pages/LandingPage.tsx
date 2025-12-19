
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-bold">S</div>
          <span className="font-bold text-xl tracking-tight">SaaS Pro</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Product</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Docs</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Changelog</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm font-medium hover:underline">Log in</Link>
          <Link to="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 bg-accent text-accent-foreground text-xs font-bold rounded-full border border-border animate-bounce">
            Now in Private Beta
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
            Build and scale your <span className="text-muted-foreground italic">micro-saas</span> in days, not months.
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            The ultimate production-ready starter kit with multi-tenancy, real-time sync, and a monochrome design system you'll actually love.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup"><Button size="lg" className="w-full sm:w-auto">Start Building Free</Button></Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Book a Demo</Button>
          </div>
          
          <div className="mt-20 relative px-4">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary to-slate-400 rounded-sm blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
             <div className="relative bg-card border border-border rounded-sm shadow-2xl overflow-hidden aspect-video max-w-5xl mx-auto flex items-center justify-center">
                <div className="p-8 text-center space-y-4">
                   <div className="h-12 w-12 bg-primary/10 text-primary mx-auto flex items-center justify-center rounded-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   <p className="text-muted-foreground font-medium">Platform Walkthrough Video</p>
                </div>
             </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-accent/30 border-y border-border px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything you need to launch</h2>
              <p className="text-muted-foreground">Focus on your business logic, we handle the infrastructure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: 'Multi-Tenancy', desc: 'Isolate data perfectly with built-in organization and membership management.' },
                { title: 'Theme Ready', desc: 'Monochrome and dark mode support out of the box with system preference awareness.' },
                { title: 'Supabase Integrated', desc: 'Powerful Auth, Database RLS, and Storage ready to go for production.' }
              ].map((f, i) => (
                <div key={i} className="space-y-4 p-6 bg-card border border-border rounded-sm">
                  <div className="h-10 w-10 bg-primary text-primary-foreground flex items-center justify-center rounded-sm font-bold">{i+1}</div>
                  <h3 className="text-xl font-bold">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 lg:px-12 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-primary rounded-sm flex items-center justify-center text-xs text-primary-foreground font-bold">S</div>
            <span className="font-bold tracking-tight">SaaS Pro</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 SaaS Pro Inc. Built with love and modern tech.</p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Twitter</a>
            <a href="#" className="hover:text-foreground">GitHub</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
