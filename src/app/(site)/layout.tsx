import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";

// The public marketing/SEO surface: sticky header, footer, floating theme
// toggle. The authenticated dashboard under (app) deliberately opts out of this
// chrome and renders its own sidebar shell instead.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingThemeToggle />
    </div>
  );
}
