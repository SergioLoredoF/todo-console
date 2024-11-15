require('colors');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB,  } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    inquirerPausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasCheckList
} 
= require('./helpers/inquirer');

console.clear();

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if( tareasDB ) {
        tareas.cargarTareasArray( tareasDB );
    }

    do {
        //Muestra el menu
        opt =  await inquirerMenu();

        switch (opt) {
            case '1': //Crea una tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;

            case '2': //Muestra listado completo
                tareas.listadoCompletoForm();
            break;

            case '3': //Muestra las completadas
                tareas.listarTareasCompletadas( true );
            break;

            case '4': //Muestra las pendientes
                tareas.listarTareasCompletadas( false );
            break;

            case '5': //Completa tarea
                const ids = await listadoTareasCheckList( tareas.listadoArr );
                tareas.completarTareas( ids );
            break;

            case '6': //Elominar tarea
                if(tareas.listadoArr.length === 0){
                    console.log("No hay tareas".yellow);
                    break;
                } 
                
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id === 0 ) break; 
                const ok = await confirmar( '¿Quieres eliminar la tarea?' );
                if ( ok ) tareas.borraTarea( id );
                
            break;
        }

        guardarDB( tareas.listadoArr );
        await inquirerPausa();
    } while (opt !== '0');
}

main();