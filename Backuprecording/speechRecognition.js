window.addEventListener('load', startRecording);

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

let storedPhrases = [];
let highlightedPhrases = [];

let speechAPI = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();
speechAPI.continuous = true;
speechAPI.grammars = speechRecognitionList;
speechAPI.lang = 'en-US';
speechAPI.interimResults = false;
speechAPI.maxAlternatives = 1


function startRecording(){
  speechAPI.start();
  console.log("RecordingStarted");
}

function highlightLast(){
  highlightedPhrases.push(storedPhrases.length);
}

speechAPI.onresult = function(e) {
  let last = e.results.length -1;
  savePhrase(e.results[last][0].transcript);
}


function savePhrase(phrase){
  storedPhrases.push(phrase);
  document.getElementById('Conversation').innerHTML = "";

  for(i=0; i<=storedPhrases.length-1; i++){
    let e = document.createElement('p');
    e.textContent = storedPhrases[i];

    if(highlightedPhrases.includes(i)){
    e.classList.add('highlighted');
    }
    document.getElementById('Conversation').appendChild(e);

  }
}
