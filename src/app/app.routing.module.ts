import { NgModule } from "@angular/core";
import { Route, RouterModule, Router } from "@angular/router";
import { RsmPrimitiveComponent } from "./examples/rsm-primitive/rsm-primitive.component";
import { RsmEntityComponent } from "./examples/rsm-entity/rsm-entity.component";
import { RsmQueueComponent } from "./examples/rsm-queue/rsm-queue.component";
import { RsmStackComponent } from "./examples/rsm-stack/rsm-stack.component";


const appRoutes:Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'primitive'
  },
  {
    path: 'primitive',
    component: RsmPrimitiveComponent
  },
  {
    path: 'entity',
    component: RsmEntityComponent
  },
  {
    path: 'queue',
    component: RsmQueueComponent
  },
  {
    path: 'stack',
    component: RsmStackComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {

  // Subscribe to the Router URL changes.
  constructor(public router: Router) {}
}
