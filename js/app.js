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
            $('#cancel-delete-button').show();
            $('#confirm-delete-button').show();
            $('.item-list .checkbox').hide();
            $('.item-list .delete-checkbox').css('display', 'inline-block');
        })
        .on('click', '#cancel-delete-button', function () {
            $('.delete-items-container').hide();
            $('.item-list > li').removeClass('delete-mode');
            $(this).hide();
            $('#confirm-delete-button').hide();
            $('.item-list .delete-checkbox').hide();
            $('.item-list .checkbox').show();
            $('.item-list > li').each(function () {
                $(this).removeClass('delete-item-checked');
            })
            setTopBarButtons();
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
        .on('keypress', '#add-item-textbox', function (e) {
            if (e.which === 13) {
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
    
    $(document).on('keypress', function(e) {
        if( viewState && e.ctrlKey && (e.which === 13 || e.which === 10)) {
            $('#add-item-button').click();
        }
    })
}