function countProgress(region) {
    switch (region) {
        case 'Gen1':
            let elemsGen1 = document.getElementsByClassName('Gen1').length;
            let ownedGen1 = document.querySelectorAll('.Gen1 .own').length;
            /* document.querySelectorAll uses CSS selectors which you can chain normally, so here I select
            all elements with the class ".own" that are anywhere under elements with the class ".Gen1". cool!*/
            let progGen1 = document.getElementById('progressBars').getElementsByTagName('progress')[0];
            progGen1.setAttribute("value", ownedGen1);
            progGen1.setAttribute("title", ownedGen1.toString().concat("/", elemsGen1.toString()));
            break;
        case 'Gen2':
            let elemsGen2 = document.getElementsByClassName('Gen2').length;
            let ownedGen2 = document.querySelectorAll('.Gen2 .own').length;
            let progGen2 = document.getElementById('progressBars').getElementsByTagName('progress')[1];
            progGen2.setAttribute("value", ownedGen2);
            progGen2.setAttribute("title", ownedGen2.toString().concat("/", elemsGen2.toString()));
            break;
        case 'Gen3':
            let elemsGen3 = document.getElementsByClassName('Gen3').length;
            let ownedGen3 = document.querySelectorAll('.Gen3 .own').length;
            let progGen3 = document.getElementById('progressBars').getElementsByTagName('progress')[2];
            progGen3.setAttribute("value", ownedGen3);
            progGen3.setAttribute("title", ownedGen3.toString().concat("/", elemsGen3.toString()));
            break;
        case 'Gen4':
            let elemsGen4 = document.getElementsByClassName('Gen4').length;
            let ownedGen4 = document.querySelectorAll('.Gen4 .own').length;
            let progGen4 = document.getElementById('progressBars').getElementsByTagName('progress')[3];
            progGen4.setAttribute("value", ownedGen4);
            progGen4.setAttribute("title", ownedGen4.toString().concat("/", elemsGen4.toString()));
            break;
        case 'Gen5':
            let elemsGen5 = document.getElementsByClassName('Gen5').length;
            let ownedGen5 = document.querySelectorAll('.Gen5 .own').length;
            let progGen5 = document.getElementById('progressBars').getElementsByTagName('progress')[4];
            progGen5.setAttribute("value", ownedGen5);
            progGen5.setAttribute("title", ownedGen5.toString().concat("/", elemsGen5.toString()));
            break;
        case 'Gen6':
            let elemsGen6 = document.getElementsByClassName('Gen6').length;
            let ownedGen6 = document.querySelectorAll('.Gen6 .own').length;
            let progGen6 = document.getElementById('progressBars').getElementsByTagName('progress')[5];
            progGen6.setAttribute("value", ownedGen6);
            progGen6.setAttribute("title", ownedGen6.toString().concat("/", elemsGen6.toString()));
            break;
        case 'Gen7':
            let elemsGen7 = document.getElementsByClassName('Gen7').length;
            let ownedGen7 = document.querySelectorAll('.Gen7 .own').length;
            let progGen7 = document.getElementById('progressBars').getElementsByTagName('progress')[6];
            progGen7.setAttribute("value", ownedGen7);
            progGen7.setAttribute("title", ownedGen7.toString().concat("/", elemsGen7.toString()));
            break;
        case 'Gen8':
            let elemsGen8 = document.getElementsByClassName('Gen8').length;
            let ownedGen8 = document.querySelectorAll('.Gen8 .own').length;
            let progGen8 = document.getElementById('progressBars').getElementsByTagName('progress')[7];
            progGen8.setAttribute("value", ownedGen8);
            progGen8.setAttribute("title", ownedGen8.toString().concat("/", elemsGen8.toString()));
            break;
        case 'Gen9':
            let elemsGen9 = document.getElementsByClassName('Gen9').length;
            let ownedGen9 = document.querySelectorAll('.Gen9 .own').length;
            let progGen9 = document.getElementById('progressBars').getElementsByTagName('progress')[8];
            progGen9.setAttribute("value", ownedGen9);
            progGen9.setAttribute("title", ownedGen9.toString().concat("/", elemsGen9.toString()));
            break;
        case 'Novelty':
            let elemsNovelty = document.getElementsByClassName('Novelty').length;
            let ownedNovelty = document.querySelectorAll('.Novelty .own').length;
            let progNovelty = document.getElementById('progressBars').getElementsByTagName('progress')[9];
            progNovelty.setAttribute("value", ownedNovelty);
            progNovelty.setAttribute("title", ownedNovelty.toString().concat("/", elemsNovelty.toString()));
            break;
        default:
            console.log("counting all generations by default");
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
    const elems = document.getElementById("mark").getElementsByTagName("img");
    /* an extra class on each img would be necessary if there were any img elements
    that were children of the single <main> element and not Pokémon, but there are not */

    for (let i = 0; i < elems.length; i++) {
        if (elems[i].id === "Top") {
            continue;
        }
        elems[i].onclick = mark; // to ensure this is the caller
        elems[i].addEventListener('click', function () {
            status = localStorage.getItem("shiny ".concat(this.alt));
            region = this.parentElement.classList[1];
            if (status === "own") {
                mark(this, region, "notown");
                // on a click, we want to set the _opposite_ status
            } else if (status === "notown") {
                mark(this, region, "own");
                // same thing
            } else {
                mark(this, region, "own");
                /* if there was no stored status, the existing status is notown,
                so we set to own (could combine this with the elif, but let's 
                be explicit)*/
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