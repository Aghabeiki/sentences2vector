export declare class Word2Vec {
    private modelSize;
    private _vSize;
    private readonly _vector;
    private readonly isProd;
    constructor(modelPath: string, isProd?: boolean);
    private load;
    getVector(word: string): any;
    readonly vSize: number;
    readonly vector: Object;
}
