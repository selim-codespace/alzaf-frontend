export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "", // import alzaf provide api from .env file
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;