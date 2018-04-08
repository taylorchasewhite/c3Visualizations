function initializeC3() {
	c3=bb;
}

function loadChartData(url) {
	d3.tsv(url,function(error, data) {
		if (error) throw error;
		renderRaceCharts(data);
	});
}

function renderChart(data,graphObject) {
	console.log(data);
	
	var chart = c3.generate({
		bindto: '#' + graphObject.targetDiv,
		title: {
			text: graphObject.title,
		},
		oninit: function() {
			if (graphObject.barsOverArea) {
				const bars = this.main.select(".bb-chart-bars").node();
				const lines = this.main.select(".bb-chart-lines").node();
	
				// move lines node be positioned before the bars node
				bars.parentNode.insertBefore(lines, bars);
			}
		},
		data: {
			json: data,
			types: graphObject.types,
			colors:graphObject.colors,
			x: 'Date',
			xFormat: '%m/%d/%Y', // how the date is parsed	
			names:graphObject.names,
			keys: graphObject.keys,
			axes: graphObject.axes,
			empty: { label: { text: "No Data Available" }   },
			regions:graphObject.regions
		},
		grid: {
			x: {
				lines: function() {
					if (graphObject.todayLine) {
						return [{
							value:new Date().toLocaleDateString(), 
							text:'Today',
							class:'today-line'
						}];
					}
					return;
				}()
			},
			y: {
				lines: function() {
					if (graphObject.goal) {
						return [{
							value:graphObject.goal.value, 
							text:graphObject.goal.title + " - " + graphObject.goal.value,
							class:'dashed-goal'
						}];
					}
					return;
				}()
			}
		},
		axis: {
			x: {
				label: {
					text: graphObject.xLabel,
					position: "outer-center"
				},
				type: 'timeseries',
				tick: graphObject.xTick,
				show: true
				},
			y: {
				label: {
					text: graphObject.yLabel,
					position: "outer-middle"
				},
				min:graphObject.yMin,
				/*tick: {
					format: function(d) {
						var tempDate=new Date(2014,1,1);
						var u=+tempDate
						var newU=u+(d*1000);
						var formatSeconds=d3.timeFormat("%M:%S");
						return formatSeconds(new Date(newU));
					}
				},*/
				show: true
			},
			y2: {
				label: {
					text:"Pace (min/mi)",
					position:'outer-middle'
				},
				min:360,
				tick: {
					format: function(d) {
						var tempDate=new Date(2014,1,1);
						var u=+tempDate
						var newU=u+(d*1000);
						var formatSeconds=d3.timeFormat("%M:%S");
						return formatSeconds(new Date(newU));
					}			
				},
				show:function() {
					if(graphObject.axes) {
						return true;
					}
				}()
			},
			subchart: {
				show:function() {
					return graphObject.brush;
				}(), 
				position:"top"
			}
		},
		tooltip: {
			format: {
				title: function (d) { 
					var dateFormat=d3.timeFormat("%d %b \'%y");
					return dateFormat(d); 
				},/*
				value: function (value, ratio, id,index) {
					var tempDate= new Date(2014, 4, 1);
					var u=+tempDate;
					var newU=u+(value*1000);
		
					var formatSeconds = d3.timeFormat("%M:%S");

					var returnVal=formatSeconds(new Date(newU));
	
					return returnVal;
				}*/
			}
		}
	});
	var numRacersChart = c3.generate({
		bindto: '#divNumRacersChart',
		title: {
			text: 'Taylor White\'s Thanksgiving Day Number of Racers',
		},
		data: {
			json: data,
			x: 'Date',
			xFormat: '%m/%d/%Y', // how the date is parsed	
			type:'bar',
			colors: {
				Females:'#dd299d',
				Males:'#0085f2',
				FinisherCount:'#19c295'
				/*Females:'#9921B2',
				Males:'#118EEF',
				FinisherCount:'#109B77'*/
				/*Females:'#e541f4',
				Males:'#4286f4',
				FinisherCount:'#1fc474'*/
			},
			names: {
				Date: 'Date',
				Time: 'Total Time',
				Pace: 'Pace (min/mi)',
				FinisherCount:'# Finishers',
				Females:'# Females',
				Males:'# Males',
				AveragePace: 'Avg. Pace (min/mi)'
			},
			groups: [
				['Males', 'Females']
			],
			keys: {
				x: 'Date',
				value: ['FinisherCount','Males','Females']
			},
		},
		axis: {
			x: {
				label: {
					text: "Race Date",
					position: "outer-center"
				},
				type: 'timeseries',
				tick: {
					format: '%Y'
					//format: '%B %Y'
				},
				show: true
				},
			y: {
				label: {
					text: "Finisher Count",
					position: "outer-middle"
				},
				show: true
			}
		}
	});
}

function getGraphObject(title,xAxisLabel,yAxisLabel) {
	var graphObject = {};
	graphObject.title=title;
	graphObject.xLabel=xAxisLabel;
	graphObject.yLabel=yAxisLabel;
}

function buttonClick() {
	setTimeout(function () {
	    chart.load({
	        columns: [
	            ['data3', 400, 500, 450, 700, 600, 500]
	        ]
	    });
	}, 1000);
}

function randomColor() {
	return colors[Math.floor(Math.random()*colors.length)].hex;
}

var colors= [
	{
		name:"Azure",
		rgb: "rgb(0,133,242)",
		hex: '#0085f2'
	},
	{
		name:"Fuchsia",
		rgb: "rgb(221,41,157)",
		hex: '#dd299d'
	},
	{
		name:"Lime",
		rgb: "rgb(105,195,0)",
		hex: '#69c300'
	},
	{
		name:"Dahlia",
		rgb: "rgb(0,133,242)",
		hex: '#b429cc'
	},
	{
		name:"Caribbean",
		rgb: "rgb(0,133,242)",
		hex: '#00bfd4'
	},
	{
		name:"Tangerine",
		rgb: "rgb(0,133,242)",
		hex: '#ff9200'
	},
	{
		name:"Wisteria",
		rgb: "rgb(0,133,242)",
		hex: '#6a4ce0'
	},
	{
		name:"Mediterranean",
		rgb: "rgb(0,133,242)",
		hex: '#19c295'
	},
	{
		name:"Blush",
		rgb: "rgb(0,133,242)",
		hex: '#ff6665'
	},
	{
		name:"Sky",
		rgb: "rgb(0,133,242)",
		hex: '#24a4ee'
	},
	{
		name:"Rose",
		rgb: "rgb(0,133,242)",
		hex: '#d94e6f'
	},
];

function racePaceAxisFormat(d) {
	var tempDate=new Date(2014,1,1);
	var u=+tempDate
	var newU=u+(d*1000);
	var formatSeconds=d3.timeFormat("%M:%S");
	return formatSeconds(new Date(newU));
}

function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}