function mark(elem) {
    let idStr = elem.id;
    console.log(elem, idStr);
    if (idStr === "own") {
        elem.id = "notown";
    } else if (idStr === "notown") {
        elem.id = "own";
    }
}

function markAll() {
    const elems = document.getElementsByTagName("img");
    /* a class on each img would be necessary if there were any imgs that were not Pokémon,
    but there are not */
    
    for (let i = 0; i < elems.length; i++) {
      elems[i].onclick = mark; // to ensure this is the caller
      elems[i].addEventListener('click', function(){
        mark(this); // 'this' is <img ...> (the clicked element) in this context
      });
    }
  }