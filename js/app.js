$(document).ready(function () {
    main();
});

function main() {
    $('#add-item-button').click(function() {
        $('.add-item-container').show();
        $('#add-item-textbox').focus();
        $(this).hide();
        $('#delete-item-button').hide();
    });
    
    $('#delete-item-button').click(function() {
        $('.delete-items-container').show();
        $('.item-list > li').addClass('delete-mode');
        $(this).hide();
        $('#add-item-button').hide();
        $('#cancel-delete-button').show();
        $('#confirm-delete-button').show();
    })
    
    $('#cancel-delete-button').click(function() {
        $('.delete-items-container').hide();
        $('.item-list > li').removeClass('delete-mode');
        $(this).hide();
        $('#confirm-delete-button').hide();
        $('#add-item-button').show();
        $('#delete-item-button').show();
    })
    
    $('.cancel-button').click(function() {
        $('#add-item-textbox').val('');
        $('.add-item-container').hide();
        $('#add-item-button').show();
        $('#delete-item-button').show();
    })
}