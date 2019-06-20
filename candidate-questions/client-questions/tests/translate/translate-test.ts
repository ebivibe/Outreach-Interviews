import { } from 'jasmine';
import { Translation } from '../../src/translate/google-translate';
import { BatchTranslate } from '../../src/batch-translate/batch-translate';

describe('translation_tests', () => {

  // Allowing more time for async calls due to the error with needing to make api 
  // calls twice due to the api key being undefined the first time
  let originalTimeout: number;

  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  /**
   * Test should return undefined if both source and target are undefined
   */
  it('empty_obj_test', async () => {
    const result = await Translation.translate({
      source: undefined,
      target: undefined
    });

    expect(result[0]).toBeUndefined();
  });

  /**
   * Test should return undefined if both convert and destinationLang are undefined
   */
  it('empty_body_test', async () => {
    const result = await BatchTranslate.batchTranslate({
      convert: undefined,
      destinationLang: undefined
    });

    expect(result).toBeUndefined();
  });

  /**
   * Test should return undefined if destinationLang is undefined
   */
  it('empty_destination_test', async () => {
    const result = await BatchTranslate.batchTranslate({
      convert: ['cat', 'dog'],
      destinationLang: undefined
    });

    expect(result).toBeUndefined();
  });

  /**
   * Test should return undefined if convert is undefined
   */
  it('empty_convert_test', async () => {
    const result = await BatchTranslate.batchTranslate({
      convert: undefined,
      destinationLang: 'fr'
    });

    expect(result).toBeUndefined();
  });

  /**
   * Test should successfully translate 
   */
  it('empty_convert_test', async () => {
    const result = await BatchTranslate.batchTranslate({
      convert: ['cat', 'dog'],
      destinationLang: 'fr'
    });

    expect(result).toBe(['chat', 'chien']);
  });

  /*
  * Test should return undefined if both convert and destinationLang are undefined
  */
  it('empty_params_test', async () => {
    const result = await BatchTranslate.translateString(
      undefined,
      undefined
    );
    expect(result).toBeUndefined();
  });

  /*
  * Test should successfully translate the string
  */
  it('empty_body_test', async () => {
    const result = await BatchTranslate.translateString(
      'fr',
      'cat'
    );
    expect(result[0]).toBe('chat');
  });

});
