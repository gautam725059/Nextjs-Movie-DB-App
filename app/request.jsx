const key = 'adc548858b35ceaf3b1fa9800b377b91'; 
// Note: TMDB website se apni API Key lekar yahan paste karein.

const requests = {
    requestPopular: `https://jsonfakery.com/movies/infinite-scroll`,
    requestTopRated: `https://jsonfakery.com/movies/paginated`,
    requestTrending: `https://jsonfakery.com/movies/paginated`,
    requestHorror: `https://jsonfakery.com/movies/paginated`,
    requestUpcoming: `https://jsonfakery.com/movies/paginated`,
};

// const requests = {
//     requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
//     requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
//     requestTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US`,
//     requestHorror: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27`,
//     requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
// };

export default requests;