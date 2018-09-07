const {Sentences2vector} = require('../index');
const {resolve} = require('path');
const sentences2vector = new Sentences2vector(resolve(__dirname, 'text.model'), s => {
    return s.replace(/\W/g, ' ')
        .toLowerCase()
        .replace(/room/g, ' ')
        .replace(/bed/g, ' ')
        .replace(/bedroom/g, ' ')
        .replace(/de luxe/g, 'deluxe')
        .replace(/apt/g, 'apartment')
        .replace(/breakfast/g, " ")
        .replace(/included/g, " ")
        .replace(/late/g, " ")
        .replace(/access/g, " ")
        .replace(/hours/g, " ")
        // .replace(/the/g, " ")
        .replace(/with/g, " ")
        .replace(/pax/g, " ")
        .replace(/for/g, " ")
        .replace(/beds/g, " ")
        .replace(/bedrooms/g, " ")
        .replace(/only/g, " ")
        .replace(/view/g, " ")
        .replace(/non/g, " ")
        .replace(/refundable/g, " ")
        .replace(/smoking/g,' ')

},200);

const res = sentences2vector.similarity('Twin Room - Tower', 'Club Room, 2 Twin Beds, City View, Executive Leve');
console.log(res);
