var userInfo = {};
var cards = [];
var looper;
window.onload = preventFormSubmit;
var bolet = 0;
function register(formObject){
    var card = {
        "tipo": formObject.tipo.value,
        "who": formObject.who.value,
        "adress": formObject.adress.value,
        "comments": formObject.comments.value,
        "boleta": bolet++,
        "start": new Date(),
    }
    cards.push(card);
    formObject.reset();
}

function preventFormSubmit() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', function(event) {
        event.preventDefault();
        });
    }
}

function showWin(page,butt){
    switch(page){
        case "list":
            document.getElementById('mainCard').style.display = "none";
            showCards();
            document.getElementById('cardss').style.display = "block";
            break;
        case "new":
            document.getElementById('mainCard').style.display = "block";
            document.getElementById('cardss').style.display = "none";
            clearInterval(looper);
            break;
    }
    butt.blur();
}

function showCards(){
    clearInterval(looper);
    var panel = document.getElementById('cardss');
    panel.innerHTML = "";
    var template =
    `<div id="#BOLETA" class="card">
        <div class="cardH">
            #TIPO
            <div class="timeOut">#TIME</div>
        </div>
        <div class="cardB">
            <div style="display: flex;"><label>Solicitante:</label><p style="margin-left:6px;">#WHO</p></div>
            <div style="display: flex;background-color: white;min-height:70px;padding: 3px;"><label>Direccion:</label><p style="margin-left:6px;">#ADRESS</p></div>
            
            <div class="card_butts"><button type="button" onclick="cerrar(#BOLETA);">ENTREGA</button></div>
        </div>
    </div>`;

    var innerBody = "";
    for(var i = 0; i < cards.length; i++){
        var tt = Math.floor((new Date() - cards[i].start)/1000);//Seconds
        var tHor = Math.floor(tt/3600);//hours
        var tMin = Math.floor((tt%3600)/60);//minutes
        var tSeg = tt%60;
        var toPaste = template
        .replace("#TIPO",cards[i].tipo)
        .replace("#WHO",cards[i].who)
        .replace("#ADRESS",cards[i].adress)
        .replace("#TIME",tHor+"h:"+tMin+"m:"+tSeg+"s")
        .replace(/#BOLETA/g,cards[i].boleta);
        innerBody += toPaste;
    }
    panel.innerHTML = innerBody;
    looper = setInterval(loopingTime,5000);
}

function cerrar(which){
    alert(which);
}

function loopingTime(){
    var panel = document.getElementById('cardss');
    var elementsTime = panel.querySelectorAll('.timeOut');
    for(var i = 0; i < elementsTime.length; i++){
        var hms = elementsTime[i].innerHTML.match(/\d+/g);
        if(+hms[2] + 5 >= 60){
            hms[2] = (+hms[2] + 5)%60;
            if(+hms[1] + 1 == 60){
                hms[0] = +hms[0] + 1;
                hms[1] = 0;
            } else{
                hms[1] = +hms[1] + 1;
            }
        } else{
            hms[2] = +hms[2] + 5;
        }
        elementsTime[i].innerHTML = hms[0] + "h:" + hms[1] + "m:" + hms[2] + "s";
    }
}
