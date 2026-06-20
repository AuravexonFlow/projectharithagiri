import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "හරිතගිරි විහාරය | Harithagiri Viharaya",
  description: "හරිත ගම - හරිතගිරි විහාරයේ නිල වෙබ් අඩවිය",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="si">
      <body className="antialiased bg-temple-cream min-h-full flex flex-col relative overflow-x-hidden">
        {/* Decorative Corner Borders */}
        <div className="corner-decoration top-left" aria-hidden="true"></div>
        <div className="corner-decoration top-right" aria-hidden="true"></div>
        
        {/* Falling Bodhi Leaves Background Effect */}
        <div className="falling-leaves" aria-hidden="true">
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
        </div>
        
        {/* Floating Golden Particles */}
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
          <div className="particle" style={{ left: '5%', animationDuration: '15s', animationDelay: '0s' }}></div>
          <div className="particle" style={{ left: '15%', animationDuration: '18s', animationDelay: '3s' }}></div>
          <div className="particle" style={{ left: '25%', animationDuration: '12s', animationDelay: '6s' }}></div>
          <div className="particle" style={{ left: '35%', animationDuration: '20s', animationDelay: '2s' }}></div>
          <div className="particle" style={{ left: '45%', animationDuration: '16s', animationDelay: '8s' }}></div>
          <div className="particle" style={{ left: '55%', animationDuration: '14s', animationDelay: '4s' }}></div>
          <div className="particle" style={{ left: '65%', animationDuration: '19s', animationDelay: '7s' }}></div>
          <div className="particle" style={{ left: '75%', animationDuration: '13s', animationDelay: '1s' }}></div>
          <div className="particle" style={{ left: '85%', animationDuration: '17s', animationDelay: '5s' }}></div>
          <div className="particle" style={{ left: '95%', animationDuration: '21s', animationDelay: '9s' }}></div>
        </div>
        
        <Navbar />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
