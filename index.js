import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js"

const main = async() => {
    
    //definimos opt como un string vacio
    let opt;

    do {
        //imprimir el menu
        //al tener promesas en mensajes.js
        //podemos hacer uso de await
        //lo que le estamos diciendo es que mostrarMenu() debe esperar hastaque tenga una resolucion
        opt = await inquirerMenu();
        

        console.log({ opt });

        //condicion para poner pausa antes de que ejecutar la siguiente instruccion
        if( opt !== 0) await pausa();
        

    } while ( opt !== 0);//mientras opt sea diferente de 0 el menu se repetira indefinidamente

    
}


//llamamos el main()
main();