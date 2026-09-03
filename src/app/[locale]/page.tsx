import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { FoundationPage } from "@/components/foundation/foundation-page";
import { isLocale } from "@/i18n/routing";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("Foundation");

  return (
    <FoundationPage
      ariaLabel={t("ariaLabel")}
      title={t("title")}
      body={t("body")}
      localeLabel={t("locale")}
    />
  );
}
