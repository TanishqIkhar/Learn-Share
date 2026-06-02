'use client';
import { useEffect, useState } from 'react';
import ListingCard from '@/components/ListingCard';
import { listingsAPI } from '@/lib/api';

export default function DonatePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadDonations(); }, []);

  const loadDonations = async () => {
    try {
      const data = await listingsAPI.getAll({ isDonation: 'true', limit: 40 });
      setListings(data.listings || []);
    } catch {} finally { setLoading(false); }
  };

  return (
    <div className="-mt-16 bg-[#faf5f0] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a1210] relative overflow-hidden">
        <div className="absolute inset-0 noise-bg" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#c41e3a]/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-20 text-center">
          <p className="text-[#d4a853] text-sm font-body font-semibold tracking-[0.2em] uppercase mb-4">Community Giving</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-display mb-4">
            Free Educational <em className="italic text-[#d4a853]">Materials</em>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto font-body text-lg">
            Browse items donated by fellow students. Every shared resource helps someone learn.
            Pay it forward by donating materials you no longer need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center border border-[#e8ddd0]">
            <div className="text-4xl font-bold text-[#c41e3a] font-display">{listings.length}</div>
            <div className="text-sm text-[#8c7e72] font-body mt-1 uppercase tracking-wider">Free Items Available</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-[#e8ddd0]">
            <div className="text-4xl font-bold text-[#d4a853] font-display">100%</div>
            <div className="text-sm text-[#8c7e72] font-body mt-1 uppercase tracking-wider">Free — No Cost</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-[#e8ddd0]">
            <div className="text-4xl mb-1">♻️</div>
            <div className="text-sm text-[#8c7e72] font-body uppercase tracking-wider">Sustainable Reuse</div>
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#e8ddd0]">
                <div className="aspect-[4/3] shimmer" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-3/4 shimmer rounded-full" />
                  <div className="h-6 w-1/3 shimmer rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((listing) => <ListingCard key={listing._id} listing={listing} />)}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-[#e8ddd0]">
            <div className="text-7xl mb-6">🎁</div>
            <h3 className="text-2xl font-bold text-[#1a1210] font-display mb-3">No donations yet</h3>
            <p className="text-[#8c7e72] mb-8 font-body">Be the first to donate educational materials!</p>
            <a href="/listings/create" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c41e3a] text-white font-bold rounded-full hover:bg-[#8b1425] transition-all text-sm font-body">
              Donate Materials
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
