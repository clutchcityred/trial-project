import React, { useState, useEffect } from 'react'
import {
  makeStyles, Divider, List,
  ListItem, ListItemText, Select, MenuItem
} from '@material-ui/core'
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    entityTypes = [...new Set(entitiesData.map(entity => entity.EntityTypeName))];
    console.log(JSON.stringify(entityTypes));
  });

  useEffect(() => {
    setEntities(entitiesData);
    setSelectedEntityType(entityTypes[0]);
  }, []);

  const handleListItemClick = (event, index) => {
    console.log(index)
    setSelectedIndex(index);
  };

  const handleEntityTypeChange = (event) => {
    console.log(event.target.value);
    setSelectedEntityType(event.target.value);
  };

  const EntityListItem = ({ entity, index }) =>
    <ListItem
      className="entity"
      button
      selected={selectedIndex === entity.index}
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
        {/* {entities.map((entity, index) => (
          <EntityListItem
            key={index}
            index={index}
            entity={entity}
          />
        ))} */}
      </List>
    </div>
  )
}
