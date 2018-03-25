import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => (
	<header className = "Qn-header">
		<div className = 'logo'>问卷管理</div>
		<Link 
			to = "/"
			className = 'my-Qn'>我的问卷
		</Link>
	</header>
);

export default Header;