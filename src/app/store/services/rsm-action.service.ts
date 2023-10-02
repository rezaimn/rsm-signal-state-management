import { Injectable } from "@angular/core";
import { PublicActionsRsmGeneric } from "projects/rsm-signal-state-management/src/lib/generic-classes";
import { RsmPrimitiveActionTypes } from "../actions/rsm-actions";

@Injectable({
  providedIn: 'root'
})
export class RsmActionsService extends PublicActionsRsmGeneric<RsmPrimitiveActionTypes>{
  constructor() { 
    super();
  }
}