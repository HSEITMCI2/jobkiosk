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
	var tab_unsignedJobs_header = new Array(["PDF Name", "Stellenart", "Firma", "Email des Recruiters", 
											 "Einstelldatum", "gültig bis", "akzeptieren", "nicht akzeptieren"]);
	var tab_acceptedJobs_header = new Array(["PDF Name", "Stellenart", "Firma", "Email des Recruiters", 
											 "Einstelldatum", "gültig bis", "stornieren"]);	
	var tab_declinedJobs_header = new Array(["PDF Name", "Stellenart", "Firma", "Email des Recruiters", 
											 "Einstelldatum", "gültig bis", "stornieren", "löschen"]);	


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

				var newData = new Array([obj.pdffilename, obj.jobtype, obj.company, "obj.email", obj.creationdate, obj.validdate]);
				addRowToTable(1, newData);

			}else if(obj.status === "unassigned"){

				var unsData = new Array([obj.pdffilename, obj.jobtype, obj.company, "obj.email", obj.creationdate, obj.validdate]);
				addRowToTable(1, unsData);

			}else if(obj.status === "accepted"){
				
				var accData = new Array([obj.pdffilename, obj.jobtype, obj.company, "obj.email", obj.creationdate, obj.validdate]);
				addRowToTable(2, accData);

			}else if(obj.status === "declined"){
				
				var unsData = new Array([obj.pdffilename, obj.jobtype, obj.company, "obj.email", obj.creationdate, obj.validdate]);
				addRowToTable(3, decData);

			}
		}
	});

	//TEST
	/*
	var bspData1 = new Array(["Audi_Technische_Informatik_Stelle2.pdf", "Praktikum", "Audi", "debora.heinz@audi.de", "15.10.15", "14.03.16"]);
	addRowToTable(1, bspData1);
	addRowToTable(2, bspData1);
	addRowToTable(3, bspData1);

	var bspData2 = new Array(["Daimler_Bachelor021313997.pdf", "Bachelor-Arbeit", "Daimler AG", "friedrich.blubb@daimler.de", "22.11.15", "17.05.16"]);
	addRowToTable(1, bspData2);
	addRowToTable(2, bspData2);
	addRowToTable(3, bspData2);

	var bspData3 = new Array(["Festo_Werkstudent_2121212.pdf", "Werkstudent", "Festo", "Anne-Sophie.Scharlatan@festo_werk1.de", "05.10.15", "12.02.16"]);
	addRowToTable(1, bspData3);
	addRowToTable(2, bspData3);
	addRowToTable(3, bspData3);
	*/
	//~TEST

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

function matrix( rows, cols, defaultValue){

  var arr = [];

  // Creates all lines:
  for(var i=0; i < rows; i++){

      // Creates an empty line
      arr.push([]);

      // Adds cols to the empty line:
      arr[i].push( new Array(cols));

      for(var j=0; j < cols; j++){
        // Initializes:
        arr[i][j] = defaultValue;
      }
  }

return arr;
}

window.onload = function () {
	App();
};


function addRowToTable(tabID, rowData){

	var table = document.getElementById(tabID);
	
	//unsigned Table
	if (tabID === 1){
		var colCount = table.firstChild.firstChild.firstChild.firstChild.childElementCount


		if((colCount -2) === rowData[0].length){

			mycurrent_row = document.createElement("tr");
	        var row_cont = dom('div',{});

	        row_cont.setAttribute('class', 'row_cont');

	        for(var i = 0; i < colCount; i++) {
	        		var cell_cont = dom('div',{});
	        	if(i < colCount -2){
	        		cell_cont.setAttribute('class', ('cell_cont_col' + String(i)));
		            mycurrent_cell = document.createElement("td");
		            
		            if(i === 0){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 32));
		        	}else if(i === 1){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 15));
		        	}else if(i === 2){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 15));
		        	}else if(i === 3){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 25));
		        	}else if(i === 4){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 10));
		        	}else if(i === 5){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 10));
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
	        			addRowToTable(2, rowData);
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
	        			addRowToTable(3, rowData);
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

		}else{
			LOG("Wrong RowData dimension in function <addRowToTable>");
		}
	}

	//accepted Table
	else if(tabID === 2){
		var colCount = table.firstChild.firstChild.firstChild.firstChild.childElementCount


		if((colCount -1) === rowData[0].length){

			mycurrent_row = document.createElement("tr");
	        var row_cont = dom('div',{});

	        row_cont.setAttribute('class', 'row_cont');

	        for(var i = 0; i < colCount; i++) {
	        		var cell_cont = dom('div',{});
	        	if(i < colCount -1){
	        		cell_cont.setAttribute('class', ('cell_cont_col' + String(i)));
		            mycurrent_cell = document.createElement("td");
		            
		            if(i === 0){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 32));
		        	}else if(i === 1){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 15));
		        	}else if(i === 2){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 15));
		        	}else if(i === 3){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 25));
		        	}else if(i === 4){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 10));
		        	}else if(i === 5){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 10));
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
	        			addRowToTable(1, rowData);
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

		}else{
			LOG("Wrong RowData dimension in function <addRowToTable>");
		}
	}

	//declined Table
	else if(tabID === 3){
		var colCount = table.firstChild.firstChild.firstChild.firstChild.childElementCount


		if((colCount -2) === rowData[0].length){

			mycurrent_row = document.createElement("tr");
	        var row_cont = dom('div',{});

	        row_cont.setAttribute('class', 'row_cont');

	        for(var i = 0; i < colCount; i++) {
	        		var cell_cont = dom('div',{});
	        	if(i < colCount -2){
	        		cell_cont.setAttribute('class', ('cell_cont_col' + String(i)));
		            mycurrent_cell = document.createElement("td");
		            
		            if(i === 0){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 32));
		        	}else if(i === 1){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 15));
		        	}else if(i === 2){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 15));
		        	}else if(i === 3){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 25));
		        	}else if(i === 4){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 10));
		        	}else if(i === 5){
		            	currenttext = document.createTextNode(cutString(rowData[0][i], 10));
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
	        			addRowToTable(1, rowData);
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

		}else{
			LOG("Wrong RowData dimension in function <addRowToTable>");
		}
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

