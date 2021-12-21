import { app, BrowserWindow, ipcMain, dialog, ipcRenderer } from 'electron'
import xlsx from 'node-xlsx';

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow () {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function parseMapping(type: string, file: string) : object {
  const workbook = xlsx.parse(file);
  if (!file){
    return {};
  }

  const data = workbook[0]?.data;
  const mapping = data.reduce((acc, row) =>
    {
      const key: string = row[0];
      const value = row[1];

      if(key === "ID") {
        return acc;
      }

      if (!acc.hasOwnProperty(key)) {
        acc.mapping[key] = value;
      }

      return acc;
    }, { type: "", mapping: {}});
  
  mapping.type = type;
  return mapping;
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */

  ipcMain.on('message', (_, message) => {
    console.log(message)
  });

  ipcMain.handle('dialog', (event, method, params) => {      
    return dialog.showOpenDialogSync(params);
  });

  ipcMain.handle('download-config', async (event, type) => {
    const data = [];
    const configsString = await mainWindow.webContents.executeJavaScript('localStorage.getItem("configs");', true);
    const configs : { type : string, map: {[key: string]: string} }[] = JSON.parse(configsString);
    const config = configs.find(config => config.type === type);
    const map = config.map;

    data.push([`DE (${type})`,"PARA (ROAD MAP)"]);
    for ( const key in map ) {
      data.push([key, map[key]]);
    }

    const buffer = xlsx.build([{name: type, data: data}]);
    return buffer;
  });

  ipcMain.handle('upload-config', async (event, file) => {
    const reg = /([^\/\\]+).xlsx/gm;
    const m = reg.exec(file);
    if (!m) return;
    const type = m[1];
    const workbook = xlsx.parse(file);
    if (!file){
      return;
    }

    const data = workbook[0]?.data;
    const config = data.reduce((acc, row, index) =>
    {
      const key = row[0];
      const value = row[1];

      if(index === 0) {
        return acc;
      }

      if (!acc.hasOwnProperty(key)) {
        if(key) {
          acc.map[key] = value;
        }
      }

      return acc;
    }, { type: "", map: {}});

    config.type = type;

    const configsString = await mainWindow?.webContents.executeJavaScript('localStorage.getItem("configs");', true);
    let configs = JSON.parse(configsString) || [];

    if (!configs?.find((config: { type : string, map: {[key: string]: string}}) => config.type === type)){
      configs.push(config);
    }
    const newConfigsString = JSON.stringify(configs);
    await mainWindow?.webContents.executeJavaScript(`localStorage.setItem('configs', '${newConfigsString}');`, true);
  });

  ipcMain.handle('delete-config', async (_, type) => {
    const configsString = await mainWindow?.webContents.executeJavaScript('localStorage.getItem("configs");', true);
    let configs = JSON.parse(configsString) || [];
    const newConfigs = configs.filter(config => { return (config.type != type)})
    const newConfigsString = JSON.stringify(newConfigs);
    await mainWindow?.webContents.executeJavaScript(`localStorage.setItem('configs', '${newConfigsString}');`, true);
  });

  ipcMain.handle('upload-DRE', async (_, configType, filePath) => {
    //loads config
    const configsString = await mainWindow?.webContents.executeJavaScript('localStorage.getItem("configs");', true);
    const configs = JSON.parse(configsString) || [];
    const config = configs.find(config => (config.type === configType));

    //loads pos DRE raw file
    const workbook = xlsx.parse(filePath);
    const rawDREData = workbook[0]?.data;

    //build treated data
    const data = [["plano de conta", "data", "valor"]];
    rawDREData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
          const value = cell;
          const date = parseDate(configType, rawDREData[0][colIndex]);
          const billPlan = parseBillPlan(config.map, rawDREData[rowIndex][0]);

          if(date && billPlan){
            data.push([billPlan, date, value]);
          }
      })
    })

    //returns mapped xlsx buffer
    var buffer = xlsx.build([{name: "Base", data: data}]);
    return buffer;
  });
}

function parseDate(type: string, rawDate: string){
  const reg = /\b([a-zA-Z]{3})\/([0-9]{4}\b)|\b([0-9]{2})\/(\b[0-9]{4}\b)/gm;
  const m = reg.exec(rawDate);

  if (!m) return;

  if (m[3] && m[4]){
    return m[0];
  } else if(m[1] && m[2]){
    const month = parseMonth(m[1]);
    return `${month}/${m[2]}`;
  }
}

function parseBillPlan(map, rawBillPlan: string){
  const reg = /([0-9.]+) - |([0-9.]+)\b$/gm;
  const m = reg.exec(rawBillPlan);

  if (!m) return;

  const key = m[1] || m[2];
  return map[key];
}

function parseMonth(month: string){
  const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  const monthNumber = monthNames.findIndex((m) => m === month.toUpperCase()) + 1;
  return String(monthNumber).padStart(2, '0');
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
