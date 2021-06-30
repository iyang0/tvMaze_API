"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  let url = "http://api.tvmaze.com/search/shows"
  // TODO: change base URL to a global constant
  // and have the endpoint as the variable here
  // concatenate together in function
  let showList = await axios.get(url, {params:{q:term}});

  // loop over shows to only give us the id, name, summary, image in an object
  // then put the object into an array which will be returned

  // keeping old code as reference
  // let prunedShows = showList.data.map(showAndScore =>{
  //   let prunedShow = {};
  //   prunedShow.id = showAndScore.show.id;
  //   prunedShow.name = showAndScore.show.name;
  //   prunedShow.summary = showAndScore.show.summary;

  //   //if a show has no image, set as default image
    
  //   prunedShow.image = showAndScore.show.image
  //     ? showAndScore.show.image.medium
  //     : "https://tinyurl.com/tv-missing";
  //     //global constant for default image that could be used in different functions

  //   return prunedShow;
  // });

  let prunedShows = showList.data.map( ({show}) =>{
    return {
      id : show.id,
      name : show.name,
      summary : show.summary,
      //if a show has no image, set as default image
      image : show.image
        ? show.image.medium
        : "https://tinyurl.com/tv-missing"
        //global constant for default image that could be used in different functions
    }      
  });

  return prunedShows;
}


/** Given list of shows, create markup for each show
 * and add to DOM by appending to the showsList
*/
function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${show.image}" 
              alt="${show.name}" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
