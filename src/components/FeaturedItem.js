import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export class FeaturedItem extends Component {

    state = {
        imgUrl: '',
        isLoaded: false
    }

    static propTypes = {
        project: PropTypes.object.isRequired
    }

    componentDidMount () {

        console.log('FeaturedItem', this.props.project);
        const {featured_media} = this.props.project;

        let project_data = {};
        let feat_media_id = 0;

        const scope = this;

        const retrieveData = async() =>{

            // Get Project Data
            const getProjectData = await axios.get('https://cms.jeremytani.com/wp-json/wp/v2/projects/' + this.props.project.ID)
            .then( res => {
                scope.project_data = res.data;
                scope.feat_media_id = scope.project_data.featured_media;
            })
            .catch( err => console.log(err));
    
            // Get Project's Featured Image ID
            const getMedia = await axios.get('https://cms.jeremytani.com/wp-json/wp/v2/media/' + scope.feat_media_id).then( res => {

            
                scope.setState({
                    imgUrl: res.data.media_details.sizes.thumbnail.source_url,
                    isLoaded: true
                });
            }).catch(error => console.log(error));

        }

        retrieveData();

    }
 
    render() {
        if(! this.project_data){return <></>}
        const { title } = this.project_data;
        const {imgUrl} = this.state;
        
        return (
            <div className="project-thumb" onClick={ () => this.props.onMenuClick(this.project_data) }>
                
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
export default FeaturedItem