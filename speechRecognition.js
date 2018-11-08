
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
  document.getElementById("textArea").innerHTML = textpush.join(" ");
  console.log(result);
}
