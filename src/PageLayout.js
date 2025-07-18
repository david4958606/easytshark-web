import { Layout, Menu, Button } from '@arco-design/web-react';
import "./style/global.css"
import Navbar from './components/Navbar.tsx';
import DataPacketPage from './components/DataPacketPage.tsx';
import SessionPage from './components/SessionPage.tsx';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import {
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconBug,
    IconBulb,
    IconBook,
} from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

function PageLayout() {
    return (
        <div className='layout-basic-demo'>
            <Router>
                <Layout style={{ height: '800px' }}>
                    <Header>
                        <Navbar></Navbar>
                    </Header>
                    <Layout>
                        <Sider>
                            <div className='sidebar-menu'>
                                <Menu
                                    style={{ width: 200, height: '100%' }}
                                    hasCollapseButton
                                    defaultOpenKeys={['0']}
                                    defaultSelectedKeys={['0_1']}
                                >
                                    <SubMenu
                                        key='0'
                                        title={
                                            <>
                                                <IconApps /> 数据包分析
                                            </>
                                        }
                                    >
                                        <MenuItem key='allPackets'><Link to="/dataPacket/all">全部数据包</Link></MenuItem>
                                        <MenuItem key='tcpPackets'><Link to="/dataPacket/tcp">TCP数据包</Link></MenuItem>
                                        <MenuItem key='udpPackets'><Link to="/dataPacket/udp">UDP数据包</Link></MenuItem>
                                        <MenuItem key='icmpPackets'><Link to="/dataPacket/icmp">ICMP数据包</Link></MenuItem>
                                    </SubMenu>
                                    <SubMenu
                                        key='1'
                                        title={
                                            <>
                                                <IconBug /> 会话分析
                                            </>
                                        }
                                    >
                                        <MenuItem key='tcpSession'><Link to="/session/tcp">TCP会话</Link></MenuItem>
                                        <MenuItem key='udpSession'><Link to="/session/udp">UDP会话</Link></MenuItem>
                                        <MenuItem key='dnsSession'><Link to="/session/dns">DNS会话</Link></MenuItem>
                                        <MenuItem key='httpSession'><Link to="/session/http">HTTP会话</Link></MenuItem>
                                        <MenuItem key='tlsSession'><Link to="/session/tls">SSL/TLS会话</Link></MenuItem>
                                        <MenuItem key='sshSession'><Link to="/session/ssh">SSH会话</Link></MenuItem>
                                    </SubMenu>
                                    <SubMenu
                                        key='2'
                                        title={
                                            <>
                                                <IconBulb /> 统计分析
                                            </>
                                        }
                                    >
                                        <MenuItem key='ipCount'>IP统计</MenuItem>
                                        <MenuItem key='protoCount'>协议统计</MenuItem>
                                        <MenuItem key='countryCount'>国家统计</MenuItem>
                                    </SubMenu>
                                </Menu>
                            </div>
                        </Sider>
                        <Content>
                            <Routes>
                                <Route path="/dataPacket/:type" element={<DataPacketPage />} />
                                <Route path="/session/:type" element={<SessionPage />} />
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        </div>
    )
}

export default PageLayout;