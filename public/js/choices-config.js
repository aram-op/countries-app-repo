document.addEventListener('DOMContentLoaded', function () {
    const element = document.getElementById('region-filter');

    if(element && !element.choices) {
        const choices = new Choices(element, {
            shouldSort: false,
            placeholder: true,
            placeholderValue: 'Filter By Region',
            itemSelectText: '',
            searchEnabled: false,
        });
    }

    if(element) {
        element.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            const currentUrl = new URL(window.location.href);

            if (selectedValue.length === 0 && currentUrl.searchParams.has('region')) {
                currentUrl.searchParams.delete('region');

                history.pushState(null, '', currentUrl.toString());

                window.location.href = currentUrl.toString();
                return;
            }

            if (currentUrl.searchParams.has('search')) {
                currentUrl.searchParams.delete('search');
            }

            currentUrl.searchParams.set('region', selectedValue);

            history.pushState(null, '', currentUrl.toString());

            window.location.href = currentUrl.toString();
        });
    }
});
