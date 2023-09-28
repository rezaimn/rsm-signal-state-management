import { NgModule } from "@angular/core";
import { Route, RouterModule, Router } from "@angular/router";
import { RsmPrimitiveComponent } from "./examples/rsm-primitive/rsm-primitive.component";
import { RsmEntityArrayComponent } from "./examples/rsm-entity-array/rsm-entity-array.component";
import { RsmEntityObjectComponent } from "./examples/rsm-entity-object/rsm-entity-object.component";
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
    path: 'entity-array',
    component: RsmEntityArrayComponent
  },
  {
    path: 'entity-object',
    component: RsmEntityObjectComponent
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
