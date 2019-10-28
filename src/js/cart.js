$('.q-city').on('click', function(e) {
    e.preventDefault()

    $('.oredr-city-input').val($(this).text())
})