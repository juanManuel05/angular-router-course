import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  UrlSerializer,
} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanLoadAuthGuard } from "./services/can-load-auth.guard";
import { CustomPreloadingStrategy } from "./services/custom-preloading.strategy";
import { ChatComponent } from "./chat/chat.component";

const routes: Routes = [
  {
    path: "", //root route, in this case localhost:4200
    redirectTo: "/courses",
    pathMatch: "full",
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
    // canLoad: [CanLoadAuthGuard], commented out to test the preLoadingStrategy
    data: {
      preload: true,
    },
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "helpdesk-chat",
    component: ChatComponent,
    outlet: "chat",
  },
  {
    path: "**", // these characters matches every URL which is why is important to set it at the end of the array. It starts from the top and goes down till the last note
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
      scrollPositionRestoration: "enabled",
      malformedUriErrorHandler: (
        error: URIError,
        urlSerializer: UrlSerializer,
        url: string
      ) => urlSerializer.parse("/page-not-found"), //will end up at line 44 as that url does not match any path

      // paramsInheritanceStrategy: 'always',
      // useHash:true to always serve the index.html (which means the SPA) regardless the configuration of the BE
    }),
  ],
  exports: [RouterModule],
  providers: [CanLoadAuthGuard, CustomPreloadingStrategy],
})
export class AppRoutingModule {}
