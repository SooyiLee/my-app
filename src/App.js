import React, { Component } from 'react';
import Movie from './Movie';
import './App.css';

class App extends Component {

  // Render : componentWillMount => render => componentDidMount
  // Update : componentWillReceiveProps => shouldComponentUpdate(true ? nextstep) => componentWillMount => render => componentDidMount

  //componentWillMount(){console.log('1. will mount')}
  //componentDidMount(){console.log('3. did mount')}

  state = {}

  componentDidMount(){
    /*
    setTimeout(()=>{
      this.setState({
        movies : [
          {
            title : 'Matrix',
            poster : 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjC69_fltngAhVBnuAKHQ0GB14QjRx6BAgBEAU&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FThe_Matrix%3A_Music_from_the_Motion_Picture&psig=AOvVaw0DtLGESL3CHl53nvd8Qcjt&ust=1551262877811167'
          },{
            title : 'OldBoy',
            poster : 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiEnNSOl9ngAhWPTN8KHXpyAysQjRx6BAgBEAU&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FOldboy_(2003_film)&psig=AOvVaw1DCZmmEy1qk1q3gGmrzH90&ust=1551262986168259',
          },{
            title : 'StarWars',
            poster : 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiRvq2rl9ngAhUPWN8KHdZHCLcQjRx6BAgBEAU&url=https%3A%2F%2Fwww.shortlist.com%2Fentertainment%2F80-best-star-wars-quotes%2F98922&psig=AOvVaw3mcSRl4hw8MIKdgmpCAgHq&ust=1551263040098468',
          },{
            title : 'IronMan',
            poster : 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiRvq2rl9ngAhUPWN8KHdZHCLcQjRx6BAgBEAU&url=https%3A%2F%2Fwww.shortlist.com%2Fentertainment%2F80-best-star-wars-quotes%2F98922&psig=AOvVaw3mcSRl4hw8MIKdgmpCAgHq&ust=1551263040098468',
          }
        ]
      })
    }, 1000)
    */
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map( (movie) => {
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    })
    return movies
  }

  _getMovies = async () => {
    //await : _callApi() 기능이 끝나기를 기다림, 성공 실패는 중요하지 않다
    const movies = await this._callApi() 
    this.setState({
        movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
      .then(response => response.json())
      .then(response => response.data.movies)
      .catch(error => console.log(error))
  }

  render() {
    console.log('2. render')
    const { movies } = this.state;
    return (
      <div className= {movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
