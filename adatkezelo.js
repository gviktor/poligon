var korvonal;
var vastagsag;
var kitoltes;
var koordinatak = new Array();

function tombbeRak() {
    // az egész poligonra vonatkozó adatok
    korvonal = adatok.szinek.korvonal;
    vastagsag = adatok.szinek.korvonalVastagsag;
    kitoltes = adatok.szinek.kitoltes;
    // egyéni pontok
    for (i in adatok.koordinatak) {
        x = adatok.koordinatak[i].x;
        y = adatok.koordinatak[i].y;
        koordinatak[i] = { x, y };
        // alert(koordinatak[i].x+","+koordinatak[i].y);
    }
}
function kirajzol() {
    var vaszon = document.getElementById("vaszon");
    if (vaszon.getContext) {
        var alakzat1 = vaszon.getContext("2d");
        alakzat1.font = "16pt Arial";
        alakzat1.fillText("teszt1", 20, 20);
        alakzat1.beginPath();
        alakzat1.moveTo(koordinatak[0].x, koordinatak[0].y);

        for (i in koordinatak) {
            alakzat1.lineTo(koordinatak[i].x, koordinatak[i].y);
        }

        alakzat1.closePath();
        var korvonalSzin = "rgb(" + korvonal.r + "," + korvonal.g + "," + korvonal.b + ")";
        // alert(korvonalSzin);
        alakzat1.strokeStyle = korvonalSzin;
        alakzat1.lineWidth = vastagsag;
        alakzat1.stroke();
        var kitoltoSzin = "rgb(" + kitoltes.r + "," + kitoltes.g + "," + kitoltes.b + ")";
        // alert(kitoltoSzin);
        alakzat1.fillStyle = kitoltoSzin;
        alakzat1.fill();
    }
}

function betolt(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'adatok.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function beolvas() {
    betolt(function (valasz) {
        adatok = JSON.parse(valasz);
        console.log(adatok);
        tombbeRak();
        kirajzol();
    })
}
