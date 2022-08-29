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
  id:         number;
  usuario:    string;
  password:   string;
  nombre:     string;
  persona_id: number;
}

export interface Tpersona {
  id:            number;
  nro_documento: string;
  nombre:        string;
  ap_paterno:    string;
  ap_materno:    string;
  cargo:         string;
  dependencia:   string;
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