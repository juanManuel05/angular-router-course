import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Course } from "../model/course";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { CoursesService } from "./courses.service";

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private courses: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Course> {
    const courseUrl = route.paramMap.get("courseUrl");
    return this.courses.loadCourseByUrl(courseUrl);
  }
}
