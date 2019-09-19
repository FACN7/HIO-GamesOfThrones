// var character_objects=new Set();
var character_objects_array;
var url_character_objects = "https://jeffreylancaster.github.io/game-of-thrones/data/characters.json";
var filterd_character_objects_array = [];

var procces_objects = (charc_array,callback) => {
    charc_array.forEach(e => {
        var obj = {};
        Object.keys(e).forEach(element => {

            if (element == "characterName" || element == "houseName" ||
                element == "characterImageFull" || element == "actorName"  || element == "killedBy") {
                obj[element] = e[element];
            }
        });
        filterd_character_objects_array.push(obj);
    });
    console.log(filterd_character_objects_array[0].characterName);
    callback();

}

var fetching = (callback) => {
    fetch(url_character_objects)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            character_objects_array = data.characters.filter(e => (e.royal == true && e.characterImageFull!=null));
            procces_objects(character_objects_array,callback);
        })
        .catch(function (error) {
            console.log(error);
        })
}
function cleanCard(Card){
    Card.getElementsByClassName("chracter_killer")[0].textContent="KILLED BY- ";
    Card.getElementsByClassName("chracter_origin")[0].textContent="ORIGIN-";
    Card.getElementsByClassName("chracter_real_name")[0].textContent="ACTOR-"
    // Card.getElementsByClassName("chracter_nick_name")[0].textContent="NICK NAME :";
}
function modifyByDom(){
    var card=document.getElementsByClassName("flip-card")[0];
    let i=0;
    filterd_character_objects_array.forEach(e=>{
        card.getElementsByClassName("chracter_killer")[0].textContent+=e.killedBy==undefined?"Still Alive":e.killedBy[0];
        card.getElementsByClassName("chracter_name")[0].textContent=e.characterName;
        // card.getElementsByClassName("chracter_nick_name")[0].textContent+=e.nickname==undefined?"":e.nickname;
        card.getElementsByClassName("chracter_origin")[0].textContent+=e.houseName==undefined?"NONE":e.houseName;
        card.getElementsByClassName("chracter_real_name")[0].textContent+=e.actorName==undefined?"NONE":e.actorName;
        if(e.characterName=="Daenerys Targaryen"){
            card.getElementsByClassName("chracter_image")[0].src="https://pixel.nymag.com/imgs/daily/vulture/2019/05/17/17-daenerys-got-tragedy.w700.h467.jpg";

        }else{
        card.getElementsByClassName("chracter_image")[0].src=e.characterImageFull;
        }
        if(i<filterd_character_objects_array.length-1){
      var cln = card.cloneNode(true);
      cleanCard(cln)
      card.parentElement.appendChild(cln);
      card=cln;
        }
        i=i+1;
    });


}

function IconResizeunder768(arg) {
    if (arg.matches) { // If media query matches
      document.getElementById("Icons").className="fab fa-github fa-2x";
    } else {
        document.getElementById("Icons").className="fab fa-github fa-3x";
    }
  }
  document.getElementById("Icons").style="color: white"

  var width768 = window.matchMedia("(max-width: 768px)");
  IconResizeunder768(width768) // Call listener function at run time
  width768.addListener(IconResizeunder768) // Attach listener function on state changes
fetching(modifyByDom);




