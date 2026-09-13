import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How ShootFlow handles the enquiry and client information you store in it.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      intro="ShootFlow stores enquiries, client details and booking information on your behalf. This page will set out exactly what is collected, how it is used, and how long it is kept."
      sections={[
        {
          heading: "What this policy will cover",
          body: "The categories of information ShootFlow collects, the purposes it is used for, who it is shared with, and the retention periods that apply to each.",
        },
        {
          heading: "Your client data",
          body: "ShootFlow is built so that the enquiries and client lists you store are yours. The published policy will state this in binding terms, including what ShootFlow will never do with that information.",
        },
        {
          heading: "Your rights",
          body: "How to access, correct, export or delete the information held about you and about the clients you manage in ShootFlow, and how to contact us about any of it.",
        },
      ]}
    />
  );
}
