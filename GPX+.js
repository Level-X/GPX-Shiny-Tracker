function countProgress(region) {
    switch(region) {
        case 'Kanto':
            let elemsKanto = document.getElementById('Kanto').getElementsByTagName('img').length;
            let ownedKanto = document.getElementById('Kanto').querySelectorAll('.own').length;
            let progKanto = document.getElementById('Kanto').getElementsByTagName('progress')[0];
            progKanto.setAttribute("value", ownedKanto);
            progKanto.setAttribute("title", ownedKanto.toString().concat("/", elemsKanto.toString()));
            break;
        case 'Johto':
            let elemsJohto = document.getElementById('Johto').getElementsByTagName('img').length;
            let ownedJohto = document.getElementById('Johto').querySelectorAll('.own').length;
            let progJohto = document.getElementById('Johto').getElementsByTagName('progress')[0];
            progJohto.setAttribute("value", ownedJohto);
            progJohto.setAttribute("title", ownedJohto.toString().concat("/", elemsJohto.toString()));
            break;
        case 'Hoenn':
            let elemsHoenn = document.getElementById('Hoenn').getElementsByTagName('img').length;
            let ownedHoenn = document.getElementById('Hoenn').querySelectorAll('.own').length;
            let progHoenn = document.getElementById('Hoenn').getElementsByTagName('progress')[0];
            progHoenn.setAttribute("value", ownedHoenn);
            progHoenn.setAttribute("title", ownedHoenn.toString().concat("/", elemsHoenn.toString()));
            break;
        case 'Sinnoh':
            let elemsSinnoh = document.getElementById('Sinnoh').getElementsByTagName('img').length;
            let ownedSinnoh = document.getElementById('Sinnoh').querySelectorAll('.own').length;
            let progSinnoh = document.getElementById('Sinnoh').getElementsByTagName('progress')[0];
            progSinnoh.setAttribute("value", ownedSinnoh);
            progSinnoh.setAttribute("title", ownedSinnoh.toString().concat("/", elemsSinnoh.toString()));
            break;
        case 'Unova':
            let elemsUnova = document.getElementById('Unova').getElementsByTagName('img').length;
            let ownedUnova = document.getElementById('Unova').querySelectorAll('.own').length;
            let progUnova = document.getElementById('Unova').getElementsByTagName('progress')[0];
            progUnova.setAttribute("value", ownedUnova);
            progUnova.setAttribute("title", ownedUnova.toString().concat("/", elemsUnova.toString()));
            break;
        case 'Kalos':
            let elemsKalos = document.getElementById('Kalos').getElementsByTagName('img').length;
            let ownedKalos = document.getElementById('Kalos').querySelectorAll('.own').length;
            let progKalos = document.getElementById('Kalos').getElementsByTagName('progress')[0];
            progKalos.setAttribute("value", ownedKalos);
            progKalos.setAttribute("title", ownedKalos.toString().concat("/", elemsKalos.toString()));
            break;
        case 'Alola':
            let elemsAlola = document.getElementById('Alola').getElementsByTagName('img').length;
            let ownedAlola = document.getElementById('Alola').querySelectorAll('.own').length;
            let progAlola = document.getElementById('Alola').getElementsByTagName('progress')[0];
            progAlola.setAttribute("value", ownedAlola);
            progAlola.setAttribute("title", ownedAlola.toString().concat("/", elemsAlola.toString()));
            break;
        case 'Galar':
            let elemsGalar = document.getElementById('Galar').getElementsByTagName('img').length;
            let ownedGalar = document.getElementById('Galar').querySelectorAll('.own').length;
            let progGalar = document.getElementById('Galar').getElementsByTagName('progress')[0];
            progGalar.setAttribute("value", ownedGalar);
            progGalar.setAttribute("title", ownedGalar.toString().concat("/", elemsGalar.toString()));
            break;
        case 'Novelty':
            let elemsNovelty = document.getElementById('Novelty').getElementsByTagName('img').length;
            let ownedNovelty = document.getElementById('Novelty').querySelectorAll('.own').length;
            let progNovelty = document.getElementById('Novelty').getElementsByTagName('progress')[0];
            progNovelty.setAttribute("value", ownedNovelty);
            progNovelty.setAttribute("title", ownedNovelty.toString().concat("/", elemsNovelty.toString()));
            break;
        default:
            console.log("counting all regions by default");
            countProgress('Kanto');
            countProgress('Johto');
            countProgress('Hoenn');
            countProgress('Sinnoh');
            countProgress('Unova');
            countProgress('Kalos');
            countProgress('Alola');
            countProgress('Galar');
            countProgress('Novelty');
    }
}

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
    countProgress(elem.parentElement.parentElement.id);
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
    countProgress();
}