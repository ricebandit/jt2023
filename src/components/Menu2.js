import React, {Component} from 'react'
import axios from 'axios';
import ProjectButton from './ProjectButton'

export class Menu extends Component {
    
    state = {
       projects: [],
       isLoaded: false
    }

    componentDidMount () {

        
        axios.get('https://cms.jeremytani.com/wp-json/wp/v2/projects/')
            .then(res => this.setState({
                projects: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err))
        
    }

    render() {
        const {projects} = this.state;
        return (

            <div id='menu'>
            
                <div className="items">
                    {projects.map(project =>
                    <ProjectButton key={project.id} project={project} onMenuClick={ this.props.onMenuClick }/>
                    )}
                </div>
                <div className="more" onClick={ () => this.props.onMoreClick()}><span>MORE</span><div className="plus"></div></div>
             
            </div>

        );
    }
}
export default Menu