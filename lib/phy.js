/*
MIT License

La Belle Physique

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

/*----------------------------------------------------------------------------------------------
---------------------------------------COLOR DEFINITIONS----------------------------------------
----------------------------------------------------------------------------------------------*/

// Define the colors used in the app CHANGE TO USE W3.CSS COLORSSSSSSSSSSSSSSSSSSSS
chartColors = {
	// Copy from w3-blue
	black: "rgb(0,0,0)",
	blue: "rgb(33, 150, 243)",
	deepOrange: "rgb(255, 87, 34)",
	pink: "rgb(233, 30, 99)",
	blueGrey: "rgb(96, 125, 139)"
};

/*----------------------------------------------------------------------------------------------
---------------------------------------ACCORDION FUNCTION---------------------------------------
----------------------------------------------------------------------------------------------*/

function accordion(id) {
	var x = document.getElementById(id);
	if (x.className.indexOf("w3-show") == -1) {
			x.className += " w3-show";
	} else { 
			x.className = x.className.replace(" w3-show", "");
	}
}

/*----------------------------------------------------------------------------------------------
--------------Allow to sort array of objects according to one of their properties---------------
----------------------------------------------------------------------------------------------*/
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