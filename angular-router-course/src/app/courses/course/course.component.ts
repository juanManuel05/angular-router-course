import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  course: Course;

  couponCode: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.snapshot)
    this.course = this.route.snapshot.data.course;
    this.couponCode = this.route.snapshot.queryParamMap.get("couponCode");
  }

  confirmExit() {
    return confirm('sure to leave');
  }
}
