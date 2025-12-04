import { useState } from 'react';
import '../src/assets/styles/App.css';
import Header from './components/Layout/Header.tsx';
import PlayerControlBar from './components/Layout/PlayerControlBar.tsx';
import NowPlayingView from './components/Player/NowPlayingView.tsx';

function App() {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Header onSearch={(query) => console.log("Tìm:", query)} />

      <div className="main-body">

        <div className="content-area">
        </div>
        {isRightSidebarOpen && (
          <NowPlayingView onClose={() => setIsRightSidebarOpen(false)} />
        )}
      </div>

      <PlayerControlBar 
        onToggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)} 
        isSidebarOpen={isRightSidebarOpen} 
      />
    </div>
  );
}

export default App;