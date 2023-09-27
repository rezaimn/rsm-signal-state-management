import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RsmPrimitiveComponent } from './examples/rsm-primitive/rsm-primitive.component';
import { RsmQueueComponent } from './examples/rsm-queue/rsm-queue.component';
import { RsmStackComponent } from './examples/rsm-stack/rsm-stack.component';
import { RsmEntityComponent } from './examples/rsm-entity/rsm-entity.component';
import { AppRoutingModule } from './app.routing.module';


@NgModule({
  declarations: [
    AppComponent,
    RsmPrimitiveComponent,
    RsmQueueComponent,
    RsmStackComponent,
    RsmEntityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
