<script>
	const { data } = $props();
</script>

<h1>Alle Health Habits</h1>

<a href="/habits/new" class="btn btn-success mb-4">Neues Habit anlegen</a>

{#each data.habits as habit}
	<div class="card mb-3">
		<div class="card-body">
			<h5 class="card-title">{habit.title}</h5>
			<p class="card-text">{habit.description}</p>
			<small class="text-muted">
				Kategorie: {habit.category}
			</small>

			<div class="mt-2">
				<a class="btn btn-outline-primary btn-sm" href={`/habits/${habit._id}`}>
					Details anzeigen
				</a>
			</div>
		</div>
	</div>
{/each}
