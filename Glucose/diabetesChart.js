function initialize() {
	loadGlucoseData();
}

function loadGlucoseData() {
	d3.csv('data/blood_glucose_data.csv',function(error, data) {
		if (error) throw error;
		var glucoseData=data;
		glucoseInit(glucoseData);
	});
}

function glucoseInit(glucoseData) {
	  
	console.log(glucoseData);
	var chart = bb.generate({
	    bindto: '#divGlucoseScores',
        title: {
            text: 'Taylor White\'s Miligrams of Glucose per Deciliter of Blood Scores Overtime',
        },
		data: {
			json: glucoseData,
			x: 'DateTimeStamp',
			xFormat: '%Y-%m-%d %H:%M:%S', // how the date is parsed	
			names: {
				DateTimeStamp: 'Date',
				bgScore: 'Blood glucose (mg/dL)'
			},
			keys: {
				x: 'DateTimeStamp',
				value: ['bgScore']
			},
			color: function (color,d) {
				if (d.value >= 140 && d.value < 200) {
					return "#ffcc66";
				}
				if (d.value >= 50 && d.value < 70) {
					return "#ffcc66";
				}
				else if (d.value < 50 || d.value >= 200) {
					return "#ff6633";
				}
				else if (d.value <140 && d.value>=70) {
					return "#00cc66";
				}
				else {
					return "steelblue";
				}	
			}
	    },
		axis: {
			x: {
				label: {
					text: "Date",
					position: "outer-center"
				},
				type: 'timeseries',
				tick: {
					count: 36,	
					format: '%m/%Y'
				},
				show: true
			},
			y: {
				label: {
					text: "Blood glucose (mg/dl)",
					position: "outer-middle"
				},
				show: true
			}
		},
		subchart: {
			show:true,
			position:"top"
		}/*,
		zoom: {
			enabled:true
		}*/
	});
}