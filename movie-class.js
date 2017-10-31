class Movie {

  constructor(title) {
    this.title = title
    const serviceUrl = this.movieServiceUrl();
    fetch(serviceUrl).then(this.convertDataToJSON).then(this.receiveMovieData)
  }

  // Given the data from the service,
  // assume the first result is the best match
  // and construct a URL to the poster image.
  // Then update the <img> element with that URL.
  receiveMovieData = (dataFromService) => {
    const topHit = dataFromService.results[0];
    console.debug("The top hit was: ")
    console.debug(topHit)

    this.title = topHit.title
    this.poster_url = "http://image.tmdb.org/t/p/w300/" + topHit.poster_path

    // Start getting more info from the API
    // let api_key = "e9743662f5a39568d8e25225f2c97e09";
    const api_key = 'bde024f3eb43f597aafe01ed9c9098c6'
    const credits_url = "https://api.themoviedb.org/3/movie/" + topHit.id + "/credits?api_key=" + api_key
    fetch(credits_url).then(this.convertDataToJSON).then(this.receiveCreditsData);
  }

  receiveCreditsData = (dataFromService) => {
    console.debug("Cast and crew:")
    console.debug(dataFromService)

    // TO DO: Add properties to this movie
    // for director and roles



    // When you're done, you should be able to do this:
    //
    // m = new Movie("Apollo 13")
    // console.log("Directed by: " + m.director)
    // console.log("Starring:")
    // console.log(m.roles[0].actor + " as " + m.roles[0].character)
    // console.log(m.roles[1].actor + " as " + m.roles[1].character)
    // console.log(m.roles[2].actor + " as " + m.roles[2].character)
    //
    // and you should see in the console:
    //
    // Directed by: Ron Howard
    // Starring:
    // Tom Hanks as Jim Lovell
    // Bill Paxton as Fred Haise
    // Kevin Bacon as Jack Swigert
  }

  movieServiceUrl = () => {
    // let api_key = "e9743662f5a39568d8e25225f2c97e09";
    const api_key = 'bde024f3eb43f597aafe01ed9c9098c6'

    let url = "https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=en-US";
    url = url + "&query=" + this.title;
    return url;
  }

  // Convert the movie service's raw response into JSON
  // (ie. a JavaScript object)
  convertDataToJSON = (response) => {
    return response.json();
  }
}

// m = Movie.new("Martian")
// console.log(m.title)
