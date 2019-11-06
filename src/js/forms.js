$(document).ready(function(){

    // FORMS
    const formMsgs = {
        errors: {
            default: {
                ru: 'Заполните поле',
                uk: "Заповніть поле",
                sk: 'Vyplňte pole',
                de: 'Füllen Sie das Feld aus'
            },
            name: {
                ru: 'Укажите имя',
                uk: "Вкажіть ім'я",
                sk: 'Zadajte názov',
                de: 'Geben Sie einen Namen ein'
            },
            phone: {
                ru: 'Укажите телефон',
                uk: "Вкажіть телефон",
                sk: 'Zadajte telefón',
                de: 'Geben Sie das Telefon ein'
            },
            policy_confirm: {
                ru: 'Дайте согласие',
                uk: "Дайте згоду",
                sk: 'Dajte súhlas',
                de: 'Einwilligung erteilen'
            },
            email: {
                ru: 'Укажите E-mail',
                uk: 'Вкажiть E-mail'
            },
            city: {
                ru: 'Укажите город',
                uk: 'Укажите город'
            }
        }
    }

    function isStr(formId, input, inputName) {
        var name = $('body').find(formId).find(input);
        $(name).on('change focusout keyup', function(){
            var nameVal = $(this).val();
            var regName = /[^\p{L}]+$/
            if(regName.test(nameVal)) {
                $(this).addClass('not-error');
                $(this).removeClass('error-input');
                $(this).removeClass('empty-field');
                $(this).next('.error-msg').text('').hide();
            } else {
                $(this).removeClass('not-error');
                $(this).addClass('error-input');
                $(this).addClass('empty-field');
                var lang = $('html').attr('lang')
                if (formMsgs.errors[inputName] !== undefined) {
                    var msg = formMsgs.errors[inputName][lang]
                } else {
                    var msg = formMsgs.errors['default'][lang]
                }
                $('body').find(formId).find(this).next('.error-msg').text(msg);
            }
        })
    }
    
    function isCheck(formId, input, inputName) {
        var field = $('body').find(formId).find(input);
        $(field).on('change', function(){
            
            if($(this).prop('checked') === true) {
                $(this).addClass('not-error');
                $(this).removeClass('error-input');
                $(this).removeClass('empty-field');
                $(this).parents('.form-group').find('.error-msg').text('');
            } else {
                $(this).removeClass('not-error');
                $(this).addClass('error-input');
                $(this).addClass('empty-field');
                var lang = $('html').attr('lang')
                if (formMsgs.errors[inputName] !== undefined) {
                    var msg = formMsgs.errors[inputName][lang]
                } else {
                    var msg = formMsgs.errors['default'][lang]
                }
                $('body').find(formId).find(this).parents('.form-group').find('.error-msg').text(msg);
            }
        })
    }

    function isCheckRadio(formId, input, inputName) {
        var field = $('body').find(formId).find(input);
        $(field).on('change', function(){
            
            if($(this).prop('checked') === true) {
                $(formId).find(input).each(function() {
                    $(this).removeClass('not-error').addClass('error-input').addClass('empty-field')
                })
                $(this).addClass('not-error');
                $(this).removeClass('error-input');
                $(this).removeClass('empty-field');
                $(this).parents('.form-group').find('.error-msg').text('').hide();
            } else {
                $(this).removeClass('not-error');
                $(this).addClass('error-input');
                $(this).addClass('empty-field');
                var lang = $('html').attr('lang')
                if (formMsgs.errors[inputName] !== undefined) {
                    var msg = formMsgs.errors[inputName][lang]
                } else {
                    var msg = formMsgs.errors['default'][lang]
                }
                $('body').find(formId).find(this).parents('.form-group').find('.error-msg').text(msg);
            }
        })
    }

    function isEmail(formId, input,inputName) {
        var name = $('body').find(formId).find('input[name=email]');
        $(name).on('change focusout keyup', function(){
            var nameVal = $(this).val();
            var regName = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
            if(regName.test(nameVal)) {
                $(this).addClass('not-error');
                $(this).removeClass('error-input');
                $(this).removeClass('empty-field');
                $(this).next('.error-msg').text('');
            } else {
                $(this).removeClass('not-error');
                $(this).addClass('error-input');
                $(this).addClass('empty-field');
                var lang = $('html').attr('lang')
                var msg = formMsgs.errors[inputName][lang]
                $('body').find(formId).find(this).next('.error-msg').text(msg);
            }
        })
    }

    function isPhone(formId, input, inputName) {
        var phone = $('body').find(formId).find(input);
        $(phone).on('change focusout keyup', function(){
            var phoneVal = $(this).val().replace(/\D/g, '');
            var regPhone = /^\+?[0-9_. -()]+$/;
            var form = formId;

            if(regPhone.test(phoneVal) && phoneVal.length > 11 && phoneVal.length < 20) {
                $(this).addClass('not-error');
                $(this).removeClass('error-input');
                $(this).removeClass('empty-field');
                $(this).next('.error-msg').text('').hide();
            } else {
                $(this).removeClass('not-error');
                $(this).addClass('error-input');
                $(this).addClass('empty-field');
                var lang = $('html').attr('lang')
                var msg = formMsgs.errors[inputName][lang]
                $('body').find(formId).find(this).next('.error-msg').text(msg).show();
            }
        })
    }

    function send(formId, url, success, validateCount) {
        $('body').find(formId).on('submit', function(e){
            e.preventDefault();
            var form = $(this)
            var regProtect = /[^\p{L}]+$/;
            var protect = $(this).find('input[name=fullname]').val();
            
            if($(this).find('.not-error').length == validateCount && protect.length < 1) {
                $('.loader').fadeIn(100);
                
                console.log('ok')

                $.ajax({
                    url: url,
                    type: 'post',
                    data: $(this).serialize(),

                    beforeSend: function(xhr, textStatus){
                        $(form).find(':input').attr('disabled','disabled');
                    },
                    success: function(response){
                        $('.loader').hide();
                        $('.layout').addClass('blured')
                        $.fancybox.open({
                            src  : success,
                        });
                    }
                })
            } else {
                $(this).find('.empty-field').each(function(){
                    var lang = $('html').attr('lang')
                    var name = $(this).attr('name')
                    var errorNode = $(this).parents('.form-group').find('.error-msg')
                    var msg = formMsgs.errors[name][lang]
                    $(errorNode).text(msg).show()
                })

                return false;
            }
        })
    }

    $('body').on('click', '.toast-close, .toast-confirm', function(e){
        e.preventDefault()

        $(this).parents('.toast').removeClass('loaded')
        setTimeout(function(){
            $(this).parents('.toast').remove()
        },1000)
    })

    isPhone('.dealers-form', 'input[name=phone]', 'phone')
    send('.dealers-form', '/send', '#success', 1)

    isPhone('.consult-form', 'input[name=phone]', 'phone')
    send('.consult-form', '/send', '#success2', 1)

    isPhone('.lead-form', 'input[name=phone]', 'phone')
    send('.lead-form', '/send', '#success', 1)

    isPhone('.fast-order-form', 'input[name=phone]', 'phone')
    $('.one-click-btn').on('click', function(e) {
        e.preventDefault()
        if ($('.fast-order-form').hasClass('active')) {

            if($('.fast-order-form').find('.not-error').length == 1) {
                $('.loader').fadeIn(100);

                let data = {
                    id: +$('#msProduct .ms2_form input[name=id]').val(),
                    phone: $('#msProduct .ms2_form input[name=phone]').val(),
                    pm: +$('#msProduct .ms2_form input[name=pm]').val(),
                    options: {
                        lamps_count: $('#msProduct .ms2_form input[name="options[lamps_count]"]').val(),
                        colors: $('#msProduct .ms2_form input[name="options[colors]"]').val(),
                        wire_color: $('#msProduct .ms2_form input[name="options[wire_color]"]').val(),
                        operating_mode: $('#msProduct .ms2_form input[name="options[operating_mode]"]').val(),
                    }
                }

                $.ajax({
                    url: '/assets/components/request/connectors/web/connector.php',
                    dataType: 'json',
                    data: {
                        action: 'createorder',
                        data: data
                    },
                    success: function(data){
                        if (!data.success) {
                            $('.loader').hide();
                            console.log('error:' + message);
                            return;
                        } else {
                            let orderId = data.data.msorder
                            $.ajax({
                                url: '/assets/components/request/connectors/web/connector.php',
                                dataType: 'json',
                                data: {
                                    action: 'getordernum',
                                    id: orderId
                                },
                                success: function(data){
                                    $('.loader').hide();
                                    let num = data.object.num
                                    const msg = {
                                        ru: '<p>Спасибо за заказ! №'+num+'</p><p>Ожидайте звонка менеджера</p>',
                                        uk: '<p>Дякуємо за замовлення! №'+num+'</p><p>Очікуйте дзвінка менедера</p>'
                                    }
                                    let successMsg = '<div class="fast-success-msg">'+msg[$('html').attr('lang')]+'</div>'
                                    $('.fast-order-form').html(successMsg)
                                }
                            })

                            
                        }
                    }
                });

            } else {
                $('.fast-order-form').find('.empty-field').each(function(){
                    var lang = $('html').attr('lang')
                    var name = $(this).attr('name')
                    var errorNode = $(this).parents('.form-group').find('.error-msg')
                    var msg = formMsgs.errors[name][lang]
                    $(errorNode).text(msg).show()
                })
            }
        }
    })


    // Order form stepper
    function validateReceiver() {
        $('.receiver-info .order-step-btn').on('click', function() {

            let parent = $(this).parents('.order-row')

            if($(parent).find('.form-block').find('.not-error').length == 3) {
                
                let next = $(this).parents('.order-row').index()
                
                
                let inputs = $(parent).find('input[type=text]')
                let data = []
                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].value.length > 0) {
                        data.push(inputs[i].value)
                    }
                }
                $(parent).find('.order-checkin-data').text(data.join(', '))

                let nextStep = $('.order-row')[next + 1]

                $(parent).find('.form-block').slideUp(300)
                $(parent).addClass('checked')
    
                $(nextStep).addClass('active').find('.form-block').slideDown(300)
            } else {
                let msg = formMsgs.errors.default[$('html').attr('lang')]
                $(parent).find('.form-block').find('.error-input').parents('.form-group').find('.error-msg').text(msg).show()
            }
        })
    }

    function validateDelivery() {
        $('.delivery-info .order-step-btn').on('click', function() {

            let parent = $(this).parents('.order-row')
            
            
            if($(parent).find('.form-block').find('.not-error').length == 2) {
                console.log(1)
                let next = $(this).parents('.order-row').index()
                
                let data = []
                let city = $(parent).find('input[name=city]').val()
                data.push(city)

                $(parent).find('input[type=radio]').each(function(){
                    if($(this).prop('checked') == true) {
                        data.push($(this).parents('.delivery-item').find('.order-checkin-add-data').text())
                    }
                })
                if($('#delivery_2').prop('checked') === true) {
                    data.push($('#delivery_2').parents('.delivery-item').find('input[name=metro]').val())
                }

                if($('#delivery_2').prop('checked') === true) {
                    if($('input[name=metro]').val().length < 1) {
                        let msg = formMsgs.errors.default[$('html').attr('lang')]
                        $('input[name=metro]').next('.error-msg').text(msg).show()
                        return false
                    } else {
                        $('input[name=metro]').next('.error-msg').text('').hide()
                    }
                }
                $(parent).find('.order-checkin-data').text(data.join(', '))

                let nextStep = $('.order-row')[next + 1]

                $(parent).find('.form-block').slideUp(300)
                $(parent).addClass('checked')
    
                $(nextStep).addClass('active').find('.form-block').slideDown(300)
            } else {
                let msg = formMsgs.errors.default[$('html').attr('lang')]
                console.log($(parent).find('.form-block').find('.empty-field'))
                $(parent).find('.form-block').find('input[name=city].empty-field').parents('.form-group').find('.error-msg').text(msg).show()
                
                if($('#delivery_2').prop('checked') === true) {
                    if($('input[name=metro]').val().length < 1) {
                        let msg = formMsgs.errors.default[$('html').attr('lang')]
                        $('input[name=metro]').next('.error-msg').text(msg).show()
                        return false
                    } else {
                        $('input[name=metro]').next('.error-msg').text('').hide()
                    }
                }

                if($('.delivery-info input[type=radio]:checked').length == 0) {
                    $('.delivery-empty').show()
                }
            }
        })
    }

    isStr('.order-form', 'input[name=receiver]', 'receiver')
    isPhone('.order-form', 'input[name=phone]', 'phone')
    isEmail('.order-form', 'input[name=email]', 'email')
    validateReceiver()

    isStr('.order-form', 'input[name=city]', 'city')
    isCheckRadio('.order-form', 'input[name=delivery]', 'delivery')
    validateDelivery()
    $('input[name=delivery]').on('change', function(){
        $('.delivery-empty').hide()
    })

    isCheckRadio('.order-form', 'input[name=payment]', 'payment')

    $('.order-form input').on('change', function(){
        if($('.order-form').find('.not-error').length == 6) {
            $('.order-send-btn').prop('disabled', false).removeClass('disabled')
        } else {
            $('.order-send-btn').prop('disabled', true).addClass('disabled')
        }
    })

    $('.order-checkin-data-change').on('click', function(e){
        e.preventDefault()

        $('.order-row').removeClass('active').find('.form-block').slideUp(300)
        $(this).parents('.order-row').removeClass('checked').addClass('active').find('.form-block').slideDown(300)
    })


})