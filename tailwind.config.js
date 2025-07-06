module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			colorOne: "#CDB4DB",
			colorTwo: "#FFC8DD",
			colorThree: "#FFAFCC",
			colorFour: "#BDE0FE",
			colorFive: "#A2D2FF",
		},
		fontFamily: {
			comic: ["Comic Relief", "sans-serif"],
			funnel: ["Funnel Sans", "sans-serif"],
			lexend: ["Lexend Deca", "sans-serif"],
			quicksand: ["Quicksand", "sans-serif"],
		},
		extend: {
			transitionDuration: {
				2000: "2000ms",
			},
			boxShadow: {
				"shadow-colorOne":
					"0 0 5px #00A8E8, 0 0 10px #00A8E8, 0 0 20px #00A8E8, 0 0 40px #00A8E8",
				"shadow-colorTwo":
					"0 0 5px #003459, 0 0 10px #003459, 0 0 20px #003459, 0 0 40px #003459",
			},
		},
	},
	plugins: [],
};
