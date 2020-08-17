import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Select, MenuItem
} from '@material-ui/core'
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

export default function Hierarchy({ selectedEntity }) {
  const hierarchies = useSelector(state => state.hierarchies.hierarchies);
  const [selectedHierarchy, setSelectedHierarchy] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);
  const [searchFoundCount, setSearchFoundCount] = useState(null);

  useEffect(() => {
    if (hierarchies) {
      saveHierarchy(hierarchies[0]);
    }
  }, []);

  const saveHierarchy = (hierarchy) => {
    setSelectedHierarchy(hierarchy);
    setTreeData(hierarchy.tree);
  }

  const handleHierarchyChange = (event) => {
    let newSelectedHierarchy = event.target.value;
    saveHierarchy(newSelectedHierarchy);
  };

  // // Case insensitive search of `node.title`
  // const customSearchMethod = ({ node, searchQuery }) => {
  //   searchQuery && node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
  // }

  const selectPrevMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null
        ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
        : searchFoundCount - 1
    );
  }

  const selectNextMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null
        ? (searchFocusIndex + 1) % searchFoundCount
        : 0,
    );
  }

  const searchFinishCallback = (matches) => {
    setSearchFoundCount(matches.length);
    setSearchFocusIndex(matches.length > 0 ? searchFocusIndex % matches.length : 0);
  }

  return (
    <div style={{ height: 1000 }}>
      {
        selectedEntity ?
          <h1>{selectedEntity.Name}</h1>
          : false
      }
      <Select
        labelId="entity-type-select-label"
        id="entity-type-select"
        value={selectedHierarchy}
        onChange={handleHierarchyChange}
      >
        {hierarchies.map((hierarchy, index) => (
          <MenuItem
            key={index}
            className="hierarchyMenuItem"
            value={hierarchy}
          >
            {hierarchy.name}
          </MenuItem>
        ))}
      </Select>

      <form
        style={{ display: 'inline-block' }}
        onSubmit={event => { event.preventDefault(); }}
      >
        <button
          type="button"
          disabled={!searchFoundCount}
          onClick={selectPrevMatch}
        >
          &lt;
        </button>
        <button
          type="submit"
          disabled={!searchFoundCount}
          onClick={selectNextMatch}
        >
          &gt;
        </button>
        <span>
          &nbsp;
            {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
            &nbsp;/&nbsp;
            {searchFoundCount || 0}
        </span>
      </form>
      <SortableTree
        treeData={treeData}
        onChange={treeData => setTreeData(treeData)}
        // The query string used in the search. This is required for searching.
        searchQuery={selectedEntity ? selectedEntity.Name : null}
        //
        // When matches are found, this property lets you highlight a specific
        // match and scroll to it. This is optional.
        searchFocusOffset={searchFocusIndex}
        //
        // This callback returns the matches from the search,
        // including their `node`s, `treeIndex`es, and `path`s
        // Here I just use it to note how many matches were found.
        // This is optional, but without it, the only thing searches
        // do natively is outline the matching nodes.
        searchFinishCallback={matches => searchFinishCallback(matches)}
        //
        // This prop only expands the nodes that are seached.
        onlyExpandSearchedNodes
        style={{ color: "black" }}
      />
    </div>
  );
}