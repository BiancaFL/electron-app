import { contextBridge, ipcRenderer } from 'electron'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */
  downloadConfig:  async (type: string) => {
    return await ipcRenderer.invoke('download-config', type);
  },

  uploadConfig:  async (file: string) => {
    return await ipcRenderer.invoke('upload-config', file);
  },

  deleteConfig: async (type: string) => {
    return await ipcRenderer.invoke('delete-config', type);
  },

  uploadDRE:  async (configType: string, filePath: string) => {
    return await ipcRenderer.invoke('upload-DRE', configType, filePath);
  },

  sendFile:  async (type, file) => {
    return await ipcRenderer.invoke('upload-file', type, file);
  },

  openDialog: async (method, config) => {
    return await ipcRenderer.invoke('dialog', method, config);
  },

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api);