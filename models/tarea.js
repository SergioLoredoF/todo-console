const crypto = require('crypto');
//const newUUID = crypto.randomUUID()

class Tarea {
    id = '';
    desc = '';
    compleatdoEn = null;

    constructor( desc ) {
        this.id = crypto.randomUUID();
        this.desc = desc;
    }
}

module.exports = Tarea;