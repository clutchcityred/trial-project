import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  makeStyles, List, ListItem, ListItemText, Select, MenuItem
} from '@material-ui/core'
import _ from 'lodash'
import entitiesData from '../data/entities.json'

const useStyles = makeStyles(() => ({
  drawerContainer: {
    overflow: 'auto',
  },
}))

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
let entityTypes = [];

export default function EntitiesList({ saveSelectedEntity, selectedEntity, saveActiveEntities, activeEntities }) {
  const classes = useStyles()
  const storeEntities = useSelector(state => state.entities)
  const storeEntityTypes = useSelector(state => state.entities.entityTypes)
  const [selectedEntityType, setSelectedEntityType] = useState("");
  const [selectedEntityIndex, setSelectedEntityIndex] = useState(0);

  useEffect(() => {
    entityTypes = [...new Set(entitiesData.map(entity => entity.EntityTypeName))].sort();
  });

  useEffect(() => {
    setSelectedEntityType(entityTypes[selectedEntityIndex]);
    saveActiveEntities(storeEntities.assets);
    saveSelectedEntity(storeEntities.assets[selectedEntityIndex]);
  }, []);

  const handleListItemClick = (event, index) => {
    setSelectedEntityIndex(index);
    saveSelectedEntity(activeEntities[index]);
  };

  const handleEntityTypeChange = (event) => {
    let newSelectedEntityType = event.target.value;
    setSelectedEntityType(newSelectedEntityType);
    let storeEntityType = storeEntityTypes[newSelectedEntityType];
    let storeEntitiesData = storeEntities[storeEntityType.collectionName];
    saveActiveEntities(storeEntitiesData);
    setSelectedEntityIndex(0);
    saveSelectedEntity(storeEntitiesData[selectedEntityIndex]);
  };

  const EntityListItem = ({ entity, index }) =>
    <ListItem
      className="entity"
      button
      selected={selectedEntityIndex === index}
      onClick={(event) => handleListItemClick(event, index)}
    >
      <ListItemText primary={entity.Name} />
    </ListItem>;

  return (
    <div className={classes.drawerContainer}>
      {
        selectedEntity ?
        <h1>{selectedEntity.Name}</h1>
        : false
      }
      <Select
        labelId="entity-type-select-label"
        id="entity-type-select"
        value={selectedEntityType}
        onChange={handleEntityTypeChange}
      >
        {entityTypes.map((entityType, index) => (
          <MenuItem
            key={index}
            className="entityTypeMenuItem"
            value={entityType}
          >
            {entityType}
          </MenuItem>
        ))}
      </Select>
      <List>
        {activeEntities.map((entity, index) => (
          <EntityListItem
            key={index}
            index={index}
            entity={entity}
          />
        ))}
      </List>
    </div>
  )
}
