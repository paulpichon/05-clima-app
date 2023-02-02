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
                lat: lugar.center[1],
            }));

        } catch (error) {
            
            return [];// retornar los lugares que coincidan con el lugar que escribio el usuario
            
        }

    }

    //GETTER PARA OPEN WEATHER
    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units':'metric',
            'lang': 'es'
        }
    }

    //metodo para buscar el clima por ciudad
    async climaLugar( lat, lon ) {
        
        try {
            
            //instance axios.create()
            //peticion HTTP
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                //llamamos al getter con los parametros para hacer la consulta a la API
                //podemos desestructurar para mandar la lat y lon 
                params: { ...this.paramsOpenWeather, lat, lon}
            });

            //resp.data
            //hacer la peticion
            const resp = await instance.get()
            //desestructuramos para obtener weather que es un arreglo y main
            const { weather, main } = resp.data;
            
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }


        } catch (error) {
            console.log( error );
        }

    }


}

export { Busquedas }