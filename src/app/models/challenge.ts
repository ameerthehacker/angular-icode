export class Challenge {
    
    title: string;
    problemStatement: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    sampleInput: string;
    sampleOutput: string;
    explanation: string;
    slug: string;
    userId: string;
    testCases: Array<Object>;
    boilerplates: Array<Object>;

    constructor() {}
}