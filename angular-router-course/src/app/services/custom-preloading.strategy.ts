import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data["preload"]) {
      return load();
    } else {
      of(null);
    }
  }
}

//This is called when navigate to a different route but before it takes place
