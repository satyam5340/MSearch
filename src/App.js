import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import React,{ Component } from 'react';
import './App.css';
import Header from './pages/Header';
import MovieList from './pages/movieList';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchedMovie:'',
      movieList:[],
      favouriteList:[],
      main:true
    }
  }
  searchMovie = (e) => {
    
    this.setState({
      searchedMovie:e.target.value
    })
    
  }
  componentDidMount(){
    console.log(document.querySelector('.Top').style.marginLeft);
    
  }
  addToFavourite = (index) => {
    let newArr = [...this.state.movieList]
    let ele = newArr[index]
    let newFav = [...this.state.favouriteList]
    newFav.push(ele)
    newArr = newArr.slice(0,index).concat(newArr.slice(index+1))
    this.setState({
      movieList:newArr,
      favouriteList:newFav
    })
  }
  togglePage = () => {
    let prev = this.state.main
    this.setState({
      main:!prev
    })
  }
  getMovie = () => {
    console.log('hello',this.state.searchedMovie)
    if (this.state.searchedMovie){
      fetch(`http://www.omdbapi.com/?t=${this.state.searchedMovie}&apikey=7d7bd77b`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          if (result.Error !== "Movie not found!"){
              if (result.Poster === 'N/A'){
                console.log('inside')
                result.Poster = 'https://i1.wp.com/www.ecommerce-nation.com/wp-content/uploads/2018/10/404-error.jpg?resize=800%2C600&ssl=1'
              }
              let curr = [...this.state.movieList]
              let resMovie = {Title:result.Title,duration:result.Runtime,poster:result.Poster,Rating:result.imdbRating}
              curr.push(resMovie)
              this.setState({
              movieList:curr
            })
          }
          
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
  keyHandler = (e) => {
    if (e.keyCode === 13){
      this.getMovie()
    }
  }
  render(){
    console.log(this.state.movieList,'inaPP')
    return <div >
        <div className="Top">
      <Header />
      <div className='Search'>
        <input type='text' value={this.state.searchedMovie} onChange={this.searchMovie}  onKeyDown={(e) => this.keyHandler(e)} placeholder='Type name to search a movie'/>
        <button type='Submit' onClick={this.getMovie} >Add</button>
      </div>
      </div>
      
      
      <div className='Page'>
        <div className='tabs'>
          <div className={this.state.main ? 'selected' : ''} onClick={this.togglePage}>Added</div>
          <div className={!this.state.main ? 'selected' : ''} onClick={this.togglePage}>Favourites</div>
        </div>
        <div className='MoviePage'>
          <MovieList list={this.state.main ? this.state.movieList : this.state.favouriteList} add={this.addToFavourite}/>
        </div>
      
      </div>
      
    </div>
      
    
  }
}


export default App;
