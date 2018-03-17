function initialize() {
	initializeC3();
	loadWeightData(getWeightGraphObject());
}

function getWeightGraphObject () {
	var graphObject = {
		title: 'Taylor\'s Weight Over Time',
		xLabel: 'Date',
		yLabel: 'Weight (lbs)',
		targetDiv: 'divWeightChart',
		dataURL:'./Weight.tsv',
		keys: {
			x: 'Date',
			value: ['Weight','Goal']
		},
		types: {
			Weight:'area-spline',
			Goal:'spline'
		},
		colors: { 
			Weight:randomColor(),//'#00bfd4',
			Goal:randomColor()//'#d94e6f'
		}
		/*dataURL:'https://raw.githubusercontent.com/taylorchasewhite/dataTank/master/ThanksgivingDayRace.tsv'*/

	};
	return graphObject;
}

function loadWeightData(graphObject) {
	d3.tsv(graphObject.dataURL,function(error, data) {
		if (error) throw error;
		renderChart(data,graphObject);
	});
}

function renderRaceCharts(tgdRaceData) {
	console.log(tgdRaceData);
	
	var numRacersChart = c3.generate({
		bindto: '#divNumRacersChart',
		title: {
			text: 'Taylor White\'s Thanksgiving Day Number of Racers',
		},
		data: {
			json: tgdRaceData,
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