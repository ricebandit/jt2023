import React, {Component} from 'react';
import axios from 'axios';

export class Preload extends Component{

    state = {
        imgUrls:[]
    }
    componentDidMount(){
        console.log('Preload');
        this.projectsData = [];

        const scope = this;

        const retrieveData = async() =>{

            // Get Project Data
            let projectItems = [];

            const getProjectData = await axios.get('https://cms.jeremytani.com/wp-json/wp/v2/projects/')
            .then( (res) => {
                

                for(let i = 0; i < res.data.length; i++){
                    const item = res.data[i];

                    // Store project data
                    const data = {
                        id: item.id,
                        acf:item.acf,
                        excerpt:item.excerpt.rendered,
                        featured_media:item.featured_media,
                        slug:item.slug,
                        title:item.title.rendered
                    }

                    this.projectsData.push(data);

                    // Add to list of featured_media to preload
                    const url = 'https://cms.jeremytani.com/wp-json/wp/v2/media/' + res.data[i].featured_media;
                    projectItems.push(fetch(url).then(res => {return res.json()}) );
                }
                

            })
            .catch( err => console.log(err));
    
            // Get Project's Featured Image ID
            const getMedia = await Promise.allSettled(projectItems)
            .then( (results) => {

                let imgs = [];

                for(let i = 0; i < results.length; i++){
                    // Match featured_media ID to associated project
                    const fID = results[i].value.id;

                    for(let j = 0; j < this.projectsData.length; j++){
                        const proj = this.projectsData[j];

                        if(proj.featured_media === fID){
                            proj.img = results[i].value.media_details.sizes.thumbnail.source_url;
                        }
                    }

                    imgs.push(results[i].value.media_details.sizes.thumbnail.source_url);
                }

                scope.setState({imgUrls:imgs});
            })

        }

        retrieveData();
    }
    render(){

        if(this.state.imgUrls.length === 0){return false}

        const urls = this.state.imgUrls;

        console.log('Preload projects', this.projectsData);

        return (
            <div id="preload">
                {urls.map( url => <img key={'pre-img-' + url} src={url} />)}
            </div>
        )
            
        
    }
}

export default Preload