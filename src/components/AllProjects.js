import React, {Component} from 'react';
import axios from 'axios';
import ProjectButton from './ProjectButton'

export class AllProjects extends Component{

    state = {
        projects: [],
        completelyClosed: true
    }

    componentDidMount () {
        axios.get('https://cms.jeremytani.com/wp-json/wp/v2/projects/')
            .then(res => this.setState({
                projects: res.data
            }))
            .catch(err => console.log(err))
    }

    render(){
        let visible = '';

        if(this.props.open === true){
            visible = 'visible';
        }

        const {projects} = this.state;
        
        return (
            <div id="allProjects" className={visible}>
                <div className="header">
                    <div className="title">
                        <h1>ALL PROJECTS</h1>
                    </div>
                    
                    <div className='close-btn' onClick={ event => this.props.onCloseClick(event) }></div>
                </div>
                <div className="items">
                    {projects.map(project =>
                    <ProjectButton key={project.id} project={project} onMenuClick={ this.props.onMenuClick }/>
                    )}
                    </div>
            </div>
        )
    }
}

export default AllProjects;