// function Table({ results }) {
//     return (
//         <div className="table-container">
//             <table className="table">
//                 <thead>
//                     <tr className="table-row-header">
//                         <th>Planet Name</th>
//                         <th>Host Name</th>
//                         <th>Discovery Method</th>
//                         <th>Discovery Year</th>
//                         <th>Discoery Facilty</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {results.map((item, i) => (
//                         <tr className="table-row" key={i}>
//                             <td><a href={`https://exoplanetarchive.ipac.caltech.edu/cgi-bin/DisplayOverview/nph-DisplayOverview?objname=${item.pl_name}&type=CONFIRMED_PLANET`.replace(/\+/g, "%2B").replace(/\s/g, "+")} 
//                             target="_blank">{item.pl_name}</a></td>
//                             <td>{item.hostname}</td>
//                             <td>{item.discoverymethod}</td>
//                             <td>{item.disc_year}</td>
//                             <td>{item.disc_facility}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default Table


import React, { useState } from 'react';

function Table({ results }) {
  const [sortedBy, setSortedBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const handleHeaderClick = (column) => {
    
    if (column === sortedBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      
      setSortedBy(column);
      setSortOrder('asc');
    }
  };

  const sortedResults = results.slice().sort((a, b) => {
    const aValue = a[sortedBy];
    const bValue = b[sortedBy];

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    } else if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="table-row-header">
            <SortableHeader
              className="th"
              column="pl_name"
              label="Planet Name"
              sortedBy={sortedBy}
              sortOrder={sortOrder}
              onClick={handleHeaderClick}
            />
            <SortableHeader
                className="th"
              column="hostname"
              label="Host Name"
              sortedBy={sortedBy}
              sortOrder={sortOrder}
              onClick={handleHeaderClick}
            />
             <SortableHeader
                           className="th"

              column="discoverymethod"
              label="Discovery Method"
              sortedBy={sortedBy}
              sortOrder={sortOrder}
              onClick={handleHeaderClick}
            />
            <SortableHeader
                          className="th"

              column="disc_year"
              label="Discovery Year"
              sortedBy={sortedBy}
              sortOrder={sortOrder}
              onClick={handleHeaderClick}
            />
            <SortableHeader
                          className="th"

              column="disc_facility"
              label="Discovery Facility"
              sortedBy={sortedBy}
              sortOrder={sortOrder}
              onClick={handleHeaderClick}
            />

          </tr>
        </thead>
        <tbody>
          {sortedResults.map((item, i) => (
            <tr className="table-row" key={i}>
              
                           <td><a href={`https://exoplanetarchive.ipac.caltech.edu/cgi-bin/DisplayOverview/nph-DisplayOverview?objname=${item.pl_name}&type=CONFIRMED_PLANET`.replace(/\+/g, "%2B").replace(/\s/g, "+")} 
                            target="_blank">{item.pl_name}</a></td>
                            <td>{item.hostname}</td>
                            <td>{item.discoverymethod}</td>
                            <td>{item.disc_year}</td>
                            <td>{item.disc_facility}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SortableHeader = ({ column, label, sortedBy, sortOrder, onClick }) => {
  const isActive = sortedBy === column;

  return (
    <th onClick={() => onClick(column)}>
      {label}
      {isActive && <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>}
    </th>
  );
}

export default Table;
