import { Id } from '../../@shared/value-object/id';

type IncrementedId = number | null;

export class Product {
  private _id: Id;
  private _incrementedId: IncrementedId;
  private _name: string;

  constructor(id: Id, name: string) {
    this._id = id;
    this._incrementedId = null;
    this._name = name;
  }

  get id(): Id {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get incrementedId(): IncrementedId {
    return this._incrementedId;
  }

  updateIncrementedId(id: number): void {
    this._incrementedId = id;
  }
}
