import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { CoursesService } from "./courses.service";
import { LessonSummary } from "../model/lesson-summary";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { LessonDetail } from "../model/lesson-detail";

@Injectable()
export class LessonDetailResolver implements Resolve<LessonDetail> {
  constructor(private courses: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<LessonDetail> {
    // const courseUrl = route.paramMap.get("courseUrl"); => won't park, will 'courseUrl' will be undefined, as it belongs to the parent route(check courses routing)
    //In order for this to work we should add the following at the app-routing.moduls.ts =>  paramsInheritanceStrategy: 'always',
    const courseUrl = route.parent.paramMap.get("courseUrl");
    const lessonSeqNo = route.paramMap.get("lessonSeqNo");
    return this.courses.loadLessonDetail(courseUrl, lessonSeqNo);
  }
}
