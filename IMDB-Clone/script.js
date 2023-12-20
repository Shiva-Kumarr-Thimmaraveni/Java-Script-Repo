const apiKey = '4746bd52fc5d9bc2bbd28e1d7a148137'
const apiUrl = 'https://api.themoviedb.org/3'
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500'


function sendFilmTitle() {
  const filmTitle = document.getElementById('inputTextArea').value
  mainDiv.innerHTML= ''
  var fetchUrl = ""
  if (filmTitle != ""){
    fetchUrl = apiUrl + '/search/movie?api_key=' + apiKey + '&query=' + filmTitle 
  }
  else{
    fetchUrl = apiUrl + "/discover/movie?api_key=" + apiKey
  }
  fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results
      movies.forEach((element) => {
        // console.log(element)
        var imgPath = element['poster_path']
        

        const originalTitle = element['original_title']
        const filmDescription = element['overview']
        const rating = element['vote_average']
        const release_date = element['release_date']
        const innerDiv = document.createElement('div')
        innerDiv.classList.add('innerDivStyle')
        
        innerDiv.innerHTML = `
     <div class="imgContainerStyle">
     <img class="imageStyle" src="${imgBaseUrl}${imgPath}" alt="Poster-Image">
     <div class="overlay">
     <div style="display:flex; justify-content: space-between; cursor: pointer; color: black; background-color:#fcba03; padding:10px; border-radius: 10px;" onclick="handleClick('${originalTitle}', '${imgPath}', '${rating}','${release_date}', '${filmDescription.replace(/'/g, "\\'")}')">
     <h5 style="display: inline;">${originalTitle}</h5>
     <h7 style="display: inline; margin-left: 5px;">Rating <strong>${rating}</strong></h7>
     </div>
     <h6 style="margin-top:10px;">Film Overview</h6>
      <p style="overflow:auto; height:14rem; width:14rem;" class="custom-scrollbar">
      ${filmDescription}
      </p>
     </div>
     </div>`
        mainDiv.appendChild(innerDiv)
      })
      // Handle the movies based on the selected genre
    })
    .catch((error) => {
      console.error('Error fetching popular movies by genre:', error)
    })


}
function checkEnter(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    sendFilmTitle()
  }
}
function fetchPopularMoviesByGenre(genreId) {
  


    fetch(`${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`)
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results
        movies.forEach((element) => {
          // console.log(element)
         
          const imgPath = element['poster_path']
          const originalTitle = element['original_title']
          const filmDescription = element['overview']
          const release_date = element['release_date']
          const rating = element['vote_average']
          const innerDiv = document.createElement('div')
          innerDiv.classList.add('innerDivStyle')
          
          
          
          
          innerDiv.innerHTML = `
     <div class="imgContainerStyle">
     <img class="imageStyle" src="${imgBaseUrl}${imgPath}" alt="Poster-Image">
     <div class="overlay">
     <div style="display:flex; justify-content: space-between; cursor: pointer; color: black; background-color:#fcba03; padding:10px; border-radius: 10px;" onclick="handleClick('${originalTitle}', '${imgPath}', '${rating}','${release_date}', '${filmDescription.replace(/'/g, "\\'")}')">
     <h5 style="display: inline;">${originalTitle}</h5>
     <h7 style="display: inline; margin-left: 5px;">Rating <strong>${rating}</strong></h7>
     </div>
     <h6 style="margin-top:10px;">Film Overview</h6>
      <p style="overflow:auto; height:14rem; width:14rem;" class="custom-scrollbar">
      ${filmDescription}
      </p>
     </div>
     </div>`
          mainDiv.appendChild(innerDiv)
        })
        // Handle the movies based on the selected genre
      })
      .catch((error) => {
        console.error('Error fetching popular movies by genre:', error)
      })

  
    
}



// Function to fetch the list of movie genres
async function fetchMovieGenres(selectedGenreName) {
  try {
    const response = await fetch(`${apiUrl}/genre/movie/list?api_key=${apiKey}`)
    const data = await response.json()
    const genres = data.genres

    if (selectedGenreName) {
      // If a genre is selected, find its ID and fetch popular movies
      const selectedGenre = genres.find(
        (element) => element.name === selectedGenreName
      )

      if (selectedGenre) {
        const selectedGenreId = selectedGenre.id
        console.log(selectedGenreId)
        await fetchPopularMoviesByGenre(selectedGenreId)
      }
    } else {
      // If no genre is selected, fetch popular movies with a default genre ID (e.g., 28 for Action)
      const defaultGenreId = 28
      await fetchPopularMoviesByGenre(defaultGenreId)
    }
  } catch (error) {
    console.error('Error fetching movie genres:', error)
  }
}


 // Get the select element
  const movieSelect = document.getElementById('selectedCategory')
  movieSelect.addEventListener('change', function () {
    const selectedOption = movieSelect.value
    console.log(selectedOption);
    document.getElementById('mainDiv').innerHTML = ""
    fetchMovieGenres(selectedOption)
  })
  // If no change occurs initially, call fetchMovieGenres with a default genre name
  fetchMovieGenres()

  function handleClick(original_title, imgPath, rating, releaseData, filmDescription) {
      const originalDescription = filmDescription.replace(/\\'/g, "'")
    document.getElementById('popupOverlay').style.display = 'flex'
    
    const popupContent = document.getElementById('popupContent')
    popupContent.innerHTML = `
     
    <div style="display:flex; justify-content: between;">
    <div style="width: 400px"> 
     <img class="imageStyle" src="${imgBaseUrl}${imgPath}" alt="Poster-Image">
   
     <div style="margin-top:20px; display:flex; justify-content: space-between; cursor: pointer; color: black; background-color:#fcba03; padding:10px; border-radius: 10px;">
     <h5 style="display: inline;">${original_title}</h5>
     <h7 style="display: inline; margin-left: 5px;">Rating <strong>${rating}</strong></h7>
     </div>
     </div>
    <div style="padding:10px; margin: 10px; width: 100%;" >
    <p><strong>Release Data : </strong> ${releaseData}</p>
    <h5>Film Overview</h5>
    <p style="overflow:auto; width: inherit; " class="custom-scrollbar">${originalDescription}</p>
    
    </div>
    </div>
    
   
        
        `
  }
    function handleClick1(original_title, imgPath, rating, releaseData, filmDescription) {
      const originalDescription = filmDescription.replace(/\\'/g, "'")
      document.getElementById('popupOverlay').style.display = 'flex'
       
      const popupContent = document.getElementById('popupContent')
      popupContent.innerHTML = `
        
     <div style="display:flex; justify-content: between;">

    <div style="width:500px;" > 
     <img class="imageStyle" src="${imgBaseUrl}${imgPath}" alt="Poster-Image">
   
     <div style="margin-top:20px;  display:flex; justify-content: space-between; cursor: pointer; color: black; background-color:#fcba03; padding:10px; border-radius: 10px;">
     <h5 style="display: inline;">${original_title}</h5>
     <h7 style="display: inline; margin-left: 5px;">Rating <strong>${rating}</strong></h7>
     </div>
     </div>

   <div style="padding:10px; margin: 10px; width: 30%;" >
    <p><strong>Release Data : </strong> ${releaseData}</p>
        <h5>Film Overview</h5>

    <p style="overflow:auto;" class="custom-scrollbar">${originalDescription}</p>
    </div>
    </div>
     
        
        `
      
    }
    function closePopup(){
            document.getElementById('popupOverlay').style.display = 'none'

    }
  