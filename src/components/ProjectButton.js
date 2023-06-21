import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';

export class ProjectButton extends Component {

    state = {
        imgUrl: '',
        isLoaded: false
    }

    static propTypes = {
        project: PropTypes.object.isRequired
    }

    componentDidMount () {
        const {featured_media} = this.props.project;
        const getImageUrl = axios.get(`https://cms.jeremytani.com/wp-json/wp/v2/media/${featured_media}`);
       
        Promise.all([getImageUrl]).then(res => {
            
            this.setState({
                //imgUrl: res[0].data.media_details.sizes.full.source_url,
                imgUrl: res[0].data.media_details.sizes.thumbnail.source_url,
                isLoaded: true
            });
        });
    }
 
    render() {
        const { title } = this.props.project;
        const {imgUrl} = this.state;
        
        return (
            <div className="project-thumb" onClick={ () => this.props.onMenuClick(this.props.project) }>
                <div className="tooltip">
                    <p>{title.rendered}</p>
                </div>
                <div className="img">
                    <img src={imgUrl} alt={title.rendered}/>
                </div>
            </div>
        )
    }
}
export default ProjectButton