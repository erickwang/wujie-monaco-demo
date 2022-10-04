import React, { useState } from 'react';
import Layout from '../../layout/Layout';

import JsonSettingEditor from '../../components/JsonSettingEditor';
import JsEditor from '../../components/JsEditor';

import './styles.less';

export default () => {
  const [jsonValue, setJsonValue] = useState('');
  const [jsValue, setJsValue] = useState('');

  return <Layout >
          <div style={{padding: '20px 0'}}>
            问题：第一次可以输入，但是后续，鼠标就不能用了，点击不了，也就定位不了
          </div>

          <JsonSettingEditor width={600} height={300} value={jsonValue} onChange={setJsonValue} />
          <div style={{height: 20}} />
          <JsEditor width={600} height={300} value={jsValue} onChange={setJsValue} />
        </Layout>;
};
