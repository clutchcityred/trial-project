import React, { useContext, useState } from 'react'
import {
  makeStyles, Drawer, AppBar, Toolbar,
  FormControlLabel, Typography, Tabs, Tab
} from '@material-ui/core'

import SwitchUI from '@material-ui/core/Switch'
import { CustomThemeContext } from './themes/CustomThemeProvider'
import EntitiesList from './views/EntitiesList'
import EntitiesTable from './views/EntitiesTable'
import Hierarchy from './views/Hierarchy'
import Test from './views/Test'

const drawerWidth = 350

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export default function App() {
  const classes = useStyles()
  const { currentTheme, setTheme } = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const saveSelectedEntity = (entity) => {
    setSelectedEntity(entity);
  }
  const [activeEntities, setActiveEntities] = useState([]);
  const saveActiveEntities = (activeEntities) => {
    setActiveEntities(activeEntities);
  }

  const handleThemeChange = (event) => {
    const { checked } = event.target
    if (checked) {
      setTheme('dark')
    } else {
      setTheme('normal')
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trial Project
          </Typography>
          <FormControlLabel
            control={<SwitchUI checked={isDark} onChange={handleThemeChange} />}
            label="Theme"
          />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <EntitiesList
          saveSelectedEntity={saveSelectedEntity}
          selectedEntity={selectedEntity}
          saveActiveEntities={saveActiveEntities}
          activeEntities={activeEntities}
        />
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Tabs
          centered
          textColor="secondary"
          indicatorColor="secondary"
          style={{ marginBottom: "16px" }}
          value={selectedTab}
          onChange={(event, val) => setSelectedTab(val)}
        >
          <Tab
            label="Hierarchy"
          />
          <Tab
            label="Table"
          />
          <Tab
            label="Test"
          />
        </Tabs>
        {selectedTab === 0 && <Hierarchy selectedEntity={selectedEntity} />}
        {selectedTab === 1 && <EntitiesTable
          selectedEntity={selectedEntity}
          activeEntities={activeEntities}
        />}
        {selectedTab === 2 && <Test />}
      </main>
    </div>
  )
}
