<script>
	const { data } = $props();
	const habit = data.habit;
	const categories = data.categories;

	let title = $state(habit.title);
	let description = $state(habit.description);
	let category = $state(habit.category);
	let frequency = $state(habit.frequency || 'täglich');
</script>

<h1>Habit bearbeiten</h1>

<form method="POST">
	<input
		name="title"
		bind:value={title}
		placeholder="Name"
		class="form-control mb-2"
		required
	/>

	<textarea
		name="description"
		bind:value={description}
		class="form-control mb-2"
		placeholder="Beschreibung"
	></textarea>

	<select
		name="category"
		bind:value={category}
		class="form-control mb-2"
		required
	>
		<option value="" disabled>Kategorie wählen</option>
		{#each categories as c}
			<option value={c.name}>{c.name}</option>
		{/each}
	</select>

	<select
		name="frequency"
		bind:value={frequency}
		class="form-control mb-2"
	>
		<option value="täglich">täglich</option>
		<option value="wöchentlich">wöchentlich</option>
	</select>

	<button class="btn btn-success">Speichern</button>
</form>
