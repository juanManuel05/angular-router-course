import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { CourseComponent } from "../courses/course/course.component";

@Injectable({providedIn: 'root'})
export class ConfirmExitGuard implements CanDeactivate<CourseComponent> {

  canDeactivate(
    component: CourseComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): boolean {
    return component.confirmExit();
  }

}
