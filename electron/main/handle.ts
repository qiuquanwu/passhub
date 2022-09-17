
import { ipcMain } from "electron"

import loginHandle  from "./login"
import {getUserHandle,registerHandle} from "./user"
const handleIPC = () => {
    ipcMain.handle('login', loginHandle)
    ipcMain.handle('getUser', getUserHandle)
    ipcMain.handle('registerHandle', registerHandle)

}


export default handleIPC