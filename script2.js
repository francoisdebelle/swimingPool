document.addEventListener('DOMContentLoaded', () => {
    // 1. On récupère TOUTES les boîtes de sélecteur de la page
    const allSelectors = document.querySelectorAll('.selector-box');

    // 2. On définit la fonction de mise à jour (elle doit savoir quelle boîte elle traite)
    function updateIndicator(activeItem, container) {
    const indicator = container.querySelector('.indicator');
    
    const x = activeItem.offsetLeft;
    const itemWidth = activeItem.offsetWidth;
    const indicatorWidth = indicator.offsetWidth;
    const deplacement = x + itemWidth/2 - indicatorWidth/2;


    // On déplace UNIQUEMENT sur l'axe X.
    // IMPORTANT : On doit RE-PRÉCISER le translateY(-50%) sinon le 
    // translate du JS écraserait celui du CSS !
    indicator.style.transform = `translateX(${deplacement}px) `;
}

    // 3. On boucle sur chaque sélecteur pour l'initialiser individuellement
    allSelectors.forEach(container => {
        const valueItems = container.querySelectorAll('.value-item');

        valueItems.forEach(item => {
            item.addEventListener('click', (event) => {
                const clickedItem = event.currentTarget;

                // On enlève 'active' seulement à l'intérieur de CE conteneur
                container.querySelector('.value-item.active').classList.remove('active');
                clickedItem.classList.add('active');

                // On déplace l'indicateur de CE conteneur
                updateIndicator(clickedItem, container);
            });
        });

        // Initialisation de la position de départ pour ce sélecteur précis
        const initialActive = container.querySelector('.value-item.active');
        if (initialActive) {
            setTimeout(() => updateIndicator(initialActive, container), 50);
        }
    });
});