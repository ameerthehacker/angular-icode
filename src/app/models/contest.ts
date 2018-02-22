export class Contest {
  public _id: string;
  public title: string;
  public description: string;
  public registrationStartDate: Date;
  public registrationEndDate: Date;
  public contestStartDate: Date;
  public duration: number;
  public slug: string;
  public userId: string;
  public groupId: string;
  public challenges: string[];
  public isOpen: boolean;
  public userRegistered: boolean;
  public isRunning: boolean;

  constructor() {}
}
