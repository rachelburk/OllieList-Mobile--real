
$("#createtourpage").live("pagecreate", function(event) {
	var page = $("#createtourpage");
	var watchGeoID = null;
	var lastpos = null;
	
	onCurrentGeoSuccess = function(position) {

		var s = 'Latitude: '    + position.coords.latitude          + '<br/>' +
          'Longitude: '         + position.coords.longitude         + '<br/>' +
          'Altitude: '          + position.coords.altitude          + '<br/>' +
          'Accuracy: '          + position.coords.accuracy          + '<br/>' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br/>' +
          'Heading: '           + position.coords.heading           + '<br/>' +
          'Speed: '             + position.coords.speed             + '<br/>' +
          'Timestamp: '         + new Date(position.timestamp)      + '<br/>';
        lastpos = position;
		  
		$("#status",page).html(s);
	};
	
	onGeoError = function() {
		$("#status",page).html("An error with the geolocation. Sorry");
	};
	
	$("#currentLink",page).live("click",function(e) {
		$("#status",page).html("Getting location...<br/>");
		navigator.geolocation.getCurrentPosition(onCurrentGeoSuccess, onGeoError);
		e.preventDefault();
	});

	$("#startTrackingLink",page).live("click",function(e) {
		$("#status",page).html("Tracking began...<br/>");
		watchGeoID = navigator.geolocation.watchPosition(onCurrentGeoSuccess, onGeoError);
		e.preventDefault();
	});

	$("#stopTrackingLink",page).live("click",function(e) {
		$("#status",page).html("Tracking stopped...<br/>");
		if (watchGeoID) {
			navigator.geolocation.clearWatch(watchGeoID);
			watchGeoID = null;
		}
		e.preventDefault();
	});


	$("#getDataLink").live("click",function(e) {
		$.post("http://129.64.237.108:3000/test.json", 
		        {"lat":lastpos.coords.latitude, 
		         "lon":lastpos.coords.longitude, 
		         "tour":$("#tourname",page).val(),
		         "title":$("#title",page).val(), 
		         "descr":$("#descr",page).val()}, 
		        function(res,code) {
			         $("#status", page).html("Result from remote server was " + res[0].title);
		});
	});
}

$("#showpage").live("pagecreate", function(event) {
	var page = $("#showpage");
	$.post("0.0.0.0:3000/mobiledownload.json",{"fatima":"fatima"},  
		        function(res,code) {
		       var data=JSON.stringify(res['items']);

		        var items = [];
     var x;
       items.push('<tr><td> Item </td><td>price </td><td>Description </td></tr>');
       for(i=0; i<data.length; i++) {
  		
       items.push('<tr><td>' + JSON.stringify(res['items'][i].name) +'</td><td>'+ JSON.stringify(res['items'][i].price)+ '</td><td>'+JSON.stringify(res['items'][i].dscrp) +'</td></tr>');
  		}
  		var htmlstring=items.join('');
  		$('table#note',page).html(htmlstring);

		});
	});

