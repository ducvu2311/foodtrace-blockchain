import { ApplicationConfig, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { HttpClientModule, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { authInterceptor } from './interceptors/auth.interceptor';

/* -------------------------
   Translate Loader
------------------------- */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/* -------------------------
   App Initializer
------------------------- */
export function initializeApp(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('vi');
    return Promise.resolve();
  };
}

/* ==========================================================
   ✔ FINAL — HỢP NHẤT & SỬA LỖI TRÙNG appConfig
   (KHÔNG còn redeclare, đầy đủ tất cả providers)
========================================================== */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),

    // HttpClient + Interceptors
    provideHttpClient(withInterceptors([authInterceptor])),

    // MODULE IMPORTS (Translate + HttpClientModule)
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        }
      })
    ),

    // APP INITIALIZER (khởi tạo ngôn ngữ)
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslateService],
      multi: true
    },
  ],
};
