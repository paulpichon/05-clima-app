//aqui se hara la logica para las busquedas

class Busquedas {

    //definir propiedades, pero es totalmente opcional hacerlo
    historial = ['Tegucigalpa', 'Madrid', 'CDMX'];

    constructor() {

        //TODO: leer DB si existe

    }

    async ciudad( lugar = '' ) {

        //peticion HTTP
        console.log( lugar );


        return [];// retornar los lugares que coincidan con el lugar que escribio el usuario

    }



}

export { Busquedas }