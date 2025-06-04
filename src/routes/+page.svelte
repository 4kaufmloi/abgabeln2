<script>
	import { goto } from '$app/navigation';

	function weiterZurApp() {
		goto('/overview');
	}
</script>

<div class="text-center p-5" style="min-height: 100vh; background-color: white;">
	<h1 class="mb-4 text-dark display-4">Welcome to DailyHabit</h1>

	<video controls class="w-100 rounded shadow mb-4" style="max-width: 600px;">
        <source src="/DemoDailyHabit.mp4" type="video/mp4" />
    </video>

	<p class="lead text-dark">A small step today - a big difference tomorrow</p>

	<button onclick={weiterZurApp} class="btn btn-dark mt-4">Loslegen</button>
</div>