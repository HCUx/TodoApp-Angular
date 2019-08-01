export class TodoItem {

  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public deadline: Date,
    public completed: boolean,
    public parentListId: string,
    public linkedItemId: string,
    public linkedItemName: string
  ) { }
}
