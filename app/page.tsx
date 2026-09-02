import { LandingNav } from '@/components/landing/landing-nav'
import { Hero } from '@/components/landing/hero'
import { IntegrationStrip } from '@/components/landing/integration-strip'
import { Problem } from '@/components/landing/problem'
import { HowItWorks } from '@/components/landing/how-it-works'
import { CitationDeepDive } from '@/components/landing/citation-deepdive'
import { SocialProof } from '@/components/landing/social-proof'
import { FinalCta, Footer } from '@/components/landing/final-cta'

export default function HomePage() {
  return (
    <div className="min-h-svh bg-background">
      <LandingNav />
      <main>
        <Hero />
        <IntegrationStrip />
        <Problem />
        <HowItWorks />
        <CitationDeepDive />
        <SocialProof />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
