import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import KickTransition from "@/components/KickTransition";
import FlipTransition from "@/components/FlipTransition";
import About from "@/components/About";
import Branches from "@/components/Branches";
import Programs from "@/components/Programs";
import Gallery from "@/components/GalleryStars";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <MotionProvider>
      <Navbar />
      <main className="w-full">
        <Hero />
        <Marquee />
        <KickTransition />
        <About />
        <FlipTransition />
        <Branches />
        <Programs />
        <Gallery />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionProvider>
  );
}
