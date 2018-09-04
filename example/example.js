const {Sentences2vector} = require('../index');
const {resolve} = require('path');
const sentences2vector = new Sentences2vector(resolve(__dirname, 'text.model'), s => {
    return s.replace(/\W/g, ' ')
        .toLowerCase()
        .replace(/room/g, ' ')
        .replace(/bed/g, ' ')
        .replace(/bedroom/g, ' ')
        .replace(/view/g, 'view')
        .replace(/de luxe/g, 'deluxe')
        .replace(/apt/g, 'apartment')

},200);


const res = sentences2vector.similarity('Deluxe Room, 1 King Bed (Plus)', 'King Deluxe Plus Room');
console.log(res);
