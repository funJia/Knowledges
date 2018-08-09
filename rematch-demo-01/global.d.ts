declare global {
  class Tracker {
    constructor(host: string, project: string, logstore: string);
    push(key: any, value: any): void;
    logger(): void;
  }
}

export {};
