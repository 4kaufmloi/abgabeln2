<script>
	import DailyOverview from '$lib/components/DailyOverview.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import HabitCard from '$lib/components/HabitCard.svelte';

	const { data } = $props();

const { stats, habits, doneHabitIds } = data;

  const entries = data.entries; 


</script>

<DailyOverview {stats} />

<ProgressBar percent={stats.percent} />


<h2 class="mb-4">Deine Health Habits für heute</h2>

<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
	{#each habits as habit}
		<div class="col">
			<HabitCard habit={habit} isDone={doneHabitIds.includes(habit._id)} />
		</div>
	{/each}

</div>
