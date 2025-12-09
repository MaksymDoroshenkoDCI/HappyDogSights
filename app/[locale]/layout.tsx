import { use } from "react";

const localeMetadata = {
  de: {
    title: "Happy Dog Sights 🐶 | Aussichtspunkte Deutschland",
    description:
      "Schöne Ausblicke & Hundepensionen - Entdecke Deutschlands schönste Aussichtspunkte mit deinem Hund.",
  },
  en: {
    title: "Happy Dog Sights 🐶 | German Viewpoints",
    description:
      "Beautiful Views & Dog Kennels - Discover Germany's most beautiful viewpoints with your dog.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const meta =
    localeMetadata[locale as keyof typeof localeMetadata] || localeMetadata.de;

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return <>{children}</>;
}
