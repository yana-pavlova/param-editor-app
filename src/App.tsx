import React from 'react';

type ParamType = 'string' | 'number' | 'select';

interface Param {
  id: number;
  name: string;
  type: ParamType;
  options?: string[];
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface ParamInputProps {
  param: Param;
  value: string;
  onChange: (paramId: number, newValue: string) => void;
}

interface Color {
  name: string;
  code: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

const ParamInput: React.FC<ParamInputProps> = ({ param, value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(param.id, e.target.value);
  };

  const inputId = `param-input-${param.id}`;

  return <>
      <label htmlFor={inputId}>{param.name}</label>
      {param.type === 'select' ? (
        <select id={inputId} value={value} onChange={handleInputChange}>
          {param.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
        id={inputId}
        type={param.type}
        value={value}
        onChange={handleInputChange}
      />
      )}
    </>
};

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  handleChange = (paramId: number, newValue: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((p) =>
        p.paramId === paramId ? { ...p, value: newValue } : p
      ),
    }));
  };

  getModel = (): Model => {
    return {
      paramValues: this.state.paramValues,
      colors: this.props.model.colors,
    };
  };

  render() {
    return (
      <form style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', rowGap: '10px'}}>
        {this.props.params.map((param) => (
          <ParamInput
            key={param.id}
            param={param}
            value={this.state.paramValues.find((pv) => pv.paramId === param.id)?.value || ''}
            onChange={this.handleChange}
          />
        ))}
      </form>
    );
  }
}

function App() {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: [
      { name: 'Красный', code: '#FF0000' },
      { name: 'Синий', code: '#0000FF' },
      { name: 'Зелёный', code: '#008000' },
    ],
  };

  return <ParamEditor params={params} model={model} />;
}

export default App;
