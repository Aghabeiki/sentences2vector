"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class Word2Vec {
    constructor(modelPath, isProd = false) {
        this._vector = {};
        this.load(modelPath);
        this.isProd = isProd;
    }
    load(modelPath) {
        let acc = true;
        try {
            fs_1.accessSync(modelPath, fs_1.constants.R_OK);
        }
        catch (e) {
            acc = false;
        }
        if (!fs_1.existsSync(modelPath) || !acc) {
            throw new Error("Cannot read model file.");
        }
        const [head, ...data] = fs_1.readFileSync(modelPath, { encoding: 'utf-8' })
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
    getVector(word) {
        if (!word) {
            throw new Error('Word is required.');
        }
        return this._vector[word] || null;
    }
    get vSize() {
        return this._vSize;
    }
    get vector() {
        return this._vector;
    }
}
exports.Word2Vec = Word2Vec;
//# sourceMappingURL=Word2Vec.js.map