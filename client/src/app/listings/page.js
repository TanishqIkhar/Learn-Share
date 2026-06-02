'use client';
import { useEffect, useState, useCallback, Suspense } from 'react';
import ListingCard from '@/components/ListingCard';
import FilterSidebar from '@/components/FilterSidebar';
import { listingsAPI } from '@/lib/api';
import { useSearchParams } from 'next/navigation';

function ListingsContent() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    university: '',
    isDonation: searchParams.get('isDonation') || '',
    sort: 'newest',
  });

  const loadListings = useCallback(async (filterOverride, pageNum = 1) => {
    setLoading(true);
    try {
      const params = { ...(filterOverride || filters), page: pageNum, limit: 20 };
      Object.keys(params).forEach((k) => { if (!params[k]) delete params[k]; });
      if (params.sort === 'newest') delete params.sort;
      const data = await listingsAPI.getAll(params);
      setListings(data.listings || []);
      setTotalPages(data.pages || 1);
      setPage(pageNum);
    } catch { setListings([]); }
    finally { setLoading(false); }
  }, [filters]);

  useEffect(() => { loadListings(); }, []);

  const handleApplyFilters = (newFilters) => { loadListings(newFilters, 1); };

  return (
    <div className="min-h-screen bg-[#faf5f0]">
      {/* Header */}
      <div className="bg-[#c41e3a] relative overflow-hidden">
        <div className="absolute inset-0 noise-bg" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <p className="text-white/60 text-sm font-body font-medium tracking-[0.2em] uppercase mb-3">Browse &amp; Discover</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display">Marketplace</h1>
          <p className="text-white/50 font-body mt-2">Find educational materials shared by students near you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          <FilterSidebar filters={filters} setFilters={setFilters} onApply={handleApplyFilters} />

          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
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
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((listing) => <ListingCard key={listing._id} listing={listing} />)}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button key={p} onClick={() => loadListings(filters, p)}
                        className={`w-10 h-10 rounded-full text-sm font-bold transition-all font-body ${
                          p === page
                            ? 'bg-[#c41e3a] text-white shadow-md shadow-[#c41e3a]/20'
                            : 'bg-white text-[#8c7e72] hover:text-[#c41e3a] hover:bg-[#c41e3a]/5 border border-[#e8ddd0]'
                        }`}>
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-[#e8ddd0]">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-[#1a1210] font-display mb-2">No listings found</h3>
                <p className="text-[#8c7e72] font-body">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#faf5f0] flex items-center justify-center">
        <div className="text-[#c41e3a] text-xl font-body">Loading marketplace...</div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}
