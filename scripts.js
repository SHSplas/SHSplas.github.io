var topZ = 10;
dragElement(document.getElementById("welcomescreen"));

function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
    element.onmousedown = startDragging;
    }

    function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.zIndex = ++topZ;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
    }

    function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
    }
}

var welcomeScreen = document.querySelector("#welcomescreen");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.addEventListener("click", function() {
  welcomeScreen.style.display = "none";
});

welcomeScreenOpen.addEventListener("click", function() {
  welcomeScreen.style.display = "block";
});


window.onload = function() {
    document.getElementById("craftMine").addEventListener("click", function() {
        document.getElementById("craftMineWindow").style.display = "block";
        this.classList.toggle("selected");
    });
    dragElement(document.getElementById("craftMineWindow"));

    document.getElementById("craftMineWindow").addEventListener("click", function () {
        this.classList.toggle("taped");
    });

    document.getElementById("welcomescreen").addEventListener("click", function () {
        this.classList.toggle("taped");
    });

    document.getElementById("craftMineWindowclose").addEventListener("click", function() {
        document.getElementById("craftMineWindow").style.display = "none";
        document.getElementById("craftMine").classList.remove("selected");
    });

    dragElement(document.getElementById("notesWindow"));

    document.getElementById("notesWindowclose").addEventListener("click", function() {
        document.getElementById("notesWindow").style.display = "none";
        document.getElementById("notes").classList.remove("selected");
    });

    document.getElementById("notes").addEventListener("click", function() {
        document.getElementById("notesWindow").style.display = "block";
        this.classList.toggle("selected");
    });
  
    renderSidebar();
  

};



var content = [
    { title: "Shopping list", date: "Sep 1", text: "Milk, eggs, bread" },
    { title: "Homework", date: "Sep 2", text: "Finish math worksheet, read chapter 5 english" }
];
function setNotesContent(index) {
    var note = content[index];
    document.getElementById("notescontent").innerHTML = `
        <h1 id="titleEdit" contenteditable="true">${note.title}</h1>
        <div id="textEdit" contenteditable="true">${note.text}</div>
    `;

    document.getElementById("titleEdit").addEventListener("input", function() {
        content[index].title = this.innerHTML;
        renderSidebar();
    });
  
    document.getElementById("textEdit").addEventListener("input", function() {
        content[index].text = this.innerHTML;
    });
}
function addToSideBar(index) {
    var sidebar = document.querySelector("#sidebar");
    var note = content[index];
    var newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <p class="titleField" style="margin: 0px;">${note.title}</p>
        <p class="dateField" style="font-size: 12px; margin: 0px;" contenteditable="true">${note.date}</p>
    `;
    newDiv.querySelector(".titleField").addEventListener("click", function() {
        setNotesContent(index);
    });
    newDiv.querySelector(".dateField").addEventListener("input", function() {
        content[index].date = this.innerHTML;
    });
    sidebar.appendChild(newDiv);
}
function renderSidebar() {
    document.querySelector("#sidebar").innerHTML = `
        <h1>Notes selector</h1>
        <button id="addnote">+ New Note</button>
    `;
    document.getElementById("addnote").addEventListener("click", addNote);
    for (let i = 0; i < content.length; i++) {
        addToSideBar(i);
    }
}

function addNote() {
  content.push({ title: "new note", date: "", text: "" });
  renderSidebar();
}