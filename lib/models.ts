export interface ITimeBomb {
  dueDate: Date;
  owner: string;
  functionName: string;
  severity?: Severity;
}

export enum Severity {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}
