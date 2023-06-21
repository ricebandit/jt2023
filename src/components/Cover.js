import React, {Component} from 'react';
import axios from 'axios';

export class Cover extends Component{

    state = {
        data:{},
        visible:'visible'
    }
    componentDidMount(){
        axios.get('https://cms.jeremytani.com/wp-json/wp/v2/posts/48')
        .then(res => {
            this.setState({
                data: res.data.acf
            })
        })
        .catch(err => console.log(err))
    }

    enterSite(){
        console.log('enterSite click', this.props.onCoverClick);
        this.setState({visible:''});
        this.props.onCoverClick();
    }

    render(){
        const {video, site_title, capabilities, contact, message, position} = this.state.data;

        if(!capabilities){ return false}
        console.log('render contact', contact);

        return (
        <div id='cover' className={this.state.visible}>
            <iframe src={'https://player.vimeo.com/video/' + video +'?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=0&pip=0'} allow="autoplay; fullscreen;" allowFullScreen></iframe>
            <div className="capabilities">

                {capabilities.map( (skill, index) => <div className='item' key={skill + index}><p><small>{skill.skill}</small></p></div>)}
            </div>
            <div className="content">
                <div className="title header">
                    <h1>{site_title}</h1>
                    <h2>{position}</h2>
                </div>
                <div className="contact">
                    {contact.map((item) => <div className='contact-item' key={item.contact_type}><a href={item.contact_value}>{item.contact_display}</a></div>)}
                </div>
                <div className="message"><p dangerouslySetInnerHTML={{__html:message}} /></div>
                <div className="enterBtn" onClick={() => {this.enterSite()} }>ENTER</div>
            </div>
        </div>
        )
    }
}

export default Cover

