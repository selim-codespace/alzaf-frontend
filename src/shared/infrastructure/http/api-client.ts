import { API_CONFIG } from "../config/api.config";
import { ApiError } from "./api-error";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private defaultRetries: number;

  constructor(baseUrl: string, timeout: number, retries: number = 0) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = timeout;
    this.defaultRetries = retries;
  }

  private async request<T>(
    endpoint: string,
    method: HttpMethod,
    data?: unknown,
    options: FetchOptions = {}
  ): Promise<T> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      headers,
      ...customConfig
    } = options;

    let attempt = 0;

    while (attempt <= retries) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const config: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          signal: controller.signal,
          cache: "no-store", // Default to no-store for server-side dynamic data
          ...customConfig,
        };

        if (data) {
          config.body = JSON.stringify(data);
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, config);
        clearTimeout(timeoutId);

        if (!response.ok) {
          if (
            response.status >= 400 &&
            response.status < 500 &&
            response.status !== 429
          ) {
            throw new ApiError(
              response.status,
              `HTTP ${response.status}: ${response.statusText}`,
              endpoint
            );
          }
          throw new ApiError(
            response.status,
            `HTTP ${response.status}: ${response.statusText}`,
            endpoint
          );
        }

        const json = await response.json();
        return json.data as T;
      } catch (error) {
        clearTimeout(timeoutId);
        attempt++;

        // If we still have retries left and it's a retryable error (network or 5xx or 429)
        const isRetryable =
          error instanceof ApiError
            ? error.statusCode >= 500 || error.statusCode === 429
            : true; // Network errors are retryable

        if (attempt <= retries && isRetryable) {
          // Exponential backoff with jitter
          const delay = Math.min(
            1000 * Math.pow(2, attempt) + Math.random() * 100,
            5000
          );
          console.warn(
            `Attempt ${attempt} failed. Retrying in ${delay}ms...`,
            error
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        if (error instanceof ApiError) {
          throw error;
        }

        if (error instanceof Error && error.name === "AbortError") {
          throw new ApiError(408, "Request timeout", endpoint);
        }

        throw new ApiError(
          500,
          error instanceof Error ? error.message : "Network error",
          endpoint
        );
      }
    }

    throw new ApiError(500, "Max retries reached", endpoint);
  }

  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, "GET", undefined, options);
  }

  async post<T>(
    endpoint: string,
    data: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", data, options);
  }

  async put<T>(
    endpoint: string,
    data: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, "PUT", data, options);
  }

  async delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, "DELETE", undefined, options);
  }

  async patch<T>(
    endpoint: string,
    data: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, "PATCH", data, options);
  }
}

export const apiClient = new ApiClient(
  API_CONFIG.BASE_URL,
  API_CONFIG.TIMEOUT,
  API_CONFIG.RETRY_ATTEMPTS
);
