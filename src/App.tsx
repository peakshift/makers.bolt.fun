
import Navbar from "./Components/Shared/Navbar/Navbar";
import ExplorePage from "./Components/ExplorePage/ExplorePage";
import ModalsContainer from "./Components/Shared/ModalsContainer/ModalsContainer";

function App() {
  return <div id="app" className='w-screen overflow-hidden'>
    <Navbar />
    <ExplorePage />
    <ModalsContainer />
  </div>;
}

export default App;
