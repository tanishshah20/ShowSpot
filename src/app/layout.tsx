import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { WishlistProvider } from '@/context/WishlistContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShowSpot',
  description: 'Find the best events near you',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WishlistProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </WishlistProvider>
      </body>
    </html>
  );
}