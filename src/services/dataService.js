import _ from 'lodash'
import { actions } from '../reducers'
import { treeify, flattenMyTree } from './utilityService'
import entitiesJSON from '../data/entities.json'
import hierarchyJSON from '../data/hierarchy.json'
import hierarchy2JSON from '../data/hierarchy2.json'

let hierarchyJSONs = [hierarchyJSON, hierarchy2JSON];

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

export const loadJSONs = (store) => {
  // hierarchies
  let hierarchies = [];
  let reflattenedHierarchies = [];

  hierarchyJSONs.forEach(function (hierarchyData) {
    let hierarchyTree = treeify(hierarchyData.Relationship);
    let hierarchy = {
      "name": hierarchyData.Name,
      "tree": hierarchyTree,
    };
    let reflattenedHierarchy = {
      "name": hierarchyData.Name,
      "list": flattenMyTree(hierarchyTree),
    };
    hierarchies.push(hierarchy);
    reflattenedHierarchies.push(reflattenedHierarchy);
  });

  let hierarchyNames = hierarchies.map(hierarchy => hierarchy.name);

  store.dispatch(actions.hierarchies.setHierarchies(hierarchies));
  store.dispatch(actions.hierarchies.setHierarchyNames(hierarchyNames));

  // entities
  let entityTypes = [...new Set(entitiesJSON.map(entity => entity.EntityTypeName))].sort();

  // store paths from hierarchies with each entity
  entitiesJSON.forEach(function (entity) {
    reflattenedHierarchies.forEach(function (flattenedHierarchy) {
      let entityInHierarchy = _.find(flattenedHierarchy.list, ['title', entity.Name]);
      entity[flattenedHierarchy.name] = entityInHierarchy ? entityInHierarchy.pathname : null;
    })
  })

  entityTypes.forEach(function (entityType) {
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