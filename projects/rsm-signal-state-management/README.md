# Your Library Name

Brief description or tagline for your library.

[![npm version](https://img.shields.io/npm/v/your-library-name.svg)](https://www.npmjs.com/package/your-library-name)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Table of Contents
- [Installation](#installation)
- [Introduction](#introduction)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install this library via npm:

```shell
npm install rsm-signal-state-management
```

## Introduction
This is a very siple and powerful replacement for ngrx library, using Angular signals.
Imagine you have a user entity with some states like, profile, balance, personalSettings.
Also you have a product entity with some states like, info, availability.

```typescript
interface UserState {
  profile: UserProfile;
  balance: UserBalance;
  personalSettings: UserPersonalSettings;
}

interface ProductState {
  info: ProductInfo;
  availability: ProductAvailability;
}
```
With this library you can either have separated state managements for user and product like up, or have a main state to hold them all together in one place like this:

```typescript
interface MainState {
  user: UserState;
  product: ProductState
}
```
For the separated states you will gonna need to create separated services for each state and I personally prefer this method to encapsulate your entities states.

To have a state management system for your entities you just need to define your state interface like we did, and also you need to have a initial value for each state also.

```typescript
import { Injectable } from '@angular/core';
import { PublicRsmEntityGenericClass } from 'projects/rsm-signal-state-management/src/lib/generic-classes/public-rsm-entity-generic';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService extends PublicRsmEntityGenericClass<UserState>{
  constructor() { 
    super(initialUserState);
  }
}

```
You also gonna need a service which extends one of the following classes from the library regarding what kind of state we need to create.

1- public-rsm-primitive-generic ( for simple primitive values ).
2- public-rsm-entity-generic ( for arrays and objects and also the primitive states ) for our user case we need this one.
3- public-rsm-queue-generic ( to create a simple queue or priority queue, you can easily add or remove Items here).
4- public-rsm-stack-generic ( to create a stack, you can easily push and pop Items here).
5- public-rsm-action-generic ( to dispatch and listen to actions ).

### Use the store service 

```typescript
  userStoreService = inject(UserStoreService);

setUserProfileData(userProfile: UserProfile) {
  // 'profile' is the interface key
  this.userStoreService.setStatePropertyByKey('profile', userProfile);
}
// To get access to user profile data to use in html you can easily use the select function and pass the property key
userProfileSignal: Signal<UserProfile> = this.userStoreService.select('profile');

```
## Usage

To effectively use this library, follow these steps:

### Create a Service

To use this library, you'll need to create a service that extends one of the generic classes from the library. This will grant you access to the functions and properties within these classes. When extending a generic class, you should also pass the state model you intend to create as well as an initialization value for that state model.

### Define the State Model and Initialization

Here's an example of defining a state model and providing an initialization value for a simple state management system with two properties:

```typescript
export interface RsmPrimitiveState {
  counter: number;
  text: string;
}

export const initialRsmPrimitiveState: RsmPrimitiveState = {
  counter: 0,
  text: '',
};
```
### Create a Service
Next, create a service that extends one of the generic classes, like this:

```typescript
import { Injectable } from '@angular/core';
import { PublicRsmPrimitiveGenericClass } from 'rsm-signal-state-management/src/lib/generic-classes/public-rsm-primitive-generic';

@Injectable({
  providedIn: 'root'
})
export class RsmPrimitiveStoreService extends PublicRsmPrimitiveGenericClass<RsmPrimitiveState> {
  constructor() { 
    super(initialRsmPrimitiveState);
  }
}
```
With this service, you can easily access all the public methods and properties inside the generic class, enabling you to update and listen to state changes effectively.
You can also access the protected methods and properties within the service itself. From there, you can create public methods within the service, which users of the service can utilize.
### Example of Using the Service
Here's an example of how to interact with the service:

```typescript
// Import the service
const rsmPrimitiveStoreService = inject(RsmPrimitiveStoreService);

// Example of incrementing the 'counter' property
increment() {
  rsmPrimitiveStoreService.setStatePropertyByKey('counter', this.counterCurrentValue() + 1);
}

// Example of decrementing the 'counter' property
decrement() {
  rsmPrimitiveStoreService.setStatePropertyByKey('counter', this.counterCurrentValue() - 1);
}

// Access the state
const rsmPrimitiveState: Signal<RsmPrimitiveState> = rsmPrimitiveStoreService.state;

```
By following these steps, you can effectively manage and interact with the state using this service.

### Create Actions and trigger Effects

If you wish to create an action that can trigger an effect, which makes an API call, and then updates the state based on the result or error of that API call, you can follow these steps:

```typescript
import { Action } from 'projects/rsm-signal-state-management/src/lib/generic-classes/rsm-actions-generic';

//Create an enum for having unique action names
export enum RsmPrimitiveEnum {
  DelayedIncrement = '[Counter] DelayedIncrement',
  DelayedDecrement = '[Counter] DelayedDecrement'
}
// Create classes which implements Action interface from action generic class
export class DelayedIncrement implements Action {
  readonly type = RsmPrimitiveEnum.DelayedIncrement;
  constructor(public payload: { value: number }) {}
}

export class DelayedDecrement implements Action {
  readonly type = RsmPrimitiveEnum.DelayedDecrement;
  constructor(public payload: { value: number }) {}
}
// Create an action type which includes all the action class types
export type RsmPrimitiveActionTypes = DelayedIncrement | DelayedDecrement;

```

### Create an Action service 

This service extends the action generic class from the library and gets an Action Types model as the state model.

```typescript
import { Injectable } from "@angular/core";
import { PublicActionsRsmGeneric } from "projects/rsm-signal-state-management/src/lib/generic-classes";
import { RsmPrimitiveActionTypes } from "../actions/rsm-primitive-action.service";

@Injectable({
  providedIn: 'root'
})
export class RsmPrimitiveActionsService extends PublicActionsRsmGeneric<RsmPrimitiveActionTypes>{
  constructor() { 
    super();
  }
}
```

### how to dispatch to an action

You just need to inject the action service in your component ts file and then use the dispatchNewAction() method and create a new instance of the action class you want and for the new class payload pass an object with any property you wish to have in the payload.

```typescript
import { RsmActionsService } from 'src/app/store/services/rsm-action.service';

rsmActionsService = inject(RsmActionsService);

delayedDecrement() {
    this.rsmActionsService.dispatchNewAction(new DelayedDecrement({value: this.counterCurrentValue() - 1}))
  }

resetCounter() {
  this.rsmPrimitiveStoreService.setStatePropertyByKey('counter', 0);
}
```

### How to listen to the dispatched action and update the states after API call

Create an effect service and inject the action service you want to listen to and the state service you wish to update after the API call.
In the effect service constructor you need to listen to the actions state change which gives you an Angular signal, you create a function and pass the action to it and use angular signal effect function to detect the action changes. you can have a switch-case to separate the actions and for each action you can call an API or do something async, in the result of the async operation you can update the state you want.

```typescript
import { Injectable, effect,inject, Signal } from '@angular/core';
import { RsmPrimitiveStoreService } from '../services/rsm-primitive-store.service';
import { RsmPrimitiveActionTypes, RsmPrimitiveEnum } from '../actions/rsm-actions';
import { RsmActionsService } from '../services/rsm-action.service';

@Injectable({
  providedIn: 'root'
})
export class RsmPrimitiveEffectsService{
  rsmPrimitiveStoreService = inject(RsmPrimitiveStoreService);
  rsmActionsService = inject(RsmActionsService);

  constructor() {
    const action = this.rsmActionsService.actionListener();
    this.createEffects(action);
  }

  private createEffects(action: Signal<RsmPrimitiveActionTypes>){
    effect(() => {
      switch(action().type) {
        case RsmPrimitiveEnum.DelayedIncrement: {
          setTimeout(() => {
            this.rsmPrimitiveStoreService.setStatePropertyByKey('counter', action().payload.value);
          }, 2000);
          break;
        }
        case RsmPrimitiveEnum.DelayedDecrement: {
          setTimeout(() => {
            this.rsmPrimitiveStoreService.setStatePropertyByKey('counter', action().payload.value);
          }, 2000);
          break;
        }
      }
    });
  }
}
```
### Other Usages

### Primitive state manager
To create a primitive state manager which only accepts the following types:
boolean, string, number ...

You will gonna need to create a service which is extends from public-rsm-primitive-generic.ts or 
protected-rsm-primitive-generic.ts

The protected one is for the cases which you don't want the service user have access to the state manager directly and you wish to have some middleware functions in the store service to interact with the state manager class.

### Entity state manager
To create an Entity state manager which only accepts the following types:
Array, Object and Primitive states

You will gonna need to create a service which is extends from public-rsm-entity-generic.ts or 
protected-rsm-entity-generic.ts

The protected one is for the cases which you don't want the service user have access to the state manager directly and you wish to have some middleware functions in the store service to interact with the state manager class.

### Queue state manager
To create an Queue state manager which only accepts the following types:
Simple Queue and Priority Queue

You will gonna need to create a service which is extends from public-rsm-queue-generic.ts or 
protected-rsm-queue-generic.ts

To use of priority queue each queue item should have a property with type number to show the item priority.

The protected one is for the cases which you don't want the service user have access to the state manager directly and you wish to have some middleware functions in the store service to interact with the state manager class.

### Stack state manager
To create an Entity state manager which only accepts the following types:
Stack

You will gonna need to create a service which is extends from public-rsm-stack-generic.ts or 
protected-rsm-stack-generic.ts

The protected one is for the cases which you don't want the service user have access to the state manager directly and you wish to have some middleware functions in the store service to interact with the state manager class.

## API Documentation

First of all you should know all the functions, classes and properties in this library is type safe so you can not call them and use them with wrong inputs or outputs.

The simplest class is the primitive generic class 

### Primitive state manager
```typescript
import { signal, computed, Signal, WritableSignal } from '@angular/core';

// Define a type for the store state with keys to track changes.
type StoreStateWithKeys<StatesModel> = {
  // lastUpdatedKeys is an array which keeps last updates state property keys, when user updates a single key or bunch of keys, this array will be updated.
  lastUpdatedKeys: Array<keyof StatesModel> | undefined;
  state: StatesModel;
};

// Create a class for managing a generic state using Angular signals.
export class PublicRsmPrimitiveGenericClass<StatesModel extends object> {
  // Private state to hold the data. This must pe private to prevent user write new value directly into the state properties.
  protected readonly privateState: WritableSignal<StoreStateWithKeys<StatesModel>> = signal({
    lastUpdatedKeys: undefined,
    state: {} as StatesModel,
  });

  // Public signal for external components to access the state.
  readonly store: Signal<StoreStateWithKeys<StatesModel>> = computed(() => {
    return this.privateState();
  });

  // Constructor to initialize the state with initial values.
  constructor(initialValues: StatesModel) {
    this.setAllStateProperties(initialValues); // Set initial state
  }

  // Select a specific property from the state.
  public select<K extends keyof StatesModel>(statePropertyKey: K): Signal<StatesModel[K]> {
    return computed(() => this.privateState().state[statePropertyKey]);
  }

  // Expose a readonly state properties.
  readonly state: Signal<StatesModel> = computed(() => {
    return this.privateState().state;
  });

  // Set a state property in the store. you need to pass the statePropertyKey that shows which state property you wish to update, and the data which is the updating value for that state property
  public setStatePropertyByKey<K extends keyof StatesModel>(statePropertyKey: K, data: StatesModel[K]) {
    const objectType = Object.prototype.toString.call(data);
    this.privateState.update((currentValue) => ({
      ...currentValue,
      lastUpdatedKeys: [statePropertyKey],
      state: { ...currentValue.state, [statePropertyKey]: objectType === '[object Object]'? { ...data }: data  },
    }));
  }

  // Set all properties in the store. 
  public setAllStateProperties(allStates: StatesModel): void {
    const keys = Object.keys(allStates) as Array<keyof StatesModel>;
    this.privateState.update((currentValue) => ({
      ...currentValue,
      lastUpdatedKeys: keys,
      state: { ...allStates },
    }));
  }
}
```
### Entity state manager

The useful functions of Entity state manager and how to use them:

**1-getArraySize(statePropertyKey):**  This function accepts a statePropertyKey as input which must be one of the keys of the state model we sent to the generic class and also the key must represent an array type then, it will returns a number as the array size, other than you will get an error while developing time.

**2- updateExistingObjectPartiallyByPropertyKey(statePropertyKey, data):** This function gets a statePropertyKey to determine which key you want to update and a data which extends partial of the object interface, so you can update some or all of the properties inside your object state. for example you have a user profile object which has:

```typescript
interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}
// you can easily update the user email like this.
this.userStoreService.updateExistingObjectPartiallyByPropertyKey('profile', {email: 'test@gmail.com'});
```
**3- addItemToEndOfArray(statePropertyKey, item):** Using this function you can easily add a new item to the end of a property type array in your state management. like the push method of arrays

```typescript
interface User {
  products: Product[],
  history: History[]
}

this.userStoreService.addItemToEndOfArray('products', product); // product must be an object with Product type

```
**4- addItemToStartOfArray(statePropertyKey, item):** The same but it adds the new item to the start of the array.
like unShift method of arrays.

**5- addItemToArrayAtIndex(statePropertyKey,
index,
item):** This will add a new item to an specific index in array.

**6- addSubArrayToStart(statePropertyKey,
subArray):** This method adds a sub-array with the same type to the start of an existed array.

**7- addSubArrayToEnd(statePropertyKey,
subArray):** This method adds a sub-array to the end of an existed array.

**8- addSubArrayAtIndex(statePropertyKey,
index,
subArray):** This will add a sub-array to a specific index in an exited array.

**9- removeArrayItemFromStartOfArray(statePropertyKey):** This removes an Item from the start of an existed array.

**10- removeArrayItemFromEndOfArray(statePropertyKey):** This removes an Item from the end of an existed array.

**11- removeArrayItemsFromIndex(statePropertyKey, index, deleteCount):** remove some array items from a specific index.

**12- removeArrayItemByPropertyValue(statePropertyKey,
removePropertyKey,
removePropertyValue):** remove an item in an existed array whish has a property key with a certain value.
```typescript
interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}
interface UserState {
  users: UserProfile
}
this.userStoreService.removeArrayItemByPropertyValue('users','username','john');
//or
this.userStoreService.removeArrayItemByPropertyValue('users','age',12);

```

**13- getArrayItemByPropertyValue(statePropertyKey,
compareKey,
compareValue):** Retrieve the item with the certain ke value in an existed array.

### Queue state manager
You can use this class to handle your modal system, notification system and any logic you will need a queue or priority queue in it.

The useful functions of Queue state manager and how to use them:

**1- getQueueSize(statePropertyKey):** This method returns a signal which represents the queue size.

**2- addItemToQueue(statePropertyKey,
item):** This method adds a new item to the end of the queue.

**3- removeItemFromQueue(statePropertyKey):** This method removes an item from the start of the que and returns the removed item.

**4- addItemToPriorityQueueByPriorityKey(statePropertyKey,
priorityKey,
priorityOrder,
item):** This method adds a new item to a priority queue, priorityKey is a key which this method compare the new item's priority with the existed items priority and uses the priorityOrder value to add the new item to the right place in the queue. priorityOrder has two value, first one 'smaller-higher', it means if the value of priorityKey is smaller then in the queue the item should have more priority, the second one is 'bigger-higher', its the opposed of the first one.

```typescript
    this.userStoreService.addItemToPriorityQueueByPriorityKey('userQueue','priority','smaller-higher',{username:'something',priority: 2, ...});
``` 

### Actions state manager

With this class you can easily create a message bus to dispatch messages on a message bus and listen to the bus for a certain message type.

**1- dispatchNewAction(action):** This method receives a new class which has a unique type property to be able to verify the message type and a payload to pass data for each action type.

actions will be defined kind of like how it works in ngrx. 

```typescript
import { Action } from 'projects/rsm-signal-state-management/src/lib/generic-classes/rsm-actions-generic';

export enum UserActionsEnum {
  AddNewUser = '[User] Add',
  RemoveUser = '[User] Remove'
}

export class AddNewUserActionType implements Action {
  readonly type = UserActionsEnum.AddNewUser;
  constructor(public payload: { user: User }) {}
}
export class RemoveUserActionType implements Action {
  readonly type = UserActionsEnum.RemoveUser;
  constructor(public payload: { userId: string }) {}
}
export type UserActionTypes = AddNewUserActionType | RemoveUserActionType;

```
The action service
```typescript
import { Injectable } from "@angular/core";
import { PublicActionsRsmGeneric } from "projects/rsm-signal-state-management/src/lib/generic-classes";
import { UserActionTypes } from "../actions/user-actions";

@Injectable({
  providedIn: 'root'
})
export class UserActionsService extends PublicActionsRsmGeneric<UserActionTypes>{
  constructor() { 
    super();
  }
}
```

How to dispatch
```typescript
userActionsService = inject(UserActionsService);

this.userActionsService.dispatchNewAction(new AddNewUserActionType(user));//user is an object with type User
```

How to listen to an action.
**1- actionListener():** When ever a new action dispatches to the action state the action listener will update the current action withe new action, this method returns a signal with type of the action types and with using Angular signal effects you can listen to it's changes.

```typescript
import { Injectable, effect,inject, Signal } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { UserActionTypes, UserActionsEnum } from '../actions/user-actions';
import { UserActionsService } from '../services/user-action.service';

@Injectable({
  providedIn: 'root'
})
export class UserEffectsService{
  userStoreService = inject(UserStoreService);
  userActionsService = inject(UserActionsService);

  constructor() {
    const action = this.userActionsService.actionListener();
    this.createEffects(action);
  }

  private createEffects(action: Signal<UserActionTypes>){
    effect(() => {
      switch(action().type) {
        case UserActionsEnum.AddNewUser: {
         this.http.post('url',action().payload).subscribe((value:any) =>{
            this.userStoreService.addItemToEndOfArray('users', action().payload);
          })
          break;
        }
        case RsmPrimitiveEnum.RemoveUser: {
          this.http.delete('url',action().payload.userId).subscribe((value:any) =>{
            this.userStoreService.removeArrayItemByPropertyValue('users','id' action().payload.id);
          })
          break;
        }
      }
    });
  }
}
```
This is a new library and I really love to know about the issues and the improvements I can make so please open new issues in the github repository if you find an issue or you needed an improvement.

my personal email is mohammadrezaimn@gmail.com
my linkedIn account is https://www.linkedin.com/in/mohammadreza-imani-08083662/

you can contact me any time and ask your questions.