//variables de entorno
import * as dotenv from 'dotenv';
//se debe llamar para poder funcionar
dotenv.config();

import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";

const main = async() => {

    const busquedas = new Busquedas();

    
    //definimos opt como un string vacio
    let opt;

    do {
        //imprimir el menu
        //al tener promesas en mensajes.js
        //podemos hacer uso de await
        opt = await inquirerMenu();

        switch( opt ) {
            case 1:
                //mostrar mensaje
                const terminoBusqueda = await leerInput('Ciudad: ');
                
                //buscar los lugares
                const lugares = await busquedas.ciudad( terminoBusqueda );
                const id = await listarLugares( lugares );
                //obtener informacion d ela ciudad para imprimirlo 
                const lugarSel = lugares.find( l => l.id === id );
                //console.log( lugarSel );
                //seleccionar el lugar

                //clima

                //mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre );
                console.log('Lat:', lugarSel.lng );
                console.log('Lng:', lugarSel.lat );
                console.log('Temperatura:', );
                console.log('Mínima:', );
                console.log('Máxima:', );


            break;
        }



        //condicion para poner pausa antes de que ejecutar la siguiente instruccion
        if( opt !== 0) await pausa();
        

    } while ( opt !== 0);//mientras opt sea diferente de 0 el menu se repetira indefinidamente

    
}


//llamamos el main()
main();