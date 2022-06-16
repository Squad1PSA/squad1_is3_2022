export type Task = {
    _id: string;
    code: Number;
    name: string;
    priority: number;
    //resoursed debería de ser un set
    effort: number;
    resource: number;
    description: string | null;
}