/*
* My First Script
*
*
*/

window.onload = function () {

    document.getElementById('actTime').textContent = Date();
    console.log("Hello World...");


    document.getElementById('absButton').addEventListener('click', function (ev) { alert("bla"); });


    App();
};


function App() {
    var that = {};
    var content = document.getElementById("content"); // private

    var button = dom('button', { class: 'btna' }, 'Add ToDo');

    var textarea = dom('textarea', {

        name: name,
        class: 'txta',
        cols: 50,
        rows: 15,
        wrap: 'soft'
    },
	'');


    button.addEventListener('click', function (ev) {

        if (typeof (Storage) !== "undefined") {
            if (sessionStorage.clickcount) {
                sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
            } else {
                sessionStorage.clickcount = 1;
            }
            textarea.value = "You have clicked the button " + sessionStorage.clickcount + " time(s) in this session.";
        } else {
            textarea.value = "Sorry, your browser does not support web storage...";
        }

    });


    //textarea.setAttribute('class', 'hide');

    textarea.addEventListener('blur', function (ev) {
        console.log(textarea.value);
    });

    content.appendChild(button);
    content.appendChild(textarea);


    return that;


}

/*
function clickCounter() {

}
*/



function forEachIn(object, action) {
    for (var prop in object) {
        if (Object.prototype.hasOwnProperty.call(object, prop)) {
            if (typeof object[prop] !== 'function') {
                action(prop, object[prop]);
            }
        }
    }
}


function dom(tag, attributes) {
    tag = tag || 'H1';
    tag = tag.toUpperCase();
    attributes = attributes || [];
    var node = document.createElement(tag);
    if (attributes) {
        forEachIn(attributes, function (key, value) {
            node.setAttribute(key, value);
        });
    }

    for (var i = 2; i < arguments.length; ++i) {
        var child = arguments[i];
        if (typeof child === "string") {
            child = document.createTextNode(child);
            node.textnode = child;
        }
        node.appendChild(child);
    }

    return node;
}

function removeChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function removeChild(node) {
    node.parentNode.removeChild(node);
}
