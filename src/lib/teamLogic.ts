const MUST_SEPARATE = ['eivind', 'thomas', 'andreas'];

export function generateTeams(names: string, teamCount: number): string[][] {
	const teams: string[][] = Array.from({ length: teamCount }, () => []);

	const nameList = names
		.split('\n')
		.map((name) => name.trim())
		.filter((name) => name);

	// Separate special names from the rest (case-insensitive match)
	const specialNames: string[] = [];
	const regularNames: string[] = [];

	for (const name of nameList) {
		if (MUST_SEPARATE.some((special) => name.toLowerCase() === special.toLowerCase())) {
			specialNames.push(name);
		} else {
			regularNames.push(name);
		}
	}

	// Place special names on separate teams first
	// If more special names than teams, extras go to random teams
	specialNames.forEach((name, index) => {
		if (index < teamCount) {
			// First N special names go to separate teams
			teams[index].push(name);
		} else {
			// Extra special names go to a random team
			const randomTeamIndex = Math.floor(Math.random() * teamCount);
			teams[randomTeamIndex].push(name);
		}
	});

	// Shuffle remaining names
	const shuffled = [...regularNames].sort(() => Math.random() - 0.5);

	// Distribute remaining names, balancing team sizes
	for (const name of shuffled) {
		// Find team with fewest members
		const smallestTeam = teams.reduce((smallest, team) =>
			team.length < smallest.length ? team : smallest
		);
		smallestTeam.push(name);
	}

	return teams;
}