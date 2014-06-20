$(document).ready(function() {

	function now() {
    return (new Date()).getTime();
	}
	
	var booly = false;

	 $(".edit").editable("echo.php", {
		 placeholder : "..I hope I can bill for this",
		 loadtype : "POST",
		 callback: function(value, settings) {
			startTime = now();
			console.log(startTime);
			$(".taskList .timer").toggleClass("timing");
			booly = true;
		 }
	 });

	
	$("#done").click(function(e){
		if (booly === true){
			$(".edit").removeClass("edit").unbind("click.editable").addClass("edited");
			
			function update_output() {
		
				var out  = [],
					displayTime;
				
				for (var i = 0, len = clicks.length; i < len; i++) {
					displayTime = (clicks[i].time - startTime);
					console.log(displayTime);
					seconds = displayTime
				
					outputTime = "I spent " + Math.floor(displayTime / 60000) + " Minutes on this task";
				}
				
				$(".taskList ul li .time").html(outputTime);
			}
		
			var clicks = [];
		
			clicks.push({ time : new Date().getTime(), target : $(this).attr('href') });
			update_output();
		
		
			$(".taskList ul li").appendTo(".doneList ul");
		
			$(".taskList ul")
				.html("<li><div class='nine columns task'><div class='edit'>..I hope I can bill for this</div></div><div class='three columns time'><div class='timer'></div></div></li>");
		
			$(".edit").editable("echo.php", {
				placeholder : "Click me to edit",
				loadtype : "POST",
				callback: function(value, settings) {
					startTime = now();
					console.log(startTime);
					$(".taskList .timer").toggleClass("timing");
					booly = true;
					return false;//
				}	 
			});
			
			booly = false;
			return false;
			
		} else {
		
			alert("you have not entered a task");
			return false;
		}
	});
  
	
});