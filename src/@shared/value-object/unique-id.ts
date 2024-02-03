import { randomUUID } from 'crypto';
import { Id } from './id';

export class UniqueId implements Id {
  readonly value: string;

  constructor(value?: string) {
    this.value = value || randomUUID();
  }
}
