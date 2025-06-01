<script>
	import CalendarView from '$lib/components/CalendarView.svelte';

	const { data } = $props();
	const { stats, habits, entries } = data;
</script>

<h1>Statistiken</h1>

<section class="mb-4">
	<h4>Tagesfortschritt</h4>
	<p>{stats.doneToday} von {stats.totalHabits} Habits heute erledigt</p>
</section>

<section class="mb-4">
	<h4>Verlauf der letzten 7 Tage</h4>
	<ul class="list-group">
		{#each stats.last7Days as day}
			<li class="list-group-item d-flex justify-content-between">
				<span>{day.date}</span>
				<span>{day.count} erledigt</span>
			</li>
		{/each}
	</ul>
</section>

<section class="mb-4">
	<h4>Aktuelle Streaks</h4>
	{#if habits.length > 0}
		<ul class="list-group">
			{#each habits as habit}
				<li class="list-group-item d-flex justify-content-between">
					<strong>{habit.title}</strong>
					<span>{stats.streaks[habit.id]} Tage</span>
				</li>
			{/each}
		</ul>
	{:else}
		<p>Keine Habits vorhanden.</p>
	{/if}
</section>

<section class="mb-4">
	<h4>Monatsübersicht</h4>
	<CalendarView {entries} {stats} />
</section>
