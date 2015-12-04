function LOG(msg) {
	console.log("LOG: " + msg);
}

function App() {
	that = {};


	var inner_content = document.getElementById("jobs"); // private

	//Container
	inner_content.setAttribute('class', 'inner_content')
	var cont_header = dom('div',{});
	var cont_unsignedJobs = dom('div',{});
	var cont_acceptedJobs = dom('div',{});
	var cont_declinedJobs = dom('div',{});

	cont_header.setAttribute('class', 'cont_header');
	cont_unsignedJobs.setAttribute('class', 'cont_unsignedJobs');
	cont_acceptedJobs.setAttribute('class', 'cont_acceptedJobs');
	cont_declinedJobs.setAttribute('class', 'cont_declinedJobs');

	inner_content.appendChild(cont_header);
	inner_content.appendChild(cont_unsignedJobs);
	inner_content.appendChild(cont_acceptedJobs);
	inner_content.appendChild(cont_declinedJobs);

	//Header

	var header_label = dom('header_label',{});
	header_label_text = document.createTextNode("Job Verwaltung");
    header_label.appendChild(header_label_text);
	cont_header.appendChild(header_label);

	//Tables
	var tab_unsignedJobs_header = new Array(["Job Titel", "Stellenart", "Firma", "Email des Recruiters", 
											 "Einstell- datum", "gültig bis", "akzeptieren", "nicht akzeptieren"]);
	var tab_acceptedJobs_header = new Array(["Job Titel", "Stellenart", "Firma", "Email des Recruiters", 
											 "Einstell- datum", "gültig bis", "stornieren"]);	
	var tab_declinedJobs_header = new Array(["Job Titel", "Stellenart", "Firma", "Email des Recruiters", 
											 "Einstell- datum", "gültig bis", "stornieren", "löschen"]);	


	//testdata
	var tab_unsignedJobs_cols = 8;

	var tab_acceptedJobs_cols = 7;

	var tab_declinedJobs_cols = 8;	
	//###testdata

	//var unsigned_table_data = fillTable(tab_unsignedJobs_rows,tab_unsignedJobs_cols,tab_unsignedJobs_header);
	//var accepted_table_data = fillTable(tab_acceptedJobs_rows,tab_acceptedJobs_cols,tab_acceptedJobs_header);
	//var declined_table_data = fillTable(tab_declinedJobs_rows,tab_declinedJobs_cols,tab_declinedJobs_header);

	var tab_unsignedJobs = createTable(tab_unsignedJobs_cols,1,tab_unsignedJobs_header[0]);
	var tab_acceptedJobs = createTable(tab_acceptedJobs_cols,2,tab_acceptedJobs_header[0]);
	var tab_declinedJobs = createTable(tab_declinedJobs_cols,3,tab_declinedJobs_header[0]);


	var unsigned_label = dom('unsigned_label',{});
	unsigned_label_text = document.createTextNode("Nicht zugewiesene Angebote");
    unsigned_label.appendChild(unsigned_label_text);
	cont_unsignedJobs.appendChild(unsigned_label)

	var accepted_label = dom('accepted_label',{});
	accepted_label_text = document.createTextNode("Akzeptierte Angebote");
    accepted_label.appendChild(accepted_label_text);
	cont_acceptedJobs.appendChild(accepted_label)

	var declined_label = dom('declined_label',{});
	declined_label_text = document.createTextNode("Nicht akzeptierte Angebote");
    declined_label.appendChild(declined_label_text);
	cont_declinedJobs.appendChild(declined_label)

	cont_unsignedJobs.appendChild(tab_unsignedJobs);
	cont_acceptedJobs.appendChild(tab_acceptedJobs);
	cont_declinedJobs.appendChild(tab_declinedJobs);


	getJobsFromDB(function(arraydata){
		for(var i = 0; i<arraydata.length; i++){
			var obj = arraydata[i];
			if(obj.status === "new"){

				addRowToTable(1, obj, arraydata);

			}else if(obj.status === "unassigned"){

				addRowToTable(1, obj, arraydata);

			}else if(obj.status === "accepted"){
				
				addRowToTable(2, obj, arraydata);

			}else if(obj.status === "declined"){
				
				addRowToTable(3, obj, arraydata);

			}
		}
	});

}

