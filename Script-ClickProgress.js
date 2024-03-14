function countProgress(region) {
    switch (region) {
        case 'Gen1':
            let elemsGen1 = document.getElementById('Gen1').getElementsByTagName('img').length;
            let ownedGen1 = document.getElementById('Gen1').querySelectorAll('.own').length;
            let progGen1 = document.getElementById('Gen1').getElementsByTagName('progress')[0];
            progGen1.setAttribute("value", ownedGen1);
            progGen1.setAttribute("title", ownedGen1.toString().concat("/", elemsGen1.toString()));
            break;
        case 'Gen2':
            let elemsGen2 = document.getElementById('Gen2').getElementsByTagName('img').length;
            let ownedGen2 = document.getElementById('Gen2').querySelectorAll('.own').length;
            let progGen2 = document.getElementById('Gen2').getElementsByTagName('progress')[0];
            progGen2.setAttribute("value", ownedGen2);
            progGen2.setAttribute("title", ownedGen2.toString().concat("/", elemsGen2.toString()));
            break;
        case 'Gen3':
            let elemsGen3 = document.getElementById('Gen3').getElementsByTagName('img').length;
            let ownedGen3 = document.getElementById('Gen3').querySelectorAll('.own').length;
            let progGen3 = document.getElementById('Gen3').getElementsByTagName('progress')[0];
            progGen3.setAttribute("value", ownedGen3);
            progGen3.setAttribute("title", ownedGen3.toString().concat("/", elemsGen3.toString()));
            break;
        case 'Gen4':
            let elemsGen4 = document.getElementById('Gen4').getElementsByTagName('img').length;
            let ownedGen4 = document.getElementById('Gen4').querySelectorAll('.own').length;
            let progGen4 = document.getElementById('Gen4').getElementsByTagName('progress')[0];
            progGen4.setAttribute("value", ownedGen4);
            progGen4.setAttribute("title", ownedGen4.toString().concat("/", elemsGen4.toString()));
            break;
        case 'Gen5':
            let elemsGen5 = document.getElementById('Gen5').getElementsByTagName('img').length;
            let ownedGen5 = document.getElementById('Gen5').querySelectorAll('.own').length;
            let progGen5 = document.getElementById('Gen5').getElementsByTagName('progress')[0];
            progGen5.setAttribute("value", ownedGen5);
            progGen5.setAttribute("title", ownedGen5.toString().concat("/", elemsGen5.toString()));
            break;
        case 'Gen6':
            let elemsGen6 = document.getElementById('Gen6').getElementsByTagName('img').length;
            let ownedGen6 = document.getElementById('Gen6').querySelectorAll('.own').length;
            let progGen6 = document.getElementById('Gen6').getElementsByTagName('progress')[0];
            progGen6.setAttribute("value", ownedGen6);
            progGen6.setAttribute("title", ownedGen6.toString().concat("/", elemsGen6.toString()));
            break;
        case 'Gen7':
            let elemsGen7 = document.getElementById('Gen7').getElementsByTagName('img').length;
            let ownedGen7 = document.getElementById('Gen7').querySelectorAll('.own').length;
            let progGen7 = document.getElementById('Gen7').getElementsByTagName('progress')[0];
            progGen7.setAttribute("value", ownedGen7);
            progGen7.setAttribute("title", ownedGen7.toString().concat("/", elemsGen7.toString()));
            break;
        case 'Gen8':
            let elemsGen8 = document.getElementById('Gen8').getElementsByTagName('img').length;
            let ownedGen8 = document.getElementById('Gen8').querySelectorAll('.own').length;
            let progGen8 = document.getElementById('Gen8').getElementsByTagName('progress')[0];
            progGen8.setAttribute("value", ownedGen8);
            progGen8.setAttribute("title", ownedGen8.toString().concat("/", elemsGen8.toString()));
            break;
        case 'Gen9':
            let elemsGen9 = document.getElementById('Gen9').getElementsByTagName('img').length;
            let ownedGen9 = document.getElementById('Gen9').querySelectorAll('.own').length;
            let progGen9 = document.getElementById('Gen9').getElementsByTagName('progress')[0];
            progGen9.setAttribute("value", ownedGen9);
            progGen9.setAttribute("title", ownedGen9.toString().concat("/", elemsGen9.toString()));
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
            countProgress('Gen1');
            countProgress('Gen2');
            countProgress('Gen3');
            countProgress('Gen4');
            countProgress('Gen5');
            countProgress('Gen6');
            countProgress('Gen7');
            countProgress('Gen8');
            countProgress('Gen9');
            countProgress('Novelty');
    }
}

function mark(elem, region, status = "own",) {
    if (status === "own") {
        elem.classList = "own";
    } else if (status === "notown") {
        elem.classList = "notown";
    } else {
        console.log("Invalid status passed, setting", elem.alt, "to owned");
        console.log("status passed was", status);
        elem.classList = "own";
    }
    /* note that these assume that the Pokémon images only have EITHER
    the class "own" OR the class "notown", since they overwrite the
    whole class list with only one of those two.*/
    localStorage.setItem("shiny ".concat(elem.alt), elem.classList);
    countProgress(region);
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
        elems[i].addEventListener('click', function () {
            status = localStorage.getItem("shiny ".concat(this.alt));
            region = this.parentElement.parentElement.id;
            if (status === "own") {
                mark(this, region, "notown");
                // on a click, we want to set the _opposite_ status
            } else if (status === "notown") {
                mark(this, region, "own");
                // same thing
            } else {
                mark(this, region);
                /* if there was no stored status, the existing status is notown,
                so we set to own, which is the default for this function */
            }
        });

        let state = localStorage.getItem("shiny ".concat(elems[i].alt));
        if (state !== null) {
            console.log('state is not null, state is', state);
            if (state !== elems[i].alt) {
                mark(elems[i], elems[i].parentElement.parentElement.id, state);
            }
        }
    }
    countProgress();
}