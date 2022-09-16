// Variables
const contenedor = document.querySelector('.content-section');

const dailyBtn = document.querySelector('#daily');
const weeklyBtn = document.querySelector('#weekly');
const monthlyBtn = document.querySelector('#monthly');

const cards = [];


// Event Listeners
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        const url = './data.json';
        fetch(url)
            .then( respuesta => respuesta.json() )
            .then( resultado => {
                for( let i in resultado ) {
                    cards[i] = resultado[i];
                };
                cards.forEach( card => mostrarCard(card, 'daily') );
            } );
    })

    dailyBtn.addEventListener('click', () => {
        limpiarHTML();
        cards.forEach( card => mostrarCard(card, 'daily') );
    })
    
    weeklyBtn.addEventListener('click', () => {
        limpiarHTML();
        cards.forEach( card => mostrarCard(card, 'weekly') );
    })
    
    monthlyBtn.addEventListener('click', () => {
        limpiarHTML();
        cards.forEach( card => mostrarCard(card, 'monthly') );
    })
}


function mostrarCard(card, frequency) {

    const { title, timeframes } = card;

    let current = null;
    let previous = null;

    // Variables de timeframe seleccionado
    switch (frequency) {
        case 'daily':
            current = timeframes.daily.current;
            previous = timeframes.daily.previous;
            
            weeklyBtn.classList.remove('main-card__frequency--active');
            monthlyBtn.classList.remove('main-card__frequency--active');
            dailyBtn.classList.add('main-card__frequency--active');
            break;

        case 'weekly':

            current = timeframes.weekly.current;
            previous = timeframes.weekly.previous;

            dailyBtn.classList.remove('main-card__frequency--active');
            monthlyBtn.classList.remove('main-card__frequency--active');
            weeklyBtn.classList.add('main-card__frequency--active');
            break;

        case 'monthly':
            current = timeframes.monthly.current;
            previous = timeframes.monthly.previous;

            dailyBtn.classList.remove('main-card__frequency--active');
            weeklyBtn.classList.remove('main-card__frequency--active');
            monthlyBtn.classList.add('main-card__frequency--active');
            break;
        default:
            break;
    }

    // Elimina los espacios en el titulo para la sintaxis del color en el CSS
    const colorCSS = title.toLowerCase().replace(/\s+/g, '');  

    // Se genera el Div con el HTML dinamico para cada Card
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
        <div class="card__background" style="background-color: var(--${colorCSS})">
          <img class="card__image" src="./images/icon-${title.toLowerCase()}.svg" alt="background image">
        </div> 
        <div class="card__details">
          <div class="card__header">
            <p class="card__title">${title}</p>
            <img src="./images/icon-ellipsis.svg" alt="elipsis three dots">
          </div>
          <div class="card__contents">
            <p class="card__hours" id="hours">${current} Hrs</p>
            <p class="card__previous">Previous - ${previous} Hrs</p>
          </div>
        </div>
    `;

    // Se agrega al HTML
    contenedor.appendChild(cardDiv);
}

function limpiarHTML() {
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}