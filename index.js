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
                //si presionan 0
                if ( id === '0') continue; //para que continue con la siguiente iteracion dle ciclo

                //obtener informacion d ela ciudad para imprimirlo 
                const lugarSel = lugares.find( l => l.id === id );
                //guardar en la BD
                //pasamos como argumento lugarSel.nombre ya que nos interesa guardar el nombre
                busquedas.agregarHistorial( lugarSel.nombre );

                //console.log( lugarSel );
                //seleccionar el lugar

                //clima
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );
                
                //mostrar resultados
                console.clear();
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green );
                console.log('Lat:', lugarSel.lat );
                console.log('Lng:', lugarSel.lng );
                console.log('Temperatura:', clima.temp );
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('Como esta el clima ahora:', clima.desc.green );


            break;

            //funcion para guardar el historial de busqueda
            case 2:
                busquedas.historial.forEach( (lugar, index) => {
                    //idx
                    const idx = `${ index + 1}.`.green;
                    console.log(`${ idx } - ${ lugar }`);
                });
            break;

        }



        //condicion para poner pausa antes de que ejecutar la siguiente instruccion
        if( opt !== 0) await pausa();
        

    } while ( opt !== 0);//mientras opt sea diferente de 0 el menu se repetira indefinidamente

    
}


//llamamos el main()
main();