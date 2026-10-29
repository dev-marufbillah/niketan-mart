import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, BookOpen, Leaf, Utensils, Sparkles } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    title: '10 Organic Eating Habits for a Healthier Lifestyle in 2025',
    category: 'Health & Wellness',
    date: 'May 12, 2025',
    readTime: '5 min read',
    excerpt: 'Discover easy, budget-friendly steps to transition into an organic diet for long-term health and vitality.',
    icon: Leaf,
    gradient: 'from-emerald-500 to-teal-700',
  },
  {
    id: 2,
    title: 'How to Keep Vegetables Fresh for Up to Two Weeks',
    category: 'Kitchen Tips',
    date: 'May 08, 2025',
    readTime: '4 min read',
    excerpt: 'Simple temperature and storage hacks for leafy greens and root vegetables to double their shelf life.',
    icon: Sparkles,
    gradient: 'from-amber-500 to-rose-600',
  },
  {
    id: 3,
    title: 'The Secret Ingredients of Authentic Bangladeshi Fish Curry',
    category: 'Recipes',
    date: 'Apr 28, 2025',
    readTime: '6 min read',
    excerpt: 'Learn traditional spice combinations and fresh fish selection techniques to master authentic Bengali curry.',
    icon: Utensils,
    gradient: 'from-orange-500 to-amber-700',
  },
];

export default function BlogPage() {
  return (
    <main className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand-gold">Our Journal</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-dark mt-2 mb-3">
            Niketan Mart Blog &amp; Articles
          </h1>
          <p className="text-sm sm:text-base text-stone-500">
            Insights on fresh nutrition, authentic recipes, and smart everyday shopping.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post) => {
            const Icon = post.icon;
            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Banner Header with Gradient */}
                  <div className={`relative h-44 w-full bg-linear-to-br ${post.gradient} p-6 flex flex-col justify-between text-white overflow-hidden`}>
                    <div className="flex items-center justify-between z-10">
                      <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                        {post.category}
                      </span>
                      <Icon className="w-6 h-6 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <div className="z-10">
                      <div className="flex items-center gap-3 text-xs text-white/80 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Decorative Background Pattern */}
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-bold text-stone-900 text-lg group-hover:text-rose-600 transition-colors line-clamp-2 mb-3 leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-stone-500 line-clamp-3 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-rose-600 group-hover:text-rose-700 flex items-center gap-1 transition-colors">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Full Article</span>
                    </span>
                    <span className="text-rose-500 font-bold text-sm group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}