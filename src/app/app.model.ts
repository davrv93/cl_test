
export class AppModel {
  constructor() {
  }

  public get(field: string) {
    return (this.hasOwnProperty(field)) ? this[field] : null;
  }

  public set(obj: Object) {

    Object.assign(this, obj);
    return this;
  }
}
