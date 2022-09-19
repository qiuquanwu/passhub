
import { ipcMain } from "electron"

import loginHandle  from "./login"
import {getUserHandle,registerHandle} from "./user"
import {addGroup,delGroup, viewGroup} from "./group"
const handleIPC = () => {
    ipcMain.handle('login', loginHandle)
    ipcMain.handle('getUser', getUserHandle)
    ipcMain.handle('registerHandle', registerHandle)
    ipcMain.handle('addGroup', addGroup)

    ipcMain.handle('delGroup', delGroup)
    ipcMain.handle('viewGroup', viewGroup)

}


export default handleIPC