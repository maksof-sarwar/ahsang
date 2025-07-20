import { inject, Injectable } from '@angular/core';
import jsCookie from 'js-cookie';
import { ApiError, Fetcher, Middleware } from 'openapi-typescript-fetch';
import { CustomRequestInit } from 'openapi-typescript-fetch/types';
import { API_URL } from '../config';
import { paths } from './client';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  public fetcher = Fetcher.for<paths>();
  private middleware: Middleware;
  messageService = inject(MessageService)

  constructor() {
    this.middleware = this.createMiddleware();
    this.fetcher.configure({
      baseUrl: API_URL,
      use: [this.middleware]
    });
  }

  private createMiddleware(): Middleware {
    return async (url, init, next) => {
      const sessionId = jsCookie.get("token");

      const abortController = new AbortController();
      const abortSignal = abortController.signal;

      // Ensure headers is of type Headers
      const headers = new Headers(init.headers || {});

      // Attach session token if available
      if (sessionId) {
        headers.append("Authorization", `Bearer ${sessionId}`);
      }
      // Create a new RequestInit object with the modified headers
      const modifiedInit: RequestInit = {
        ...init,
        signal: abortSignal,
        headers: headers,
      };

      try {
        // Call next middleware or fetch
        return await next(url, modifiedInit as CustomRequestInit); // Explicitly cast to CustomRequestInit
      } catch (err: any) {
        // Handle errors
        this.catchError(err);
        throw err;
      }
    };
  }

  private catchError(err: unknown) {
    if (err instanceof ApiError) {
      switch (err.status) {
        // case 401: {
        //   // Logout user on unauthorized access
        //   break;
        // }
        default:
          // Display error message
          this.showToast(err.data?.message ?? err.statusText ?? "An error occurred.");
          break;
      }
      return;
    }
    // Handle other errors
    const error: any = err as Error;
    this.showToast(error.message || "An error occurred");
  }

  private showToast(message: string) {
    alert(message)
  }
}