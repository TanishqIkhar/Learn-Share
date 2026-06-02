'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useSocket();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Pages with dark headers
  const isDarkPage = pathname === '/' || pathname === '/donate';
  const forceLightText = isDarkPage && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#faf5f0]/95 backdrop-blur-xl shadow-lg shadow-black/5' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#c41e3a] flex items-center justify-center shadow-lg shadow-[#c41e3a]/20 group-hover:shadow-[#c41e3a]/40 group-hover:scale-105 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <span className={`text-xl font-bold font-display tracking-tight transition-colors ${forceLightText ? 'text-white' : 'text-[#1a1210]'}`}>
                Learn<span className={forceLightText ? 'text-white' : 'text-[#c41e3a]'}>Share</span>
              </span>
              <span className={`hidden sm:block text-[10px] font-body tracking-[0.2em] uppercase -mt-0.5 transition-colors ${forceLightText ? 'text-white/60' : 'text-[#8c7e72]'}`}>
                Books & Beyond
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/listings" className={`px-4 py-2 text-sm font-medium rounded-lg transition-all font-body ${forceLightText ? 'text-white hover:bg-white/10' : 'text-[#2d2118] hover:text-[#c41e3a] hover:bg-[#c41e3a]/5'}`}>
              Marketplace
            </Link>
            <Link href="/donate" className={`px-4 py-2 text-sm font-medium rounded-lg transition-all font-body ${forceLightText ? 'text-white hover:bg-white/10' : 'text-[#2d2118] hover:text-[#c41e3a] hover:bg-[#c41e3a]/5'}`}>
              Free Items
            </Link>
            {user ? (
              <>
                <Link href="/listings/create" className={`px-4 py-2 text-sm font-medium rounded-lg transition-all font-body ${forceLightText ? 'text-white hover:bg-white/10' : 'text-[#2d2118] hover:text-[#c41e3a] hover:bg-[#c41e3a]/5'}`}>
                  Sell / Donate
                </Link>
                <Link href="/messages" className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all font-body ${forceLightText ? 'text-white hover:bg-white/10' : 'text-[#2d2118] hover:text-[#c41e3a] hover:bg-[#c41e3a]/5'}`}>
                  Messages
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#c41e3a] text-white text-[10px] rounded-full flex items-center justify-center font-bold animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link href="/profile" className={`px-4 py-2 text-sm font-medium rounded-lg transition-all font-body ${forceLightText ? 'text-white hover:bg-white/10' : 'text-[#2d2118] hover:text-[#c41e3a] hover:bg-[#c41e3a]/5'}`}>
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className={`ml-2 px-4 py-2 text-sm rounded-lg transition-all font-body ${forceLightText ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-[#8c7e72] hover:text-[#c41e3a]'}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={`px-4 py-2 text-sm font-medium rounded-lg transition-all font-body ${forceLightText ? 'text-white hover:bg-white/10' : 'text-[#2d2118] hover:text-[#c41e3a] hover:bg-[#c41e3a]/5'}`}>
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`ml-3 px-6 py-2.5 text-sm font-semibold rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all font-body ${
                    forceLightText 
                      ? 'bg-white text-[#c41e3a] hover:bg-[#faf5f0] hover:shadow-white/20' 
                      : 'text-white bg-[#c41e3a] hover:bg-[#8b1425] hover:shadow-[#c41e3a]/20'
                  }`}
                >
                  Let&apos;s Talk
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${forceLightText ? 'text-white hover:bg-white/10' : 'text-[#2d2118] hover:text-[#c41e3a]'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden pb-6 border-t border-[#c41e3a]/10 mt-2 pt-4 space-y-1 bg-[#faf5f0]/95 backdrop-blur-xl rounded-b-2xl">
            <Link href="/listings" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-[#2d2118] hover:text-[#c41e3a] rounded-xl hover:bg-[#c41e3a]/5 font-medium font-body">Marketplace</Link>
            <Link href="/donate" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-[#2d2118] hover:text-[#c41e3a] rounded-xl hover:bg-[#c41e3a]/5 font-medium font-body">Free Items</Link>
            {user ? (
              <>
                <Link href="/listings/create" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-[#2d2118] hover:text-[#c41e3a] rounded-xl hover:bg-[#c41e3a]/5 font-medium font-body">Sell / Donate</Link>
                <Link href="/messages" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-[#2d2118] hover:text-[#c41e3a] rounded-xl hover:bg-[#c41e3a]/5 font-medium font-body">Messages {unreadCount > 0 && `(${unreadCount})`}</Link>
                <Link href="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-[#2d2118] hover:text-[#c41e3a] rounded-xl hover:bg-[#c41e3a]/5 font-medium font-body">Profile</Link>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-[#c41e3a] rounded-xl hover:bg-[#c41e3a]/5 font-medium font-body">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-[#2d2118] hover:text-[#c41e3a] rounded-xl hover:bg-[#c41e3a]/5 font-medium font-body">Login</Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="block mx-4 mt-2 py-3 text-center text-white bg-[#c41e3a] rounded-full font-semibold font-body">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
