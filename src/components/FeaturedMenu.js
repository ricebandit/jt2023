import React, { Component } from 'react';
import '../scss/App.scss';
import axios from 'axios';
import FeaturedItem from './FeaturedItem'

export class FeaturedMenu extends Component {
    
    state = {
        projects: [],
        isLoaded: false
    }
    componentDidMount () {
        axios.get('https://cms.jeremytani.com/wp-json/wp/v2/posts?&slug=global-variables')
            .then(res => this.setState({
                projects: res.data[0].acf.featured_projects,
                isLoaded: true
            }))
            .catch(err => console.log(err))
    }

    render() {
        const {projects} = this.state;

        console.log('FeatMenu, props', this.props);

        return (
            <div id="menu">
                <div className="items">
                    {projects.map(project => 
                        <FeaturedItem key={project.project.ID} project={project.project} onMenuClick={ this.props.onMenuClick }/>
                    )}
                </div>
            
                <div className="more" onClick={ () => this.props.onMoreClick()}><span>MORE</span><div className="plus"></div></div>
            </div>
        );
    }
}

export default FeaturedMenu