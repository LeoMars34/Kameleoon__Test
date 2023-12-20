import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom';
import { Dashboard } from './Pages/Dashboard';
import { Finalize } from './Pages/Finalize';
import { Results } from './Pages/Results';
import { useState } from 'react';

function App() {
    const [currentSites, setCurrentSites] = useState([]);
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/Dashboard" />} />
                    <Route
                        path="/Dashboard"
                        element={
                            <Dashboard setCurrentSites={setCurrentSites} />
                        }
                    />
                    <Route
                        path={`/Finalize/${currentSites.id}`}
                        element={<Finalize currentSites={currentSites} />}
                    />
                    <Route
                        path={`/Results/${currentSites.id}`}
                        element={<Results currentSites={currentSites} />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
