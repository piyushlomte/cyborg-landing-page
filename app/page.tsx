import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { TechnologySection } from "@/components/technology-section"
import { ProductSection } from "@/components/product-section"
import { AIAssistantSection } from "@/components/ai-assistant-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function CyberNexusLanding() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Navigation />
      
      <div id="main-content">
        <HeroSection />
        <TechnologySection />
        <ProductSection />
        <AIAssistantSection />
        <StatsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
      
      <Footer />
    </main>
  )
}
