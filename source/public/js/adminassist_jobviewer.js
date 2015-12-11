 window.onload= function () {

  App();

}

function schliessen(){
	window.close();

}


function ablehni(o){

//var w = window.open("ablehnen.html?email="+o.email);

}


function App() {
  that = {};

  var url_str = window.location.href;
  var res = url_str.split("?");
  var id_str = res[1];
  var res2 = id_str.split("=");
  var id = res2[1];

  var job = undefined;

  //get job
  getJobsFromDB(function(arraydata){
    for(var i = 0; i<arraydata.length; i++){
      var obj = arraydata[i];
      if(obj._id === id){
        job = obj;
        break;
      }
    }
  });

  if(job === undefined){
    alert("No Job found");
  }

  var inner_content = document.getElementById("job"); // private

  inner_content.setAttribute('class', 'viewer_inner_cont');

  var viewer_cont_header = dom('div',{});
  var viewer_cont_body = dom('div',{});
  var viewer_cont_foot = dom('div',{});

  inner_content.appendChild(viewer_cont_header);
  inner_content.appendChild(viewer_cont_body);
  inner_content.appendChild(viewer_cont_foot);

  viewer_cont_header.setAttribute('class', 'viewer_cont_header');  
  viewer_cont_body.setAttribute('class', 'viewer_cont_body');  
  viewer_cont_foot.setAttribute('class', 'viewer_cont_foot');

  var header_label = dom('viewer_title_label',{});
  header_label_text = document.createTextNode("Job Viewer");
  header_label.appendChild(header_label_text);
  header_label.setAttribute('class', 'viewer_header_label');

  viewer_cont_header.appendChild(header_label);

  var picture_section = dom('div',{});
  picture_section.setAttribute('class', 'viewer_picture_section');  
  viewer_cont_body.appendChild(picture_section);


  var newbutton,newbutton1,newbutton2;            //    AB HIER DIE BUTTONS

  newbutton1= document.createElement('input');            //        AKZEPTIEREN
  newbutton1.type= 'button';
  newbutton1.value='Akzeptieren';
  newbutton1.id= 'Akzeptieren';
  newbutton1.onclick = function () {
           schliessen();
  }
  newbutton1.setAttribute('class', 'viewer_btnAccept');

  newbutton= document.createElement('input');           //        ABLEHNEN
  newbutton.type= 'button';
  newbutton.value='Ablehnen';
  newbutton.id= 'Ablehnen';
  newbutton.onclick = function () {
           ablehni(obil);
  }
  newbutton.setAttribute('class', 'viewer_btnDecline');

  newbutton2= document.createElement('input');            //        ABBRECHEN
  newbutton2.type= 'button';
  newbutton2.value='Abbrechen';
  newbutton2.id= 'Abbrechen';
  newbutton2.onclick = function () {
          window.close();
  }
  newbutton2.setAttribute('class', 'viewer_btnCancel');

  viewer_cont_foot.appendChild(newbutton1);
  viewer_cont_foot.appendChild(newbutton);
  viewer_cont_foot.appendChild(newbutton2);

  /*TEST*/
  var bildi = new Image ();
  bildi.src = job.fullimage;      // object.quell
  
  picture_section.appendChild(bildi);


}

function getJobsFromDB(done){

  http('get', '/api/jobs', {}, function(responseText) {
    response = JSON.parse(responseText);
    done(response);
  });

}

function saveJobToDB(job){

  http('put', '/api/job/' + job._id, job, function(responseText) {
    response = JSON.parse(responseText);
    console.log(response.message);
  });

}
