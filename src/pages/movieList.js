import React,{ Component } from 'react';
import MovieBar from './MovieBar'
class MovieList extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidUpdate(prevProps){
        
        if (prevProps.list != this.props.list){
            this.setState({
                list:this.props.list
            })
        }
        
    }
    render(){
        console.log(this.props)
        let arr = null;
        if (this.state.list.length > 0){
            arr = this.state.list.map((movie,index) => {
                return <MovieBar key = {movie.poster+movie.duration+index} poster={movie.poster} duration={movie.duration} rating={movie.Rating} add={this.props.add} index={index}/>
            })
        }
        else{
            arr = [<p>No Movies!!!!</p>]
        }
        return (
            <div>
                {arr}
            </div>
        )
    }
}
export default MovieList;