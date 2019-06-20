import { Translate } from '@google-cloud/translate';
import * as dotenv from 'dotenv';

export interface ITranslate {
    source: string;
    target: string;
}

/**
 * Class used as a helper to perform translations
 */
export class Translation {
    /**
     * Function used to perform a translation
     * @param input ITranslate interface used to perform a translation
     */
    public static async translate(input: ITranslate): Promise<[string, any]> {
        const apiKey = `${process.env.TRANSLATE_API}`;

        if (!apiKey || apiKey === undefined) {
            throw Error('No configured API key');
        }

        if (input &&
            input.source && input.target) {
            // Read in the .env file and process the variables
            dotenv.config();
            const translateObj = new Translate({
                key: apiKey
            });
            // The text to translate
            const text = input.source;
            // The target language
            const target = input.target;
            return await translateObj.translate(text, target);
        }
        return [undefined, {}];
    }
}
