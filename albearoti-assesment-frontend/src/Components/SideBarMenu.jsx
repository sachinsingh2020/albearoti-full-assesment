import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaBars, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoHomeOutline } from "react-icons/io5";
import { BsFileText } from "react-icons/bs";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import { LuFileLineChart } from "react-icons/lu";
import menuLogoImage from "../assets/menuLogo.png";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/user';
import toast from 'react-hot-toast';

const SideBarMenu = ({ onCollapse }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('blogs');

    const dispatch = useDispatch();

    useEffect(() => {
        const newCollapsedState = !collapsed;
        setCollapsed(newCollapsedState);
        onCollapse(newCollapsedState);
        // eslint-disable-next-line
    }, [])

    const toggleSidebar = () => {
        const newCollapsedState = !collapsed;
        setCollapsed(newCollapsedState);
        onCollapse(newCollapsedState);
    };

    const handleMenuItemClick = (item) => {
        setActiveMenuItem(item);
    };

    const { message, error } = useSelector(state => state.user);

    const handleLogout = async (e) => {
        e.preventDefault();
        await dispatch(logout());
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, message, error])

    return (
        <Sidebar
            collapsed={collapsed}
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: '#f5f7fb',
                    color: '#000',
                    height: '100vh',
                    transition: 'width 0.3s ease',
                },
            }}
        >
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: "15px" }}>
                    <img
                        src={menuLogoImage}
                        alt="Menu Logo"
                        style={{
                            width: collapsed ? '40px' : '120px',
                            height: 'auto',
                            transition: 'width 0.3s ease',
                        }}
                    />
                </div>

                <Menu
                    menuItemStyles={{
                        button: {
                            color: '#9D9DAA',
                            borderRadius: '12px',
                            borderTopLeftRadius: '0px',
                            borderBottomLeftRadius: '0px',
                            marginBottom: '10px',
                            padding: '10px 15px',
                            transition: 'background-color 0.3s ease',
                            [`&:hover`]: {
                                backgroundColor: '#e0e7ff',
                            },
                            [`&.active`]: {
                                backgroundColor: 'red',
                                color: '#fff',
                                borderLeft: '5px solid purple',
                            },
                        },
                    }}
                >
                    <MenuItem
                        onClick={toggleSidebar}
                        icon={<FaBars className="text-black" />}
                        style={{
                            color: "black",
                            fontWeight: "bold",
                            margin: "50px 0px 30px 0px"
                        }}
                    >
                        Menu Items
                    </MenuItem>

                    <MenuItem
                        onClick={() => handleMenuItemClick('dashboard')}
                        style={{
                            borderLeft: activeMenuItem === 'dashboard' ? "5px solid #6C5DD3" : "none",
                        }}
                        icon={<IoHomeOutline />}
                        component={<Link to="/dashboard" />}
                    >
                        Dashboard
                    </MenuItem>
                    <MenuItem
                        onClick={() => handleMenuItemClick('blogs')}
                        style={{
                            borderLeft: activeMenuItem === 'blogs' ? "5px solid #6C5DD3" : "none",
                        }}
                        icon={<BsFileText />}
                        component={<Link to="/blogs" />}
                    >
                        Blogs
                    </MenuItem>
                    <MenuItem
                        onClick={() => handleMenuItemClick('finances')}
                        style={{
                            borderLeft: activeMenuItem === 'finances' ? "5px solid #6C5DD3" : "none",
                        }}
                        icon={<HiOutlineChartSquareBar />}
                        component={<Link to="/finances" />}
                    >
                        Finances
                    </MenuItem>
                    <MenuItem
                        onClick={() => handleMenuItemClick('pitches')}
                        style={{
                            borderLeft: activeMenuItem === 'pitches' ? "5px solid #6C5DD3" : "none",
                        }}
                        icon={<LuFileLineChart />}
                        component={<Link to="/pitches" />}
                    >
                        Pitches
                    </MenuItem>

                </Menu>

                <div style={{ marginTop: 'auto' }}>
                    <Menu
                        menuItemStyles={{
                            button: {
                                color: '#9D9DAA',
                                borderRadius: '12px',
                                borderTopLeftRadius: '0px',
                                borderBottomLeftRadius: '0px',
                                marginBottom: '10px',
                                padding: '10px 15px',
                                transition: 'background-color 0.3s ease',
                                [`&:hover`]: {
                                    backgroundColor: '#e0e7ff',
                                },
                                [`&.active`]: {
                                    backgroundColor: 'red',
                                    color: '#fff',
                                    borderLeft: '5px solid purple',
                                },
                            },
                        }}
                    >
                        <MenuItem icon={<FaCog />} component={<Link to="/settings" />} onClick={() => handleMenuItemClick('settings')}>
                            Settings
                        </MenuItem>
                        <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </Sidebar>
    );
};

export default SideBarMenu;