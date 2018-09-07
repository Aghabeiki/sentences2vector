import * as math from 'mathjs';
import * as natural from 'natural';
import * as sw from 'stopword';
import {Word2Vec} from './Word2Vec';


export class Sentences2vector {
    private model: Word2Vec;
    private tokenizer: natural.WordTokenizer;
    private readonly preFilter: Function;
    private readonly vectorSize: number;
    private readonly isProd: boolean = false;

    constructor(model_file: string, sentencesFilter: Function = sentence => sentence) {
        this.tokenizer = new natural.WordTokenizer();
        this.preFilter = sentencesFilter;
        this.load(model_file);
        this.vectorSize = this.model.vSize;
        switch (process.env.NODE_ENV) {
            case 'PROD':
            case 'prod':
            case 'production':
            case 'PRODUCTION':
                this.isProd = true;
                break;
            default:
                this.isProd = false;
                break
        }
    }

    private zip(...args) {
        const [arr, ...arrs] = args;
        return arr.map((v, i) => arrs.reduce((a, arr) => [...a, arr[i]], [v]));
    }

    private load(model_file: string) {
        this.model = new Word2Vec(model_file, this.isProd);
    }

    public get_vector(sentence: string): Array<Array<any>> {
        const filteredSentence: string = this.preFilter(sentence);
        const sentencesVectors: Array<Array<number>> = sw.removeStopwords(this.tokenizer
            .tokenize(filteredSentence)).map(token => this.model.getVector(token)).filter(item => this.isProd ? item : true);
        if (sentencesVectors && Array.isArray(sentencesVectors) && sentencesVectors.length)
            return this.zip(...sentencesVectors).map(item => item.reduce((p, v) => {
                p += v;
                return p;
            }, 0) / this.vectorSize);
        else
            return new Array(this.vectorSize).fill(0)
    }

    public similarity(x: string, y: string): number {
        const xVec = this.get_vector(x);
        const yVec = this.get_vector(y);
        let score = 0;
        if (xVec.length && yVec.length) {
            const a: number = math.dot(xVec, yVec);
            const b: number = math.norm(xVec) as number;
            const c: number = math.norm(yVec) as number;
            const d: number = b * c;
            score = a / d;
        }
        return score;
    }
}



