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
export interface TLogin {
  usuario : string;
  password: string;
  sucursal: number;
}

export interface TUsuario {
  id: number;
  usuario: string;
  password:  string;
  nombre:  string;
}

export interface Tpermiso {
  usuid:    number;
  permisos: string[];
}

export interface Tsucursal {
  id:          number;
  nroSucursal: number;
  nombre:      string;
  direccion:   string;
  telefono:    string;
  created_at:  Date;
  updated_at:  Date;
}

export interface TpuntoVenta {
  id:               number;
  codigoPuntoVenta: number;
  nombrePuntoVenta: string;
  tipoPuntoVenta:   string;
  sucursalId:       number;
}

export interface TVenta {
  id:           number;
  razonSocial:  string;
  fechHora:     Date;
  monto:        number;
  nroDocumento: string;
  estado:       boolean;
  puntoVentaId: number;
  id_usuario:   number;
  borrado:      boolean;
}

export interface TProductoV {
  id?:            number;
  producto:       string;
  unidad:         string;
  precioUnitario: number;
  cantidad:       number;
  sucursalId:     number;
  puntoVentaId:   number;
  ventaId:        number;
}

export interface TRazonSocial {
  id?:          number;
  razonSocial:  string;
  nroDocumento: string;
  tipoDoc:      string;
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
