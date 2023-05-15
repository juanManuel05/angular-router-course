import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LessonDetail } from "../model/lesson-detail";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "lesson",
  templateUrl: "./lesson-detail.component.html",
  styleUrls: ["./lesson-detail.component.css"],
})
export class LessonDetailComponent implements OnInit {
  lesson$: Observable<LessonDetail>;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("Created LessonDetailComponent...");
  }

  ngOnInit() {
    this.lesson$ = this.route.data.pipe(
      map(data => data["lessonDetail"])
    );
  }
  //http://localhost:4200/courses/reactive-angular-course/lessons/3

  /**we are using relative path to build the path where to navigate. In this case the relative path will be 'this.route.parent'(localhost:4200/courses/reactive-angular-course/),
   * and from it we build the URL as an array
   */
  onGoToPreviousLesson(lesson: LessonDetail) {
    console.log(this.route.parent);
    this.router.navigate(["lessons", lesson.seqNo - 1], {
      relativeTo: this.route.parent,
    });
  }

  onGoToNextLesson(lesson: LessonDetail) {
    this.router.navigate(["lessons", lesson.seqNo + 1], {
      relativeTo: this.route.parent,
    });
  }
}
