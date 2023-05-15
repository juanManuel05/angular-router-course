import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthStore } from "./auth.store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authStore: AuthStore, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree>
  {
    return this.authStore.isLoggedIn$.pipe(
      map((isLoggedIn) => (isLoggedIn ? true : this.router.parseUrl("/login")))
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authStore.isLoggedIn$.pipe(
      map((isLoggedIn) => (isLoggedIn ? true : this.router.parseUrl("/login")))
    );
  }
}
