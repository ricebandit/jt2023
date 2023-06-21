import React, { Component } from 'react';
import '../scss/App.scss';
import axios from 'axios';
import ProjectPage from './ProjectPage';

export class Viewer extends Component {

    state = {
        project:null,
        imgUrl:''
    }

    componentDidMount () {

        this.setState({
            project:this.props.project,
            imgUrl:this.state.imgUrl
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.project !== this.state.project) {

            const featured_media = this.props.project.featured_media;
            
            const getImageUrl = axios.get(`https://cms.jeremytani.com/wp-json/wp/v2/media/` + featured_media);

            let imgURL = '';

            const scope = this;

            
        
            Promise.all([getImageUrl]).then(res => {

                if(res[0].data.length > 1){ return; } // For some reason, this is called twice, first time: requests all featured_media from all posts
                
                imgURL = res[0].data.media_details.sizes.full.source_url;

                scope.setState({
                    project:scope.props.project,
                    imgUrl:imgURL
                });


                
            });
        }
    }

    render() {

        const project = this.props.project;
        const video = 'https://player.vimeo.com/video/' + project.video;
        const imgUrl = this.state.imgUrl;


        return (
            
                <div id='viewer'>
                        <ProjectPage imgUrl={imgUrl} project={project} video={video}></ProjectPage>
                </div>
        );
    }
}
export default Viewer