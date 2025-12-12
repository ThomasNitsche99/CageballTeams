<script lang="ts">
	let names = $state('');
	let teamCount = $state(2);
	let teams: string[][] = $state([]);

	function generateTeams() {
		teams = Array.from({ length: teamCount }, () => []);
		const nameList = names
			.split('\n')
			.map((name) => name.trim())
			.filter((name) => name);

		while (nameList.length) {
			for (let i = 0; i < teamCount; i++) {
				if (nameList.length === 0) break;
				const randomIndex = Math.floor(Math.random() * nameList.length);
				const selectedName = nameList.splice(randomIndex, 1)[0];
				teams[i].push(selectedName);
			}
		}
	}

    function reset(){
        names = '';
        teamCount = 2;
        teams = [];
    }
</script>

<main class="mx-auto max-w-2xl border border-red-400 p-8">
	<h1 class="mb-2 text-center text-2xl font-bold">Cage Team Generator</h1>

	<textarea
		bind:value={names}
		placeholder="Enter names (one per line)"
		class="h-40 w-full rounded border p-2"
	></textarea>

	<div class="my-4 flex gap-4">
		<span>Number of teams:</span>
		{#each [2, 3, 4] as count}
			<label class="flex items-center gap-1">
				<input type="radio" name="teamCount" value={count} bind:group={teamCount} />
				{count}
			</label>
		{/each}
	</div>

	<button
		onclick={generateTeams}
		class="rounded bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
		disabled={names.trim().length === 0}
	>
		Generate Teams
	</button>
    
    <button
        onclick={reset}
        class="rounded bg-red-500 px-4 py-2 text-white"
    >
        Reset
    </button>

	{#if teams.length > 0}
		<div class="mt-6 grid grid-cols-2 gap-4">
			{#each teams as team, i}
				<div class="rounded border p-4">
					<h2 class="font-bold">Team {i + 1}</h2>
					<ul>
						{#each team as member}
							<li>{member}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{/if}
</main>
