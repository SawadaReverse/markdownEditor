import { app, BrowserWindow } from 'electron';

// ウィンドウを作る関数
const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
  });

  window.loadFile('index.html');
};

// アプリの起動
app.whenReady().then(() => {
  createWindow();

  // macOSのアプリはウィンドウを開いていなくても起動し続け、アプリを
  // アクティブにすると新規ウィンドウが開くのが一般的らしい。
  // というわけで、activateをリッスンし続ける
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// ウィンドウが全て閉じられたとき、macOS以外で app.quit() をコール
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
