"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math = require("mathjs");
const natural = require("natural");
const Word2Vec_1 = require("./Word2Vec");
class Sentences2vector {
    constructor(model_file, sentencesFilter = sentence => sentence) {
        this.tokenizer = new natural.WordTokenizer();
        this.preFilter = sentencesFilter;
        this.load(model_file);
        this.vectorSize = this.model.vSize;
    }
    zip(...args) {
        const [arr, ...arrs] = args;
        return arr.map((v, i) => arrs.reduce((a, arr) => [...a, arr[i]], [v]));
    }
    load(model_file) {
        this.model = new Word2Vec_1.Word2Vec(model_file);
    }
    get_vector(sentence) {
        const filteredSentence = this.preFilter(sentence);
        const sentencesVectors = this.tokenizer
            .tokenize(filteredSentence).map(token => this.model.getVector(token));
        if (sentencesVectors && Array.isArray(sentencesVectors) && sentencesVectors.length)
            return this.zip(...sentencesVectors).map(item => item.reduce((p, v) => {
                p += v;
                return p;
            }, 0) / this.vectorSize);
        else
            return new Array(this.vectorSize).fill(0);
    }
    similarity(x, y) {
        const xVec = this.get_vector(x);
        const yVec = this.get_vector(y);
        let score = 0;
        if (xVec.length && yVec.length) {
            const a = math.dot(xVec, yVec);
            const b = math.norm(xVec);
            const c = math.norm(yVec);
            const d = b * c;
            score = a / d;
        }
        return score;
    }
}
exports.Sentences2vector = Sentences2vector;
//# sourceMappingURL=Sentences2vector.js.map