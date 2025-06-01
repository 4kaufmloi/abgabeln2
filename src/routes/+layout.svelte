<script>
    import "./styles.css";
    let { children } = $props();
  </script>
  
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">DailyHabbit</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/">Übersicht</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/habits">Alle Habits</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/habits/new">Neues Habit</a>
          </li>
          <li class="nav-item">
          <a class="nav-link" href="/categories">Kategorien</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/stats">Statistiken</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  <div class="container mt-4">
    {@render children()}
  </div>
  