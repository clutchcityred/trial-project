import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'
import CustomThemeProvider from './themes/CustomThemeProvider'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducers, actions } from './reducers';

import _ from 'lodash';
import entitiesData from './data/entities.json';

const loadEntitiesJson = (store) => {
  let entityTypes = [...new Set(entitiesData.map(entity => entity.EntityTypeName))].sort();
  _.forEach(entityTypes, function (entityType) {
    let filteredEntitiesData = _.filter(entitiesData, ['EntityTypeName', entityType]);
    console.log(entityType);
    console.log(filteredEntitiesData);
    switch (entityType) {
      case "Asset": store.dispatch(actions.entities.setAssets(filteredEntitiesData)); break;
      case "Block": store.dispatch(actions.entities.setBlocks(filteredEntitiesData)); break;
      case "Compartment": store.dispatch(actions.entities.setCompartments(filteredEntitiesData)); break;
      case "Field": store.dispatch(actions.entities.setFields(filteredEntitiesData)); break;
      case "Hydrodynamic Unit": store.dispatch(actions.entities.setHydrodynamicUnits(filteredEntitiesData)); break;
      case "Layer": store.dispatch(actions.entities.setLayers(filteredEntitiesData)); break;
      case "Section": store.dispatch(actions.entities.setSections(filteredEntitiesData)); break;
      case "Well": store.dispatch(actions.entities.setWells(filteredEntitiesData)); break;
      default: console.log("unknown entity type found");
    }
  })
}

const store = createStore(reducers, applyMiddleware(thunk));
loadEntitiesJson(store);

ReactDOM.render(
  <CustomThemeProvider>
    <Provider store={store}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </Provider>
  </CustomThemeProvider>,
  document.querySelector('#root'),
)
