import { IPostRequest } from '../models/PostRequest';
import { Translation } from '../translate/google-translate';

export class BatchTranslate {

    /**
     * Note due to issues with the api key it may take a while for these functions
     * to return values
     */

    /**
     * This method takes in an object containing a list of strings to be translate and the
     * target language and returns a list of these translated strings
     * @param input The body of the post request containing the strings to be translated
     * and the target language
     * @param return A list of the converted strings now in the target language
     */
    public static async batchTranslate(input: IPostRequest): Promise<string[]> {
        // Note here the requests are being done one by one but with more time I would
        // implement concurrency using something like Promise.all or the batch npm package
        // however due to time constrains and issues with the api key this was not added
        if (input.destinationLang !== undefined && input.convert !== undefined) {
            const result: string[] = [];
            for (const item of input.convert) {
                // convert each string in the list then add to the list of results
                result.push((await this.translateString(input.destinationLang, item))[0]);
            }
            // sort the results
            return result.sort();
        }
        // if any params are undefined return undefined
        return undefined;
    }

    /**
     * This method takes in a target language and a string to translate, calls the translate method
     * in the Translate class, and returns the translated string
     * @param destinationLang The language to translate to
     * @param toTranslate The string to translate
     * @return The translated string
     */
    public static async translateString(destinationLang: string, toTranslate: string): Promise<string[]> {
        if (destinationLang !== undefined && toTranslate !== undefined) {
        return await Translation.translate({target: destinationLang, source: toTranslate });
        }
        // if any params are undefined return undefined
        return undefined;
    }
}
