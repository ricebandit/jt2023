import React, { Component } from 'react';
import '../scss/App.scss';
import axios from 'axios';

export class Navigation extends Component {
    
    state = {
       navigation: [],
       isLoaded: false
    }
    componentDidMount () {
        axios.get('https://cms.jeremytani.com/wp-json/wp/v2/nav')
            .then(res => this.setState({
                navigation: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err))
    }

    render() {
        const {navigation} = this.state;
        return (
            <div className="navigation">
                
                {navigation.map( item => <div className='navbtn' key={item.ID} href={item.url}><span>{item.post_title}</span></div>)}
                
            </div>


        );
    }
}

export default Navigation