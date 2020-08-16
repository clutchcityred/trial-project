import React from 'react'
import { useTable } from 'react-table'
import styled from 'styled-components'

import hierarchy from '../data/hierarchy.json';
import hierarchy2 from '../data/hierarchy2.json';

export default function EntitiesTable({ selectedEntity, entities }) {
  const getColumnConfig = () => {
    let columnConfig = [
      { Header: 'Name', accessor: 'Name' },
      { Header: 'Entity Type', accessor: 'EntityTypeName' },
      { Header: 'Alias', accessor: 'Alias' }
    ];
    return columnConfig;
  }

  return (
    <div>
      <h1>Entities Table</h1>
      <h2>{selectedEntity.Name}</h2>
      <Styles>
        <Table
          // minRows={1}
          columns={getColumnConfig()}
          data={entities}
        //  className="-striped -highlight" 
        />
      </Styles>
    </div>
  );
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`