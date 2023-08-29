import { useState } from "react"

import Filters from "./Filters"
import Table from "./Table"
import Fallback from "./Fallback"

function Layout() {
    const [results, setResults] = useState([])

    return(
        <div className="display">
            <Filters setResults={setResults} />
            {results.length ? (
                <Table results={results}/>
            ) : (
                <Fallback />
            )}
        </div>
    )
}

export default Layout