<script>
	const { data } = $props();
	const habit = $derived(() => data?.habit);
	const entries = $derived(() => data?.entries);
	const streak = $derived(() => data?.streak);

	const formattedDate = $derived(() => {
		const createdAt = habit()?.createdAt;
		if (!createdAt) return null;

		const date = new Date(createdAt);
		return isNaN(date) ? null : date.toLocaleDateString();
	});
</script>

{#if habit()}
	<h1>{habit().title}</h1>

	<div class="card mt-3">
		<div class="card-body">
			<p><strong>Beschreibung:</strong> {habit().description}</p>
			<p><strong>Kategorie:</strong> {habit().category}</p>
			<p>
				<strong>Erstellt am:</strong>
				{#if formattedDate()}
					{formattedDate()}
				{:else}
					<span class="text-muted">Datum nicht verfügbar</span>
				{/if}
			</p>

			<p><strong>Aktuelle Streak:</strong> {streak()} Tag{streak() === 1 ? '' : 'e'}</p>

			<div class="d-flex gap-2 mt-3">
				<a class="btn btn-outline-primary" href="/habits">Zurück zur Übersicht</a>
				<a class="btn btn-secondary" href={`/habits/${habit()._id}/edit`}>Bearbeiten</a>

				<form method="post" action="?/delete">
					<button class="btn btn-danger" type="submit">Habit löschen</button>
				</form>
			</div>
		</div>
	</div>

	<h3 class="mt-4">Verlauf</h3>
	{#if entries() && entries().length > 0}
		<ul class="list-group">
			{#each entries() as entry}
				<li class="list-group-item d-flex justify-content-between">
					<span>{entry.date}</span>
					<span>{entry.status ? '✅ Erledigt' : '❌ Nicht erledigt'}</span>
				</li>
			{/each}
		</ul>
	{:else}
		<p>Keine Einträge vorhanden.</p>
	{/if}
{:else}
	<p>Daten werden geladen...</p>
{/if}
