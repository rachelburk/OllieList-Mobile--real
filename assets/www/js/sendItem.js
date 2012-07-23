function sendItem() {
var page = $("#newpage");
  $("#status", page).html("getting items...");
		   $.post("0.0.0.0:3000/mobileupload.json", 
		        {
		         "name":$("#name",page).val(),
		         "price":$("#price",page).val(),
		        "dscrp":$("#dscrp",page).val(),
		          "email":$("#email",page).val(),
		         }, function(res,code) {
		             if( res.signin==true)
		             { 
		             	window.location="index.html";
		             	alert('note save successfuly');
    			       }
    			      else
    			      {
    			      	$("#status", page).html("Your Item is now posted on OllieList");
    			      }
    			 })
};