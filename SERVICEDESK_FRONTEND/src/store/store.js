import { createStore,combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import { authReducer } from "../reducers/authReducer";
import { oficinaReducer } from "../reducers/oficinaReducer";
import { organoReducer, organoIdReducer } from "../reducers/organoReducer";
import { perfilPersonaReducer } from "../reducers/perfilPersonaReducer";
import { sedeReducer } from "../reducers/sedeReducer";
import { personaReducer } from "../reducers/personaReducer";
import { cargoReducer } from "../reducers/cargoReducer";
import { validadorUsuarioReducer } from "../reducers/validadorUsuario";
import { 
    misIncidenciasReducer,
    incidenciaReducer, 
    incidenciaIdReducer, 
    incidenciasAsignadasReducer, 
    incidenciasNoAsignadasReducer, 
    incidenciasAsignadasSoporteReducer 
} from "../reducers/incidenciaReducer";
import { motivoReducer } from "../reducers/motivoReducer";
import { personaOrganoReducer } from "../reducers/personaOrganoReducer";
import { tecnicoDisponibleReducer } from "../reducers/tecnicoReducer";
import { correoRecibidoReducer, correoEnviadoReducer } from "../reducers/correoReducer";
import { origenIncidenciaReducer } from "../reducers/origenIncidenciaReducer";
import { ftpReducer } from "../reducers/ftpReducer";
import { correoCredencialReducer } from "../reducers/correoCredencialReducer";
import { configuracionBotonesReducer } from "../reducers/configuracionesReducer";
import { mensajeReducer } from "../reducers/mensajeReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    perfilPersona: perfilPersonaReducer,
    sede: sedeReducer,
    organo: organoReducer,
    oficina: oficinaReducer,
    persona: personaReducer,
    cargo: cargoReducer,
    usuarioDni: validadorUsuarioReducer,
    organoId: organoIdReducer,
    incidencia: incidenciaReducer,
    incidenciaId: incidenciaIdReducer,
    incidenciasAsignadas: incidenciasAsignadasReducer,
    incidenciasNoAsignadas: incidenciasNoAsignadasReducer,
    incidenciasAsignadasSoporte: incidenciasAsignadasSoporteReducer,
    tecnicoDisponible: tecnicoDisponibleReducer,
    personaOrgano: personaOrganoReducer,
    motivo: motivoReducer,
    correoRecibido: correoRecibidoReducer,
    correoEnviado: correoEnviadoReducer,
    origenIncidencia: origenIncidenciaReducer,
    ftp: ftpReducer,
    correoCredencial: correoCredencialReducer,
    misIncidencias: misIncidenciasReducer,
    configuracionBotones: configuracionBotonesReducer,
    mensaje: mensajeReducer,
});

export const store = createStore( 
    reducers, 
    composeEnhancers(
        applyMiddleware( thunk )
    )
);