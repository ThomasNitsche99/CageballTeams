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

<main class="mx-auto max-w-4xl p-4 md:p-12">
	<h1 class="mb-4 text-center text-2xl font-bold md:text-4xl">Cage Team Generator</h1>

	<textarea
		bind:value={names}
		placeholder="Enter names (one per line)"
		class="h-40 w-full rounded border p-3 text-base md:h-56 md:p-4 md:text-lg"
	></textarea>

	<div class="my-4 flex flex-wrap items-center gap-4 text-base md:my-6 md:gap-6 md:text-lg">
		<span>Number of teams:</span>
		{#each [2, 3, 4] as count}
			<label class="flex cursor-pointer items-center gap-2 rounded border px-4 py-2 text-lg md:px-5 md:py-2 md:text-xl {teamCount === count ? 'bg-blue-500 text-white' : 'bg-white'}">
				<input type="radio" name="teamCount" value={count} bind:group={teamCount} class="hidden" />
				{count}
			</label>
		{/each}
	</div>

	<div class="flex w-full gap-3 md:w-auto">
		<button
			onclick={generateTeams}
			class="flex-7 rounded bg-blue-500 px-4 py-3 text-base text-white disabled:cursor-not-allowed disabled:opacity-50 md:flex-none md:px-6 md:py-3 md:text-lg"
			disabled={names.trim().length === 0}
		>
			Generate Teams
		</button>

		<button
			onclick={reset}
			class="flex-3 rounded bg-red-500 px-4 py-3 text-base text-white md:flex-none md:px-6 md:py-3 md:text-lg"
		>
			Reset
		</button>
	</div>

	{#if teams.length > 0}
		<div class="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-6">
			{#each teams as team, i}
				<div class="rounded border p-4 md:p-6">
					<h2 class="mb-2 text-lg font-bold md:text-xl">Team {i + 1}</h2>
					<ul class="text-base md:text-lg">
						{#each team as member}
							<li class="py-1">{member}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{/if}
</main>
