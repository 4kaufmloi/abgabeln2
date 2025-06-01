<script>
    let { entries = [] } = $props(); 

    const today = new Date();
    let currentMonth = $state(today.getMonth()); 
    let currentYear = $state(today.getFullYear());
    
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const startDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const calendarDays = $derived.by(() => {
        const days = [];
        const numDays = daysInMonth(currentYear, currentMonth);
        const startDay = startDayOfMonth(currentYear, currentMonth);

        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        for (let day = 1; day <= numDays; day++) {
            days.push(day);
        }

        return days;
    });

    const progressByDay = $derived.by(() => {
        const progress = {};
        calendarDays.forEach(day => {
            if (!day) return;

            const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];

            const dayEntries = entries.filter(entry => {
                const entryDate = new Date(entry.date).toISOString().split('T')[0];
                return entryDate === dateStr;
            });

            const completed = dayEntries.filter(entry => entry.status).length;
            const total = dayEntries.length;

            progress[day] = { completed, total };
        });
        return progress;
    });

    const nextMonth = () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
    };

    const prevMonth = () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
    };

    const monthNames = [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];
</script>

<div class="card my-4">
    <div class="card-header d-flex justify-content-between align-items-center">
        <button class="btn btn-outline-secondary btn-sm" onclick={prevMonth}>⬅️</button>
        <strong>{monthNames[currentMonth]} {currentYear}</strong>
        <button class="btn btn-outline-secondary btn-sm" onclick={nextMonth}>➡️</button>
    </div>

    <div class="card-body p-0">
        <table class="table table-bordered m-0 text-center">
            <thead class="table-light">
                <tr>
                    <th>So</th>
                    <th>Mo</th>
                    <th>Di</th>
                    <th>Mi</th>
                    <th>Do</th>
                    <th>Fr</th>
                    <th>Sa</th>
                </tr>
            </thead>
            <tbody>
                {#each Array(Math.ceil(calendarDays.length / 7)) as _, week}
                    <tr>
                        {#each calendarDays.slice(week * 7, week * 7 + 7) as day}
                            <td style="height: 80px; vertical-align: top;">
                                {#if day}
                                    <div>{day}</div>
                                    {#if progressByDay[day]}
                                        <div class="mt-2">
                                            <strong>{progressByDay[day].completed}/{progressByDay[day].total}</strong>
                                        </div>
                                    {:else}
                                        <div class="mt-2 text-muted">Keine Einträge</div>
                                    {/if}
                                {/if}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
