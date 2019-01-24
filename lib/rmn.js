/*
MIT License

NMR spectrum generator
 
Copyright (c) 2019 Gaétan Walter
 
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

function NMR(_totalPPM, _pointPerPPM){
  this.totalPPM = _totalPPM;
  this.pointPerPPM = _pointPerPPM;

  this.peaks = [];

  this.single = [];
  this.doublet = [];
  this.triplet = [];
  this.quadruplet = [];
  this.quintuplet = [];
  this.sextuplet = [];
  this.septuplet = [];


  let slope = [1];

  // Generate one slope
  for(let i = 1; i < 11; i++){
    slope[i] = slope[i - 1] / 2; // TODO : 2 or less?
  }

  // Generate a single
  for(let i = 0; i < slope.length; i++){
    this.single[i] = slope[slope.length - 1 - i] * 1.1;
  }
  for(let i = slope.length; i < slope.length * 2; i++){
    this.single[i] = slope[i - slope.length] * 1.1;
  }

  //Generate doublet
  for(let i = 0; i < slope.length * 4; i++){
    this.doublet[i] = this.single[i % (slope.length * 2)] * 0.75;
  }

  //Generate triplet
  for(let i = 0; i < slope.length * 2; i++){
    this.triplet[i] = this.single[i] * 0.3;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.triplet[i + slope.length * 2] = this.single[i] * 0.85;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.triplet[i + slope.length * 4] = this.single[i] * 0.3;
  }

  //Generate quadruplet
  for(let i = 0; i < slope.length * 2; i++){
    this.quadruplet[i] = this.single[i] * 0.3;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.quadruplet[i + slope.length * 2] = this.single[i] * 0.6;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.quadruplet[i + slope.length * 4] = this.single[i] * 0.6;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.quadruplet[i + slope.length * 6] = this.single[i] * 0.3;
  }

  //Generate quintuplet
  for(let i = 0; i < slope.length * 2; i++){
    this.quintuplet[i] = this.single[i] * 0.2;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.quintuplet[i + slope.length * 2] = this.single[i] * 0.35;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.quintuplet[i + slope.length * 4] = this.single[i] * 0.55;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.quintuplet[i + slope.length * 6] = this.single[i] * 0.35;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.quintuplet[i + slope.length * 8] = this.single[i] * 0.2;
  }

  //Generate sextuplet
  for(let i = 0; i < slope.length * 2; i++){
    this.sextuplet[i] = this.single[i] * 0.2;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.sextuplet[i + slope.length * 2] = this.single[i] * 0.3;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.sextuplet[i + slope.length * 4] = this.single[i] * 0.5;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.sextuplet[i + slope.length * 6] = this.single[i] * 0.5;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.sextuplet[i + slope.length * 8] = this.single[i] * 0.3;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.sextuplet[i + slope.length * 10] = this.single[i] * 0.2;
  }

  //Generate septuplet
  for(let i = 0; i < slope.length * 2; i++){
    this.septuplet[i] = this.single[i] * 0.1;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.septuplet[i + slope.length * 2] = this.single[i] * 0.15;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.septuplet[i + slope.length * 4] = this.single[i] * 0.22;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.septuplet[i + slope.length * 6] = this.single[i] * 0.32;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.septuplet[i + slope.length * 8] = this.single[i] * 0.22;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.septuplet[i + slope.length * 10] = this.single[i] * 0.15;
  }
  for(let i = 0; i < slope.length * 2; i++){
    this.septuplet[i + slope.length * 12] = this.single[i] * 0.1;
  }


  this.generateNMR = function(){
    const totalPoints = this.totalPPM * this.pointPerPPM;

    const scale =  this.totalPPM / totalPoints;
  
    let array = [];
    
    // Generate a baseline
    for (let i = 0; i < totalPoints; i++){
      array[i] = [i * scale, 0];
    };
  
    // Draw all peaks
    for (let i = 0; i < this.peaks.length; i++){
      if(this.peaks[i].mul == 1){
        for (let j = this.peaks[i].ppm * this.pointPerPPM - this.single.length / 2; j < this.peaks[i].ppm * this.pointPerPPM + this.single.length / 2; j++){
          array[j] = [j * scale, 5 * this.single[j - (this.peaks[i].ppm * this.pointPerPPM - this.single.length / 2)]];
        };
      };
      if(this.peaks[i].mul == 2){
        for (let j = this.peaks[i].ppm * this.pointPerPPM - this.doublet.length / 2; j < this.peaks[i].ppm * this.pointPerPPM + this.doublet.length / 2; j++){
          array[j] = [j * scale, 5 * this.doublet[j - (this.peaks[i].ppm * this.pointPerPPM - this.doublet.length / 2)]];
        };
      };
      if(this.peaks[i].mul == 3){
        for (let j = this.peaks[i].ppm * this.pointPerPPM - this.triplet.length / 2; j < this.peaks[i].ppm * this.pointPerPPM + this.triplet.length / 2; j++){
          array[j] = [j * scale, 5 * this.triplet[j - (this.peaks[i].ppm * this.pointPerPPM - this.triplet.length / 2)]];
        };
      };
      if(this.peaks[i].mul == 4){
        for (let j = this.peaks[i].ppm * this.pointPerPPM - this.quadruplet.length / 2; j < this.peaks[i].ppm * this.pointPerPPM + this.quadruplet.length / 2; j++){
          array[j] = [j * scale, 5 * this.quadruplet[j - (this.peaks[i].ppm * this.pointPerPPM - this.quadruplet.length / 2)]];
        };
      };
      if(this.peaks[i].mul == 5){
        for (let j = this.peaks[i].ppm * this.pointPerPPM - this.quintuplet.length / 2; j < this.peaks[i].ppm * this.pointPerPPM + this.quintuplet.length / 2; j++){
          array[j] = [j * scale, 5 * this.quintuplet[j - (this.peaks[i].ppm * this.pointPerPPM - this.quintuplet.length / 2)]];
        };
      };
      if(this.peaks[i].mul == 6){
        for (let j = this.peaks[i].ppm * this.pointPerPPM - this.sextuplet.length / 2; j < this.peaks[i].ppm * this.pointPerPPM + this.sextuplet.length / 2; j++){
          array[j] = [j * scale, 5 * this.sextuplet[j - (this.peaks[i].ppm * this.pointPerPPM - this.sextuplet.length / 2)]];
        };
      };
      if(this.peaks[i].mul == 7){
        for (let j = this.peaks[i].ppm * this.pointPerPPM - this.septuplet.length / 2; j < this.peaks[i].ppm * this.pointPerPPM + this.septuplet.length / 2; j++){
          array[j] = [j * scale, 5 * this.septuplet[j - (this.peaks[i].ppm * this.pointPerPPM - this.septuplet.length / 2)]];
        };
      };
    };
    return array;
  }

  this.generateSigmoid = function(_width){
    let array = [];

    for(let i = 0; i < _width; i++){
      array[i] = {x: i / this.pointPerPPM, y: 1 / (1 + Math.exp(-((i / _width - 0.5) * 12)))}
    }
    return array;
  }

  this.generateIntegration = function(){
    let array = [];

    const initialBaseline = 3;
    let baseline = initialBaseline;
  
    // Reorder peaks by ppm
    let sortedPeaks = this.peaks.slice(0,this.peaks.length);;
    sortedPeaks = sortedPeaks.sort(dynamicSort("ppm"));;
  
    // Add initial point
    array.push([0, baseline + sortedPeaks[0].nbH])
  
    // for each peak
    for(let i = 0; i < sortedPeaks.length; i++){
      let peakWidth;
      if(sortedPeaks[i].mul == 1){
        peakWidth = this.single.length;
      }
      if(sortedPeaks[i].mul == 2){
        peakWidth = this.doublet.length;
      }
      if(sortedPeaks[i].mul == 3){
        peakWidth = this.triplet.length;
      }
      if(sortedPeaks[i].mul == 4){
        peakWidth = this.quadruplet.length;
      }
      if(sortedPeaks[i].mul == 5){
        peakWidth = this.quintuplet.length;
      }
      if(sortedPeaks[i].mul == 6){
        peakWidth = this.sextuplet.length;
      }
      if(sortedPeaks[i].mul == 7){
        peakWidth = this.septuplet.length;
      }
      let sigmoid = this.generateSigmoid(peakWidth)
  
      // Add sigmoids
      for(let j = 0; j < peakWidth; j++){
        array.push([(peakWidth / this.pointPerPPM - sigmoid[j].x) + sortedPeaks[i].ppm - (peakWidth / this.pointPerPPM / 2), baseline + sortedPeaks[i].nbH * sigmoid[j].y]);
      }
      
      // move baseline
      if(i < sortedPeaks.length - 1){
        baseline -= sortedPeaks[i+1].nbH;
      }
    }
    // Add final point
    array.push([this.totalPPM, baseline])
  
    // Sort the final array
    array.sort(sortArrayofArray);
  
    //Shrink to fit the graph
      let shift = 1 - baseline;
      let factor = 4 /  (array[0][1] - array[array.length - 1][1]) ;
      for(let i = 0; i < array.length; i++){
        // shift to avoid negatives
        array[i][1] += shift;
        // apply the factor
        array[i][1] *= factor;
      }
      for(let i = 0; i < array.length; i++){
        // shift to 1-4 range
        array[i][1] += 1 - array[array.length - 1][1];
      }
    return array;  
  }
}