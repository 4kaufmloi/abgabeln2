<script>
	let { percent } = $props();
</script>

<div class="progress my-4" style="height: 25px;">
  <div
    class="progress-bar bg-success"
    role="progressbar"
    style={`width: ${percent}%`}
    aria-valuenow={percent}
    aria-valuemin="0"
    aria-valuemax="100"
  >
    {percent}%
  </div>
</div>
