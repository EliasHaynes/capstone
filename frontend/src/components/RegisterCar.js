import React, {useState} from "react"



function RegisterCar() {
    const [vinForm,setVinForm] = useState([{
        vinClicked: false,
        vin: "",
        mileage: ""
    }])



    const handleVinSubmit = (e) => {
        e.preventDefault()
        setVinForm( {vinClicked: true} )
        console.log('vin')
    }
    

    const handleVinTextChange = (e) => {
        const newState = {...vinForm }
        newState[e.target.id] = e.target.value
        setVinForm(newState)
    }




    return (
            <div>
                <h1>This is where to register a new car and save to database</h1>
                <span>
                    <form onSubmit={handleVinSubmit}>
                        <input name="vin" placeholder="vin #" onChange={handleVinTextChange}></input>
                        <input name="mileage" placeholder="mileage #" onChange={handleVinTextChange}></input>
                        <button type="submit">Submit Vin</button>
                    </form>
                </span>
        </div>
    )
}

export default RegisterCar;