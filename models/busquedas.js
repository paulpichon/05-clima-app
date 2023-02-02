//importar fs para crear archivo e irlos guardando
import * as fs from 'fs';

//aqui se hara la logica para las busquedas
import axios from 'axios';

class Busquedas {

    //definir propiedades, pero es totalmente opcional hacerlo
    historial = [];
    //crear el PATH de la carpeta donde esta la BD
    dbPath = './db/database.json';

    constructor() {

        //TODO: leer DB si existe
        this.leerBD();

    }

    //getter para convertir en MAYUSCULAS las palabras del historial
    get historialCapitalizado() {   
        
        return this.historial.map( lugar => {
            //dividimos en un arreglo separado por palabras
            let palabras = lugar.split(' ');
            //iteramos con un map
            palabras = palabras.map( palabra => palabra[0].toUpperCase() + palabra.substring(1) );

            //retornamos palabra .join() para volver a unirlo al arreglo
            return palabras.join(' ');

        });

        
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

    //metodo para gregar historial
    //recibimos como argumento el lugar a registrar
    agregarHistorial( lugar = '' ) {

        //verificar si existe en el historial un registro repetido
        if ( this.historial.includes( lugar.toLocaleLowerCase() ) ) {
            //agregamos un return ya que no debe hacer nada
            return;
        }
        //mantener a la vista solo 6 registros en el historial
        //de esta forma solo se mostrar 6 en el historial
        //[0, 1, 2, 3, 4, 5 ] -> registros a la vista solo 6
        this.historial = this.historial.splice(0, 5);

        //TODO: prevenir duplicados
        //unshift() para colocar el ultimo registro al top de la lista
        this.historial.unshift( lugar.toLocaleLowerCase() );
        
        //grabar en DB/archivo de texto
        this.guardarDB();

    }
    //METODO PARA GUARDAR EN BD
    guardarDB() {
        //objeto 
        const payload = {
            historial: this.historial
        };

        //creamos el archivo
        //como argumentos van primero el path donde se creara el archivo
        //y segundo la data que ira en el archivo
        fs.writeFileSync( this.dbPath, JSON.stringify( payload ));
    }

    //metodo para leer BD
    leerBD() {
        //verificar si existe si no esxiste el arreglo ya esta inicializado com un arreglo vacio
        if (!fs.existsSync(this.dbPath)) {
            return;
        }

        //leer informacion de la BD
        //consr info ... readFileSync... path... {encoding:'utf-8'}
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });

        //const data = JSON.aausjk(info);
        //this.historial = ...historial
        const data = JSON.parse( info );
        //retorna esto
        this.historial = data.historial;
        
    }


}

export { Busquedas }