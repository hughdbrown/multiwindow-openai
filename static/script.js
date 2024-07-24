$(document).ready(function() {
    let windowCounter = 0;
    let highestZIndex = 100;

    function createWindow(content, title) {
        const windowId = `window-${windowCounter++}`;
        const windowHtml = `
            <div class="window" id="${windowId}">
                <div class="window-header">
                    ${title}
                    <div class="window-buttons">
                        <button class="minimize-button">_</button>
                        <button class="maximize-button">[]</button>
                        <button class="close-button">X</button>
                    </div>
                </div>
                <div class="window-content">
                    ${content}
                </div>
            </div>
        `;

        $('#main-container').append(windowHtml);

        $(`#${windowId}`).draggable({ handle: ".window-header" }).resizable({
            handles: 'n, e, s, w, ne, se, sw, nw'
        });

        $(`#${windowId} .minimize-button`).click(function() {
            $(`#${windowId}`).toggleClass('minimized');
        });

        $(`#${windowId} .maximize-button`).click(function() {
            const isMaximized = $(`#${windowId}`).hasClass('maximized');
            $(`#${windowId}`).toggleClass('maximized');
            if (isMaximized) {
                $(`#${windowId}`).css({ width: '300px', height: '200px' });
            } else {
                $(`#${windowId}`).css({ width: '100%', height: '100%' });
            }
        });

        $(`#${windowId} .close-button`).click(function() {
            $(`#${windowId}`).remove();
        });

        $(`#${windowId}`).click(function() {
            highestZIndex++;
            $(`#${windowId}`).css('z-index', highestZIndex);
        });
    }

    $('#new-window-button').click(function() {
        createWindow("<p>New Window Content</p>", "New Window");
    });

    createWindow('<h1>Hello World</h1>', 'Hello World');
    createWindow('<iframe src="/calculator" width="100%" height="100%" frameborder="0"></iframe>', 'Calculator');
    createWindow('<iframe src="/external" width="100%" height="100%" frameborder="0"></iframe>', 'External Page');
});
