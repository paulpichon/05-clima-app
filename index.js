import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js"
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
                const lugar = await leerInput('Ciudad: ');
                console.log( lugar );
                //buscar los lugares

                //seleccionar el lugar

                //clima

                //mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', );
                console.log('Lat:', );
                console.log('Lng:', );
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