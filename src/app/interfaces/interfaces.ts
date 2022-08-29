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

export interface Tpersonas {
  id:            number;
  nro_documento: string;
  nombre:        string;
  ap_paterno:    string;
  ap_materno:    string;
  cargo:         string;
  dependencia:   string;
}