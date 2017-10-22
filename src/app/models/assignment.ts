export class Assignment {

    public title: string;
    public description: string;
    public submissionStartDate: Date;
    public submissionEndDate: Date;
    public slug: string;
    public userId: string;
    public groupId: string;
    public challenges: string[];
    public isRunning: boolean;

    constructor() { }
}