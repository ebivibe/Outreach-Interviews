import * as bodyParser from 'body-parser';
import express from 'express';
import { BatchTranslate } from './batch-translate/batch-translate';
import {ITranslate, Translation} from './translate/google-translate';
const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.json());

// define a route handler for the default home page,
// tries again if the request fails due to the api key not being set the first time
app.get( '/', async ( resp: any, res: any ) => {
    try {
        const translateInterface: ITranslate = {
            source: 'Where are the bathrooms?',
            target: 'fr'
        };
        const response: [string, any] = await Translation.translate(translateInterface);
        res.send( response[0] );
    } catch (e) {
        const translateInterface: ITranslate = {
            source: 'Where are the bathrooms?',
            target: 'fr'
        };
        const response: [string, any] = await Translation.translate(translateInterface);
        res.send( response[0] );
    }

} );

/**
 * Handles the post request, tries again if the request fails due to the api key not being set the first time
 */
app.post( '/', async ( resp: any, res: any ) => {
    try {
        const response = await BatchTranslate.batchTranslate({convert: resp.body.convert,
            destinationLang: resp.body.destinationLang});
        res.send(response);
    } catch (e) {
        const response = await BatchTranslate.batchTranslate({convert: resp.body.convert,
            destinationLang: resp.body.destinationLang});
        res.send({converted: response});
    }
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
