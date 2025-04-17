import React from 'react';
import { Link } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
import { FaMusic } from "react-icons/fa";
import { FaPodcast } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import Logo from '../image/Logo.png';
export const Sidebar = () => {
  return (
    <aside className='aside'>
      <img src={Logo}/>
      <ul>
        <li>
          <Link to="/">
            <FaHouse />
            <p >Trang Chủ</p>
          </Link>
        </li>
        <li><Link to="/list_type"><FaMusic />Danh Mục Bài Hát</Link></li>
        <li><Link to="/singer"><FaPodcast />Ca Sĩ</Link></li>
        <li><Link to="/contact"><FaHeart />Bài Hát Yêu Thích</Link></li>
        <li><Link to="/contact"><FaSignOutAlt />Đăng Xuất</Link></li>
        <li><Link to="/contact"><FaUser />Đăng Nhập</Link></li>
        <li><Link to="/contact"><FaUserPlus />Đăng Kí</Link></li>
      </ul>
    </aside>
  );
};
export default Sidebar;