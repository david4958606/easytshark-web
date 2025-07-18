import React from 'react';
import { Button, Message } from '@arco-design/web-react';
import "../style/global.css"

function Navbar() {
  const startCapture = () => {
    Message.info('开始抓包!');
  };

  const stopCapture = () => {
    Message.info('停止抓包!');
  };

  const analysisFile = () => {
    Message.info('分析文件!');
  };

  const saveFile = () => {
    Message.info('保存文件!');
  };

  return (
    <div id="nav-bar" style={{ padding: 25, display: 'flex', gap: 16 }}>
      <Button className="button-spacing" type="primary" onClick={startCapture}>开始抓包</Button>
      <Button className="button-spacing" type="primary" status="danger" onClick={stopCapture}>停止抓包</Button>
      <Button className="button-spacing" type="primary" onClick={analysisFile}>分析文件</Button>
      <Button className="button-spacing" type="primary" onClick={saveFile}>保存文件</Button>
    </div>
  );
}

export default Navbar;