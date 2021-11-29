//Define month names
const month_names = [
	"january", 
	"february", 
	"march", 
	"april", 
	"may", 
	"june", 
	"july", 
	"august", 
	"september", 
	"october",
	"november",
	"december"
];

//The function is called with the current year (4-digits) and month (number)
//calendar(2020,6) for June 2020
function calendar(y, month) {
	//Assigning parameters to new variables to preventing modifications
	let month_corr = month;
	let y_corr = y;
	let d = new Date(y + "-" + month_corr + "-01");
	//Create n_month for using a 0-11 range for the month_names array 
	const n_month = d.getMonth();
	let tabla = $("<table></table>");
	let t_head = $("<thead></thead>");
	let row_month = $("<tr></tr>");
	row_month
		.append(
			$("<th></th>").html($("<button></button>").attr("id", "prev").html("&lt;"))
		)
		.append(
			//month name cell fills 5 columns of a total of 7
			$("<th></th>").attr("colspan", "5").text(month_names[n_month] + " " + d.getFullYear())
		)
		.append(
			$("<th></th>").html($("<button></button>").attr("id", "next").html("&gt;"))
		)
	t_head.append(row_month);
	tabla.append(t_head);

	let t_body = $("<tbody></tbody>");
	//This loop runs whenever Date object (increases one day in every iteration) correspond with the same month
	while(d.getMonth() == n_month){
		let row = $("<tr></tr>");
		for(let c = 1; c <= 7; c++){
			let cell = $("<td></td>");
			//Check same condition for avoiding printing all week if month ends earlier
			if(d.getMonth() == n_month){
				// c == 7 condition is because sunday will be printed in the last column, not the first (d.getDay() returns 0-7 where 0 is sunday)
				if(c == 7){
					if(d.getDay() == 0){
						//This portion marks the current day with an id for highlighting
						//Applies to Sunday days only
						if(d.toDateString() == new Date().toDateString()){
							cell.attr("id", "today");
						}
						cell.html("<a href=''>" + d.getDate() + "</a>");
						//Adds one day
						d.setTime(d.getTime() + (1000*60*60*24));
					}
				}else{
					//Applies when column is not the seventh, then search the week day that
					//corresponds with the column (columns range is 1-7, so applies to 1-6 range
					// 1 for monday, 6 for saturday)
					if(d.getDay() == c){
						//Same portion as before, applies to the rest of weekdays
						if(d.toDateString() == new Date().toDateString()){
							cell.attr("id", "today");
						}
						cell.html("<a href=''>" + d.getDate() + "</a>");
						d.setTime(d.getTime() + (1000*60*60*24));
					}
				}		
			}else{
				//In case loop surpass days of the month, prints nothing the rest
				//of spaces in the row
				cell.text("");
			}
			
			
			row.append(cell);
			
		}
		t_body.append(row)
	}
	tabla.append(t_body);
	$("#calendar").empty();
	let titulo = "<h3>Search in calendar</h3>";
	$("#calendar").append(titulo);
	$("#calendar").append(tabla);

	//Applies when user clicks next (>) button
	$("#next").click(function(){
		//Increases one month
		month_corr++;
		//If month = 13, function is called with the next year and first month
		if(month_corr > 12){
			calendar(++y_corr, 1);
		}else{
			calendar(y_corr, month_corr);
		}
		
	});
	//Applies when user clicks prev (<) button
	$("#prev").click(function(){
		month_corr--;
		//If month = 0, function is called with the prev year and last month
		if(month_corr < 1){
			calendar(--y_corr, 12);
		}else{
			calendar(y_corr, month_corr);
		}
	});

}

let d = new Date();

calendar(d.getFullYear(), d.getMonth() + 1);