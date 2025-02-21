
type ParamType = 'string';

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Color {
  name: string;
  code: string;
}

export interface Model {
  paramValues: ParamValue[];
}

export interface Param {
  id: number;
  name: string;
  type: ParamType;
}