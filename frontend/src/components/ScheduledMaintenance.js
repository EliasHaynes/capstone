import React from "react";

function ScheduledMaintenance(props) {
    return (
        <div>
            <h1>Scheduled Maintenance</h1>
            <button onClick={props.fetchScheduledMaintenance}>Fetch Maintenance</button>
            <p>{props.userScheduledMaintenance}</p>
        </div>
    )
}

export default ScheduledMaintenance