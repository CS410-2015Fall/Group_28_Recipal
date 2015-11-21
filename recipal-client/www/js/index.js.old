/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 function startRecognize() {
  window.continuoussr.startRecognize(
            function(results) {console.log("DEBUG: speech results: " + results);}, 
            function(error) {console.log("DEBUG: speech error:  " + error);}, 50, "" ,"en-US");
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // proxSensor.enable(function() {
        //     console.log("DEBUG: Toggling menu");
        //     menu.toggleMenu();
        // });

        //var now = new Date();

        // cordova.plugins.notification.local.schedule({
        //     id: 1,
        //     title: "Phonegap Notification",
        //     text: "Notification",
        //     at: new Date(now.getTime() + 10*1000),
        //     every: "minute"
        // });

        // cordova.plugins.notification.local.on("schedule", function(notification) {
        //     console.log("DEBUG: scheduled: " + notification.id);
        // });
        // cordova.plugins.notification.local.on("trigger", function(notification) {
        //     console.log("DEBUG: triggered: " + notification.id);
        // });

        // recognition = new SpeechRecognition();
        // recognition.onresult = function(event) {
        // //if (event.results.length > 0) {
        //     // q.value = event.results[0][0].transcript;
        //     // q.form.submit();
        //     //var transcript = event.results[0][0].transcript;
        //     console.log("DEBUG: Speech transcript: " + event);
        //     //if (transcript == "toggle") {console.log("DEBUG: speech toggling menu"); menu.toggleMenu();}
            
        // //}
        // //recognition.start();
        // };

        
        startRecognize();
        // recognition.start();
        //speech.initialize();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('DEBUG: Received Event: ' + id);
    },
    onPause: function() {
        console.log('DEBUG: Program paused');
    },
    onResume: function() {
        console.log('DEBUG: Program resumed');
    }
};
