import '../src/assets/styles/App.css'
import Header from './components/Layout/Header.tsx';
import PlayerControlBar from './components/Layout/PlayerControlBar.tsx';

function App() {
  return (
    <>
      <Header onSearch={(query) => console.log("Tìm:", query)} />
      <PlayerControlBar />
    </>
  );
}

export default App