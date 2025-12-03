document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Modal Logic
    // ==========================================
    const filterModal = document.getElementById('filterModal');
    const openFilterBtn = document.getElementById('openFilterBtn');
    const closeFilterBtn = document.getElementById('closeFilterBtn');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    if (openFilterBtn && filterModal) {
        openFilterBtn.addEventListener('click', () => {
            filterModal.classList.add('active');
        });
    }

    if (closeFilterBtn && filterModal) {
        closeFilterBtn.addEventListener('click', () => {
            filterModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    if (filterModal) {
        filterModal.addEventListener('click', (e) => {
            if (e.target === filterModal) {
                filterModal.classList.remove('active');
            }
        });
    }

    // ==========================================
    // Category Pills Logic
    // ==========================================
    const pills = document.querySelectorAll('.cat-pill');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active class from all
            pills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked
            pill.classList.add('active');

            const category = pill.textContent.trim();
            filterByCategory(category);
        });
    });

    function filterByCategory(category) {
        const sections = document.querySelectorAll('.course-section');

        sections.forEach(section => {
            const sectionCategory = section.getAttribute('data-category');
            // If category is "All" (or we add an All pill later), show all. 
            // Currently we assume exact match.
            // If the pill is "Graphics Design" and section is "UI/UX Design", hide it.

            // Note: The user's pills are: Graphics Design, UI/UX Design, Data Science...
            // The sections are: UI/UX Design, Data Science.

            if (sectionCategory === category) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // ==========================================
    // Modal Filter Logic
    // ==========================================
    function applyFilters() {
        const selectedDomains = Array.from(document.querySelectorAll('input[name="domain"]:checked')).map(cb => cb.value);
        const selectedPrograms = Array.from(document.querySelectorAll('input[name="program"]:checked')).map(cb => cb.value);
        const searchInput = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : '';

        // Select new course cards
        const cards = document.querySelectorAll('.new-course-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const domain = card.getAttribute('data-domain');
            const program = card.getAttribute('data-program');
            const title = card.querySelector('.card-title').textContent.toLowerCase();

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

        // Hide empty sections (only if they contain filtered cards)
        // This runs AFTER the category filter, so it might hide the visible category if no cards match.
        document.querySelectorAll('.course-section').forEach(section => {
            // Only check visibility if the section itself is currently displayed (by category filter)
            if (section.style.display !== 'none') {
                const allCards = section.querySelectorAll('.new-course-card');
                let hasVisibleCard = false;
                allCards.forEach(c => {
                    if (c.style.display !== 'none') hasVisibleCard = true;
                });

                if (!hasVisibleCard) {
                    section.style.display = 'none';
                }
            }
        });

        // Close modal after applying
        if (filterModal) {
            filterModal.classList.remove('active');
        }
    }

    function clearFilters() {
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        if (document.getElementById('searchInput')) {
            document.getElementById('searchInput').value = '';
        }
        applyFilters();

        // Reset category pills to show all? Or keep current?
        // Let's reset sections to show all for now, or maybe just re-run category logic?
        // For now, let's just show all sections again to be safe.
        document.querySelectorAll('.course-section').forEach(s => s.style.display = 'block');
        pills.forEach(p => p.classList.remove('active'));
    }

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }

    // Search input listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
});
