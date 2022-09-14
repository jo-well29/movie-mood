const url = 'https://api.themoviedb.org/3/search/movie?api_key=44190c5b396af3a1c89a1295b6b1e434&query=Jack+Reacher';

async function checkSentiment() {
    
    let response = await fetch(url);
    let json = await response.json();
    let data = await json.results[0].overview;
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
	console.log(sentimentInfo)
    
}

checkSentiment();