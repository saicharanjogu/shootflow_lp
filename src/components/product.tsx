import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { ProductTabs } from "@/components/product-tabs";
import { PRODUCT } from "@/lib/content";

/** Server wrapper: only the interactive tab strip needs to be a client component. */
export function Product() {
  return (
    <Section id="product" tone="sand">
      <Container>
        <Eyebrow tone="onSand">{PRODUCT.eyebrow}</Eyebrow>
        <SectionHeading id="product" className="max-w-2xl text-ink">
          {PRODUCT.heading}
        </SectionHeading>

        <div className="mt-8 sm:mt-10">
          <ProductTabs />
        </div>
      </Container>
    </Section>
  );
}
