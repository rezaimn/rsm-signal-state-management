import { Component, OnInit, inject, Signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RsmPrimitiveStoreService } from './store/services/rsm-primitive-store.service';
import { RsmPrimitiveState } from './store/models/rsm-primitive.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  router = inject(Router);
  rsmPrimitiveStoreService = inject(RsmPrimitiveStoreService);
  currentRoute = '';
  rsmPrimitiveState: Signal<RsmPrimitiveState> = this.rsmPrimitiveStoreService.state;
  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.url;
        this.currentRoute = currentRoute;
      });
  }

}
