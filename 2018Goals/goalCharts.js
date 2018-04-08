function initialize() {
	initializeC3();
	loadAndRenderData(getWeightGraphObject());
	loadAndRenderData(getPushupGraphObject());
	loadAndRenderData(getMilesRunObject());

}

function getWeightGraphObject () {
	var graphObject = {
		title: 'Taylor\'s Weight Over Time',
		xLabel: 'Date',
		yLabel: 'Weight (lbs)',
		targetDiv: 'divWeightChart',
		dataURL:'https://raw.githubusercontent.com/taylorchasewhite/dataTank/master/Weight.tsv',
		keys: {
			x: 'Date',
			value: ['Weight']
		},
		types: {
			Weight:'area-spline'
		},
		colors: { 
			Weight:randomColor()//,//'#00bfd4',
			//Goal:randomColor()//'#d94e6f'
		},
		xTick:{
			format: '%b \'%y',
			fit:false
		},
		regions: {
			Weight:[{'start':new Date().toLocaleDateString(), 'style':'dashed'}]
		},
		goal: {
			value: 165,
			title: "Goal"
		},
		brush:true,
		todayLine:true,
		yMin:150
		/*dataURL:'https://raw.githubusercontent.com/taylorchasewhite/dataTank/master/ThanksgivingDayRace.tsv'*/

	};
	return graphObject;
}

function getPushupGraphObject () {
	var graphObject = {
		title: '20,000 Pushups: Race to the Finish',
		xLabel: 'Date',
		yLabel: 'Pushups Completed',
		targetDiv: 'divPushupChart',
		dataURL:'https://raw.githubusercontent.com/taylorchasewhite/dataTank/master/Pushups.tsv',
		keys: {
			x: 'Date',
			value: ['Count','Total']
		},
		types: {
			Count:'bar',
			Total:'area-step',
			Goal:'spline'
		},
		names: {
			Count:"Completed Pushups"
		},
		colors: { 
			Count:randomColor(),//'#00bfd4',
			Total:randomColor(),//'#d94e6f'
			Goal: randomColor()
		},
		yMin:0,
		xTick:{
			format: '%d %b \'%y',
			fit:false
		},
		barsOverArea:true
		/*dataURL:'https://raw.githubusercontent.com/taylorchasewhite/dataTank/master/ThanksgivingDayRace.tsv'*/

	};
	return graphObject;
}

function getMilesRunObject () {
	var graphObject = {
		title: '2018: Miles Run',
		xLabel: 'Date',
		yLabel: 'Miles Run',
		targetDiv: 'divMilesRunChart',
		dataURL:'https://raw.githubusercontent.com/taylorchasewhite/dataTank/master/Miles.tsv',
		keys: {
			x: 'Date',
			value: ['Distance','Total','Pace']
		},
		types: {
			Distance:'bar',
			Total:'area-step',
			Pace:'spline',
			Goal:'spline'
		},
		colors: { 
			Distance:randomColor(),//'#00bfd4',
			Total:randomColor(),//'#d94e6f'
			Pace:randomColor(),
			Goal: randomColor()
		},
		yMin:0,
		xTick:{
			format:'%b \'%y',
			fit:false
		},
		tooltip: {
			format: {
				title: "Hello world"
			}
		},
		axes: {
			Total:"y",
			Pace:"y2"
		},
		barsOverArea:true
		/*dataURL:'https://raw.githubusercontent.com/taylorchasewhite/dataTank/master/ThanksgivingDayRace.tsv'*/

	};
	return graphObject;
}

function loadAndRenderData(graphObject) {
	d3.tsv(graphObject.dataURL,function(error, data) {
		if (error) throw error;
		renderChart(data,graphObject);
	});
}

function renderRaceCharts(tgdRaceData) {
	console.log(tgdRaceData);
	
	var numRacersChart = c3.generate({
		bindto: '#divPushupChart',
		title: {
			text: '20,000 Pushups - Progress',
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