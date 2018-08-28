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

let single = [];
let doublet = [];
let triplet = [];
let quadruplet = [];

function generatePeaks(){ // TODO: A generaliser
  let slope = [1];

  // Generate one slope
  for(let i = 1; i < 11; i++){
    slope[i] = slope[i - 1] / 2; // TODO : 2 or less?
  }

  // Generate a single
  for(let i = 0; i < slope.length; i++){
    single[i] = slope[slope.length - 1 - i];
  }
  for(let i = slope.length; i < slope.length * 2; i++){
    single[i] = slope[i - slope.length];
  }

  //Generate doublet
  for(let i = 0; i < slope.length * 4; i++){
    doublet[i] = single[i % (slope.length * 2)] * 0.75;
  }

  //Generate triplet
  for(let i = 0; i < slope.length * 2; i++){
    triplet[i] = single[i] * 0.3;
  }
  for(let i = 0; i < slope.length * 2; i++){
    triplet[i + slope.length * 2] = single[i] * 0.85;
  }
  for(let i = 0; i < slope.length * 2; i++){
    triplet[i + slope.length * 4] = single[i] * 0.3;
  }

  //Generate quadruplet
  for(let i = 0; i < slope.length * 2; i++){
    quadruplet[i] = single[i] * 0.3;
  }
  for(let i = 0; i < slope.length * 2; i++){
    quadruplet[i + slope.length * 2] = single[i] * 0.6;
  }
  for(let i = 0; i < slope.length * 2; i++){
    quadruplet[i + slope.length * 4] = single[i] * 0.6;
  }
  for(let i = 0; i < slope.length * 2; i++){
    quadruplet[i + slope.length * 6] = single[i] * 0.3;
  }
}



function nmr(_totalPPM, _pointPerPPM, _peaks){
  generatePeaks(); // Adepalacer pour ne pas le recalculer à chaque fois

  const totalPoints = _totalPPM * _pointPerPPM; // TODO : usefull? 

  const scale =  _totalPPM / totalPoints; // TODO : usefull

  let array = [];
  
  // Generate a baseline
  for (let i = 0; i < totalPoints; i++){
    array[i] = {x: i * scale, y: 0}
  };

  for (let i = 0; i < _peaks.length; i++){
    if(_peaks[i].mul == 1){
      for (let j = _peaks[i].ppm * _pointPerPPM - single.length / 2; j < _peaks[i].ppm * _pointPerPPM + single.length / 2; j++){
        array[j] = {x: j * scale, y: 5 * single[j - (_peaks[i].ppm * _pointPerPPM - single.length / 2)]}
      };
    }
    if(_peaks[i].mul == 2){
      for (let j = _peaks[i].ppm * _pointPerPPM - doublet.length / 2; j < _peaks[i].ppm * _pointPerPPM + doublet.length / 2; j++){
        array[j] = {x: j * scale, y: 5 * doublet[j - (_peaks[i].ppm * _pointPerPPM - doublet.length / 2)]}
      };
    }
    if(_peaks[i].mul == 3){
      for (let j = _peaks[i].ppm * _pointPerPPM - triplet.length / 2; j < _peaks[i].ppm * _pointPerPPM + triplet.length / 2; j++){
        array[j] = {x: j * scale, y: 5 * triplet[j - (_peaks[i].ppm * _pointPerPPM - triplet.length / 2)]}
      };
    }
    if(_peaks[i].mul == 4){
      for (let j = _peaks[i].ppm * _pointPerPPM - quadruplet.length / 2; j < _peaks[i].ppm * _pointPerPPM + quadruplet.length / 2; j++){
        array[j] = {x: j * scale, y: 5 * quadruplet[j - (_peaks[i].ppm * _pointPerPPM - quadruplet.length / 2)]}
      };
    }

  };

  return array;
}

function generateSigmoid(_totalPPM, _pointPerPPM, _width, _amplitude){
  let array = [];

  for(let i = 0; i < _pointPerPPM; i++){
    array[i] = {x: _totalPPM - i / _pointPerPPM * _width, y: _amplitude / (1 + Math.exp(-((i / _pointPerPPM - 0.5) * 12)))}
  }
  return array;
}

function nmrIntegration(_totalPPM, _pointPerPPM, _peaks){
  let array = [];

  return array;
}