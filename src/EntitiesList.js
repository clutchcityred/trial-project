import React, { useState, useEffect } from 'react'
import {
  makeStyles, Divider, List,
  ListItem, ListItemText,
} from '@material-ui/core'
import entitiesData from './data/entities.json';

const useStyles = makeStyles(() => ({
  drawerContainer: {
    overflow: 'auto',
  },
}))

export default function EntitiesList() {
  const classes = useStyles()
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    setEntities(entitiesData);
  }, []);

  const EntityListItem = ({ entity }) =>
    <ListItem
      className="entity"
      button
    >
      <ListItemText primary={entity.Name} />
    </ListItem>;

  return (
    <div className={classes.drawerContainer}>
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
