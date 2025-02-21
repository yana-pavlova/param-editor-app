import React from 'react';
import {ParamEditor} from './ParamEditor';
import {Param, Model} from './types';

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
  };

  return <ParamEditor params={params} model={model} />;
}

export default App;
