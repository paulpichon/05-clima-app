//aqui se hara la logica para las busquedas
import axios from 'axios';

class Busquedas {

    //definir propiedades, pero es totalmente opcional hacerlo
    historial = ['Tegucigalpa', 'Madrid', 'CDMX'];

    constructor() {

        //TODO: leer DB si existe

    }

    //getter parametros de la API MAPBOX
    get paramsMapbox() {
        return {
            'access_token':'pk.eyJ1IjoicGF1bHBmIiwiYSI6ImNsZGwzNTh0MzB0ZzQzcG1zeWNhNDhmamYifQ.OuB5BF3ZefrDBO343afJkA',
            'limit': 5,
            'language': 'es'
        }
    }


    async ciudad( lugar = '' ) {

        try {
            
            //peticion HTTP
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                //llamamos al getter con los parametros para hacer la consulta a la API
                params: this.paramsMapbox
            });

            //hacer la peticion
            const resp = await instance.get()

            console.log( resp.data );


        } catch (error) {
            
            return [];// retornar los lugares que coincidan con el lugar que escribio el usuario
            
        }

    }



}

export { Busquedas }