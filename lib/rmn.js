/*
MIT License

NMR spectrum generator
 
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

//const peak = [0,0.031,0.062,0.125,0.25,1,0.25,0.125,0.062,0.031,0];

let peak = [];

function generatePeak(){ // TODO: A generaliser
  let slope = [1];

  for(let i = 1; i < 11; i++){
    slope[i] = slope[i - 1] / 2;
  }
  for(let i = 0; i < 10; i++){
    peak[i] = slope[10-i];
  }
  for(let i = 10; i < 20; i++){
    peak[i] = slope[i-10];
  }
}

function nmr(_totalPPM, peaks){
  generatePeak(); // Adepalacer pour ne pas le recalculer à chaque fois
  const pointPerPPM = 100;

  const totalPoints = _totalPPM * pointPerPPM; // TODO : usefull? 

  let array = [];
  
  for (let i = 0; i < totalPoints; i++){
    array[i] = {x: i / totalPoints * _totalPPM, y: 0}
  }
  for (let i = 300; i < 320; i++){
    console.log(peak[i-300]);
    array[i] = {x: i / totalPoints * _totalPPM, y: 5*peak[i-300]}
  }
  console.log(array);

  return array;
}