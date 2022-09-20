
import { ipcMain } from "electron"

import loginHandle  from "./login"
import {getUserHandle,registerHandle} from "./user"
import {addGroup,delGroup, updateGroup, viewGroup} from "./group"
import {addItem,delItem, updateItem, viewItem} from "./item"
const handleIPC = () => {
    ipcMain.handle('login', loginHandle)
    ipcMain.handle('getUser', getUserHandle)
    ipcMain.handle('registerHandle', registerHandle)
    ipcMain.handle('addGroup', addGroup)

    ipcMain.handle('delGroup', delGroup)
    ipcMain.handle('viewGroup', viewGroup)
    ipcMain.handle('updateGroup', updateGroup)


}


export default handleIPC