import React from 'react';
import { Param } from "./types";

interface ParamInputProps {
  param: Param;
  value: string;
  onChange: (paramId: number, newValue: string) => void;
}

export const ParamInput: React.FC<ParamInputProps> = ({ param, value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(param.id, e.target.value);
  };

  const inputId = `param-input-${param.id}`;

  return <>
      <label htmlFor={inputId}>{param.name}</label>
        <input
        id={inputId}
        type={param.type}
        value={value}
        onChange={handleInputChange}
      />
    </>
};
