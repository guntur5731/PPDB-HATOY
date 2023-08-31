import Admin from './admin'
import Home from './home'
import Peserta from './peserta'
import Setting from './setting'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/beranda'

// ** Merge Routes
const Routes = [...Home, ...Setting, ...Admin, ...Peserta]

export { DefaultRoute, TemplateTitle, Routes }
