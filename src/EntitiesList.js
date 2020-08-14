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

  useEffect(() => {
    entityTypes = [...new Set(entitiesData.map(entity => entity.EntityTypeName))];
  });

  useEffect(() => {
    setSelectedEntityType(entityTypes[0]);
    let filteredEntitiesData = _.filter(entitiesData, ['EntityTypeName', entityTypes[0]]);
    setEntities(filteredEntitiesData);
  }, []);

  const handleListItemClick = (event, index) => {
    console.log(index)
    setSelectedEntityIndex(index);
  };

  const handleEntityTypeChange = (event) => {
    let newSelectedEntityType = event.target.value;
    console.log(newSelectedEntityType);
    setSelectedEntityType(newSelectedEntityType);
    let filteredEntitiesData = _.filter(entitiesData, ['EntityTypeName', newSelectedEntityType]);
    setEntities(filteredEntitiesData);
  };

  const EntityListItem = ({ entity, index }) =>
    <ListItem
      className="entity"
      button
      selected={selectedEntityIndex === entity.index}
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
