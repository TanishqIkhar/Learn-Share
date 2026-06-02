import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { SocketProvider } from '@/context/SocketContext';
import Navbar from '@/components/Navbar';
import KeepAlive from '@/components/KeepAlive';

export const metadata = {
  title: 'LearnShare — Student Marketplace for Educational Materials',
  description: 'Buy, sell, donate, and exchange educational materials. Reduce the cost of education through community-driven resource sharing.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <KeepAlive />
        <AuthProvider>
          <SocketProvider>
            <Navbar />
            <main className="pt-16 min-h-screen">{children}</main>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
