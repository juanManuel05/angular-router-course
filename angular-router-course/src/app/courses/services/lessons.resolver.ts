import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { CoursesService } from "./courses.service";
import { LessonSummary } from "../model/lesson-summary";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

@Injectable()
export class LessonsResolver implements Resolve<LessonSummary[]> {
  constructor(private courses: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<LessonSummary[]> {
    const courseUrl = route.paramMap.get("courseUrl");
    return this.courses.loadAllCourseLessonsSummary(courseUrl);
  }
}

