const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=44190c5b396af3a1c89a1295b6b1e434&language=en-US&page=1';




const movieResponseHelp = (mood, array) => { 
       return Math.floor(Math.random() * array);
}



export default async function movieReponse(mood) {
    let negativeMovies = [];
    let positiveMovies = [];
    let neutralMovies = [];
    let response = await fetch(url);
    let json = await response.json()
    await Promise.all(json.results.map(async e => {
       let movieObj = await e;
       let data = await e.overview;
       let sentiment = await urlInfo(data);
       if(sentiment === "positive"){
            positiveMovies.push(movieObj);
       }
       else if(sentiment === "negative"){
            negativeMovies.push(movieObj);
       }
       else if(sentiment === "neutral"){
            neutralMovies.push(movieObj);
       }
    } ));  
    let randMovieIndx;
    if(mood === "happy"){
        
        randMovieIndx = movieResponseHelp(mood, positiveMovies.length);
        return positiveMovies[randMovieIndx]
    }
    else if(mood === "okay"){
        randMovieIndx = movieResponseHelp(mood, neutralMovies.length);
        return neutralMovies[randMovieIndx]
    }

    else if(mood === "mad"){
        randMovieIndx = movieResponseHelp(mood, negativeMovies.length);
        return negativeMovies[randMovieIndx]
    }
    
}




async function urlInfo(data) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("text", data);
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '7f4219720fmsh4c83dce9e75acf1p14d624jsn139c921ea7be',
            'X-RapidAPI-Host': 'text-sentiment.p.rapidapi.com'
        },
        body: encodedParams
    };

    let sentimentResponse = await fetch('https://text-sentiment.p.rapidapi.com/analyze', options)
    let sentimentInfo = await sentimentResponse.json();

    for (const property in sentimentInfo) {
        if(property === "neg_percent"){
            if(parseFloat(sentimentInfo[property])/100 > .5){
                return "negative";
            }
        }
        if(property === "pos_percent"){
            if(parseFloat(sentimentInfo[property])/100 > .5){
                return "positive";
            }
        }
        if(property === "mid_percent"){
            if(parseFloat(sentimentInfo[property])/100 > .5){
                return "neutral";
            }
        }
        
      }
}


