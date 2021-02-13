import React,{ Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
function MovieBar(props){

    return (
        <div className='bar'>
            
            <div className='first'>
                <div className='poster'>
                    <img src={props.poster} />
                </div>
                <div className='info'>
                    <p>{props.duration}</p>
                    <p>IMDb: {props.rating}</p>
                </div>
            </div>
            <div className='fav' onClick={() => props.add(props.index)}>
                <FontAwesomeIcon icon={faHeart} />
            </div>
        </div>
    )
}
export default MovieBar;