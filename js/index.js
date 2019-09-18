
    // var character_objects=new Set();
    var character_objects_array;
    var url_character_objects="https://jeffreylancaster.github.io/game-of-thrones/data/characters.json";
    var filterd_character_objects_array=[];
  
 var procces_objects=(charc_array)=>{
        charc_array.forEach(e=>{
            var obj={};
            Object.keys(e).forEach(element => {
            
                if(element=="characterName"||element=="houseName"||
                element=="characterImageFull"||element=="actorName"||element=="nickname"||element=="killedBy"){
                    obj[element]=e[element];
               }  
            });
            filterd_character_objects_array.push(obj);
        });
    
    }
    
var fetching= ()=>{
    fetch(url_character_objects)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        character_objects_array=data.characters.filter(e=>(e.royal==true));
        procces_objects(character_objects_array);
    })
    .catch(function(error) {
      console.log(error);
    })
}

fetching();

console.log(filterd_character_objects_array);