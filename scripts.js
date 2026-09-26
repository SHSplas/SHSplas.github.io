// Make the DIV element draggable:
dragElement(document.getElementById("welcomescreen"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
    if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
    }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
    function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
    }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
    function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
    }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
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
    document.querySelector("#sidebar").innerHTML = "<h1>Notes selector</h1>";
    for (let i = 0; i < content.length; i++) {
        addToSideBar(i);
    }
}

function addNote() {
  content.push({ title: "new note", date: "", text: "" });
  renderSidebar();
}