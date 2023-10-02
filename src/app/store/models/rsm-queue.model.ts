export interface SimpleQueueModel {
  id: number;
  name: string;
}

export interface PriorityQueueModel {
  id: number;
  name: string;
  priority: number;
}

export interface RsmQueueState {
  simpleQueue: SimpleQueueModel[],
  priorityQueue: PriorityQueueModel[]
}

export const initialRsmQueueState : RsmQueueState = {
  simpleQueue: [],
  priorityQueue: []
}