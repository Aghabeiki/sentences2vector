import {accessSync, existsSync, readFileSync, constants} from 'fs';

export class Word2Vec {
    private modelSize: number;
    private _vSize: number;
    private readonly _vector: Object;
    private readonly isProd: boolean;

    constructor(modelPath: string,isProd:boolean=false) {
        this._vector = {};
        this.load(modelPath)
        this.isProd=isProd;
    }

    private load(modelPath: string) {
        let acc = true;
        try {
            accessSync(modelPath, constants.R_OK)
        } catch (e) {
            acc = false;
        }
        if (!existsSync(modelPath) || !acc) {
            throw new Error("Cannot read model file.");
        }
        const [head, ...data] = readFileSync(modelPath, {encoding: 'utf-8'})
            .split('\n').map(item => item.split(' '));
        if (head.length !== 2) {
            throw new Error('H/Invalid Model file.');
        }
        this.modelSize = parseInt(head[0]);
        this._vSize = parseInt(head[1]);
        // check model size is correct.
        if ((data.length - 1) !== this.modelSize) {
            throw new Error('Invalid model count.');
        }
        if ((data[0].length - 1) !== this._vSize) {
            throw new Error('Invalid model size.');
        }
        // load models
        data.reduce((p, v) => {
            const [key, ...vector] = v;
            p[key] = vector.map(item => parseFloat(item));
            return p;
        }, this._vector);


    }

    getVector(word: string) {
        if (!word) {
            throw new Error('Word is required.');
        }
        return this._vector[word] || null;
    }


    get vSize(): number {
        return this._vSize;
    }

    get vector(): Object {
        return this._vector;
    }
}
