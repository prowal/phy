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
let quintuplet = [];

function generatePeaks(){ // TODO: A generaliser
  let slope = [1];

  // Generate one slope
  for(let i = 1; i < 11; i++){
    slope[i] = slope[i - 1] / 2; // TODO : 2 or less?
  }

  // Generate a single
  for(let i = 0; i < slope.length; i++){
    single[i] = slope[slope.length - 1 - i] * 1.1;
  }
  for(let i = slope.length; i < slope.length * 2; i++){
    single[i] = slope[i - slope.length] * 1.1;
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

  //Generate quintuplet
  for(let i = 0; i < slope.length * 2; i++){
    quintuplet[i] = single[i] * 0.2;
  }
  for(let i = 0; i < slope.length * 2; i++){
    quintuplet[i + slope.length * 2] = single[i] * 0.35;
  }
  for(let i = 0; i < slope.length * 2; i++){
    quintuplet[i + slope.length * 4] = single[i] * 0.55;
  }
  for(let i = 0; i < slope.length * 2; i++){
    quintuplet[i + slope.length * 6] = single[i] * 0.35;
  }
  for(let i = 0; i < slope.length * 2; i++){
    quintuplet[i + slope.length * 8] = single[i] * 0.2;
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
    };
    if(_peaks[i].mul == 2){
      for (let j = _peaks[i].ppm * _pointPerPPM - doublet.length / 2; j < _peaks[i].ppm * _pointPerPPM + doublet.length / 2; j++){
        array[j] = {x: j * scale, y: 5 * doublet[j - (_peaks[i].ppm * _pointPerPPM - doublet.length / 2)]}
      };
    };
    if(_peaks[i].mul == 3){
      for (let j = _peaks[i].ppm * _pointPerPPM - triplet.length / 2; j < _peaks[i].ppm * _pointPerPPM + triplet.length / 2; j++){
        array[j] = {x: j * scale, y: 5 * triplet[j - (_peaks[i].ppm * _pointPerPPM - triplet.length / 2)]}
      };
    };
    if(_peaks[i].mul == 4){
      for (let j = _peaks[i].ppm * _pointPerPPM - quadruplet.length / 2; j < _peaks[i].ppm * _pointPerPPM + quadruplet.length / 2; j++){
        array[j] = {x: j * scale, y: 5 * quadruplet[j - (_peaks[i].ppm * _pointPerPPM - quadruplet.length / 2)]}
      };
    };
    if(_peaks[i].mul == 5){
      for (let j = _peaks[i].ppm * _pointPerPPM - quintuplet.length / 2; j < _peaks[i].ppm * _pointPerPPM + quintuplet.length / 2; j++){
        array[j] = {x: j * scale, y: 5 * quintuplet[j - (_peaks[i].ppm * _pointPerPPM - quintuplet.length / 2)]}
      };
    };
  };

  return array;
}

// Allow to sort array of objects according to one of their properties
function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

function generateSigmoid(_totalPPM, _pointPerPPM, _width){
  let array = [];

  for(let i = 0; i < _width; i++){
    array[i] = {x: i / _pointPerPPM /*/ _width*/, y: 1 / (1 + Math.exp(-((i / _width - 0.5) * 12)))}
  }
  return array;
}

function nmrIntegration(_totalPPM, _pointPerPPM, _peaks){
  
  let array = [];

  const initialBaseline = 3;
  let baseline = initialBaseline;

  // Reorder peaks by ppm
  let sortedPeaks = _peaks.slice(0,_peaks.length);;
  sortedPeaks = sortedPeaks.sort(dynamicSort("ppm"));;

  // Add initial point
  array.push({x: 0, y: baseline + sortedPeaks[0].nbH})

  // for each peak
  for(let i = 0; i < sortedPeaks.length; i++){
    let peakWidth;
    if(sortedPeaks[i].mul == 1){
      peakWidth = single.length;
    }
    if(sortedPeaks[i].mul == 2){
      peakWidth = doublet.length;
    }
    if(sortedPeaks[i].mul == 3){
      peakWidth = triplet.length;
    }
    if(sortedPeaks[i].mul == 4){
      peakWidth = quadruplet.length;
    }
    let sigmoid = generateSigmoid(_totalPPM, _pointPerPPM, peakWidth)

    // Add sigmoids
    for(let j = 0; j < peakWidth; j++){
      array.push({x: (peakWidth / _pointPerPPM - sigmoid[j].x) + sortedPeaks[i].ppm - (peakWidth / _pointPerPPM / 2), y: baseline + sortedPeaks[i].nbH * sigmoid[j].y});
    }
    
    // move baseline
    if(i < sortedPeaks.length - 1){
      baseline -= sortedPeaks[i+1].nbH;
    }
  }
  // Add final point
  array.push({x: _totalPPM, y: baseline})

  // Sort the final array
  array = array.sort(dynamicSort("x"));;

  //Shrink to fit the graph
    let shift = 1 - baseline;
    let factor = 4 /  (array[0].y - array[array.length - 1].y) ;
    for(let i = 0; i < array.length; i++){
      // shift to avoid negatives
      array[i].y += shift;
      // apply the factor
      array[i].y *= factor;
    }
    for(let i = 0; i < array.length; i++){
      // shift to 1-4 range
      array[i].y += 1 - array[array.length - 1].y;
    }
  return array;
}