function createTable(col, id, header) {

    var myTable     = document.createElement("table");
    var mytablebody = document.createElement("tbody");
    mytablebody.setAttribute('class', 'tbody');
    var tablebody_cont = dom('div',{});
    tablebody_cont.setAttribute('class', 'tablebody');
    tablebody_cont.appendChild(mytablebody);

    mycurrent_row = document.createElement("tr");
    var row_cont = dom('div',{});

    row_cont.setAttribute('class', 'row_cont_header');


    for(var i = 0; i < col; i++) {
    	var cell_cont = dom('div',{});
    	cell_cont.setAttribute('class', ('cell_cont_col' + String(i)));
        mycurrent_cell = document.createElement("td");
        currenttext = document.createTextNode(header[i]);
        mycurrent_cell.appendChild(currenttext);
        mycurrent_cell.setAttribute('class', 'tab_cell');
        cell_cont.appendChild(mycurrent_cell);
        mycurrent_row.appendChild(cell_cont);
    }
    mycurrent_row.setAttribute('class', 'tab_row');
    row_cont.appendChild(mycurrent_row);
    mytablebody.appendChild(row_cont);

    myTable.appendChild(tablebody_cont);
    myTable.setAttribute("ID", id);
    return myTable;
} 

window.onload = function () {
	App();
};


