export class Contest {

    public title: string;
    public description: string;
    public registrationStartDate: Date;
    public registrationEndDate: Date;
    public contestStartDate: Date;
    public duration: Number;
    public slug: string;
    public userId: string;
    public groupId: string;
    public challenges: string[];
    public isOpen: boolean;
    public userRegistered: boolean;
    public isRunning: boolean;

    constructor() {}
}