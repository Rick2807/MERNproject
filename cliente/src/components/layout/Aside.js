import React from 'react'
import Listing from '../projects/Listing'
import NewProject from '../projects/NewProject'

const Aside = () => {
    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <NewProject />
            <div className="proyectos">
                <h2>Your Projects</h2>
                <Listing />
            </div>
        </aside>
    )
}

export default Aside
