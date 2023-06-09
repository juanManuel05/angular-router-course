import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LoadingService } from "./loading.service";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";

@Component({
  selector: "loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"],
})
export class LoadingComponent implements OnInit {
  @Input()
  routing: boolean = false;

  @Input()
  detectRoutingOnGoing = false;

  constructor(public loadingService: LoadingService, private router: Router) {}

  ngOnInit() {
    if (this.detectRoutingOnGoing) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loadingService.loadingOn();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.loadingService.loadingOff();
        }
      });
    }
  }
}
