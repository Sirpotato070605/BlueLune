import { useState } from 'react';
import '../src/assets/styles/App.css';
import Header from './components/Layout/Header.tsx';
import PlayerControlBar from './components/Layout/PlayerControlBar.tsx';
import NowPlayingView from './components/Player/NowPlayingView.tsx';

function App() {
  // State quản lý việc hiển thị cột bên phải
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      {/* 1. Header */}
      <Header onSearch={(query) => console.log("Tìm:", query)} />

      {/* 2. Main Body */}
      <div className="main-body">
        
        {/* Content Chính */}
        <div className="content-area">
        </div>

        {/* Sidebar NowPlayingView (Hiển thị có điều kiện) */}
        {isRightSidebarOpen && (
          <NowPlayingView onClose={() => setIsRightSidebarOpen(false)} />
        )}
      </div>

      {/* 3. ControlBar */}
      <PlayerControlBar 
        onToggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)} 
        isSidebarOpen={isRightSidebarOpen} 
      />
    </div>
  );
}

export default App;