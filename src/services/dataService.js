import _ from 'lodash'
import { actions } from '../reducers'
import { treeify, flattenMyTree } from './utilityService'
import entitiesJSON from '../data/entities.json'
import hierarchyJSON from '../data/hierarchy.json'
import hierarchy2JSON from '../data/hierarchy2.json'

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

export const loadEntitiesJSON = (store) => {
  let entityTypes = [...new Set(entitiesJSON.map(entity => entity.EntityTypeName))].sort();
  _.forEach(entityTypes, function (entityType) {
    let filteredEntitiesData = _.filter(entitiesJSON, ['EntityTypeName', entityType])
      .sort((a, b) => collator.compare(a.Name, b.Name));
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

let hierarchyJSONs = [hierarchyJSON, hierarchy2JSON];

export const loadHierarchyJSONs = (store) => {
  let hierarchies = [];

  _.forEach(hierarchyJSONs, function (hierarchyData) {
    let hierarchyTree = treeify(hierarchyData.Relationship);
    let hierarchy = {
      "name": hierarchyData.Name,
      "tree": hierarchyTree,
    };
    hierarchies.push(hierarchy);
  });

  store.dispatch(actions.hierarchies.setHierarchies(hierarchies));
  store.dispatch(actions.hierarchies.setSelectedHierarchy(hierarchies[0]));
}