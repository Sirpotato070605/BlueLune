import React, {useState, useRef ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/styles/Header.module.css";
import avatarImg from "../../../public/images/GaoXanh.jpg";

import { GoHomeFill } from "react-icons/go";
import { IoAlbums, IoSearch, IoNotifications } from 'react-icons/io5';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = { name: "Nam Trương", avatarUrl: avatarImg };
  const isAuthenticated = true; 
  const navigate = useNavigate();

    const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>


      <div className={styles.logo} onClick={() => navigate('/')}>Teall</div>

      <div className={styles.homeButtonArea}>
        <button className={styles.homeButton} onClick={() => navigate('/')}>
          <GoHomeFill size={22} />
        </button>
      </div>

      <div className={styles.albumButtonArea}>
        <button className={styles.albumButton}>
          <IoAlbums size={22} />
        </button>
      </div>

      <div className={styles.searchArea}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className={styles.searchInput}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className={styles.searchButton}>
          <IoSearch size={20} />
        </button>
      </div>
 

      <div className={styles.notificationBell}>
        <button className={styles.bellButton}>
          <IoNotifications size={22} />
        </button>
      </div>


      <div className={styles.userArea}>
        {isAuthenticated ? (
          <div className={styles.userInfo}>
            <div 
              className={styles.userProfile} 
              onClick={handleUserClick}
              ref={dropdownRef}
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className={`${styles.avatar} ${styles.spin}`}
              />
              <span className={styles.userName}>{user.name}</span>
            </div>
            
            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <button>Account</button>
                <button>Profile</button>
                <button>Support</button>
                <button>Private Session</button>
                <button>Settings</button>
                <hr className={styles.divider} />
                <button className={styles.logoutBtn}>Log out</button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authButtons}>
            <button className={styles.loginBtn}>Log In</button>
            <> | </> 
            <button className={styles.signupBtn}>Sign Up</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
