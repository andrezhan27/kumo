import "server-only";

import {
  sanitizeLegalLinks,
  type LegalLinks,
} from "@/lib/legal-links-data";

export type { LegalLinks } from "@/lib/legal-links-data";

const RESTAURANT_SLUG = "sushiking";
const REVALIDATE_SECONDS = 300;

type RestaurantLegalLinksRow = {
  slug: string;
  privacy_policy_url: string | null;
  terms_and_conditions_url: string | null;
};

const EMPTY_LEGAL_LINKS: LegalLinks = {
  privacyPolicyUrl: null,
  termsAndConditionsUrl: null,
};

export async function getRestaurantLegalLinks(): Promise<LegalLinks> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!supabaseUrl || !publishableKey) {
    return EMPTY_LEGAL_LINKS;
  }

  try {
    const endpoint = new URL("/rest/v1/restaurants", supabaseUrl);
    endpoint.searchParams.set(
      "select",
      "slug,privacy_policy_url,terms_and_conditions_url",
    );
    endpoint.searchParams.set("slug", `eq.${RESTAURANT_SLUG}`);
    endpoint.searchParams.set("limit", "1");

    const response = await fetch(endpoint, {
      headers: {
        apikey: publishableKey,
        Accept: "application/json",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return EMPTY_LEGAL_LINKS;
    }

    const rows = (await response.json()) as unknown;
    const row = Array.isArray(rows)
      ? (rows[0] as Partial<RestaurantLegalLinksRow> | undefined)
      : undefined;

    if (!row || row.slug !== RESTAURANT_SLUG) {
      return EMPTY_LEGAL_LINKS;
    }

    return sanitizeLegalLinks(
      row.privacy_policy_url,
      row.terms_and_conditions_url,
    );
  } catch {
    return EMPTY_LEGAL_LINKS;
  }
}
