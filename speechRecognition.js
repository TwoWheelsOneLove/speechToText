window.onload =function(e){
  document.getElementById("LangSelect").addEventListener('change',changeLang);

  var shakeEvent = new Shake({threshold: 15});
  shakeEvent.start();
  window.addEventListener('shake', function(){
      addBookmark();
  }, false);
  if(!("ondevicemotion" in window)){console.log("Shake Not Supported");}
}

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

let storedPhrases = [];
let highlightNext = false;

let speechAPI = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();
speechAPI.continuous = true;
speechAPI.grammars = speechRecognitionList;
speechAPI.lang = 'en-US';
speechAPI.interimResults = false;
speechAPI.maxAlternatives = 1



function changeLang(){
  let language = document.getElementById("LangSelect").value;
  speechAPI.lang = language;
  console.log(language);
}

function toggleRecording(){
  let button = document.getElementById("RecordBtn");
  if(button.innerHTML == "START LISTENING"){
    speechAPI.start();
    button.innerHTML = "STOP LISTENING";
    button.style.backgroundColor = "#78fcbc";
    console.log("RecordingStarted");
  }

  else{
    speechAPI.stop();
    button.innerHTML = "START LISTENING";
    button.style.backgroundColor = "#4286f4";
    console.log("RecordingStopped");
  }
}

function highlightPhrase(){
  highlightNext = true;
}

speechAPI.onresult = function(e) {
  let last = e.results.length -1;
  savePhrase(e.results[last][0].transcript);
}


async function savePhrase(phrase){
  storedPhrases.push(phrase);
  const container = document.getElementById('Conversation');

  let e = document.createElement('p');
  e.textContent = "Audio: " + storedPhrases[storedPhrases.length - 1] + " \r\n Translation: " + await getTranslation(storedPhrases[storedPhrases.length - 1], 'en');

  if(highlightNext){
  highlightNext = false;
  e.setAttribute("style", "margin: 1vh 20% 1vh 10%; background-color: #78fcbc;");
  }

  container.insertBefore(e, container.firstChild);
}

async function getTranslation(data, langCode){
  const url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
  const key = "?key=trnsl.1.1.20181110T123101Z.6c820b870899e6b4.d1419977b83417986ab22ae4a8cfab2e9a297155";
  const textIn = "&text=" + encodeURIComponent(data);
  const lang = "&lang=" + langCode;
  const response = await fetch(url + key + textIn + lang);
  if (response.ok) {
    const result = await response.json();
    return result.text[0];
  } else {
    console.error("error getting translation", response.status, response.statusText);
  }
}
