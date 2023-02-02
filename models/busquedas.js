//aqui se hara la logica para las busquedas
import axios from 'axios';

class Busquedas {

    //definir propiedades, pero es totalmente opcional hacerlo
    historial = ['Tegucigalpa', 'Madrid', 'CDMX'];

    constructor() {

        //TODO: leer DB si existe

    }

    //getter parametros de la API MAPBOX
    //process.env.MAPBOX_KEY se accede a el mediante las variables de entorno
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
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
            //retornar un objeto de forma implicita --> ({})
            
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            
            return [];// retornar los lugares que coincidan con el lugar que escribio el usuario
            
        }

    }



}

export { Busquedas }