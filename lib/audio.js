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

function PhyAudio(_buffer){
  this.gain = 1;

  // Create an audio context
  this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // Maybe deprecated

  // create Oscillator node
  this.oscillator = this.audioCtx.createOscillator();

  this.oscillator.type = "sine";
  this.oscillator.frequency.setValueAtTime(4400, this.audioCtx.currentTime); // value in hertz
  this.oscillator.start();

  // Create a gain node
  this.gainNode = this.audioCtx.createGain();

  // Create an analyser node
  this.analyserNode = this.audioCtx.createAnalyser();

  // Set the analyser
  this.analyserNode.fftSize = _buffer * 2;
  this.bufferLength = this.analyserNode.frequencyBinCount;
  this.graphDataArray = new Uint8Array(this.bufferLength);
  this.fftDataArray = new Uint8Array(this.bufferLength);

  // Only ask for audio
  let constraints = { audio: true, video: false }; 

  // Get the audio source and connect all nodes
  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    //let audio = document.querySelector("audio");
    //audio.srcObject = stream;
    //audio.onloadedmetadata = function(e) {
    //  audio.play();
    //};

    // Create a MediaStreamAudioSourceNode
    // Feed the HTMLMediaElement into it
    this.source = this.audioCtx.createMediaStreamSource(stream);

    // connect the AudioBufferSourceNode to the gain node
    // and the gain node to the analyser
    // and the analyser to the destination
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.analyserNode);
    //this.analyser.connect(this.audioCtx.destination);
  }.bind(this))
  .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

  this.getGraph = function(){
    this.analyserNode.getByteTimeDomainData(this.graphDataArray);
    return this.graphDataArray;
  }

  this.getFft = function(){
    this.analyserNode.getByteFrequencyData(this.fftDataArray);
    return this.fftDataArray;
  }

  this.setGain = function(_gain){
    this.gain = _gain;
    this.gainNode.gain.setValueAtTime(_gain, this.audioCtx.currentTime);
    return this.fftDataArray;
  }
}