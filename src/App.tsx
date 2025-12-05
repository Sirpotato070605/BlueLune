import { useState, useEffect } from 'react';
import { Routes, Route, } from 'react-router-dom'; 
import '../src/assets/styles/App.css';
import Header from './components/Layout/Header.tsx';
import PlayerControlBar from './components/Layout/PlayerControlBar.tsx';
import NowPlayingView from './components/Player/NowPlayingView.tsx';
import Home from './components/Page/Home.tsx';
import YourLibrary from './components/Layout/YourLibrary.tsx';
import Playlist from './components/Page/Playlist.tsx';

function App() {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isPlayerMaximized, setIsPlayerMaximized] = useState(false);
  const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(false);
  
  // const location = useLocation();

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
          onToggle={(collapsed) => setIsLibraryCollapsed(collapsed)}
        />

        {!isPlayerMaximized && (
          <div className="content-area main-page-wrapper">
            {/* Cấu hình Router tại đây */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playlist" element={<Playlist />} />
            </Routes>
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