import '../src/assets/styles/App.css'
import Header from './components/Layout/Header.tsx';

function App() {
  return (
    <>
      <Header onSearch={(query) => console.log("Tìm:", query)} />
    </>
  );
}

export default App