function addRowToTable(tabID, obj, arraydata){

	var table = document.getElementById(tabID);
	
	//unsigned Table
	if (tabID === 1){
		var colCount = table.firstChild.firstChild.firstChild.firstChild.childElementCount

			mycurrent_row = document.createElement("tr");
	        var row_cont = dom('div',{});

	        row_cont.setAttribute('class', 'row_cont');

	        for(var i = 0; i < colCount; i++) {
	        		var cell_cont = dom('div',{});
	        	if(i < colCount -2){
	        		cell_cont.setAttribute('class', ('cell_cont_col' + String(i)));
		            mycurrent_cell = document.createElement("td");
		            
		            if(i === 0){
		            	currenttext = document.createTextNode(obj.pdffilename.substring(0,(obj.pdffilename.length - 4)));
		        	}else if(i === 1){
		            	currenttext = document.createTextNode(obj.jobtype);
		        	}else if(i === 2){
		            	currenttext = document.createTextNode(obj.company);
		        	}else if(i === 3){
		            	currenttext = document.createTextNode("email");
		        	}else if(i === 4){
		        		var cDate = new Date(obj.creationdate);
		        		var cTimeString = cDate.getFullYear() + "-" + (cDate.getMonth() +1) + "-" + (cDate.getDay() +1);
		            	currenttext = document.createTextNode(cTimeString);
		        	}else if(i === 5){
		        		vDate = new Date(obj.validdate);
		            	var vTimeString = cDate.getFullYear() + "-" + (cDate.getMonth() +1) + "-" + (cDate.getDay() +1);
		            	currenttext = document.createTextNode(vTimeString);
		        	}

        			mycurrent_cell.appendChild(currenttext);
		            mycurrent_cell.setAttribute('class', 'tab_cell');
		            cell_cont.appendChild(mycurrent_cell);
		            mycurrent_row.appendChild(cell_cont);
	        	}
	        	//accept button
	        	else if(i === colCount -2){
	        		cell_cont.setAttribute('class', 'cell_cont_btnAccept');
	        		cell_cont.addEventListener('click', function(ev){
	        			LOG("clicked accept");
	        			obj.status = "accepted";
	        			saveJobToDB(obj);
	        			addRowToTable(2, obj);
	        			cell_cont.parentNode.parentNode.parentNode.removeChild(cell_cont.parentNode.parentNode);
	        		});
		            mycurrent_cell = document.createElement("td");
	        		currenttext = document.createTextNode("+");
        			mycurrent_cell.appendChild(currenttext);
		            mycurrent_cell.setAttribute('class', 'tab_cell');
		            cell_cont.appendChild(mycurrent_cell);
		            mycurrent_row.appendChild(cell_cont);
	        	}
	        	//decline button
	        	else if(i === colCount -1){
	        		cell_cont.setAttribute('class', 'cell_cont_btnDecline');
	        		cell_cont.addEventListener('click', function(ev){
	        			LOG("clicked decline");
	        			obj.status = "declined";
	        			saveJobToDB(obj);
	        			addRowToTable(3, obj);
	        			cell_cont.parentNode.parentNode.parentNode.removeChild(cell_cont.parentNode.parentNode);
	        		});
		            mycurrent_cell = document.createElement("td");
	        		currenttext = document.createTextNode("-");
        			mycurrent_cell.appendChild(currenttext);
		            mycurrent_cell.setAttribute('class', 'tab_cell');
		            cell_cont.appendChild(mycurrent_cell);
		            mycurrent_row.appendChild(cell_cont);
	        	}
	        }
	        mycurrent_row.setAttribute('class', 'tab_row');
	        row_cont.appendChild(mycurrent_row);
	        table.firstChild.firstChild.appendChild(row_cont);

	}

	//accepted Table
	else if(tabID === 2){
		var colCount = table.firstChild.firstChild.firstChild.firstChild.childElementCount

			mycurrent_row = document.createElement("tr");
	        var row_cont = dom('div',{});

	        row_cont.setAttribute('class', 'row_cont');

	        for(var i = 0; i < colCount; i++) {
	        		var cell_cont = dom('div',{});
	        	if(i < colCount -1){
	        		cell_cont.setAttribute('class', ('cell_cont_col' + String(i)));
		            mycurrent_cell = document.createElement("td");
		            
		            if(i === 0){
		            	currenttext = document.createTextNode(obj.pdffilename);
		        	}else if(i === 1){
		            	currenttext = document.createTextNode(obj.jobtype);
		        	}else if(i === 2){
		            	currenttext = document.createTextNode(obj.company);
		        	}else if(i === 3){
		            	currenttext = document.createTextNode("email");
		        	}else if(i === 4){
		        		var cDate = new Date(obj.creationdate);
		        		var cTimeString = cDate.getFullYear() + "-" + (cDate.getMonth() +1) + "-" + (cDate.getDay() +1);
		            	currenttext = document.createTextNode(cTimeString);
		        	}else if(i === 5){
		        		vDate = new Date(obj.validdate);
		            	var vTimeString = cDate.getFullYear() + "-" + (cDate.getMonth() +1) + "-" + (cDate.getDay() +1);
		            	currenttext = document.createTextNode(vTimeString);
		        	}

        			mycurrent_cell.appendChild(currenttext);
		            mycurrent_cell.setAttribute('class', 'tab_cell');
		            cell_cont.appendChild(mycurrent_cell);
		            mycurrent_row.appendChild(cell_cont);


	        	}
	        	//stornieren button
	        	else if(i === colCount -1){
	        		cell_cont.setAttribute('class', 'cell_cont_btnStornieren');
	        		cell_cont.addEventListener('click', function(ev){
	        			LOG("clicked stornieren");
	        			obj.status = "unassigned";
	        			saveJobToDB(obj);
	        			addRowToTable(1, obj);
	        			cell_cont.parentNode.parentNode.parentNode.removeChild(cell_cont.parentNode.parentNode);
	        		});
		            mycurrent_cell = document.createElement("td");
	        		currenttext = document.createTextNode("s");
        			mycurrent_cell.appendChild(currenttext);
		            mycurrent_cell.setAttribute('class', 'tab_cell');
		            cell_cont.appendChild(mycurrent_cell);
		            mycurrent_row.appendChild(cell_cont);
	        	}
	        }
	        mycurrent_row.setAttribute('class', 'tab_row');
	        row_cont.appendChild(mycurrent_row);
	        table.firstChild.firstChild.appendChild(row_cont);

	}

	//declined Table
	else if(tabID === 3){
		var colCount = table.firstChild.firstChild.firstChild.firstChild.childElementCount

			mycurrent_row = document.createElement("tr");
	        var row_cont = dom('div',{});

	        row_cont.setAttribute('class', 'row_cont');

	        for(var i = 0; i < colCount; i++) {
	        		var cell_cont = dom('div',{});
	        	if(i < colCount -2){
	        		cell_cont.setAttribute('class', ('cell_cont_col' + String(i)));
		            mycurrent_cell = document.createElement("td");
		            
		            if(i === 0){
		            	currenttext = document.createTextNode(obj.pdffilename);
		        	}else if(i === 1){
		            	currenttext = document.createTextNode(obj.jobtype);
		        	}else if(i === 2){
		            	currenttext = document.createTextNode(obj.company);
		        	}else if(i === 3){
		            	currenttext = document.createTextNode("email");
		        	}else if(i === 4){
		        		var cDate = new Date(obj.creationdate);
		        		var cTimeString = cDate.getFullYear() + "-" + (cDate.getMonth() +1) + "-" + (cDate.getDay() +1);
		            	currenttext = document.createTextNode(cTimeString);
		        	}else if(i === 5){
		        		vDate = new Date(obj.validdate);
		            	var vTimeString = cDate.getFullYear() + "-" + (cDate.getMonth() +1) + "-" + (cDate.getDay() +1);
		            	currenttext = document.createTextNode(vTimeString);
		        	}

        			mycurrent_cell.appendChild(currenttext);
		            mycurrent_cell.setAttribute('class', 'tab_cell');
		            cell_cont.appendChild(mycurrent_cell);
		            mycurrent_row.appendChild(cell_cont);
	        	}
	        	//accept button
	        	else if(i === colCount -2){
	        		cell_cont.setAttribute('class', 'cell_cont_btnStornieren');
	        		cell_cont.addEventListener('click', function(ev){
	        			LOG("clicked stornieren");
	        			obj.status = "unassigned";
	        			saveJobToDB(obj);
	        			addRowToTable(1, obj);
	        			cell_cont.parentNode.parentNode.parentNode.removeChild(cell_cont.parentNode.parentNode);
	        		});
		            mycurrent_cell = document.createElement("td");
	        		currenttext = document.createTextNode("s");
        			mycurrent_cell.appendChild(currenttext);
		            mycurrent_cell.setAttribute('class', 'tab_cell');
		            cell_cont.appendChild(mycurrent_cell);
		            mycurrent_row.appendChild(cell_cont);;
	        	}
	        	//decline button
	        	else if(i === colCount -1){
	        		cell_cont.setAttribute('class', 'cell_cont_btnDelete');
	        		cell_cont.addEventListener('click', function(ev){
	        			LOG("clicked löschen");
	        			cell_cont.parentNode.parentNode.parentNode.removeChild(cell_cont.parentNode.parentNode);
	        		});
		            mycurrent_cell = document.createElement("td");
	        		currenttext = document.createTextNode("-");
        			mycurrent_cell.appendChild(currenttext);
		            mycurrent_cell.setAttribute('class', 'tab_cell');
		            cell_cont.appendChild(mycurrent_cell);
		            mycurrent_row.appendChild(cell_cont);
	        	}
	        }
	        mycurrent_row.setAttribute('class', 'tab_row');
	        row_cont.appendChild(mycurrent_row);
	        table.firstChild.firstChild.appendChild(row_cont);
	}
}



function cutString(string, length){
	if (string.length > length){
		var subStr = string.substring(0,(length - 3));
		subStr = subStr + "...";
		return subStr;
	}else{
		return string;
	}

}

function getJobsFromDB(done){

	http('get', '/api/jobs', {}, function(responseText) {
		response = JSON.parse(responseText);
		done(response);
	});

}

function saveJobToDB(job){

	http('put', '/api/job/' + job.id, job, function(responseText) {
		response = JSON.parse(responseText);
		console.log(response.message);

	});

}