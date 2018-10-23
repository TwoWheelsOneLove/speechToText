window.addEventListener('load', init);
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

let speechAPI = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();
speechAPI.grammars = speechRecognitionList;
speechAPI.lang = 'en-US';
speechAPI.interimResults = false;
speechAPI.maxAlternatives = 1

function init(){

  document.getElementById('RecordBtn').addEventListener('click', startRecording);
};

function startRecording(){
  speechAPI.start();
  console.log("RecordingStarted");
};

speechAPI.onresult = function(e){
  let last = e.results.length -1;
  let result = e.results[last][0].transcript;
  console.log(result);
}
