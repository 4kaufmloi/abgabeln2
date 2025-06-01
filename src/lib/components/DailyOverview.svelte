<script>
    const { stats } = $props();
  </script>
  
  <h1 class="mb-3">Willkommen zurück!</h1>
  
  <p>📅 Heute ist der: <strong>{new Date(stats.date).toLocaleDateString()}</strong></p>
  <p>Du hast <strong>{stats.total}</strong> Daily Habits geplant.</p>
  <p>
      ✅ <strong>{stats.done}</strong> erledigt |
      ⏳ <strong>{stats.total - stats.done}</strong> noch offen
  </p>
  