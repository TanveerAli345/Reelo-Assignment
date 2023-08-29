import Dropdown from './Dropdown'
import { toast } from 'react-toastify';

import { data } from '../utils/csvjson'
import { options } from '../utils/options'
import { useState } from 'react';

function Filters({ setResults }) {
    const [cleared, setCleared] = useState(false)
    const [filters, setFilters] = useState({
        "hostname": '',
        "discoverymethod": '',
        "disc_year": '',
        "disc_facility": '',
      })
    
    function getOptions(filterName) {
        const hashSet = new Set();
        const options = [];

        for (const item of data) {
            const value = item[filterName]

            if (value && !hashSet.has(value)) {
                hashSet.add(value)
                options.push({ value, label: value })
            }
        }

        options.sort((a, b) => {
            const valueA = a.value;
            const valueB = b.value;
            
            if (valueA < valueB) {
              return -1;
            }
            if (valueA > valueB) {
              return 1;
            }
            return 0;
          });
        return options.sort((a, b) => a.value - b.value)
    }

    const styles = {
        control: (styles) => ({...styles, width: "220px"})
    }

    function handleChange() {
        setCleared(false)
        let results = []

        if (filters) {results = data.filter((item) => (
            (!filters.hostname || item.hostname === filters.hostname) &&
            (!filters.discoverymethod || item.discoverymethod === filters.discoverymethod) &&
            (!filters.disc_year || item.disc_year === filters.disc_year) &&
            (!filters.disc_facility || item.disc_facility === filters.disc_facility)
        ))}

        if (results.length === 0) {
            alert("No search matches were found")
          }
        
        
        if (
            (!filters.hostname) && (!filters.discoverymethod) && (!filters.disc_year) && (!filters.disc_facility)
        ) {
            alert("No query selected")
            setResults([])
        } else {
            setResults(results)
        }
    }

    function handleClear() {
        setFilters({
            "hostname": '',
            "discoverymethod": '',
            "disc_year": '',
            "disc_facility": '',
        })
        setResults([])
        setCleared(true)
    }

    function sendValue(e, name) {
        setFilters({
            ...filters,
            [name]: e.value,
        })
    }

    return (
        <div className="filters-container">
            {data &&
                options.map((item, i) => (
                <Dropdown                
                    key={i}
                    name={item.name}
                    label={item.label}
                    options={getOptions(item.name)}
                    styles={styles}
                    sendValue={sendValue}
                    selectedValue={filters[item.name]}
                />
                ))}
            <button className='button search' onClick={handleChange}>Search</button>
            <button className='button clear' onClick={handleClear}>Clear</button>
        </div>
    )
}

export default Filters