<script>
	let { habit, isDone } = $props();
</script>

<div class="card h-100 shadow-sm" style="border-left: 6px solid #4ade80;">
  <div class="card-body">
    <h5 class="card-title">
      {habit.icon ? `${habit.icon} ` : ''}{habit.title}
    </h5>

    {#if habit.description}
      <p class="card-text">{habit.description}</p>
    {/if}

    {#if habit.goal}
      <p class="card-text"><strong>Ziel:</strong> {habit.goal}</p>
    {/if}

    {#if habit.category}
      <p class="card-text text-muted"><em>{habit.category}</em></p>
    {/if}

    {#if isDone}
      <p class="text-success mt-2">✅ Schon erledigt</p>
    {:else}
      <form method="POST" action={`/entries/${habit._id}`}>
        <button class="btn btn-success mt-2">Erledigt</button>
      </form>
    {/if}
  </div>
</div>
