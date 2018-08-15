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

  // Generate one slope
  for(let i = 1; i < 11; i++){
    slope[i] = slope[i - 1] / 2; // TODO : 2 or less?
  }
  // Generate a peak
  for(let i = 0; i < 10; i++){
    peak[i] = slope[10-i];
  }
  for(let i = 10; i < 20; i++){
    peak[i] = slope[i-10];
  }
}

function nmr(_totalPPM, _peaks){
  generatePeak(); // Adepalacer pour ne pas le recalculer à chaque fois
  const pointPerPPM = 100;

  const totalPoints = _totalPPM * pointPerPPM; // TODO : usefull? 

  const scale =  _totalPPM / totalPoints; // TODO : usefull

  let array = [];
  
  // Generate a baseline
  for (let i = 0; i < totalPoints; i++){
    array[i] = {x: i * scale, y: 0}
  };

  // For each peak
  console.log(_peaks);
  for (let i = 0; i < _peaks.length; i++){
    console.log(_peaks[i].ppm * pointPerPPM - 10);
    console.log(_peaks[i].ppm * pointPerPPM + 10);
    for (let j = _peaks[i].ppm * pointPerPPM - 10; j < _peaks[i].ppm * pointPerPPM + 10; j++){
      console.log("aaa");
      array[j] = {x: j * scale, y: 5 * peak[j - (_peaks[i].ppm * pointPerPPM - 10)]}
      console.log
    };
  };

  console.log(array);

  return array;
}