type IncrementedId = number | null;

export class Product {
  private _incrementedId: IncrementedId;
  private _name: string;

  constructor(name: string) {
    this._incrementedId = null;
    this._name = name;
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
