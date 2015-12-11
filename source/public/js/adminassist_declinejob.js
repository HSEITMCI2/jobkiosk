window.onload = function(){
//console.log(window.location.href);
var str = window.location.href;					// email von object holen
var res = str.split("?");
var str1 = res[1];
var emaili = str1.split("=");






var sec = document.createElement("section");						// an recruter
var text = document.createTextNode("An Recruter : "+ emaili[1]);
sec.appendChild(text);



var langi = document.createTextNode("Praktikumsdauer nicht passend");
var falschi = document.createTextNode("Falscher Kontext");
var inki = document.createTextNode("Inkompatibler studiengang");
var leeri = document.createTextNode("Eigener Eintrag");



var navii = document.createElement("aside");



var sec1 = document.createElement("section");						// grund
var grund = document.createTextNode("Grund: ");

sec1.appendChild(grund);




var newradio,newradio1,newradio2,newradio3;
var sec2 = document.createElement("section");							// RADIO ZU LANG
newradio= document.createElement('input');						
newradio.type= 'radio';
newradio.name= 'joko';
newradio.value='Abschicken';
//newbutton.id= 'Ablehnen';
newradio.onclick = function () {
          texi.value= "Sehr geehrte ___, der von Ihnen angebotene Praktikum ist zu lang oder zu kurz";
}
newradio1= document.createElement('input');									// falscher kontext
newradio1.type= 'radio';
newradio1.name='joko';
newradio1.value='Abschicken';
//newbutton.id= 'Ablehnen';
newradio1.onclick = function () {
           texi.value= "Sehr geehrte ____, der von Ihnen angebotene Praktikum hat einen falschen kontext";
}


var sec3 = document.createElement("section");	
newradio2= document.createElement('input');						
newradio2.type= 'radio';
newradio2.name= 'joko';
newradio2.value='Abschicken';
//newbutton.id= 'Ablehnen';
newradio2.onclick = function () {
           texi.value= "Sehr geehrte _____, der von Ihnen angebotene Praktikum ist ist nicht kompatibel";
}
newradio3= document.createElement('input');									// falscher kontext
newradio3.type= 'radio';
newradio3.name='joko';
newradio3.value='Abschicken';
//newbutton.id= 'Ablehnen';
newradio3.onclick = function () {
           texi.value= " ";
}


sec2.appendChild(newradio);
sec2.appendChild(langi);
sec2.appendChild(newradio1);
sec2.appendChild(falschi);

sec3.appendChild(newradio2);
sec3.appendChild(inki);
sec3.appendChild(newradio3);
sec3.appendChild(leeri);


var wohin = document.getElementById("silly");
navii.appendChild(sec);
navii.appendChild(sec1);
navii.appendChild(sec2);
navii.appendChild(sec3);



var texi = document.createElement("TEXTAREA");

texi.rows= "20";
navii.appendChild(texi);

var newbutton;
var secc = document.createElement("section");
newbutton= document.createElement('input');						//        Abschicken
newbutton.type= 'button';
newbutton.name='Abschicken';
newbutton.value='Abschicken';
newbutton.id= 'Abschicken';
newbutton.onclick = function () {
           alert(texi.value);
}
secc.appendChild(newbutton);
navii.appendChild(secc);


wohin.appendChild(navii);


}