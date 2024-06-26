import "./App.css";
import Board from "./components/Board";
import FormDialog from "./components/Modal";
function App() {
	return (
		<div className="App">
			<Board />
			<FormDialog />
		</div>
	);
}

export default App;
