/*
MIT License

Audio API
 
Copyright (c) 2018 Gaétan Walter
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

function PhyAudio(_bufferSize){
  this.gain = 1;

  this.data = [];

  this.recording = false;
  this.availableData = false;

  // Create an audio context
  this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // TODO Maybe deprecated

  this.playbackSource = this.audioCtx.createBufferSource();

  // Create a gain node
  this.gainNode = this.audioCtx.createGain();

  // Create a processor node
  this.processorNode = this.audioCtx.createScriptProcessor(4096, 1, 1);

  // Create an analyser node
  this.analyserNode = this.audioCtx.createAnalyser();

  // Set the analyser
  this.analyserNode.fftSize = _bufferSize * 2;
  this.bufferLength = this.analyserNode.frequencyBinCount;
  this.graphDataArray = new Float32Array(this.bufferLength);
  this.fftDataArray = new Uint8Array(this.bufferLength);

  // Only ask for audio
  let constraints = { audio: true, video: false }; 

  // Get the audio source and connect all nodes
  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {

    // Create a MediaStreamAudioSourceNode
    // Feed the HTMLMediaElement into it
    this.source = this.audioCtx.createMediaStreamSource(stream);

    // connect the AudioBufferSourceNode to the gain node
    // and the gain node to the analyser
    // and the analyser to the scriptprocessor
    // and the analyser to the destination
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.analyserNode);
    this.analyserNode.connect(this.processorNode); 
    this.processorNode.connect(this.audioCtx.destination); // TODO replace destination by a dummy node to avoid audio playback
  }.bind(this))
  .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

  this.processorNode.onaudioprocess = function(e) {
    // Do something with the data, i.e Convert this to WAV
    if(this.recording == true && this.data.length > this.recordLength * 48000){ // TODO TODO TODO TODO TODO 
      this.availableData = true;
      this.recording = false;
    }
    if(this.recording == true){
      // concat new datas to the array
      this.data = this.data.concat(Array.from(e.inputBuffer.getChannelData(0)));
    }
  }.bind(this)

  this.startRecording = function(_length){
    this.data.splice(0,this.data.length);
    this.recording = true;
    this.recordLength = _length;

  }

  this.isDataAvailable = function(_length){
    if(this.availableData == true && this.data.length > 0){
      return true;
    }
    return false;
  }

  this.getRecord = function(){
    this.availableData = false;
    return this.data;
  }

  this.setBufferSize = function(_bufferSize){
    this.analyserNode.fftSize = _bufferSize * 2;
    this.bufferLength = this.analyserNode.frequencyBinCount;
  }

  this.getGraph = function(){
    this.analyserNode.getFloatTimeDomainData(this.graphDataArray);
    return this.graphDataArray;
  }

  this.getFft = function(){
    this.analyserNode.getByteFrequencyData(this.fftDataArray);
    return this.fftDataArray;
  }

  this.getSampleRate = function(){
    return this.audioCtx.sampleRate;
  }

  this.setGain = function(_gain){
    this.gain = _gain;
    this.gainNode.gain.setValueAtTime(_gain, this.audioCtx.currentTime);
    return this.fftDataArray;
  }

  /*----------------------------------------------------------------------------------------------
  ---------------------------------------PLAYBACK FUNCTION----------------------------------------
  ----------------------------------------------------------------------------------------------*/
  this.play = function (channelData) {
    // create a new single channel audio buffer to put sound into
    let soundBuffer = this.audioCtx.createBuffer(1, channelData.length, this.audioCtx.sampleRate);
    // get channel data for mutating
    let channelBuffer = soundBuffer.getChannelData(0);

    for (let i = 0, l = channelData.length; i < l; i++) {
      channelBuffer[i] = channelData[i];
    }

    this.playbackSource = this.audioCtx.createBufferSource();

    // set the source to be the buffer we created earlier
    this.playbackSource.buffer = soundBuffer;

    // connect the source to the destination so we can hear the sound
    this.playbackSource.connect(this.audioCtx.destination);

    // start the source playing!
    this.playbackSource.start();
  }

  this.stop = function () {
    // stop the source playing!
    this.playbackSource.stop();
  }
}