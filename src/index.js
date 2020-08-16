import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'
import CustomThemeProvider from './themes/CustomThemeProvider'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import { reducers, actions } from './reducers';
import { reducer, actions } from './reducers/entities';

import _ from 'lodash';
import entitiesData from './data/entities.json';

const loadEntitiesJson = () => {
  return function (dispatch) {
    let entityTypes = [...new Set(entitiesData.map(entity => entity.EntityTypeName))].sort();
    _.forEach(entityTypes, function (entityType) {
      let filteredEntitiesData = _.filter(entitiesData, ['EntityTypeName', entityType]);
      console.log(entityType);
      console.log(filteredEntitiesData);
      switch (entityType) {
        case "Asset": return dispatch(actions.entities.setAssets(filteredEntitiesData));
        case "Block": return dispatch(actions.entities.setBlocks(filteredEntitiesData));
        case "Compartment": return dispatch(actions.entities.setCompartments(filteredEntitiesData));
        case "Field": return dispatch(actions.entities.setFields(filteredEntitiesData));
        case "Hydrodynamic Unit": return dispatch(actions.entities.setHydrodynamicUnits(filteredEntitiesData));
        case "Layer": return dispatch(actions.entities.setLayers(filteredEntitiesData));
        case "Section": return dispatch(actions.entities.setSections(filteredEntitiesData));
        case "Well": return dispatch(actions.entities.setWells(filteredEntitiesData));
        default: console.log("unknown entity type found");
      }
    })
  }
}

const store = createStore(reducer, applyMiddleware(thunk));
// store.subscribe();
// store.dispatch(loadEntitiesJson);

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
