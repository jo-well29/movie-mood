/// Imports 
import movieReponse from './sentiment.js';

/// DOM Elements
const searchInput = document.querySelector("input");
const movieImage = document.querySelector("img");
const movieTitle = document.getElementById("movie_title");
const movieOverview = document.getElementById("movie_overview");
const overviewLabel = document.getElementById("overview");

/// Updates/Modify Elements 
overviewLabel.innerText = "";

/// Events 

/**
 * eventhandler: updates the dom with a keypress.
 *
 * @param {object} e takes an event object.
 * @return {} returns nothing.
 */
async function renderUIComponents(e) {
    // e.preventDefault();
    if(e.key === "Enter"){
        let value = e.target.value;
        let newValue = await movieReponse(value);
        let mvTitle = newValue.title;
        let mvImage =  `https://image.tmdb.org/t/p/w500${newValue.backdrop_path}`
        let mvOverview = newValue.overview;

        overview.innerText = "Overview"
        movieImage.src = mvImage;
        movieTitle.innerText = mvTitle;
        movieOverview.innerText = mvOverview;
        e.target.value = "";
    }
    
    
}

/// EventListeners 
searchInput.addEventListener("keypress",renderUIComponents)
