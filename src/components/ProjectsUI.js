import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import axios from 'axios';
//import ProjectButton from './ProjectButton'
import Background from './Background';
//import Menu from './Menu';
import FeaturedMenu from './FeaturedMenu';
import Viewer from './Viewer';
import AllProjects from './AllProjects';
import Cover from './Cover';
import Navigation from './Navigation';



export class ProjectsUI extends Component {

    
    state = {
        title:'',
        code:'',
        role:'',
        skills:[],
        excerpt:'',
        featured_media:'',
        video:'',
        allProjectsOpen:false,
        coverOn:false
    }

    constructor(props){
        super(props);

        this.viewer = React.createRef();
    }

    componentDidMount () {

        // Get Cover Background Image
        this.setState({coverOn:true});
        /*
        const scope = this;
        axios.get('https://cms.jeremytani.com/wp-json/wp/v2/projects/')
            .then(res => {
                const initialProject = res.data[0];

                scope.setState({
                    title:initialProject.title,
                    code:initialProject.acf.key_code,
                    role:initialProject.acf.role,
                    skills:initialProject.acf.skills,
                    excerpt:initialProject.excerpt,
                    featured_media:initialProject.featured_media,
                    video:initialProject.acf.video
                })

            })
            .catch(err => console.log(err)
        )
        */
    }

    menuClickHandler (evt) {

        this.setState({
            title:evt.title,
            code:evt.acf.key_code,
            role:evt.acf.role,
            skills:evt.acf.skills,
            excerpt:evt.excerpt,
            featured_media:evt.featured_media,
            video:evt.acf.video,
            coverOn:false
        });

    }

    moreClick(evt){
        
        this.setState({
            allProjectsOpen:true,
            coverOn:false
        });
    }

    allProjectsClick(evt){
        
        this.setState({
            allProjectsOpen:false,
            coverOn:false
        });
    }

    coverClick(){
        this.setState({coverOn:false});

        // Load First Project
        const scope = this;
        axios.get('https://cms.jeremytani.com/wp-json/wp/v2/projects/')
            .then(res => {
                const initialProject = res.data[0];

                scope.setState({
                    title:initialProject.title,
                    code:initialProject.acf.key_code,
                    role:initialProject.acf.role,
                    skills:initialProject.acf.skills,
                    excerpt:initialProject.excerpt,
                    featured_media:initialProject.featured_media,
                    video:initialProject.acf.video
                })

            })
            .catch(err => console.log(err)
        )
    }

    render() {
        const projects = this.state;

        console.log('ProjectsUI, render');
        
        return (
            <div className='projects'>
                <Routes>
                    <Route index element={<Background project={projects}/>}></Route>
                    <Route path='/project/:code' element={<Background project={projects}/>}></Route>
                </Routes>
                
                {/*<Background project={projects} coverOn={projects.coverOn}/>*/}
                <Viewer project={projects} />
                <Navigation/>

                
                <FeaturedMenu onMenuClick={ event => this.menuClickHandler(event) } onMoreClick={ event => this.moreClick(event) }/>
                <AllProjects open={projects.allProjectsOpen}  project={projects} onMenuClick={ event => this.menuClickHandler(event) } onCloseClick={ event => this.allProjectsClick(event)} />
                <Cover open={projects.coverOn} onCoverClick={ event => this.coverClick() } />
                
            </div>
        );
    }
    }
export default ProjectsUI