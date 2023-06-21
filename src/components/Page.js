import React from 'react'

class Page extends Component{

    render(){
        return <div className='page'>
            <h1>{this.props.project.title.rendered}</h1>
        </div>
    }
}

export default Page;