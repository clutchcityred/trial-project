import React, { useState, useEffect } from 'react'

import hierarchy from '../data/hierarchy.json';
import hierarchy2 from '../data/hierarchy2.json';

export default function EntitiesTable({ selectedEntity, entities }) {

  return (
    <div>
      <h1>Entities Table</h1>
      <h2>{ selectedEntity.Name }</h2>
    </div>
  );
}