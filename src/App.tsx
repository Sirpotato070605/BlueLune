import { useState, useEffect } from 'react';
import '../src/assets/styles/App.css';
import Header from './components/Layout/Header.tsx';
import PlayerControlBar from './components/Layout/PlayerControlBar.tsx';
import NowPlayingView from './components/Player/NowPlayingView.tsx';
import Home from './components/Page/Home.tsx';
import YourLibrary from './components/Layout/YourLibrary.tsx';

function App() {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isPlayerMaximized, setIsPlayerMaximized] = useState(false);
  const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(false);

  useEffect(() => {
    if (isPlayerMaximized) {
      setIsLibraryCollapsed(true);
    }
  }, [isPlayerMaximized]);

  const handleCloseRightSidebar = () => {
    setIsRightSidebarOpen(false);
    setIsPlayerMaximized(false);
  };

  const handleToggleMaximize = () => {
    setIsPlayerMaximized(!isPlayerMaximized);
  };

  return (
    <div className="app-container">
      <Header onSearch={(query) => console.log("Tìm:", query)} />

      <div className="main-body">
        
        <YourLibrary 
          isCollapsed={isPlayerMaximized ? true : isLibraryCollapsed} 
          onToggle={() => setIsLibraryCollapsed(!isLibraryCollapsed)}
        />

        {!isPlayerMaximized && (
          <div className="content-area main-page-wrapper">
            <Home />
          </div>
        )}

        {isRightSidebarOpen && (
          <NowPlayingView 
            onClose={handleCloseRightSidebar} 
            isMaximized={isPlayerMaximized}
            onToggleMaximize={handleToggleMaximize}
          />
        )}
      </div>

      <PlayerControlBar 
        onToggleSidebar={() => {
            if (isRightSidebarOpen) {
                handleCloseRightSidebar();
            } else {
                setIsRightSidebarOpen(true);
            }
        }} 
        isSidebarOpen={isRightSidebarOpen} 
      />
    </div>
  );
}

export default App;