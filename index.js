import { leerInput } from "./helpers/inquirer.js"

const main = async() => {
    const texto = await leerInput('Hola ');

    console.log( texto );
}


//llamamos el main()
main();