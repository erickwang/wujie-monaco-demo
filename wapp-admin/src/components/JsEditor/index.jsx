import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import MonacoEditor from '../MonacoEditor';

import './styles.less';

const EDITOR_OPTIONS2 = {
  minimap: {
    enabled: false
  },
  renderLineHighlight: 'none'
};


export default props => {
  const { width, height, value, onChange } = props;

  const handleChange = val => {
    if (onChange) {
      onChange(val);
    }
  };


  return <div>
    <div>JavaScript编辑器</div>
    <MonacoEditor width={width} height={height} language="typescript" theme="vs" value={value} onChange={handleChange} options={EDITOR_OPTIONS2} />
  </div>;
};
