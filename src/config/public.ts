export type PublicConfig = {
  apiBaseUrl: string;
};

function requirePublicUrl(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`${name} is required.`);
  }

  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute URL.`);
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`${name} must use http or https.`);
  }

  return parsed.toString().replace(/\/$/, "");
}

export function readPublicConfig(): PublicConfig {
  return {
    apiBaseUrl: requirePublicUrl(
      process.env.NEXT_PUBLIC_ATLAZORA_API_BASE_URL,
      "NEXT_PUBLIC_ATLAZORA_API_BASE_URL",
    ),
  };
}
