window.onload = function()
{
    const windows = document.getElementsByClassName('window');

    const WIN_MIN_CHAR = '🗕';
    const WIN_RESTORE_CHAR = '🗖';

    for (let i = 0; i < windows.length; i++)
    {
        let win = windows[i];

        console.log(`found window "${win.dataset.title}"`);

        let titleBar = document.createElement('div');
        titleBar.className = 'window-title-bar';
        titleBar.dataset.index = i;
        titleBar.style.display = 'grid';
        titleBar.style.gridTemplateColumns = '85% 10% 5%';

        let title = document.createElement('div');
        title.className = 'window-title';
        title.innerHTML = `${win.dataset.title}`;
        title.style.textDecoration = 'underline';
        title.style.textUnderlineOffset = '5px';

        let winButton = document.createElement('div');
        winButton.innerHTML = `${WIN_MIN_CHAR}`;
        winButton.style.cursor = 'pointer';
        winButton.style.textAlign = 'right';
        winButton.style.float = 'right';
        winButton.style.borderRight = '2px';

        winButton.onclick = function(e)
        {
            let parent = e.target.parentElement.parentElement;
            let thisWindowBar = parent.children[0];
            let thisWindowContent = parent.children[1];

            switch(e.target.innerHTML)
            {
                case WIN_MIN_CHAR:
                    thisWindowContent.style.display = 'none';
                    e.target.innerHTML = `${WIN_RESTORE_CHAR}`;

                    parent.style.height = thisWindowBar.style.height;

                    break;

                case WIN_RESTORE_CHAR:
                    thisWindowContent.style.display = '';
                    e.target.innerHTML = `${WIN_MIN_CHAR}`;

                    if (win.dataset.height != null)
                        parent.style.height = win.dataset.height;
                    else
                        parent.style.height = thisWindowContent.height;

                    break;
            }
        }

        titleBar.appendChild(title);
        titleBar.appendChild(winButton);

        let windowContent = document.createElement('div');
        windowContent.className = 'window-content';

        let innerContent = document.createElement('div');
        innerContent.className = 'window-inner-content';
        innerContent.innerHTML = win.innerHTML;
        windowContent.appendChild(innerContent);

        win.innerHTML = '';

        win.appendChild(titleBar);
        win.appendChild(windowContent);

        if (win.dataset.width != null)
            win.style.width = win.dataset.width;
        else
            win.style.width = `${windowContent.getBoundingClientRect().width}px`;

        titleBar.style.width = `${parseFloat(win.style.width.replace('px', '')) - 8}px`;
        titleBar.style.borderBottom = 'solid';
        titleBar.style.borderWidth = '2px';
        titleBar.style.borderColor = 'black';

        if (win.dataset.height != null)
            win.style.height = win.dataset.height;

        if (win.dataset.col != null)
            titleBar.style.backgroundColor = win.dataset.col;

        let titleHeight = parseFloat(window.getComputedStyle(titleBar).getPropertyValue('height').replace('px', ''));

        let newHeight = parseFloat(window.getComputedStyle(win).getPropertyValue('height').replace('px', '')) - titleHeight / 2;
        innerContent.style.height = `${newHeight - 19}px`;

        let spacer = document.createElement('div');
        spacer.style.height = `${titleHeight + 8}px`;

        windowContent.prepend(spacer);

        if (win.dataset.x != null)
            win.style.left = win.dataset.x;

        if (win.dataset.y != null)
            win.style.top = win.dataset.y;

        if (win.dataset.center != null)
        {
            console.log(parseFloat(window.getComputedStyle(win).getPropertyValue('height').replace('px', '')));

            win.style.left = `${window.screen.availWidth / 2 - (parseFloat(window.getComputedStyle(win).getPropertyValue('width').replace('px', ''))) / 2}px`;
            win.style.top = `${window.screen.availHeight / 2 - (parseFloat(window.getComputedStyle(windowContent).getPropertyValue('height').replace('px', '')) / 2) - parseFloat(window.getComputedStyle(titleBar).getPropertyValue('height').replace('px', ''))}px`;
        }
    }

    let dragTarget = null;
    window.addEventListener('pointerdown', function(e)
    {
        if (e.buttons !== 1)
            return;

        if (e.target.className !== 'window-title')
            return;

        dragTarget = e.target.parentElement.parentElement;
    });

    let selected = false;
    let prev = {x: 0, y: 0};
    window.addEventListener('pointermove', function(e)
    {
        if (dragTarget === null)
            return;

        if (e.buttons !== 1)
        {
            selected = false;
            return;
        }

        let style = window.getComputedStyle(dragTarget);

        let windowPos = {x: parseFloat(style.getPropertyValue('left').replace('px', '')), y: parseFloat(style.getPropertyValue('top').replace('px', ''))};

        if (!selected)
        {
            selected = true;

            prev.x = e.x;
            prev.y = e.y;
        }

        let newPos = {x: windowPos.x + (e.x - prev.x), y: windowPos.y + (e.y - prev.y)};

        dragTarget.style.left = `${newPos.x}px`;
        dragTarget.style.top = `${newPos.y}px`;

        document.getElementById('container').append(dragTarget);

        prev.x = e.x;
        prev.y = e.y;
    });

    window.addEventListener('pointerout', function(e)
    {
        if (dragTarget === null)
            return;

        if (dragTarget.children[0].contains(e.target))
            return;

        if (e.buttons === 1)
            return;

        dragTarget = null;
        selected = false;
    });
}
