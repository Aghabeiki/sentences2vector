export declare class Word2Vec {
    private modelSize;
    private _vSize;
    private readonly _vector;
    constructor(modelPath: string);
    private load;
    getVector(word: string): any;
    readonly vSize: number;
    readonly vector: Object;
}
