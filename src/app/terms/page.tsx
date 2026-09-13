import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms that will govern your use of ShootFlow.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      intro="These terms will govern your subscription to ShootFlow, including billing, the free trial, and the responsibilities on both sides."
      sections={[
        {
          heading: "Subscription and billing",
          body: "Plan pricing, the monthly billing cycle, applicable GST, and how to change or cancel a plan.",
        },
        {
          heading: "Free trial",
          body: "ShootFlow offers a 14-day free trial with no credit card required. The published terms will set out what happens at the end of the trial period.",
        },
        {
          heading: "Acceptable use and availability",
          body: "What ShootFlow may be used for, the service levels we aim to meet, and the circumstances in which access may be suspended.",
        },
      ]}
    />
  );
}
