import './App.css';
import React, {useState} from "react"
import PlayersView from "./pages/PlayersView";
import TeamView from "./pages/TeamView";

function App (){
    const [view, setView] = useState("players");
    const handleTabChange = (tab) => {
        setView(tab);
    };
    return (
        <div className="App">
            <div className="tab-bar">
                <button
                    className={view === 'players' ? 'active' : ''}
                    onClick={() => handleTabChange('players')}
                >
                    Spielerliste
                </button>
                <button
                    className={view === 'teams' ? 'active' : ''}
                    onClick={() => handleTabChange('teams')}
                >
                    Teams
                </button>
            </div>

            <h1>Football Base</h1>
            {
                view === "players" &&
                    <PlayersView/>

            }
            {
                view === "teams" &&
                    <TeamView/>

            }
        </div>
    );
}

export default App;
