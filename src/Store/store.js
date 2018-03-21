import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { setData } from './storage.js';
import rootReducer from '../reducer';

const win = window;
const middlewares = [];
//异步中间件
middlewares.push(thunk);

//只在开发环境下加载这个组件
//redux-immutable-state-invariant : 用于检测reducer是否是纯函数
if( process.env.NODE_ENV !== 'production' ){
	middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
	applyMiddleware(...middlewares),
	(win && win.devToolsExtension ? win.devToolsExtension() : f => f )
)
const defaultState = setData();
console.log(defaultState);
const store = createStore(rootReducer,defaultState,storeEnhancers);
export default store;