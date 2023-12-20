import { useNavigate } from 'react-router-dom';

export function Results({ currentSites }) {
    const navigate = useNavigate();
    function back() {
        navigate(-1);
    }
    return (
        <div className="main">
            <div className="finalize">
                <h1>Results</h1>
                <h4
                    style={{
                        fontFamily: 'Montserrat',
                    }}
                >
                    {currentSites.name}
                </h4>
                <button onClick={back} className="btnBack">
                    <ion-icon name="chevron-back-outline"></ion-icon> Back
                </button>
            </div>
        </div>
    );
}
