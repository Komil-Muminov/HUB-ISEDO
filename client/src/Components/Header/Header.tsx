import React, { useState } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../assets/tj-logo-img.jpg";
import {
	Box,
	Typography,
	Menu,
	MenuItem,
	Tooltip,
	Avatar,
	Button,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Header.css";

// Основной компонент Header
const Header: React.FC = () => {
	// Состояния для управления меню пользователя
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	// Открытие меню пользователя
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	// Закрытие меню пользователя
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	// DefName
	const defName = "Зиёева Адиба";

	return (
		<>
			<header>
				<div className="container">
					<div className="header__content">
						{/* Логотип */}

						<Link to="/modules" className="header__logo-link">
							<div className="wrapper-header-logo">
								<img
									className="header__logo-img header__logo--img"
									src={headerLogo}
									alt="header-logo"
								/>
								<div className="header__logo">
									<span className="header__logo-text">
										Информационная система Электронного документооборота
									</span>
								</div>
							</div>
						</Link>
						{/* Навигация */}
						<nav className="header__nav">
							<ul className="nav__list">
								<li className="nav__item">
									<Link to="/route1" className="nav__item--link">
										Главная
									</Link>
								</li>
								<li className="nav__item">
									<Link to="/route2" className="nav__item--link">
										Видеоинструкции
									</Link>
								</li>
								<li className="nav__item">
									<Link to="/route3" className="nav__item--link">
										Телефон горячей линии
									</Link>
								</li>
							</ul>
						</nav>
						{/* Меню пользователя */}
						<div className="header__right">
							<svg
								className="header__righ-svg"
								width="40px"
								height="40px"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									></path>
								</g>
							</svg>
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="" className="header__tooltip">
									<div>
										<Button
											className="wrapper-profile"
											onClick={handleOpenUserMenu}
										>
											<Avatar alt={defName} src={defName} />
											<p className="header__right-uname">{defName}</p>
										</Button>
									</div>
								</Tooltip>

								{/* Выпадающее меню */}
								<Menu
									sx={{
										mt: "60px", // Выставление отступа меню
										"& .MuiMenu-paper": {
											padding: "0 10px",
											borderRadius: "7px",
											border: "1px solid #0000000f",
											boxShadow:
												" 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
										},
									}}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{/* Пункт "Профиль" */}
									<Link to="/uprofile/udetails" className="nav__log-account">
										<MenuItem
											onClick={handleCloseUserMenu}
											sx={{
												p: 0,
												minWidth: "200px",
												display: "flex",
												alignItems: "center",
												gap: "5px",
												padding: "5px",
												borderRadius: "10px",
												borderBottom: "1px solid #00000015",
											}}
										>
											<AccountCircleOutlinedIcon sx={{ color: "#6DACF9" }} />
											<Typography
												sx={{ width: "100%", textAlign: "start", p: 1 }}
											>
												Профиль
											</Typography>
										</MenuItem>
									</Link>

									{/* Пункт "Выход" */}
									<MenuItem
										sx={{
											p: 0,
											minWidth: "200px",
											display: "flex",
											alignItems: "center",
											gap: "5px",
											padding: "5px",
											borderRadius: "10px",
										}}
									>
										<LogoutIcon sx={{ color: "#6DACF9" }} />
										<Typography
											sx={{ width: "100%", textAlign: "start", p: 1 }}
										>
											Выход
										</Typography>
									</MenuItem>
								</Menu>
							</Box>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
