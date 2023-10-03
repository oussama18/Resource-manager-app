import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goback = () => {
        navigate(-1);
    };

    return (
        <div className="unauthorized">
            <h1>Unauthorized</h1>
            <button onClick={goback}>Go Back</button>
        </div>
    );
};

export default Unauthorized;