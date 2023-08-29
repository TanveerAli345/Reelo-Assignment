import Select from 'react-select'

function Dropdown({ name, label, options, sendValue, styles, selectedValue }) {
    return(
        <Select
            value={selectedValue ? { value: selectedValue, label: selectedValue } : null}
            className='select'
            placeholder={label}
            options={options}
            styles={styles}
            onChange={e => sendValue(e, name)}
        />
    )    
}

export default Dropdown 