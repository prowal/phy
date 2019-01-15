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
phyColors = {
	// Copy from w3-blue
	black: "rgb(0,0,0)",
	blue: "rgb(33, 150, 243)",
	deepOrange: "rgb(255, 87, 34)",
	pink: "rgb(233, 30, 99)",
	blueGrey: "rgb(96, 125, 139)",
	theme:"#009688",
	theme2:"#3f51b5"
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
----------------------------------------INPUT FILE LOGIC----------------------------------------
----------------------------------------------------------------------------------------------*/
function initFileInputs(){
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var labelID = "#" + input.id + "Label";
		var label	 = document.querySelector(labelID),
			labelVal = label.innerHTML;
		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();
	
			if( fileName )
				label.innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});
	});
}


/*----------------------------------------------------------------------------------------------
--------------Allow to sort array of objects according to one of their properties---------------
----------------------------------------------------------------------------------------------*/
function dynamicSort(property) {
  let sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

/*----------------------------------------------------------------------------------------------
------------------------Format milliseconds to a displayable time layout------------------------
----------------------------------------------------------------------------------------------*/
function formatDate(_t) {
	let min = Math.floor(_t / 60000);
	let sec = Math.floor((_t % 60000) / 1000);
	let csec = Math.round(((_t % 60000) % 1000) / 10);
	if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec = "0" + sec;
	}
	if(csec < 10){
		csec = "0" +csec;
	}

	// Round up if x.995+
	if(((_t % 60000) % 1000) / 10 > 99.5){
		sec++;
		if (sec < 10){
			sec = "0" + sec;
		}
		csec = "00";
	}

	if(_t < 60 * 1000){
		return sec + "," + csec + " s";
	} else{
		return min + ":" + sec;
	}
}

/*----------------------------------------------------------------------------------------------
---------------------------------TOGGLE BUTTON DATA OBJECT--------------------------------------
----------------------------------------------------------------------------------------------*/
function ToggleButton(_el, _state1, _state2, _callback1, _callback2, _initialState = true) {
	this.element = _el;
	this.state1 = _state1;
	this.state2 = _state2;
	this.callback1 = _callback1;
	this.callback2 = _callback2;
	this.state = _initialState;

	this.setState = function(_state){
		this.state = _state;
		if(this.state === true){
			_el.innerHTML = _state1;
		}
		else{
			_el.innerHTML = _state2;
		}
	}
	this.setState(this.state);

	this.toggle = function(){
		if(this.state === true){
			this.setState(false);
		}
		else{
			this.setState(true);
		}
	}

	this.onClick = function(){
		if(this.state == true){
			this.setState(false);
			_callback1();
		}
		else{
			this.setState(true);
			_callback2();
		}	
	}.bind(this)

	_el.addEventListener("click", this.onClick);
}

/*----------------------------------------------------------------------------------------------
----------------------------------GRAPH CONFIGS CONSTRUCTORS------------------------------------
----------------------------------------------------------------------------------------------*/
function GraphJSConfig(_label, _xLabel, _yLabel, _xMin, _xMax, _yMin, _yMax) {
	this.type = "line";
	this.data = {
		datasets: [{
			label: _label,
			borderColor: phyColors.theme2,
			// Hides the points...
			radius: 0,
			fill: false
		}]
	}
	this.options = {
		lineTension: 0,
		responsive: true,
		animation: false,
		maintainAspectRatio: false,
		legend: {
				display: false
			},
		title: {
			display: false,
		},
		scales: {
			xAxes: [{
				display: true,
				type: "linear",
				position: "bottom",
				scaleLabel: {
					display: true,
					labelString: _xLabel
				},
				ticks: {
					min: _xMin,
					max: _xMax,
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: _yLabel
				},
				ticks: {
					min: _yMin,
					max: _yMax,
				}
			}]
		}
	}
}

/*function PlotlyLayout(_label, _xLabel, _yLabel, _xMin, _xMax, _yMin, _yMax, _tickformat = "", _hoverFormat = "") {
	this.autosize = true;
	this.font = { // Copy fron chart.js default
    family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    size: 12,
    color: '#666'
  }
  this.xaxis = {
    title: _xLabel,
		titlefont: {size: 12},
		tickmode: "auto",
		nticks: 11,
		tickformat: _tickformat,
		hoverformat: _hoverFormat,
		range: [_xMin, _xMax]
  }
  this.yaxis = {
    title: _yLabel,
		titlefont: {size: 12},
		tickmode: "auto",
		nticks: 11,
		tickformat: "r",
		range: [_yMin, _yMax]
  }
	this.margin = {
    l: 48,
    r: 16,
    b: 35,
    t: 25,
    pad: 2
  }
}*/

Highcharts.setOptions({
	lang: {
			decimalPoint: ',',
			thousandsSep: ' ',
			numericSymbols: []
	}
});

