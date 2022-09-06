export interface Tmenu {
  titulo:   string;
  icono:    string;
  url:      string;
  permisos: string[];
  submenu?: Tmenu[];
}

export interface TLogin {
  usuario:  string;
  password: string;
}

// MIO
export interface Tusuario {
  usuid:     number;
  usuario:   string;
  clave:     string;
  perid:     number;
  bloqueado: boolean;
  Persona:   TPersona;
}

export interface TPersona {
  perid:      number;
  documento:  string;
  nombre:     string;
  paterno:    string;
  materno:    string;
  nombrec:    string;
  biometrico: number | null;
}

//tipo JULIO API
export interface TJulio {
  nombre:        string;
  ci:            string;
  expedido:      string;
  celular:       string;
  email:         string;
  biometrico:    string | null;
  position_id:   number | null;
  dependence_id: number | null;
  dependence:    Dependence | null;
  position:      Dependence | null;
}

export interface Dependence {
  id:     number;
  nombre: string;
}
// End tipo Julio

export interface TresultatoPersona {
  tipo: number;
  data: TPersona[] | TJulio[] | [];
}