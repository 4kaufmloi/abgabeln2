<script>
	const { data } = $props();
	let name = $state('');
	let description = $state('');
	let category = $state('');
	let frequency = $state('täglich');
	const categories = data.categories;
</script>

<form method="POST">
	<input name="name" bind:value={name} placeholder="Name" class="form-control mb-2" required />
	<textarea name="description" bind:value={description} class="form-control mb-2" placeholder="Beschreibung"></textarea>

	<select name="category" bind:value={category} class="form-control mb-2" required>
		<option value="" disabled selected>Kategorie wählen</option>
		{#each categories as c}
			<option value={c.name}>{c.name}</option>
		{/each}
	</select>
	<button class="btn btn-success">Speichern</button>
</form>
