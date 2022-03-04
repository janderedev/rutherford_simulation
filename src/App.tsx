import Controls from './components/controls';
import Simulation from './components/simulation';
import Footer from './footer';
import './simulation.css';

function App() {
  return (
    <div>
      <Controls />
      <Simulation />
      <Footer>
        <a href='https://en.wikipedia.org/wiki/Rutherford_model' target='_blank'>
          Rutherford Model
        </a> • <a href='https://github.com/janderedev/rutherford_simulation/blob/master/LICENSE' target='_blank'>
          AGPLv3
        </a> • <a href='https://github.com/janderedev/rutherford_simulation' target='_blank'>
          GitHub
        </a>
      </Footer>
    </div>
  );
}

export default App;
