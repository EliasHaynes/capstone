import React from "react"

function VinDecode(props) {

    return (
        <div>
            <h1>Display users car name here</h1>
            <button onClick={props.fetchUsersCar}></button>
            {/* <p>{props.userCarSpecs.year}</p> */}
        </div>
    )
}

export default VinDecode;