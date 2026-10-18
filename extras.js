var topZ = 10;

function makeWindow(id, title, body, width, height) {
    var win = document.createElement("div");
    win.id = id;
    win.style.cssText = "display: none; width: " + width + "px; height: " + height + "px; border-radius: 20px; padding: 10px; position: absolute; top: 50%; left: 50%; border: 2px solid black; transform: translate(-50%, -50%); background-color: rgb(117, 206, 218);";
    win.innerHTML = `
        <div class="windowheader" id="${id}header">
            <div class="closebutton" id="${id}close"></div>
            <p class="headertext">${title}</p>
            <div style="width: 16px; margin-right: 6px; height: 16px;"></div>
        </div>
        <div style="margin: 6px; padding: 10px;">${body}</div>
    `;
    document.getElementById("desktopapp").appendChild(win);
    dragElement(win);
    document.getElementById(id + "close").addEventListener("click", function() {
        win.style.display = "none";
    });
    return win;
}

function openWindow(win) {
    topZ = topZ + 1;
    win.style.zIndex = topZ;
    win.style.display = "block";
}

function setColorBackground(color) {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = color;
}

function setImageBackground(url) {
    document.body.style.backgroundImage = "url(" + url + ")";
    document.body.style.backgroundSize = "cover";
}

var settingsBody = `
    <h3 style="margin-top: 0;">Background</h3>
    <button class="bgbutton" data-color="xp">Windows XP</button>
    <button class="bgbutton" data-color="#000000">Black</button>
    <button class="bgbutton" data-color="#ffb6c1">Pink</button>
    <button class="bgbutton" data-color="#90ee90">Green</button>
    <button class="bgbutton" data-color="#87ceeb">Sky</button>
`;

var storeApps = [
    {
        name: "Calculator",
        image: "calculator.png",
        desc: "adds, subtracts and other math stuff",
        width: 320,
        height: 260,
        body: `
            <input type="number" class="calcA" style="width: 80px;">
            <input type="number" class="calcB" style="width: 80px;">
            <br><br>
            <button class="calcop" data-op="+">+</button>
            <button class="calcop" data-op="-">-</button>
            <button class="calcop" data-op="*">x</button>
            <button class="calcop" data-op="/">/</button>
            <h2 class="calcResult">?</h2>
        `,
        setup: function(win) {
            var buttons = win.querySelectorAll(".calcop");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener("click", function() {
                    var a = win.querySelector(".calcA").value;
                    var b = win.querySelector(".calcB").value;
                    var result = win.querySelector(".calcResult");
                    if (a == "" || b == "") {
                        result.innerHTML = "type 2 numbers";
                        return;
                    }
                    a = Number(a);
                    b = Number(b);
                    var op = this.getAttribute("data-op");
                    if (op == "+") { result.innerHTML = a + b; }
                    if (op == "-") { result.innerHTML = a - b; }
                    if (op == "*") { result.innerHTML = a * b; }
                    if (op == "/") {
                        if (b == 0) {
                            result.innerHTML = "nope";
                        } else {
                            result.innerHTML = a / b;
                        }
                    }
                });
            }
        }
    },
    {
        name: "Brainrot Clicker",
        icon: "\u{1F9E0}",
        desc: "click the brain. thats the whole game",
        width: 300,
        height: 260,
        body: `
            <h3 style="margin-top: 0;">Brain points: <span class="brainScore">0</span></h3>
            <button class="brainButton" style="font-size: 60px; cursor: pointer;">\u{1F9E0}</button>
        `,
        setup: function(win) {
            var score = 0;
            win.querySelector(".brainButton").addEventListener("click", function() {
                score = score + 1;
                win.querySelector(".brainScore").innerHTML = score;
            });
        }
    }
];

var installed = [];

function installApp(index) {
    if (installed[index]) {
        return;
    }
    var app = storeApps[index];
    var win = makeWindow("appWindow" + index, app.name, app.body, app.width, app.height);
    app.setup(win);

    var icon = document.createElement("div");
    icon.className = "app";
    var picture = `<div style="width: 64px; height: 64px; font-size: 50px; text-align: center;">${app.icon}</div>`;
    if (app.image) {
        picture = `<img src="${app.image}" style="width: 64px; height: 64px;">`;
    }
    icon.innerHTML = picture + `<p style="font-size: 15px;">${app.name}</p>`;
    icon.addEventListener("click", function() {
        openWindow(win);
    });
    document.getElementById("desktopapp").appendChild(icon);
    installed[index] = true;
}

window.addEventListener("load", function() {

    var friendOS = document.getElementById("welcomeopen");
    var wrap = document.createElement("div");
    wrap.style.display = "flex";
    wrap.style.gap = "24px";
    friendOS.parentNode.insertBefore(wrap, friendOS);
    wrap.appendChild(friendOS);

    var settingsButton = document.createElement("p");
    settingsButton.id = "settingsopen";
    settingsButton.style.cursor = "pointer";
    settingsButton.style.margin = "8px 0px";
    settingsButton.innerHTML = "Settings";
    wrap.appendChild(settingsButton);

    var settingsWindow = makeWindow("settingsWindow", "Settings", settingsBody, 360, 150);
    settingsButton.addEventListener("click", function() {
        openWindow(settingsWindow);
    });

    var bgButtons = settingsWindow.querySelectorAll(".bgbutton");
    for (let i = 0; i < bgButtons.length; i++) {
        bgButtons[i].addEventListener("click", function() {
            var color = this.getAttribute("data-color");
            if (color == "xp") {
                setImageBackground("./windowsxp.jpg");
            } else {
                setColorBackground(color);
            }
        });
    }

    var storeBody = "<h3 style='margin-top: 0;'>Apps</h3>";
    for (let i = 0; i < storeApps.length; i++) {
        storeBody = storeBody + `
            <div style="margin-bottom: 14px;">
                <b>${storeApps[i].name}</b>
                <button class="installbutton" data-index="${i}">Install</button>
                <br>
                <span style="font-size: 13px;">${storeApps[i].desc}</span>
            </div>
        `;
    }
    var storeWindow = makeWindow("appStoreWindow", "App Store", storeBody, 400, 300);

    var storeIcon = document.createElement("div");
    storeIcon.className = "app";
    storeIcon.id = "appstore";
    storeIcon.innerHTML = `
        <img src="appstore.png" style="width: 64px; height: 64px;">
        <p style="font-size: 15px;">App Store</p>
    `;
    document.getElementById("notes").insertAdjacentElement("afterend", storeIcon);
    storeIcon.addEventListener("click", function() {
        openWindow(storeWindow);
    });

    var installButtons = storeWindow.querySelectorAll(".installbutton");
    for (let i = 0; i < installButtons.length; i++) {
        installButtons[i].addEventListener("click", function() {
            installApp(Number(this.getAttribute("data-index")));
            this.innerHTML = "Installed";
            this.disabled = true;
        });
    }
});
