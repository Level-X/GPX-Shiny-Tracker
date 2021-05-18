function mark(elem) {
    if (elem.classList.contains("own")) {
        elem.classList = "notown";
    } else if (elem.classList.contains("notown")) {
        elem.classList = "own";
    }
    /* note that these assume that the Pokémon images only have EITHER
    the class "own" OR the class "notown", since they overwrite the
    whole class list with only one of those two.*/
    localStorage.setItem("shiny ".concat(elem.title), elem.classList);
}

function markAll() {
    const elems = document.getElementsByTagName("img");
    /* an extra class on each img would be necessary if there were any imgs that were
    not Pokémon, but there are not */
    
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].id === "Top") {
            continue;
        }
        elems[i].onclick = mark; // to ensure this is the caller
        elems[i].addEventListener('click', function(){
            mark(this); // 'this' is <img ...> (the clicked element) in this context
        });

        let state = localStorage.getItem("shiny ".concat(elems[i].title));
        if (state !== null) {
            console.log('state is not "", state is', state);
            if (state !== elems[i].title) {
                mark(elems[i]);
            }
        }
    }
}