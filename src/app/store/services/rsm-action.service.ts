import { Injectable } from "@angular/core";
import { PublicRsmActionsGeneric } from "projects/rsm-signal-state-management";
import { RsmPrimitiveActionTypes } from "../actions/rsm-actions";

@Injectable({
  providedIn: 'root'
})
export class RsmActionsService extends PublicRsmActionsGeneric<RsmPrimitiveActionTypes>{
  constructor() { 
    super();
  }
}