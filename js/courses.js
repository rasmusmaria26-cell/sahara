// Filter Logic
function applyFilters() {
    const selectedDomains = Array.from(document.querySelectorAll('input[name="domain"]:checked')).map(cb => cb.value);
    const selectedPrograms = Array.from(document.querySelectorAll('input[name="program"]:checked')).map(cb => cb.value);
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.course-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const domain = card.getAttribute('data-domain');
        const program = card.getAttribute('data-program');
        const title = card.querySelector('.course-title').textContent.toLowerCase();

        const matchesDomain = selectedDomains.length === 0 || selectedDomains.includes(domain);
        const matchesProgram = selectedPrograms.length === 0 || selectedPrograms.includes(program);
        const matchesSearch = title.includes(searchInput);

        if (matchesDomain && matchesProgram && matchesSearch) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    document.getElementById('courseCount').textContent = `Showing ${visibleCount} Courses`;
}

function clearFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById('searchInput').value = '';
    applyFilters();
}

// Add event listeners for real-time filtering (optional)
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', applyFilters);
    });
});
