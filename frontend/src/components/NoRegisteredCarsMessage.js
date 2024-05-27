import { useNavigate } from "react-router-dom";


const NoRegisteredCarsMessage = () => {
    const navigate = useNavigate();

    return (
      <div>
        No registered vehicles... please register a vehicle to record its
        repairs.
        <button
          class="button-82-pushable"
          onClick={() => navigate(`/registerCar`)}
        >
          <span class="button-82-shadow"></span>
          <span class="button-82-edge"></span>
          <span class="button-82-front text">Add a Vehicle</span>
        </button>
      </div>
    );
  };

  export default NoRegisteredCarsMessage