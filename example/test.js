const {Word2Vec} = require('../build/Word2Vec')
const path = require('path')

const w2v = new Word2Vec();

w2v.load(path.resolve(__dirname, 'text.model'));
console.dir(w2v.getVectors('deluxe'));
