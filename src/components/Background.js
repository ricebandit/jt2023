import React, { Component } from 'react'
import axios from 'axios';


export class Background extends Component {
    
    state = {
        project:{},
        imgUrl:'',
        coverImg:''
    }

    constructor(){
        super();

        this.loadedAssets = [];
    }

    componentDidMount(){
        //const param = useParam();

        //console.log('Background, usePram', param);
        
        this.showCover();
    }

    showCover(){
        axios.get('https://cms.jeremytani.com/wp-json/wp/v2/posts/48')
        .then(res => {
            const featured_media = res.data.featured_media;
            
            const getImageUrl = axios.get(`https://cms.jeremytani.com/wp-json/wp/v2/media/` + featured_media);

            let imgData = { media_id: featured_media};

            let imgURL = '';

            const scope = this;
        
            Promise.all([getImageUrl]).then(res => {

                imgURL = res[0].data.media_details.sizes.thumbnail.source_url;

                // Add item to load history
                imgData.imgURL = imgURL;
                this.loadedAssets.push(imgData);

                scope.setState({
                    project:this.props.project,
                    imgUrl:imgURL
                });
            });
        })
        .catch(err => console.log(err))
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.project.code !== this.props.project.code) {

            const featured_media = this.props.project.featured_media;
            
            const getImageUrl = axios.get(`https://cms.jeremytani.com/wp-json/wp/v2/media/` + featured_media);

            let imgData = { media_id: featured_media};

            let imgURL = '';

            const scope = this;
        
            Promise.all([getImageUrl]).then(res => {

                imgURL = res[0].data.media_details.sizes.thumbnail.source_url;

                // Add item to load history
                imgData.imgURL = imgURL;
                this.loadedAssets.push(imgData);

                scope.setState({
                    project:this.props.project,
                    imgUrl:imgURL
                });
            });
        }
    }

    render() {

        return (
            <div id='background'>
                <div className="bg-img" style={{backgroundImage:'url(' + this.state.imgUrl + ')', backgroundSize:'cover'}}></div>
                <div className="dot-matrix"></div>
                <div className="vignette"></div>
                <div className="border"></div>
            </div>
        );
        
    }
}
export default Background