export type LegalLinks = {
  privacyPolicyUrl: string | null;
  termsAndConditionsUrl: string | null;
};

export function validateExternalUrl(value: unknown): string | null {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  try {
    const url = new URL(value.trim());

    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function sanitizeLegalLinks(
  privacyPolicyUrl: unknown,
  termsAndConditionsUrl: unknown,
): LegalLinks {
  return {
    privacyPolicyUrl: validateExternalUrl(privacyPolicyUrl),
    termsAndConditionsUrl: validateExternalUrl(termsAndConditionsUrl),
  };
}
