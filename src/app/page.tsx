import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { ValueProp } from "@/components/value-prop";
import { Product } from "@/components/product";
import { BeforeAfter } from "@/components/before-after";
import { Outcomes } from "@/components/outcomes";
import { HowItWorks } from "@/components/how-it-works";
import { Audience } from "@/components/audience";
import { Pricing } from "@/components/pricing";
import { Trust } from "@/components/trust";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { buildFaqSchema, buildSoftwareApplicationSchema } from "@/lib/schema";

/*
 * Section order is the argument the page makes:
 *
 *   hook → pain → the shape of the fix → what it is → proof by contrast →
 *   what you get → how hard is it → is it for me → what it costs →
 *   can I trust you → objections → ask
 *
 * Serial Position Effect puts the two strongest moments at the ends: the hero
 * opens, the trial ask closes. The dark Before/After band sits in the middle as
 * the peak, because an otherwise flat middle is where attention goes to die.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <ValueProp />
      <Product />
      <BeforeAfter />
      <Outcomes />
      <HowItWorks />
      <Audience />
      <Pricing />
      <Trust />
      <Faq />
      <FinalCta />
      <MobileCtaBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSoftwareApplicationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqSchema()),
        }}
      />
    </>
  );
}
