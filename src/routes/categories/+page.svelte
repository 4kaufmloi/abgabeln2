<script>
	const { data } = $props();
	const { categories } = data;
</script>

<h1>Kategorien verwalten</h1>

<form method="POST" action="?/create" class="mb-4 d-flex gap-2">
	<input name="name" placeholder="Neue Kategorie" class="form-control" required />
	<button class="btn btn-primary">Hinzufügen</button>
</form>

<ul class="list-group">
	{#each categories as cat}
		<li class="list-group-item d-flex justify-content-between align-items-center">
			<span>{cat.name}</span>
			<form method="POST" action="?/delete" class="m-0">
				<input type="hidden" name="id" value={cat.id} />
				<button class="btn btn-sm btn-outline-danger">Löschen</button>
			</form>
		</li>
	{/each}
</ul>
