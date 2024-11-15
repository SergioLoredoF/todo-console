const Tarea = require('./tarea');

/**
 * _listado:
 *      { 'uuid-12323-asd13d-123': { id:12, desc: 'uwur', compleatadoEN: 123032 } }
 */
class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        return listado;
    }

    constructor() {
        this._listado = {}
    }

    borraTarea( id = '' ) {
        if(this._listado[id]) {
            console.log("Tarea eliminada:".red, this._listado[id].desc);
            delete this._listado[id];
        }
    }

    cargarTareasArray( tareasArry = [] ) {
        tareasArry.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }

    completarTareas( tareasArr = [] ) {
        const fecha = new Date().toISOString().substring(0, 10);
        Object.keys( this._listado ).forEach( key => {
            if( tareasArr.includes(key) ) {
                if ( !this._listado[key].compleatdoEn ) this._listado[key].compleatdoEn = fecha;
            } else {
                this._listado[key].compleatdoEn = null;
            }
        });
    }

    listadoCompletoForm() {
        console.log();
        this.listadoArr.forEach((tarea, index) => {
            console.log(`${(index + 1).toString().green}. ${tarea.desc} :: ${ tarea.compleatdoEn ? 'Compleatada'.green : 'Pendiente'.red}`)
        });

        this.listadoArr.length === 0 && console.log("No hay tareas".yellow);
    }

    listarTareasCompletadas( completadas = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {
            if ( completadas ) {
                tarea.compleatdoEn && contador++;
                tarea.compleatdoEn && console.log(`${contador.toString().green}. ${tarea.desc} :: ${ 'Compleatada'.green } on ${tarea.compleatdoEn.green}`);
            } else {
                !tarea.compleatdoEn && contador++;
                !tarea.compleatdoEn && console.log(`${contador.toString().green}. ${tarea.desc} :: ${ 'Pendiente'.red }`);
            }
            
        });

        (!this.listadoArr.some(tarea => tarea.compleatdoEn) && completadas) && console.log("No hay tareas completadas".yellow);
        (!this.listadoArr.some(tarea => !tarea.compleatdoEn) && !completadas) && console.log("No hay tareas sin completar".yellow);
    }

}

module.exports = Tareas;