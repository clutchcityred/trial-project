import React, { useState, useEffect } from 'react'

import entitiesData from '../data/entities.json';
import hierarchy from '../data/hierarchy.json';
import hierarchy2 from '../data/hierarchy2.json';

export default function EntitiesTable({ selectedEntity }) {

  return (
    <div>
      <h1>Entities Table</h1>
      <h2>{ selectedEntity.Name }</h2>
    </div>
  );
}