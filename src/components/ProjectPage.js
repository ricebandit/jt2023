import React, {Component} from 'react';

export class ProjectPage extends Component{
    state = {
        anim:'project-page animIn'
    }

    componentDidMount () {

        setTimeout( () => {
            this.setState({
                anim:'project-page animInComplete'
            });
        }, 2000);
    }

    componentDidUpdate(prevProps, prevState){

        if(prevProps.project.code !== this.props.project.code){

            this.setState({
                anim:'project-page'
            });

        }else{

            switch(this.state.anim){
                case 'project-page':
                    setTimeout(() => {
                        this.setState({
                            anim:'project-page animIn'
                        });

                    }, 100);
                break;
                case 'project-page animIn':
                    setTimeout(() => {
                        this.setState({
                            anim:'project-page animInComplete'
                        });

                    }, 2000);
                break;
                case 'project-page':
                    this.setState({
                        anim:'project-page animOut'
                    });
                break;
                default:
                break;
            }
        }

    }

    render(){
        return (
            <div className={this.state.anim}>

                <div className="header" id={this.props.project.code}>
                    <div className="left">
                        <h1 className="title">{this.props.project.title.rendered}</h1>
                    </div>
                    <div className="right">
                        <h2 className="role">{this.props.project.role}</h2>
                    </div>
                </div>
                <div className="hero">
                    {( () => {
                        if(this.props.project.video === ''){
                            return <div className="bg-img" style={{backgroundImage:'url(' + this.props.imgUrl + ')', backgroundSize:'cover', repeat:'no-repeat'}}></div>
                        }else{
                            
                            return <iframe src={this.props.video + '?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=0&pip=0'} allow="autoplay; fullscreen;" allowFullScreen></iframe>
                        }
                    })()}
                </div>
            </div>
        );
    }
}

export default ProjectPage;