
import { Component, inject } from '@angular/core';
import { ObjectModel, initialObject } from 'src/app/store/models/rsm-entity.model';
import { RsmEntityStoreService } from 'src/app/store/services/rsm-entity-store.service';
import { generateRandomObject } from 'src/app/utils/random-object-generator';

@Component({
  selector: 'rsm-entity',
  templateUrl: './rsm-entity-object.component.html',
  styleUrls: ['./rsm-entity-object.component.css']
})
export class RsmEntityObjectComponent {
  rsmEntityStoreService = inject(RsmEntityStoreService);
 
  userObject: ObjectModel = { ...initialObject};
 
  
  
  
  addNewObject() {
    this.rsmEntityStoreService.setStatePropertyByKey('objectSample', this.userObject);
  }

  updatePartially() {
    this.rsmEntityStoreService.updateExistingObjectPartiallyByPropertyKey('objectSample', this.userObject);
  }

  removeObject() {
    this.userObject = { ...initialObject };
    this.rsmEntityStoreService.setStatePropertyByKey('objectSample', this.userObject);
  }

  changeFirstName(event: any) {
    this.userObject.firstName = event.target.value;
  }

  changeLastName(event: any) {
    this.userObject.lastName = event.target.value;
  }
  
  changeAge(event: any) {
    this.userObject.age = parseInt(event.target.value);
  }

  changeEmail(event: any) {
    this.userObject.email = event.target.value;
  }

}