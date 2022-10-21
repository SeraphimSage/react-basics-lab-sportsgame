function Team(props) {
	let shotPercentageDiv;

	if (props.stats.shots) {
		const shotPercentage = Math.round(
			(props.stats.score / props.stats.shots) * 100
		);
		shotPercentageDiv = (
			<div>
				<strong>Shooting %: {shotPercentage}</strong>
			</div>
		);
	}

	return (
		<div className="Team">
			<h2>{props.name}</h2>

			<div className="identity">
				<img src={props.logo} alt={props.name} />
			</div>

			<div>
				<strong>Shots:</strong> {props.stats.shots}
			</div>

			<div>
				<strong>Score:</strong> {props.stats.score}
			</div>

			{shotPercentageDiv}

			<button onClick={props.shotHandler}>Shoot!</button>
		</div>
	);
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			resetCount: 0,
			homeTeamStats: {
				shots: 0,
				score: 0
			},
			visitingTeamStats: {
				shots: 0,
				score: 0
			}
		};
		this.shotSound = new Audio("./assets/audio/bounces.wav");
		this.scoreSound = new Audio("./assets/audio/swish.wav");
	}

	shotHandler = team => {
		const teamStatsKey = `${team}TeamStats`;
		let score = this.state[teamStatsKey].score;
		this.shotSound.play();

		if (Math.random() > 0.5) {
			score += 1;
			setTimeout(() => {
				this.scoreSound.play();
			}, 2500);
		}

		this.setState((state, props) => ({
			[teamStatsKey]: {
				shots: state[teamStatsKey].shots + 1,
				score
			}
		}));
	};

	resetGame = () => {
		this.setState((state, props) => ({
			resetCount: state.resetCount + 1,
			homeTeamStats: {
				shots: 0,
				score: 0
			},
			visitingTeamStats: {
				shots: 0,
				score: 0
			}
		}));
	};

	render() {
		return (
			<div className="Game">
				<h1>Welcome to {this.props.venue}</h1>
				<div className="stats">
					<Team
						name={this.props.visitingTeam.name}
						logo={this.props.visitingTeam.logoSrc}
						stats={this.state.visitingTeamStats}
						shotHandler={() => this.shotHandler("visiting")}
					/>

					<div className="versus">
						<h1>VS</h1>
						<div>
							<strong>Resets:</strong>
							{this.state.resetCount}
							<button onClick={this.resetGame}>Reset Game</button>
						</div>
					</div>

					<Team
						name={this.props.homeTeam.name}
						logo={this.props.homeTeam.logoSrc}
						stats={this.state.homeTeamStats}
						shotHandler={() => this.shotHandler("home")}
					/>
				</div>
			</div>
		);
	}
}
// Deafault App component that all other compents are rendered through
function App(props) {
	const raccoons = {
		name: "Russiaville Raccons",
		logoSrc: "./assets/images/raccoon.png"
	};

	const squirrels = {
		name: "Sheridan Squirrels",
		logoSrc: "./assets/images/squirrel-logo-png.png"
	};

	const bunny = {
		name: "Burlington Bunnies",
		logoSrc: "./assets/images/bunny.jpg"
	};

	const hounds = {
		name: "Hammond Hounds",
		logoSrc: "./assets/images/hound.png"
	};
	return (
		<div className="App">
			<Game
				venue="Union 525 Gem"
				homeTeam={squirrels}
				visitingTeam={raccoons}
			/>
			;
			<Game venue="Sheridan Arena" homeTeam={bunny} visitingTeam={hounds} />;
		</div>
	);
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
