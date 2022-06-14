export type Project = {
    _id: string;
    name: string;
    creationDate: Date;
    updatedDate: Date;
    type: string;
    state: string;
    client: number;
    productId: number;
    iteration: number;
    phase: number;
    tasks: number[] | null;
    //resoursed debería de ser un set
    resources: number[] | null;
    risk: Risk | null;
    description: string | null;
}

export type Risk = {
    id: number;
    actionPlan: string;
    title: string;
    occurenceProb: number;
    impact: number;
    value: number;
    description: string | null;
}