import { useState } from 'react';
import '../src/assets/styles/App.css';
import Header from './components/Layout/Header.tsx';
import PlayerControlBar from './components/Layout/PlayerControlBar.tsx';
// Import component mới
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
           <h1>Trang chủ</h1>
           <p>Nội dung chính của trang web...</p>
           {/* Outlet sẽ nằm ở đây */}
        </div>

        {/* Sidebar NowPlayingView (Hiển thị có điều kiện) */}
        {isRightSidebarOpen && (
          // Không cần wrapper div nữa vì NowPlayingView đã tự xử lý layout flex
          <NowPlayingView onClose={() => setIsRightSidebarOpen(false)} />
        )}
      </div>

      {/* 3. ControlBar */}
      <PlayerControlBar 
        // Logic toggle: Nếu đang mở thì đóng, đang đóng thì mở
        onToggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)} 
        isSidebarOpen={isRightSidebarOpen} // Để đổi màu nút icon
      />
    </div>
  );
}

export default App;