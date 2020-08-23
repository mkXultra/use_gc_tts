process.env.GOOGLE_APPLICATION_CREDENTIALS="./text-to-speak-nodejs-83289cc7f9a3.json"
async function listVoices() {
  // [START tts_list_voices]
  const textToSpeech = require('@google-cloud/text-to-speech');

  const client = new textToSpeech.TextToSpeechClient();

  const [result] = await client.listVoices({});
  const voices = result.voices;

  console.log('Voices:');
  voices.forEach(voice => {
    console.log(`Name: ${voice.name}`);
    console.log(`  SSML Voice Gender: ${voice.ssmlGender}`);
    console.log(`  Natural Sample Rate Hertz: ${voice.naturalSampleRateHertz}`);
    console.log('  Supported languages:');
    voice.languageCodes.forEach(languageCode => {
      console.log(`    ${languageCode}`);
    });
  });
  // [END tts_list_voices]
}

async function main() {
require(`yargs`) // eslint-disable-line
    .demand(1)
    .command('list-voices', 'List supported voices.', {}, () => listVoices())
    .example('node $0 list-voices')
    .wrap(120)
    .recommendCommands()
    .epilogue(
      'For more information, see https://cloud.google.com/text-to-speech/docs'
    )
    .help()
    .strict().argv;
}

main().catch(console.error);
