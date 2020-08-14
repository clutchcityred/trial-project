import React from 'react'
import {
  makeStyles, List, Divider,
  ListItem, ListItemText,
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  drawerContainer: {
    overflow: 'auto',
  },
}))

export default function Sidebar() {
  const classes = useStyles()

  return (
    <div className={classes.drawerContainer}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
