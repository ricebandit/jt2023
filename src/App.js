import React, {useEffect} from 'react';
import './scss/App.scss';
import Preload from './components/Preload';
import ProjectsUI from './components/ProjectsUI';

function App() {

  useEffect(() => {
    document.title = 'Jeremy Tani: Front-End Development';
  }, []);

  return (
    <div className="App">
      <Preload />
      <ProjectsUI/>
    </div>
  );
}
export default App;