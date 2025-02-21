import React from "react";
import {ParamInput} from "./ParamInput";
import {Param, Model, ParamValue} from "./types";

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    const paramValueMap = new Map(props.model.paramValues.map(pv => [pv.paramId, pv.value]));

    this.state = {
      paramValues: props.params.map(param => ({
        paramId: param.id,
        value: paramValueMap.get(param.id) || "",
      })),
    };
  }

  handleChange = (paramId: number, newValue: string) => {
    this.setState((prevState) => {
      const updatedValues = prevState.paramValues.map((p) =>
        p.paramId === paramId ? { ...p, value: newValue } : p
      );
      return { paramValues: updatedValues };
    });
  };

  getModel = (): Model => {
    return {
      paramValues: this.state.paramValues,
    };
  };

  render() {
    return (
      <form style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', rowGap: '10px', maxInlineSize: '500px'}}>
        {this.props.params.map((param) => {
          const value = this.state.paramValues.find(pv => pv.paramId === param.id)?.value || "";
          return (
            <ParamInput
              key={param.id}
              param={param}
              value={value}
              onChange={this.handleChange}
            />
          );
        })}
        <button type="button" onClick={() => console.log(this.getModel())}>
          Вывести модель в консоль
        </button>
      </form>
    );
  }
}