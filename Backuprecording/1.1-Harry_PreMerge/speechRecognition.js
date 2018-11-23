window.onload =function(e){
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

heard = [];
highlights = [];
let speechAPI = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();
speechAPI.continuous = true;
speechAPI.grammars = speechRecognitionList;
speechAPI.lang = 'en-US';
speechAPI.interimResults = false;
speechAPI.maxAlternatives = 1


function toggleRecording(){
  let button = document.getElementById("RecordBtn");
  if(button.innerHTML == "Start Listening"){
    speechAPI.start();
    button.innerHTML = "Stop Listening";
    button.style.backgroundColor = "blue";
    console.log("RecordingStarted");
  }
  else{
    speechAPI.stop();
    button.innerHTML = "Start Listening";
    button.style.backgroundColor = "red";
    console.log("RecordingStopped");
  }
}

function addBookmark(){
  if(!highlights.includes(heard.length)){
    highlights.push(heard.length);
  }
}

speechAPI.onresult = function(e){
  let last = e.results.length -1;
  let result = e.results[last][0].transcript;
  heard.push(result);
  let textpush = [];
  for(i=0; i<=heard.length; i++){
    if(highlights.includes(i)){
      textpush.push("<span class=marked>" + heard[i] + "</span>");
    }
    else{
      textpush.push(heard[i]);
    }
  }
  document.getElementById("text").innerHTML = textpush.join(" ");
  console.log(result);
}

async function getTranslation(data, langCode){
  const url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
  const key = "?key=trnsl.1.1.20181110T123101Z.6c820b870899e6b4.d1419977b83417986ab22ae4a8cfab2e9a297155";
  const textIn = "&text=" + encodeURIComponent(data);
  const lang = "&lang=" + langCode;
  const response = await fetch(url + key + textIn + lang);
  if (response.ok) {
    const result = await response.json();
    console.log(result.text[0]);
    return result.text[0];
  } else {
    console.error("error getting translation", response.status, response.statusText);
  }
}
