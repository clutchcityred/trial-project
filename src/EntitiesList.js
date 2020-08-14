import React, { useState, useEffect } from 'react'
import {
  makeStyles, Divider, List,
  ListItem, ListItemText, Select, MenuItem
} from '@material-ui/core'
import _ from 'lodash';
import entitiesData from './data/entities.json';

const useStyles = makeStyles(() => ({
  drawerContainer: {
    overflow: 'auto',
  },
}))

let entityTypes = [];

export default function EntitiesList() {
  const classes = useStyles()
  const [entities, setEntities] = useState([]);
  const [selectedEntityType, setSelectedEntityType] = useState("");
  const [selectedEntityIndex, setSelectedEntityIndex] = useState(0);
  const [selectedEntity, setSelectedEntity] = useState("");

  useEffect(() => {
    entityTypes = [...new Set(entitiesData.map(entity => entity.EntityTypeName))].sort();
  });

  useEffect(() => {
    setSelectedEntityType(entityTypes[selectedEntityIndex]);
    let filteredEntitiesData = _.filter(entitiesData, ['EntityTypeName', entityTypes[selectedEntityIndex]]);
    setEntities(filteredEntitiesData);
    setSelectedEntity(filteredEntitiesData[selectedEntityIndex]);
  }, []);

  const handleListItemClick = (event, index) => {
    setSelectedEntityIndex(index);
    setSelectedEntity(entities[index]);
  };

  const handleEntityTypeChange = (event) => {
    let newSelectedEntityType = event.target.value;
    setSelectedEntityType(newSelectedEntityType);
    let filteredEntitiesData = _.filter(entitiesData, ['EntityTypeName', newSelectedEntityType]);
    setEntities(filteredEntitiesData);
    setSelectedEntityIndex(0);
    setSelectedEntity(filteredEntitiesData[selectedEntityIndex]);
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
        {entities.map((entity, index) => (
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
