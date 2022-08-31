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

export interface Tusuario {
  usuid:     number;
  usuario:   string;
  clave:     string;
  perid:     number;
  bloqueado: boolean;
  nombre:    string;
}

export interface Tpersona {
  perid:     number;
  documento: string;
  paterno:   string;
  materno:   string;
  nombre:    string;
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