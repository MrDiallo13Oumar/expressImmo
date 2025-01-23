// Environnement de developpement
import { environment } from 'src/environments/environment'
// BASE_URL FOR IMAGES OR MOVIES...
//export const LINK_STATIC_FILES: string = 'http://192.168.0.109:8080/photo/'
export const LINK_STATIC_FILES: string = 'http://localhost/expressimmo/api/propriete/image/'


// LIEN POUR LES APIs
//  const LINK_PROD: string = 'http://localhost/expressimmo/api/'
//  const LINK_DEVS: string = 'http://localhost/expressimmo/api/'

const LINK_PROD: string = 'http://192.168.1.131/expressImmo-backend/api/'
const LINK_DEVS: string = 'http://192.168.1.131/expressImmo-backend/api/'



const LINK_PROD: string = 'http://192.168.1.102/expressImmo/api/'
const LINK_DEVS: string = 'http://192.168.1.102/expressImmo/api/'


// url de base

export const BASE_URL = environment.production ? LINK_PROD : LINK_DEVS


// CONSTANTE DANS L'APPLIS
// http://192.168.43.146:8080/api/
