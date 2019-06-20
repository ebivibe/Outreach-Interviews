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
        if (input.destinationLang !== undefined && input.convert !== undefined) {
            const calls: Array<Promise<string[]>> = [];
            for (const item of input.convert) {
                // create a list of promises
                calls.push(this.translateString(input.destinationLang, item));
            }
            // wait until all promises are resolved
            const results = await Promise.all(calls);
            const finalResult: string[] = [];
            // convert to a list of strings
            for (const result of results) {
                finalResult.push(result[0]);
            }
            // sort the results
            return finalResult.sort();
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
