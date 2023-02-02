//colores en la consola
import colors from 'colors';
//importat inquirer
import inquirer from 'inquirer';


//opciones del menu
const preguntas = [
    {
      type: 'list',
      name: 'opcion',
      message: '¿Qué desea hacer?',
      choices: [
        {
            value: 1,
            name: `${'1.'.green} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2.'.green} Ver historial`
        },
        {
            value: 0,
            name: `${'0.'.green} Salir`
        },
        
      ],
    },
  ];


//opciones del menu creadas con inquirer
const inquirerMenu = async() => {
    //limpiar lo anterior
    console.clear();

    //construir interfaz del menu
    console.log('================================'.green);
    console.log('     Selecciona una opción      '.white);
    console.log('================================\n'.green);

    //await al prompt que se usara para hacer preguntas al usuario
    //destructuring a opt = opcion que es el name de la const preguntas
    const { opcion } = await inquirer.prompt( preguntas );

    //devolvemos opt
    return opcion;

}

//funcion pausa
const pausa = async() => {
    const question = [
        {
          type: 'input',
          name: 'enter',
          message: `Presione ${'ENTER'.green} para continuar`,
        },
    ];
    
    //para dar espacio en la consola y no se vea amontonado
    console.log('\n');
    await inquirer.prompt( question );

}

//funcion para leer input
const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                //verificamos value tenga un valor si no tiene entra al if y muestra un mensaje
                if ( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                //de lo contrario retorna un true
                return true;
            }
        }
    ];

    //desestructuramos desc
    const { desc } = await inquirer.prompt( question );
    //retornamos el valor de desc
    return desc;

}
//funcion para listar lugares
const listarLugares = async( lugares = [] ) => {

    const choices = lugares.map( (lugar, i) => {
        
        const idx = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }
    });

    //para añadir una nueva opcion al inicio del arreglo
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });


    //crear el prompt
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices // choices: choices
        }
    ];

    //imprimir con inquirer el prompt con las preguntas
    const { id } = await inquirer.prompt( preguntas );

    return id;

}
//funcion para confirmar borrar
const confirmar = async(message) => {

    //creamos nuestra pregunta
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message //message: message
        }
    ];

    //confirm regresa un valor booleano
    const { ok } = await inquirer.prompt( question );

    return ok;


}

//funcion para hacer seleccion multiple
const mostrarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        
        const idx = `${i+1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            //CON UNA OPERACION TERNARIA VERIFICAMOS SI EL SELECT YA ESTA COMPLETADO O AUN NO
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    //crear el prompt
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices // choices: choices
        }
    ];

    //imprimir con inquirer el prompt con las pregunta
    const { ids } = await inquirer.prompt( pregunta );

    return ids;

}


//exportar inquirerMenu
export {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}