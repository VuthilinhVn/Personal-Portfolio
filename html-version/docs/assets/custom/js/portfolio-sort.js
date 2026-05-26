// Sorts .project-section cards inside .project-grid by data-project-date descending.
// Projects without a date are pushed to the bottom.
(function () {
    function sortProjects() {
        const grid = document.querySelector('.project-grid');
        if (!grid) return;

        const cards = Array.from(grid.querySelectorAll(':scope > .project-section'));
        if (cards.length < 2) return;

        cards.sort(function (a, b) {
            const da = a.getAttribute('data-project-date') || '';
            const db = b.getAttribute('data-project-date') || '';
            if (!da && !db) return 0;
            if (!da) return 1;
            if (!db) return -1;
            return db.localeCompare(da);
        });

        cards.forEach(function (card) { grid.appendChild(card); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', sortProjects);
    } else {
        sortProjects();
    }
})();
