import "server-only";

export type ServerConfig = {
  internalApiBaseUrl?: string;
};

function optionalUrl(value: string | undefined, name: string): string | undefined {
  if (!value) {
    return undefined;
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

export function readServerConfig(): ServerConfig {
  return {
    internalApiBaseUrl: optionalUrl(
      process.env.ATLAZORA_INTERNAL_API_BASE_URL,
      "ATLAZORA_INTERNAL_API_BASE_URL",
    ),
  };
}
