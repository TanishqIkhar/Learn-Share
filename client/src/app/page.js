'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ListingCard from '@/components/ListingCard';
import { listingsAPI } from '@/lib/api';

const STATS = [
  { label: 'Active Listings', value: '2,400+', suffix: '' },
  { label: 'Students Helped', value: '8,000+', suffix: '' },
  { label: 'Money Saved', value: '₹12L', suffix: '+' },
  { label: 'Universities', value: '150', suffix: '+' },
];

const CATEGORIES = [
  { name: 'Textbooks', icon: '📖', desc: 'Course textbooks & reference guides' },
  { name: 'Notes', icon: '📝', desc: 'Handwritten & digital study notes' },
  { name: 'Lab Equipment', icon: '🔬', desc: 'Lab coats, kits & instruments' },
  { name: 'Stationery', icon: '✏️', desc: 'Pens, notebooks & supplies' },
  { name: 'Electronics', icon: '💻', desc: 'Calculators, tablets & more' },
  { name: 'Other', icon: '📦', desc: 'Everything else you need' },
];

const MARQUEE_TEXT = 'TEXTBOOKS • NOTES • LAB EQUIPMENT • STATIONERY • ELECTRONICS • STUDY GUIDES • CALCULATORS • REFERENCE BOOKS • ';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    try {
      const data = await listingsAPI.getAll({ limit: 8, sort: 'newest' });
      setTrending(data.listings || []);
    } catch {
      // API not yet running
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="-mt-16 bg-[#faf5f0]">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#c41e3a]" />
        <div className="absolute inset-0 noise-bg" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-[5%] w-48 h-64 bg-white/10 rounded-2xl rotate-[-8deg] animate-floatSlow hidden lg:block" />
        <div className="absolute bottom-20 right-[8%] w-40 h-56 bg-white/5 rounded-2xl rotate-[5deg] animate-float hidden lg:block" />
        <div className="absolute top-1/3 right-[15%] w-24 h-32 bg-[#d4a853]/20 rounded-xl rotate-[12deg] animate-floatSlow hidden xl:block" />
        
        {/* Floating book cards */}
        <div className="absolute top-28 left-[3%] hidden xl:block animate-slideInRotate" style={{animationDelay: '0.3s'}}>
          <div className="w-44 bg-white/95 rounded-xl p-3 shadow-2xl shadow-black/20 rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
            <div className="aspect-[3/4] bg-gradient-to-br from-[#d4a853] to-[#b8912e] rounded-lg mb-2 flex items-center justify-center">
              <span className="text-white text-3xl">📚</span>
            </div>
            <p className="text-xs font-bold text-[#1a1210] font-body truncate">Data Structures</p>
            <p className="text-[10px] text-[#8c7e72] font-body">₹350 • Like New</p>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-[10%] hidden xl:block animate-slideInRotate" style={{animationDelay: '0.6s'}}>
          <div className="w-36 bg-white/95 rounded-xl p-3 shadow-2xl shadow-black/20 rotate-[4deg] hover:rotate-0 transition-transform duration-500">
            <div className="aspect-[3/4] bg-gradient-to-br from-[#c41e3a] to-[#8b1425] rounded-lg mb-2 flex items-center justify-center">
              <span className="text-white text-2xl">📖</span>
            </div>
            <p className="text-xs font-bold text-[#1a1210] font-body truncate">Organic Chem</p>
            <p className="text-[10px] text-[#c41e3a] font-bold font-body">FREE</p>
          </div>
        </div>
        
        <div className="absolute top-36 right-[4%] hidden xl:block animate-slideInRotate" style={{animationDelay: '0.9s'}}>
          <div className="w-40 bg-white/95 rounded-xl p-3 shadow-2xl shadow-black/20 rotate-[8deg] hover:rotate-0 transition-transform duration-500">
            <div className="aspect-[3/4] bg-gradient-to-br from-[#2d2118] to-[#1a1210] rounded-lg mb-2 flex items-center justify-center">
              <span className="text-white text-2xl">🔬</span>
            </div>
            <p className="text-xs font-bold text-[#1a1210] font-body truncate">Lab Kit</p>
            <p className="text-[10px] text-[#8c7e72] font-body">₹800 • Good</p>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <div className="animate-fadeInUp">
              <p className="text-white/70 text-sm font-body font-medium tracking-[0.2em] uppercase mb-8">
                Community-Driven Marketplace
              </p>
            </div>

            <h1 className="mb-6">
              <span className="block text-white font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                We <em className="italic font-normal">Share</em>
              </span>
              <span className="block text-white/90 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mt-2 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                We <em className="italic font-normal">Learn</em>
              </span>
              <span className="block text-white/80 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mt-2 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                We <em className="italic font-normal">Save</em>
              </span>
            </h1>

            <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed font-body mt-8 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              Buy, sell, donate, and exchange educational materials with fellow students.
              Building a sustainable learning community, one book at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-fadeInUp justify-center" style={{animationDelay: '0.4s'}}>
              <Link href="/listings" className="px-8 py-4 bg-white text-[#c41e3a] rounded-full font-bold font-body hover:bg-[#faf5f0] hover:scale-105 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/10">
                See Our Work
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/register" className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-bold font-body hover:bg-white/10 hover:border-white transition-all text-center">
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#1a1210] py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-white/30 text-sm font-body tracking-[0.3em] font-medium">
            {MARQUEE_TEXT.repeat(4)}
          </span>
        </div>
      </div>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#c41e3a] group-hover:scale-105 transition-transform duration-300">
                {stat.value}<span className="text-[#d4a853]">{stat.suffix}</span>
              </div>
              <div className="text-sm text-[#8c7e72] font-body mt-2 tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <p className="text-[#c41e3a] text-sm font-body font-semibold tracking-[0.2em] uppercase mb-4">Browse Categories</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1210] font-display leading-tight">
              Find exactly what you need
            </h2>
            <p className="text-[#8c7e72] mt-4 font-body leading-relaxed">
              From textbooks to lab equipment — everything a student needs, shared by the community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.name}
                href={`/listings?category=${cat.name}`}
                className="group relative bg-[#faf5f0] rounded-2xl p-8 hover:bg-[#c41e3a] transition-all duration-500 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{cat.icon}</span>
                  <svg className="w-6 h-6 text-[#c41e3a] group-hover:text-white opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1a1210] group-hover:text-white font-display transition-colors duration-300">{cat.name}</h3>
                <p className="text-sm text-[#8c7e72] group-hover:text-white/70 font-body mt-2 transition-colors duration-300">{cat.desc}</p>
                
                {/* Corner decoration */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#c41e3a]/5 group-hover:bg-white/10 rounded-full transition-all duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Listings */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#c41e3a] text-sm font-body font-semibold tracking-[0.2em] uppercase mb-4">Latest Arrivals</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1210] font-display">
              Fresh on the shelf
            </h2>
          </div>
          <Link
            href="/listings"
            className="hidden md:inline-flex items-center gap-2 text-sm text-[#c41e3a] hover:text-[#8b1425] font-semibold font-body group"
          >
            View all listings
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#e8ddd0]">
                <div className="aspect-[4/3] shimmer" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-3/4 shimmer rounded-full" />
                  <div className="h-6 w-1/3 shimmer rounded-full" />
                  <div className="h-3 w-1/2 shimmer rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : trending.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#e8ddd0]">
            <div className="text-7xl mb-6">📚</div>
            <h3 className="text-2xl font-bold text-[#1a1210] font-display mb-3">No listings yet</h3>
            <p className="text-[#8c7e72] mb-8 font-body max-w-md mx-auto">Be the first to share educational materials with the community!</p>
            <Link
              href="/listings/create"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c41e3a] text-white font-semibold rounded-full hover:bg-[#8b1425] hover:shadow-xl hover:shadow-[#c41e3a]/20 transition-all text-sm font-body"
            >
              Create a Listing
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </Link>
          </div>
        )}
      </section>

      {/* About / Mission CTA */}
      <section className="relative overflow-hidden bg-[#1a1210] py-24">
        <div className="absolute inset-0 noise-bg" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#c41e3a]/10 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#d4a853] text-sm font-body font-semibold tracking-[0.2em] uppercase mb-6">Our Mission</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight mb-6">
                Making education <em className="italic text-[#d4a853]">accessible</em> for everyone
              </h2>
              <p className="text-white/50 font-body leading-relaxed text-lg mb-8">
                We believe every student deserves access to quality learning materials. Through community sharing, 
                we&apos;re reducing waste and making education affordable — one exchange at a time.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#c41e3a] text-white font-bold rounded-full hover:bg-[#8b1425] hover:shadow-xl hover:shadow-[#c41e3a]/30 transition-all text-sm font-body group"
              >
                Get Started — It&apos;s Free
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-3">♻️</div>
                <h4 className="text-white font-bold font-display text-lg mb-2">Circular Reuse</h4>
                <p className="text-white/40 text-sm font-body">Pass it forward instead of throwing it away</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors mt-8">
                <div className="text-3xl mb-3">💰</div>
                <h4 className="text-white font-bold font-display text-lg mb-2">Save Money</h4>
                <p className="text-white/40 text-sm font-body">Get materials at a fraction of retail price</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors -mt-4">
                <div className="text-3xl mb-3">🤝</div>
                <h4 className="text-white font-bold font-display text-lg mb-2">Community</h4>
                <p className="text-white/40 text-sm font-body">Connect with students at your campus</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors mt-4">
                <div className="text-3xl mb-3">🎁</div>
                <h4 className="text-white font-bold font-display text-lg mb-2">Free Items</h4>
                <p className="text-white/40 text-sm font-body">Donate materials to those in need</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#faf5f0] border-t border-[#e8ddd0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#c41e3a] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold text-[#1a1210] font-display">Learn<span className="text-[#c41e3a]">Share</span></span>
                  <span className="block text-[10px] text-[#8c7e72] font-body tracking-[0.2em] uppercase -mt-0.5">Books & Beyond</span>
                </div>
              </div>
              <p className="text-sm text-[#8c7e72] font-body leading-relaxed max-w-sm">
                A community-driven marketplace making education affordable and sustainable through resource sharing.
              </p>
            </div>
            <div>
              <h4 className="text-[#1a1210] font-bold font-display mb-4">Navigation</h4>
              <ul className="space-y-2.5">
                <li><Link href="/listings" className="text-sm text-[#8c7e72] hover:text-[#c41e3a] font-body transition-colors">Marketplace</Link></li>
                <li><Link href="/donate" className="text-sm text-[#8c7e72] hover:text-[#c41e3a] font-body transition-colors">Free Items</Link></li>
                <li><Link href="/listings/create" className="text-sm text-[#8c7e72] hover:text-[#c41e3a] font-body transition-colors">Sell / Donate</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#1a1210] font-bold font-display mb-4">Account</h4>
              <ul className="space-y-2.5">
                <li><Link href="/login" className="text-sm text-[#8c7e72] hover:text-[#c41e3a] font-body transition-colors">Login</Link></li>
                <li><Link href="/register" className="text-sm text-[#8c7e72] hover:text-[#c41e3a] font-body transition-colors">Sign Up</Link></li>
                <li><Link href="/messages" className="text-sm text-[#8c7e72] hover:text-[#c41e3a] font-body transition-colors">Messages</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#e8ddd0] flex items-center justify-between">
            <p className="text-xs text-[#8c7e72] font-body">© 2026 LearnShare. Making education accessible for everyone.</p>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-[#1a1210] flex items-center justify-center text-white text-xs cursor-pointer hover:bg-[#c41e3a] transition-colors">in</span>
              <span className="w-8 h-8 rounded-full bg-[#1a1210] flex items-center justify-center text-white text-xs cursor-pointer hover:bg-[#c41e3a] transition-colors">𝕏</span>
              <span className="w-8 h-8 rounded-full bg-[#1a1210] flex items-center justify-center text-white text-xs cursor-pointer hover:bg-[#c41e3a] transition-colors">ig</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
