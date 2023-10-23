import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RsmPrimitiveComponent } from './examples/rsm-primitive/rsm-primitive.component';
import { RsmQueueComponent } from './examples/rsm-queue/rsm-queue.component';
import { RsmStackComponent } from './examples/rsm-stack/rsm-stack.component';
import { RsmEntityArrayComponent } from './examples/rsm-entity-array/rsm-entity-array.component';
import { RsmEntityObjectComponent } from './examples/rsm-entity-object/rsm-entity-object.component';
import { AppRoutingModule } from './app.routing.module';
import { RsmEffectsModule } from 'projects/rsm-signal-state-management/src/lib/modules/rsm-effects.module';
import { RsmPrimitiveEffectsService } from './store/effects/rsm-primitive-effect.service';


@NgModule({
  declarations: [
    AppComponent,
    RsmPrimitiveComponent,
    RsmQueueComponent,
    RsmStackComponent,
    RsmEntityArrayComponent,
    RsmEntityObjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RsmEffectsModule.forRoot(RsmPrimitiveEffectsService)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
