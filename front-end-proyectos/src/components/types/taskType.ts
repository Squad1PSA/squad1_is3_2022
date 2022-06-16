export type Task = {
    _id: string;
    code: number;
    name: string;
    priority: number;
    //resoursed debería de ser un set
    efford: number;
    resource: number;
    description: string | null;
}