import React, {useState, useRef ,useEffect} from "react";
import styles from "../../assets/styles/Header.module.css";
import avatarImg from "../../../public/images/GaoXanh.jpg";
import bellIcon from "../../assets/images/header/bell-02.png";
import homeIcon from "../../assets/images/header/home-02.png";
import searchIcon from "../../assets/images/header/search-02.png";
import albumIcon from "../../assets/images/header/album-02.png";


interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = { name: "Nam Trương", avatarUrl: avatarImg };
  const isAuthenticated = true; 

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


      <div className={styles.logo}>BlueLune</div>

      {/* ======================= HOME BUTTON AREA ====================== */}

      <div className={styles.homeButtonArea}>
        <button className={styles.homeButton}>
          <img src={homeIcon} alt="Home Icon" />
        </button>
      </div>

      {/* ======================= ALBUM BUTTON AREA ====================== */} 
      <div className={styles.albumButtonArea}>
        <button className={styles.albumButton}>
          <img src={albumIcon} alt="Album Icon" />
        </button>
      </div>
      {/* ======================= SEARCH AREA ====================== */}

      <div className={styles.searchArea}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className={styles.searchInput}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className={styles.searchButton}>
          <img src={searchIcon} alt="Search Icon" />
        </button>
      </div>

{/*  ================= Notification Bell ====================== */} 

      <div className={styles.notificationBell}>
        <button className={styles.bellButton}>
          <img src={bellIcon} alt="Notificcation Bell" />
        </button>
      </div>

{/* ======================= USER AREA ====================== */}

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
