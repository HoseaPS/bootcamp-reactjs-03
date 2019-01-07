import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure({ host: '127.0.0.1' })
    .use(reactotronRedux())
    .use(sagaPlugin())
    .connect();

  console.tron = tron;
}
