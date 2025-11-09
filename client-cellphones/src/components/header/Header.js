import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { SignoutUser } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { searchProduct } from "../../actions/ProductAction";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from '@ant-design/icons';

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const dropdownRef = useRef(null);

  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const amount = cartItems.reduce((a, b) => a + b.qty, 0);

  const handleSignout = () => {
    dispatch(SignoutUser());
    setShowUserDropdown(false);
  };

  const SearchProduct = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push("/search");
      dispatch(searchProduct(search));
      setSearch('');
    }
  };

  const closeAllDropdowns = () => {
    setShowAccountDropdown(false);
    setShowUserDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <nav id="menu" ref={dropdownRef}>
        <div className="logo">
          <span>
            <Link to="/"> PL STORE </Link>
          </span>
        </div>
        
        <div className="search">
          <form onSubmit={SearchProduct}>
            <input
              type="text"
              name="search"
              placeholder="Tìm kiếm ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>
        </div>
        
        <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
          <ul className="menu-list">
            <li><Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Trang Chủ</Link></li>
            <li><Link to="/product" className="nav-link" onClick={() => setMenuOpen(false)}>Sản Phẩm</Link></li>
            {/* Removed hot product tab */}
            {userInfo ? (
              <li className="dropdown-item">
                <button className="dropdown-trigger" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                  {userInfo.name} ▼
                </button>
                {showUserDropdown && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {userInfo.isAdmin && <Link to="/admin" className="dropdown-link" onClick={closeAllDropdowns}>Admin</Link>}
                    <Link to="/myOrder" className="dropdown-link" onClick={closeAllDropdowns}>Đơn hàng</Link>
                    <button className="dropdown-link logout-btn" onClick={handleSignout}>Đăng xuất</button>
                  </div>
                )}
              </li>
            ) : (
              <li className="dropdown-item">
                <button className="dropdown-trigger" onClick={() => setShowAccountDropdown(!showAccountDropdown)}>
                  Tài khoản ▼
                </button>
                {showAccountDropdown && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <Link to="/register" className="dropdown-link" onClick={closeAllDropdowns}>Đăng ký</Link>
                    <Link to="/login" className="dropdown-link" onClick={closeAllDropdowns}>Đăng nhập</Link>
                  </div>
                )}
              </li>
            )}
            
            <li className="shop-cart">
              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                <ShoppingCartOutlined className="cart-icon" />
                {amount > 0 && <span className="count">{amount}</span>}
              </Link>
            </li>
          </ul>
        </div>

        <div className="bar" onClick={() => setMenuOpen(!isMenuOpen)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
