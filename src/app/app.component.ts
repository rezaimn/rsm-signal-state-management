import { Component, OnInit, inject, Signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RsmPrimitiveStoreService } from './store/services/rsm-primitive-store.service';
import { RsmPrimitiveState } from './store/models/rsm-primitive.model';
import { ArrayModel, RsmEntityState } from './store/models/rsm-entity.model';
import { RsmEntityStoreService } from './store/services/rsm-entity-store.service';
import { RsmQueueState } from './store/models/rsm-queue.model';
import { RsmQueueStoreService } from './store/services/rsm-queue-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  router = inject(Router);
  rsmPrimitiveStoreService = inject(RsmPrimitiveStoreService);
  rsmEntityStoreService = inject(RsmEntityStoreService);
  rsmQueueStoreService = inject(RsmQueueStoreService);
  currentRoute = '';
  rsmPrimitiveState: Signal<RsmPrimitiveState> = this.rsmPrimitiveStoreService.state;
  rsmEntityState: Signal<RsmEntityState> = this.rsmEntityStoreService.state;
  rsmQueueState: Signal<RsmQueueState> = this.rsmQueueStoreService.state;
  arraySize: Signal<number> = this.rsmEntityStoreService.getArraySize('arraySample');
  
  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.url;
        this.currentRoute = currentRoute;
      });
  }

}