function HighchartOptions(_title, _xTitle, _yTitle, _xMin, _xMax, _yMin, _yMax, _xDecimals = 0, _zoom = undefined, _animation = true, _mouseTracking = true){
	this.chart = {
		spacingLeft: 0,
		spacingBottom: 0,
		zoomType: _zoom,
		plotBorderWidth: 1,
		animation: _animation
	};
	this.plotOptions = {
		series: {
			lineWidth: 3,
			color: phyColors.theme2,
			enableMouseTracking: _mouseTracking
		},
	};
	this.title = {
    text: _title
	};
	this.legend = {
		enabled: false
	};
	this.xAxis = {
		title: {
      text: _xTitle
    },
		min: _xMin,
		softMax: _xMax
	};
	this.yAxis = {
		title: {
      text: _yTitle
		},
		min: _yMin,
		max: _yMax,
	};
	this.credits = {
		enabled: false
	};
	this.tooltip = {
		formatter: function() {
			return "X: <b>" + Highcharts.numberFormat(this.x, _xDecimals) + "</b><br>Y: <b>" + Highcharts.numberFormat(this.y,0) + "</b>";
		}
	};
	this.series = [{animation:false}/*{
		animation: false,
		name: _seriesNames[0],
		states: {
			hover: {
				enabled: false
			}
		}
	}*/]
}
/*----------------------------------------------------------------------------------------------
-------------------------------------TYPED ARRAY CONVERTERS-------------------------------------
----------------------------------------------------------------------------------------------*/
function convertFloat32ToInt16(buffer, l = buffer.length) {
	let buf = new Int16Array(l);

	while (l--) {
    s = Math.max(-1, Math.min(1, buffer[l]));
    buf[l] = s < 0 ? s * 32768 : s * 32767;
  }
  return buf;
}

function convertInt16ToFloat32(buffer) {
  let l = buffer.length;  //Buffer
	let buf = new Float32Array(l);

	while (l--) {
    s = Math.max(-32768, Math.min(32767, buffer[l]));
    buf[l] = s < 0 ? s / 32768 : s / 32767;
  }
  return buf;
}

/*----------------------------------------------------------------------------------------------
---------------------------------------POINTS CONSTRUCTOR---------------------------------------
----------------------------------------------------------------------------------------------*/
function Points(_length, _type = "int16") {
	if(_type == "float32"){
		this.x = new Float32Array(_length);
		this.y = new Float32Array(_length);
	}
	if(_type == "int16"){
		this.x = new Float32Array(_length);
		this.y = new Int16Array(_length);
	}

	this.setY = function(_d){
		this.y = _d;
	}

	this.getPJSX = function(){
		return this.x;
	}
	this.getPJSY = function(){
		return this.y;
	}
	this.toGJS = function(){
		let a = [];
		for(let i = 0; i < this.x.length; i++){
			a[i] = {x: this.x[i], y: this.y[i]};
		}
		return a;
	}
}

/*----------------------------------------------------------------------------------------------
--------------------------------------LINEAR DATA Object----------------------------------------
----------------------------------------------------------------------------------------------*/
function LinearData(_data, _step = 1) {
	this.data = _data;
	this.step = _step;

	this.generateXData = function(_length){
		// Create a new float32 array and populate it 
		let xdata = new Float32Array(this.data.length);
		for(let i = 0; i < xdata.length; i++){
			xdata[i] = i * this.step;
		}
		return xdata;
	}

	/*this.toGJS = function(_downSampling = 1, _length = this.data.length * this.step, stabilize = false){
		let data
		if(stabilize == true){
			data = this.stabilize();
		} else{
			data = this.data;
		}
		let xdata = this.generateXData(data.length);
		// create a new array of points
		let a = [];
		for(let i = 0; i < (_length / this.step) / _downSampling; i++){
			a[i] = {x: xdata[i * _downSampling], y: data[i * _downSampling]};
		}
		return a;
	}*/

	this.getData = function(_downSampling = 1, _length = undefined, stabilize = false){
		let data
		if(stabilize == true){
			data = this.stabilize();
		} else{
			data = this.data;
		}
		if(_length == undefined){
			if(_downSampling == 1){
				return data;
			} else {
				let data2 = new Int16Array(data.length / _downSampling); // TODO PAS QUE INT16!!!
				for(let i = 0; i < data.length; i++){
					data2[i] = data[i*_downSampling];
				}
				return data2;
			}
		} else{
			let data2 = new Int16Array(_length * baseSampleRate / _downSampling); // TODO PAS QUE INT16!!!
			for(let i = 0; i < _length * baseSampleRate / _downSampling; i++){
				data2[i] = data[i*_downSampling];
			}
			return data2;
		}
	}

	this.getDuration = function(){
		return this.data.length * this.step;
	}

	this.stabilize = function(){
		let maximum = 0;
		let maximumIndex = 0;
		for(let i = 0; i < this.data.length / 10; i++){
			if(this.data[i] > maximum){
				maximum = this.data[i];
				maximumIndex = i;
			}
		}
		let stabilizedData = new Int16Array(_data.length - maximumIndex)
		stabilizedData.set(this.data.slice(maximumIndex, _data.length));
		return stabilizedData;
	}
}


