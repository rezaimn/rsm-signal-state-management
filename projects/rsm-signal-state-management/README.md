# RSM Signal State Management: A Powerful Alternative to NgRx


[![npm version](https://img.shields.io/npm/v/your-library-name.svg)](https://www.npmjs.com/package/rsm-signal-state-management)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Table of Contents
- [Installation](#installation)
- [Introduction](#introduction)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Conclusion](#conclusion)

## Installation
```shell
npm install rsm-signal-state-management
```

If you've ever worked with state management in Angular applications, you're likely familiar with NgRx. NgRx is a popular and robust library for managing state in Angular applications using Redux-inspired principles. However, what if I told you there's a simpler and more powerful alternative? Meet RSM Signal State Management.

## Introduction
RSM Signal State Management is a state management library that leverages Angular signals to provide a straightforward and efficient way to manage the state of your application. It offers an elegant and flexible solution that simplifies complex state management scenarios. You won't need to create Actions and Reducers for each state you want to update. Also you don't need to create Selectors to have access to the states values.

RSM is a state management library built specifically for Angular. It offers a set of classes and functions designed to handle various aspects of state management with ease.

Here's an overview of the Generic classes of RSM Signal State Management:

**1- PublicRsmPrimitiveGenericClass:** Provides a generic class for managing primitive state types such as booleans, strings, and numbers.

**2- PublicRsmEntityGenericClass:** Handles complex state types like arrays and objects also the simple Primitives.

**3- PublicRsmQueueGenericClass:** Designed for creating queue systems, which are useful for handling modal systems, notifications, and more.

**4- PublicRsmStackGenericClass:** Allows you to manage state as a stack, enabling you to handle stack operations efficiently.

**5- PublicRsmActionsGeneric:** Provides a mechanism to create a message bus for dispatching and listening to actions within your application.

Consider a typical Angular application with multiple entities, each having its own set of states. For instance, you might have a user entity with states like profile, balance, and personal settings, as well as a product entity with states like info and availability.

### So, how it actually works under the hood

At the heart of this system lies a generic class, a powerhouse for managing application state. It serves as the backbone for handling, updating, and sharing data across your application. Here it is the most simple generic class:

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
  private readonly privateState: WritableSignal<StoreStateWithKeys<StatesModel>> = signal({
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

The journey begins by defining a state model. This model acts as a blueprint for the data you intend to manage within your application. It's essential to have a clear understanding of your data structure from the outset.

#### StoreStateWithKeys<StatesModel>:
**lastUpdatedKeys:** An array that keeps track of the keys (or properties) within the state that have seen recent updates.

**state:** An object representing the actual application state.

#### Safeguarding State Data
Data integrity is a priority, and to protect against direct manipulation, we establish a private state object named **privateState**. This object, of type **WritableSignal<StoreStateWithKeys<StatesModel>>**, acts as a secure container housing both the state data and the lastUpdatedKeys array.

Initially, the state is set as an empty object ({}), with lastUpdatedKeys left undefined. External access to this private state is tightly controlled, allowing read and modification only through designated functions.

#### Public Access via Signals
To provide external components and services access to the state, we introduce a public signal known as **store**. This signal offers a read-only perspective of the state residing within **privateState**. It ensures that external parts of the application can observe the state while preventing direct alterations.

#### Initialization via Constructor
Upon creating a service instance, you pass in initial values for your state. The constructor, in turn, triggers **setAllStateProperties(initialValues)** to initialize the state with the provided data.

#### Selecting Specific State Properties

Accessing individual state properties is made possible through the select function. It returns a signal representing a specific property of the state, enabling you to track changes in specific data within the state.

#### Modifying State

To enact changes in the state, you rely on the **setStatePropertyByKey** function. This function takes a key (property name) and the new data value to assign to that key. It's designed to handle various data types, ensuring the state remains consistent.
Furthermore, the **setAllStateProperties** function allows for simultaneous updates of multiple properties, accepting an object containing all the new values.

#### A Unified Store
Beneath the surface, a single **privateState** object is responsible for housing the entire state management. Regardless of whether you're updating one or multiple properties, all changes are funneled through this central store. This approach ensures that modifications are coordinated and maintain consistency across the application.
### Create Model and Initialization
RSM Signal State Management offers a solution that's both simple and powerful. You can structure your states in a way that suits your application's needs. For example, you can have separate state management for user and product entities or create a main state to consolidate them all in one place. Let's take a closer look.
```typescript
export interface UserState {
  profile: UserProfile | undefined;
  balance: UserBalance |undefined;
  personalSettings: UserPersonalSettings | undefined;
}

export interface ProductState {
  info: ProductInfo | undefined;
  availability: ProductAvailability | undefined;
}

export const initialUserState: UserState {
  profile: undefined,
  balance: undefined,
  personalSettings: undefined
}

export const initialProductState: ProductState {
  info: undefined,
  availability: undefined,
}

/*You can also, create a main state like this:*/

export interface MainState {
  user: UserState | undefined;
  product: ProductState | undefined;
}

export const initialMainState: MainState {
  user: undefined,
  product: undefined,
}
```

### Create a store service to use the Generic Classes
You also gonna need a service which extends one of the above generic classes from the library regarding what kind of state you want to create.
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

### Use of the Store Service to update the states
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
Now, let's explore how to use RSM Signal State Management in your Angular application through various examples.

### 1. Primitive State Manager

First, create your state model and initialize it, then, create a service that extends the **PublicRsmPrimitiveGenericClass** to manage primitive state types. This class offers methods for setting, getting, and observing state changes.

```typescript
export interface UserDetailsState {
  username: string;
  userIsLoggedIn: boolean;
  userAge: number;
}

export const initialUserDetailsState: UserDetailsState = {
  username: '',
  userIsLoggedIn: true,
  userAge: 0
};
import { Injectable } from '@angular/core';
import { PublicRsmPrimitiveGenericClass } from 'rsm-signal-state-management/src/lib/generic-classes/public-rsm-primitive-generic';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsStoreService extends PublicRsmPrimitiveGenericClass<UserDetailsState> {
  constructor() { 
    super(initialUserDetailsState);
  }
}
```

Now use the service to update the states:

```typescript
// Import the service
const userDetailsStoreService = inject(UserDetailsStoreService);

// Example of set the 'username' property
updateUsername() {
  userDetailsStoreService.setStatePropertyByKey('username', 'Test Username');
}

// Example of set the 'userIsLoggedIn' property
updateLoginState() {
  userDetailsStoreService.setStatePropertyByKey('userIsLoggedIn', true);
}

// Access the state
const userDetailState: Signal<UserDetailsState> = userDetailsStoreService.state;
```

### 2. Entity State Manager

To manage more complex state types, such as arrays and objects, create a service that extends **PublicRsmEntityGenericClass**. Here's an example of managing an array of users:
```typescript
export interface UsersState {
  users: User[];
  userProfile: UserProfile | undefined;
}

export const initialUsersState: UsersState = {
  users: [],
  userProfile: undefined
}
```
```typescript
import { Injectable } from '@angular/core';
import { PublicRsmEntityGenericClass } from 'rsm-signal-state-management';

@Injectable({
  providedIn: 'root'
})
export class UsersStoreService extends PublicRsmEntityGenericClass<UsersState> {
  constructor() {
    super(initialUsersState); // Initialize
  }
}
```
```typescript
usersStoreService = inject(UsersStoreService);

addNewUser(user: User) {
  this.usersStoreService.addItemToEndOfArray('users', user);
}

updateUserProfile(userProfile: UserProfile) {
  this.usersStoreService.updateExistingObjectPartiallyByPropertyKey('userProfile', userProfile);
  // or
  this.usersStoreService.setStatePropertyByKey('userProfile', userProfile);
}

removeUserById(userId: string) {
  this.usersStoreService.removeArrayItemByPropertyValue('users', 'id', userId);
}
```

### 3. Queue State Manager

Creating a queue system for managing modal dialogs or notifications becomes straightforward with RSM Signal State Management. Here's an example of managing a notification queue:
```typescript
export interface NotificationsState {
  notifs: Notification[];
  currentNotif: Notification | undefined;
}

export const initialNotificationsState: NotificationsState = {
   notifs: [],
   currentNotif: undefined
}
```
```typescript
import { Injectable } from '@angular/core';
import { PublicRsmQueueGenericClass } from 'rsm-signal-state-management';

@Injectable({
  providedIn: 'root'
})
export class NotificationStoreService extends PublicRsmQueueGenericClass<NotificationsState> {
  constructor() {
    super(initialNotificationsState);
  }
}
```
```typescript
notifsStoreService = inject(NotificationsStoreService);
currentNotification: Signal<Notification | undefined> = this.notifsStoreService.select('currentNotif');
notificationsQueue: Signal<Notification[]> = this.notifsStoreService.select('notifs');

addNewNotification(notif: Notification) {
// If currently showing a notif, then add the new notif to the queue
  if (this.currentNotification()) {
    this.notifsStoreService.addItemToQueue('notifs', notif);
  } else {
// If there are no notifs displaying then add the new notif to the current notif
    this.notifsStoreService.setStatePropertyByKey('currentNotif', notif);
  }
}

// Fetch a notif from notif queue and show it
showNewNotifFromQueue() {
  if (this.notificationsQueue.length !==0) {
    const pickedNotif: Signal<Notification | null> = this.notifsStoreService.removeItemFromQueue('notifs');
    this.notifsStoreService.setStatePropertyByKey('currentNotif', pickedNotif);
  }
}
```

### 4. Stack State Manager

Managing state as a stack is useful for scenarios like navigation history. Here's an example of managing a Breadcrumbs stack:
```typescript
export interface BreadcrumbsStackState {
  breadcrumbs: Breadcrumb[];
}

export const initialBreadcrumbsStackState = {
  breadcrumbs: []
}
```
```typescript
import { Injectable } from '@angular/core';
import { PublicRsmStackGenericClass } from 'rsm-signal-state-management';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsStoreService extends PublicRsmStackGenericClass<BreadcrumbsStackState> {
  constructor() {
    super(initialBreadcrumbsStackState);
  }
}
```
```typescript
breadcrumbsStoreService = inject(BreadcrumbsStoreService);

addNewRouteToBreadcrumbs(breadcrumb: Breadcrumb) {
  this.breadcrumbsStoreService.pushItemToStack('breadcrumbs', breadcrumb);
}

goOneStepBackInBreadcrumbs() {
  const currentRouteData: Signal<Breadcrumb> = this.breadcrumbsStoreService.popFromStack('breadcrumbs');
}
```

You can push, pop, and observe items in the navigation stack with ease.

### 5. Actions State Manager

Finally, the Actions State Manager allows you to create a message bus for dispatching and listening to actions within your application. Define your action types and use them to dispatch and listen for actions.
```typescript
import { Action } from 'rsm-signal-state-management';

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
```typescript
export interface UsersState {
  users: User[];
}

export const initialUsersState: UsersState = {
  users: []
};
```
```typescript
import { Injectable } from '@angular/core';
import { PublicActionsRsmGeneric } from 'rsm-signal-state-management';

@Injectable({
  providedIn: 'root'
})
export class UserActionsService extends PublicActionsRsmGeneric<UserActionTypes> {
  constructor() {
    super();
  }
}
```
```typescript
import { Injectable } from "@angular/core";
import { PublicRsmEntityGeneric } from "rsm-signal-state-management";

@Injectable({
  providedIn: 'root'
})
export class UsersStoreService extends PublicRsmActionsGeneric<UsersState>{
  constructor() { 
    super(initialUsersState);
  }
}
```
```typescript
userActionsService = inject(UserActionsService);

this.userActionsService.dispatchNewAction(new AddNewUserActionType(user));//user is an object with type User
```
```typescript
import { Injectable, effect,inject, Signal } from '@angular/core';

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
         this.http.post('url',action().payload).subscribe((user: User) =>{
            this.userStoreService.addItemToEndOfArray('users', user);
          })
          break;
        }
        case RsmPrimitiveEnum.RemoveUser: {
          this.http.delete('url',action().payload.userId).subscribe((user: User) =>{
            this.userStoreService.removeArrayItemByPropertyValue('users','id', user.id);
          })
          break;
        }
      }
    });
  }
}
```
You need to add the effect services into the app module's imports like below
```typescript
RsmEffectsModule.forRoot(UserEffectsService)
```
Or add it to the provider of standalone app like this:

```typescript
importProvidersFrom(RSMEffectsModule.forRoot(UserEffectsService))
```
## API Documentation

### 1. Primitive State Manager
- **setStatePropertyByKey(statePropertyKey, data):** Sets a state property in the store. you need to pass the **statePropertyKey** that shows which state property you wish to update, and the **data** which is the new value for that state property.

- **setAllStateProperties(allStates):** Sets all the states at once and mainly uses for the initializing the states.

- **select(statePropertyKey):** Returns a specific property from the state as a Signal. Using **statePropertyKey** to specify which property you need to be selected.

- **store:** This property gives you the whole states value as a Signal.

### 2. Entity State Manager

- **getArraySize(statePropertyKey):** This function takes a **statePropertyKey** as its input, which should be one of the keys from the state model provided to the generic class. Additionally, the specified key must correspond to an array type property. If this condition is not met, you will encounter a development-time error.

- **updateExistingObjectPartiallyByPropertyKey(statePropertyKey, data):** This function takes a **statePropertyKey** to identify the specific key you wish to update within your state. Additionally, it expects a **data** parameter that extends a partial of the object interface. This allows you to update either some or all of the properties within your object state. For instance, suppose you have a user profile object like this:
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

- **addItemToEndOfArray(statePropertyKey, item):** With this function, you can effortlessly append a new item to the end of an array property within your state management, similar to how the push method works for arrays.
```typescript
interface User {
  products: Product[],
  history: History[]
}

