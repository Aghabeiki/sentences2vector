export declare class Sentences2vector {
    private model;
    private tokenizer;
    private readonly preFilter;
    private readonly vectorSize;
    private readonly isProd;
    constructor(model_file: string, sentencesFilter?: Function);
    private zip;
    private load;
    get_vector(sentence: string): Array<Array<any>>;
    similarity(x: string, y: string): number;
}
