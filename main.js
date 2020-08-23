process.env.GOOGLE_APPLICATION_CREDENTIALS="./text-to-speak-nodejs-83289cc7f9a3.json"
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const voiceOptions = {
  us:{languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
  jp:{languageCode: 'ja-JP', ssmlGender: 'NEUTRAL', name: 'ja-JP-Wavenet-B'},
}

const text = '本書で使用するシステム名、製品名は、それぞれ各社の商標、または登録商標です。なお、本文中では、™、®、© マークは省略しています。';
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function quickStart() {
  // The text to synthesize

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: voiceOptions.jp,
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
quickStart();