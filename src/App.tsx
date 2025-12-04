// src/App.tsx
import { useState } from 'react'; // Xóa useEffect
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

  // ĐÃ XÓA: useEffect(() => { if (isRightSidebarOpen) ... }) 
  // Để Library không tự động thu nhỏ nữa.

  return (
    <div className="app-container">
      <Header onSearch={(query) => console.log("Tìm:", query)} />

      <div className="main-body">
        
        {/* PHẦN 1: YOUR LIBRARY (Resizable) */}
        <YourLibrary 
          isCollapsed={isLibraryCollapsed} 
          onToggle={() => setIsLibraryCollapsed(!isLibraryCollapsed)}
        />

        {/* PHẦN 2: MAIN PAGE */}
        <div 
          className="content-area main-page-wrapper" 
          style={{ display: isPlayerMaximized ? 'none' : 'block' }}
        >
          <Home />
        </div>

        {/* PHẦN 3: EPFC / RIGHT SIDEBAR */}
        {isRightSidebarOpen && (
          <NowPlayingView 
            onClose={() => {
              setIsRightSidebarOpen(false);
              setIsPlayerMaximized(false);
            }} 
            // isMaximized={isPlayerMaximized}
            // onToggleMaximize={() => setIsPlayerMaximized(!isPlayerMaximized)}
          />
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