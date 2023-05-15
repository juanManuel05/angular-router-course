import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { AuthStore } from "./auth.store";
import { first, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CanLoadAuthGuard implements CanLoad {
  constructor(private authStore: AuthStore, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authStore.isLoggedIn$.pipe(
      first(),
      tap((isLoggedIn) => {
        if(!isLoggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
