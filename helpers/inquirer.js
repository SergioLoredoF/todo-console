const inquirer = require('inquirer').default;
require('colors');

const menoOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1'.green }. Crear una tarea`
            },
            {
                value: '2',
                name: `${ '2'.green }. Listar tareas`
            },
            {
                value: '3',
                name: `${ '3'.green }. Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4'.green }. Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5'.green }. Completar tarea`
            },
            {
                value: '6',
                name: `${ '6'.green }. Borrar una tarea(s)`
            },
            {
                value: '0',
                name: `${ '0'.green }. Salir`
            },
        ]
    }
]

const pausaOpt = [
    {
        type: 'input',
        name: 'opcion',
        message: `Presione ${ 'ENTER'.green } para continuar`,
    }
]

const inquirerMenu = async() => {

    console.clear();
    console.log("=================================".green);
    console.log("      Seleccione una opción".white);
    console.log("=================================\n".green);

    const { opcion } = await inquirer.prompt(menoOpts);
    return opcion;
}

const inquirerPausa = async() => {
    console.log('\n');
    const { opcion } = await inquirer.prompt(pausaOpt);
    return opcion
}

const leerInput = async( message ) => {
    const question = [{
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0) return 'Por favor ingrese un valor';
                return true
            }
        }];
    
    const { desc } = await inquirer.prompt(question);

    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) => {
    const choices = tareas.map( ( tarea, i ) => ({
        value: tarea.id,
        name: `${(i + 1).toString().red}. ${tarea.desc.yellow}`
    }));

    choices.unshift({
        value: 0,
        name: '0'.green + '. Cancelar'
    })

    const listadoEliminar = [
        {
            type: 'list',
            name: 'id',
            message: 'BORRAR',
            choices
        }
    ];

    const { id } = await inquirer.prompt(listadoEliminar);

    return id;
}

const confirmar = async( message ) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const listadoTareasCheckList = async( tareas = [] ) => {
    const choices = tareas.map( ( tarea, i ) => ({
        value: tarea.id,
        name: `${(i + 1).toString().red}. ${tarea.desc.yellow}`,
        checked: tarea.compleatdoEn ? true : false
    }));

    const listadoCheck = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(listadoCheck);

    return ids;

}

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasCheckList
}