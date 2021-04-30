import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { createStore } from 'redux';

// const initialState = {
//   count: 423
// }
// const reducer = (state=initialState, action) => {
//   return state
// } 

// const store = createStore(reducer);
// store.dispatch({type: "INCREMENT"})

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App