this.userStoreService.addItemToEndOfArray('products', product); // product must be an object with Product type
```

- **addItemToStartOfArray(statePropertyKey, item):** Similarly, this function adds a new item to the beginning of the array, akin to the unshift method for arrays.

- **addItemToArrayAtIndex(statePropertyKey, index, item):** his function allows you to add a new item to a specific index within an array.

- **addSubArrayToStart(statePropertyKey, subArray):** This method appends a sub-array of the same type to the beginning of an existing array.

- **addSubArrayToEnd(statePropertyKey, subArray):** This method appends a sub-array to the end of an existing array.

- **addSubArrayAtIndex(statePropertyKey, index, subArray):** This method inserts a sub-array at a specific index within an existing array.

- **updateItemOfArrayAtIndex(statePropertyKey, index, item):** This method updates an item at a specific index within an existing array.

- **updateArrayItemByPropertyValue(statePropertyKey, updatePropertyKey, updatePropertyValue, updateItem):** This method updates an item from an existing array that has a property key with a certain value.
```typescript
interface UserProfile {
  username: string;
  firstName: string;
}
interface UserState {
  users: UserProfile
}

const updateUser: UserProfile = {
  username: 'test',
  firstName: 'test name'
}
this.userStoreService.updateArrayItemByPropertyValue('users','username','john', updateUser);
```
- **removeArrayItemFromStartOfArray(statePropertyKey):** This method removes an item from the beginning of an existing array.

- **removeArrayItemFromEndOfArray(statePropertyKey):** This method removes an item from the end of an existing array.

- **removeArrayItemsFromIndex(statePropertyKey, index, deleteCount):** This method removes some array items from a specific index.

- **removeArrayItemByPropertyValue(statePropertyKey, removePropertyKey, removePropertyValue):** This method removes an item from an existing array that has a property key with a certain value.
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
- **getArrayItemByPropertyValue(statePropertyKey, compareKey, compareValue):** Retrieve the item with a certain key value in an existing array.

### 3. Queue State Manager

You can utilize this class to manage various tasks such as handling modal systems, notification systems, and any logic that requires a queue or priority queue. Here are the useful functions of the Queue state manager and how to use them:

- **getQueueSize(statePropertyKey):** This method returns a signal representing the current size of the queue.

- **addItemToQueue(statePropertyKey, item):** Use this method to add a new item to the end of the queue.

- **removeItemFromQueue(statePropertyKey):** This method removes an item from the start of the queue and returns the removed item.

- **addItemToPriorityQueueByPriorityKey(statePropertyKey, priorityKey, priorityOrder, item):** You can employ this method to add a new item to a priority queue. The **priorityKey** is a property key used to compare the priority of the new item with the priorities of existing items in the queue. The **priorityOrder** parameter specifies the order of priority, which can have two values: **'smaller-higher'** (indicating that smaller values of priorityKey have higher priority) or **'bigger-higher'** (indicating the opposite). This method ensures that the new item is added to the appropriate position in the priority queue based on its priority.
```typescript
 this.userStoreService.addItemToPriorityQueueByPriorityKey('userQueue','priority','smaller-higher',{username:'something',priority: 2, ...});
