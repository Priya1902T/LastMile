import "./site.css";
import SmoothScroll from "@/components/site/SmoothScroll";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Cursor from "@/components/site/Cursor";
import IntroCurtain from "@/components/site/IntroCurtain";

export default function SiteLayout({ children }) {
  return (
    <SmoothScroll>
      <div className="site">
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-coal focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <IntroCurtain />
        <Nav />
        <main id="content">{children}</main>
        <Footer />
        <Cursor />
      </div>
    </SmoothScroll>
  );
}
