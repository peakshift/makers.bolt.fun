
import Navbar from "./Components/Shared/Navbar/Navbar";
import ExplorePage from "./Components/ExplorePage/ExplorePage";
import Modal from "./Components/Shared/Modal/Modal";

function App() {
  return <div id="app" className='w-screen overflow-hidden'>
    <Navbar />
    <ExplorePage />
    <Modal />
  </div>;
}

export default App;
