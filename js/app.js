$(document).ready(function () {
    main();
});

function setTopBarButtons() {
    $('#add-item-button').show();
    if ($('.item-list li').length > 0) {
        $('#delete-item-button').show();
        $('.empty-list-notice').hide();
    } else {
        $('#delete-item-button').hide();
        $('.empty-list-notice').show();
    }
}

function main() {
    var viewState = true;

    setTopBarButtons();
    $('.item-list').sortable().disableSelection();

    $('.top-buttons-bar')
        .on('click', '#add-item-button', function () {
            viewState = false;
            $('.add-item-container').show();
            $('#add-item-textbox').focus();
            $(this).hide();
            $('#delete-item-button').hide();
            $('.empty-list-notice').hide();
        })
        .on('click', '#delete-item-button', function () {
            viewState = false;
            $('.delete-items-container').show();
            $('.item-list > li').addClass('delete-mode');
            $(this).hide();
            $('#add-item-button').hide();
            $('#reset-delete-button').show();
            $('#cancel-delete-button').show();
            $('#confirm-delete-button').show();
            $('.item-list .checkbox').hide();
            $('.item-list .delete-checkbox').css('display', 'inline-block');
            $('.item-list').sortable('disable');
        })
        .on('click', '#cancel-delete-button', function () {
            $('.delete-items-container').hide();
            $('.item-list > li').removeClass('delete-mode');
            $(this).hide();
            $('#reset-delete-button').hide();
            $('#confirm-delete-button').hide();
            $('.item-list .delete-checkbox').hide();
            $('.item-list .checkbox').show();
            $('.item-list > li').each(function () {
                $(this).removeClass('delete-item-checked');
            })
            setTopBarButtons();
            $('.item-list').sortable('enable');
            viewState = true;
        })
        .on('click', '#confirm-delete-button', function () {
            var toBeDeleted = [];
            $('.item-list > li').each(function () {
                if ($(this).hasClass('delete-item-checked')) {
                    toBeDeleted.push($(this));
                }
            })
            if (toBeDeleted.length > 0) {
                toBeDeleted.forEach(function (element) {
                    element.remove();
                })
                $('#cancel-delete-button').click();
            } else {
                $('.delete-items-container').effect('highlight', {
                    color: '#BDD4DE'
                }, 1000);
            }
        })
        .on('click', '#reset-delete-button', function () {
            $('#reset-alert').show();
        })
        .on('click', '.button', function () {
            $('.item-list li').removeClass('selected');
        })

    $('#reset-alert')
        .on('click', '#confirm-reset-no', function () {
            $('#reset-alert').hide();
        })
        .on('click', '#confirm-reset-yes', function () {
            $('.item-list li').each(function () {
                $(this).remove();
                $('#cancel-delete-button').click();
                $('#reset-alert').hide();
            })
        })


    $('.add-item-container')
        .on('click', '.add-button', function () {
            var newItemText = $('#add-item-textbox').val();
            if (newItemText.length > 0) {
                $('ul.item-list').prepend('<li><div class="delete-checkbox"><i class="fa fa-times"></i></div><div class="checkbox"><i class="fa fa-check"></i></div><p>' + newItemText + '</p></li>');
                $('.cancel-button').click();
            } else {
                $('#add-item-textbox').focus();
                $('.add-item-text').show();
            }
        })
        .on('keydown', '#add-item-textbox', function (e) {
            if (e.ctrlKey && (e.which === 13 || e.which === 10)) {
                $('.add-button').click();
            } else if (e.which === 13 || e.which === 10) {
                $('.add-button').click();
            }
        })
        .on('click', '.cancel-button', function () {
            $('#add-item-textbox').val('');
            $('.add-item-container').hide();
            $('.add-item-text').hide();
            setTopBarButtons();
            viewState = true;
        })


    $('.item-list')
        .on('click', '.checkbox', function () {
            if ($(this).parent().hasClass('item-checked')) {
                $(this).parent().removeClass('item-checked');
            } else {
                $(this).parent().addClass('item-checked');
            }
        })
        .on('click', '.delete-checkbox', function () {
            if ($(this).parent().hasClass('delete-item-checked')) {
                $(this).parent().removeClass('delete-item-checked');
            } else {
                $(this).parent().addClass('delete-item-checked');
            }
        })
        .on('click', 'li', function () {
            $('.item-list li').removeClass('selected');
            $(this).addClass('selected');
        })
        .on('dblclick', 'li', function () {
            if (viewState) {
                $(this).find('div.checkbox').click();
            } else if ($('.delete-items-container').is(':visible')) {
                $(this).find('div.delete-checkbox').click();
            }
        })

    $(document)
        .on('keypress', function (e) { // Enter key pressed
            if (viewState && e.ctrlKey && (e.which === 13 || e.which === 10)) {
                $('#add-item-button').click();
            }
        })
        .keyup(function (e) { // Escape key pressed
            if (e.which === 27) {
                if ($('.add-item-container').is(':visible')) {
                    $('.cancel-button').click();
                }
                if ($('.delete-items-container').is(':visible')) {
                    $('#cancel-delete-button').click();
                }
                $('.item-list li').removeClass('selected');
            }
            if (e.which === 32) { // Spacebar key pressed
                var $selected = $('.item-list li').filter('.selected');
                if ($selected.length > 0) {
                    if (viewState) {
                        $selected.find('div.checkbox').click();
                    } else if ($('.delete-items-container').is(':visible')) {
                        $selected.find('div.delete-checkbox').click();
                    }
                }
                return false;
            }
        })
        .on('keydown', function (e) {
            if (e.which === 46) {
                if (viewState && $('.item-list li').length > 0) {
                    $('#delete-item-button').click();
                } else if ($('.delete-items-container').is(':visible')) {
                    $('#confirm-delete-button').click();
                }
            }
            if (e.which === 38 || e.which === 40) { // Up or Down arrow keys pressed
                if ($('.item-list li.selected').length < 1) {
                    $('.item-list').find('li').first().addClass('selected');
                } else {
                    var $current = $('.item-list li').filter('.selected');
                    if (e.which === 38) { // Up arrow key pressed
                        if ($current.is(':first-child')) {
                            var $prev = $current.parent().find('li').last();
                        } else {
                            var $prev = $current.prev();
                        }
                        $('.item-list li').removeClass('selected');
                        $prev.addClass('selected');
                    }
                    if (e.which === 40) { // Down arrow key pressed
                        if ($current.is(':last-child')) {
                            var $next = $current.parent().find('li').first();
                        } else {
                            var $next = $current.next();
                        }
                        $('.item-list li').removeClass('selected');
                        $next.addClass('selected');
                    }
                }
                return false;
            }
        })
}