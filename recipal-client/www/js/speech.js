var speech = {
  recognition: null,
  recognizing: false,
  initialize: function() {
   console.log("DEBUG: Initializing speech");
   this.recognition = new SpeechRecognition();
   this.recognition.continuous = true;
   //this.recognition.interimResults = true;

  },
  startRecognition: function(callback) { 
    this.recognition.onresult = function (event) {
      if (event.results.length > 0) {
        var transcript = event.results[0][0].transcript;
        console.log("DEBUG: Speech transcript: " + transcript);
        console.log("DEUBG: Speech event: " + event);
        invokeFunc(callback, transcript);
      }
      //speech.startRecognition();
    };
    this.recognition.start();
    this.recognizing = true;
  },
  stopRecognition: function() {
    this.recognition.stop();
    this.recognizing = false;
  },
  toggleRecognition: function(callback) {
    if (this.recognizing) {
      console.log("DEBUG: Turning off speech");
      this.stopRecognition();
    } else {
      console.log("DEBUG: Turning on speech");
      this.startRecognition();
    }
  }
};

