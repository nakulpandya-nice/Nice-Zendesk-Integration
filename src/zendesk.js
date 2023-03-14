import useScript from './useScript';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

let client;

export function Zendesk(props) {
  const history = useHistory();
  // Create the function
  const intName = 'Zendesk';

  const loaded = useScript({
    scriptSrc: `https://static.zdassets.com/zendesk_app_framework_sdk/2.0/zaf_sdk.min.js`,
    attributes: [
      {
        name: 'data-crmurl',
        value: `${props.openFrameBaseUrl}`,
      },
      {
        name: 'data-ofid',
        value: `test`,
      },
    ],
  });

  function testClickHandler() {
    console.log('test clicked to call SNC');
    history.push('/temp');
  }

  useEffect(() => {
    if (loaded === 'ready') {
      client = window.ZAFClient.init();
      client && client.invoke('routeTo', 'ticket', 780)
    }
    return () => {
      console.log(`${intName} Integrataion component Unmounted. Cleanup...`);
    };
  }, [loaded]);

  console.log('component==> zendesk.js');

  return (
    <button onClick={testClickHandler}>Click Me</button>
  );
}

export default Zendesk;