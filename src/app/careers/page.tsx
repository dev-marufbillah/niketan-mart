import React from 'react';
import { Briefcase, MapPin, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Careers - Niketan Mart',
};

const OPENINGS = [
  {
    title: 'Senior Frontend Developer (Next.js & React)',
    department: 'Technology',
    type: 'Full-time',
    location: 'Dhaka (Hybrid)',
  },
  {
    title: 'Store Operations Manager',
    department: 'Operations',
    type: 'Full-time',
    location: 'Gulshan, Dhaka',
  },
  {
    title: 'Supply Chain Coordinator',
    department: 'Logistics',
    type: 'Full-time',
    location: 'Tejgaon, Dhaka',
  },
  {
    title: 'Customer Experience Specialist',
    department: 'Customer Support',
    type: 'Full-time',
    location: 'Remote / Dhaka',
  },
];

export default function CareersPage() {
  return (
    <main className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 mb-12 text-center max-w-4xl mx-auto shadow-xl">
          <span className="text-[11px] font-bold uppercase tracking-wide text-rose-400">Join Our Team</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-2 mb-4">
            Build the Future of E-Commerce & Retail
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            We are looking for passionate, innovative individuals who want to transform how millions of households buy groceries every day.
          </p>
        </div>

        {/* Job Listings */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-6">Open Positions</h2>
          
          <div className="space-y-4">
            {OPENINGS.map((job, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-rose-300 transition-all">
                <div>
                  <h3 className="font-bold text-stone-900 text-lg mb-1">{job.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-stone-500 font-medium flex-wrap">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                      {job.department} • {job.type}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {job.location}
                    </span>
                  </div>
                </div>

                <a
                  href="mailto:careers@niketonmart.com"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-semibold text-xs sm:text-sm hover:bg-rose-600 hover:text-white transition-all shrink-0"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white p-6 rounded-2xl border border-stone-200 text-center">
            <h3 className="font-bold text-stone-900 mb-1">Don&apos;t see a matching position?</h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-4">Send your resume to <strong className="text-stone-800">careers@niketonmart.com</strong> and we will reach out when an opening matches your skill set.</p>
          </div>
        </div>
      </div>
    </main>
  );
}