```

### 4. Stack State Manager

You can manage stacks with this state manager, it has two simple functions to use:

- **pushItemToStack(statePropertyKey, item):** This function gets a **statePropertyKey** to specify which stack you want to use and the **item** to push into the stack.

- **popFromStack(statePropertyKey):** This function gets a **statePropertyKey** to specify which stack you want to use, and it returns the **top** item on the stack as a signal.


### 5. Action State Manager

This class enables you to create a message bus for dispatching messages and listening to specific message types. Here's how to use it:

- **dispatchNewAction(action):** Use this method to dispatch a new message. It takes a class that should have a unique type property to identify the message type and an optional payload to pass data for each action type.

- **actionListener():** Whenever a new action is dispatched to the action state, the actionListener method will update the current action with the new action. This method returns a signal with the type of the action types defined in your application. You can then use Angular signal effects to listen to changes in this signal and react accordingly when new actions are dispatched.


## Conclusion
State management is a fundamental aspect of building robust Angular applications. The RSM Signal State Management library simplifies this process by offering a set of generic classes and functions tailored to various state management scenarios.

By using RSM Signal State Management, you can streamline your state management code, make your application more maintainable, and ensure that your components always reflect the correct application state. Whether you need to manage primitive states, entities, queues, stacks, or actions, RSM Signal State Management has you covered.

Give this library a try in your next Angular project and experience the benefits of efficient state management firsthand. For more information and detailed usage instructions, you can check out the official GitHub repository https://github.com/rezaimn/rsm-signal-state-management.

npm package link https://www.npmjs.com/package/rsm-signal-state-management

my personal email is mohammadrezaimn@gmail.com

my linkedIn account https://www.linkedin.com/in/mohammadreza-imani-08083662/

Happy coding!