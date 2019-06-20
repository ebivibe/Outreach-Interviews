import { IPostRequest } from '../models/PostRequest';
import { Translation } from '../translate/google-translate';

export class BatchTranslate {

    /**
     * This method takes in an object containing a list of strings to be translate and the 
     * target language and returns a list of these translated strings
     * @param input The body of the post request containing the strings to be translated
     * and the target language
     * @param return A list of the converted strings now in the target language
     */
    public static async batchTranslate(input: IPostRequest): Promise<string[]> {
        if(input.destinationLang !== undefined && input.convert !== undefined) {
            const result: string[] = [];
            for (const item of input.convert) {
                result.push((await this.translateString(input.destinationLang, item))[0]);
            }
            return result;
        }
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
        return undefined;
    }
}
