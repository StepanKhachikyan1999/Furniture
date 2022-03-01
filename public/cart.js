


function initListaOrcamento() {
    var products = $.CestaFeira({
        debug: true
    }).getItems(),
        totalValueTemp = 0,
        $cartItems = $('#cart-items');

    if (!products) {
        console.log("No items in cart!");
        return;
    }

    function updateTotalValue() {

    
        var totalValue = 0;

        $.each($('[data-item-total-value]'), function (index, item) {
            totalValue += $(item).data('item-total-value');
        });

        $('#withBank').append(`<input type="hidden" name="totalValue" value="${totalValue}" />`)
        $('#cash').append(`<input type="hidden" name="totalValue" value="${totalValue}" />`)
        $('#withoutbank').append(`<input type="hidden" name="totalValue" value="${totalValue}" />`)
        // $('#total-value').html(parseFloat(totalValue).toFixed(2) + "&nbsp; Դ");
        $('#total-value').append(`<p>Ընդհանուր</p><p><b>${parseFloat(totalValue).toFixed(2)}&nbsp; Դ</b></p>`)
    }

    function mountLayout(index, data) {
    console.log("🚀 ~ file: cart.js ~ line 33 ~ mountLayout ~ data", data)

    
        var totalValueTemp =  parseInt(data.price) * parseInt(data.quantity);
        console.log("🚀 ~ file: cart.js ~ line 36 ~ mountLayout ~ totalValueTemp", totalValueTemp)
        // var totalValueTemp = parseInt(data.price) * parseInt(data.quantity);

        var $layout = `<div class="col-lg-12 col-md-12 col-12" id="product-${index}">
        <div class="shop-cart-box" id="1">
            <div class="row">
                <div class="col-lg-1 col-md-1 col-12">
                    <div class="button-close">
                    <a href='javascript:;' class='btn btn-danger fa fa-trash' data-cesta-feira-delete-item='${index}'><span class='sr-only'>Remove</span></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 col-12">
                    <div class="shop-cart-box-img">
                        <img src="/uploads/${data.avatar}">
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-12">
                    <div class="shop-cart-box-info">
                        <h4>${data.title}</h4>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-12">
                    <div class="shop-cart-box-quantity">
                        <h6>Քանակ: &nbsp; <b>X &nbsp; ${data.quantity}</b></h6>
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 col-12">
                    <div class="shop-cart-box-price">
                        <h5 data-item-total-value="${totalValueTemp}"> ${parseFloat(totalValueTemp).toFixed(2)} &nbsp; <small>Դ</small> </h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `
        $cartItems.append($layout);

        let cash = `<div>
        <input type="hidden" name="title" value="${data.title}" />
        <input type="hidden" name="quantity" value="${data.quantity}" />
        <input type="hidden" name="totalValueTemp" value="${parseFloat(totalValueTemp).toFixed(2)}" />

        </div>`
        let withoutBank = `<div>
        <input type="hidden" name="title" value="${data.title}" />
        <input type="hidden" name="quantity" value="${data.quantity}" />
        <input type="hidden" name="totalValueTemp" value="${parseFloat(totalValueTemp).toFixed(2)}" />

        </div>`


        let withBank = `<div>
        <input type="hidden" name="title" value="${data.title}" />
        <input type="hidden" name="quantity" value="${data.quantity}" />
        <input type="hidden" name="totalValueTemp" value="${parseFloat(totalValueTemp).toFixed(2)}" />

        </div>`

        $('#withBank').append(withBank)
        $('#cash').append(cash)
        $('#withoutbank').append(withoutBank)
    }


    $.each(products, function (index, value) {
        mountLayout(index, value);
    });

    updateTotalValue();

    $(document).on('click', 'a[data-cesta-feira-delete-item]', function (e) {
        e.preventDefault();

        var productId = $(this).data('cesta-feira-delete-item');

        if ($(document).on('cesta-feira-item-deleted')) {
            $('#product-' + productId).fadeOut(500, function () {
                $(this).remove();
                updateTotalValue();
            });
        }
    });

    $(document).on('cesta-feira-clear-basket', function (e) {
        $('#cart-items tr').each(function (index, value) {
            $(value).fadeOut(500, function () {
                $(this).remove();
                updateTotalValue();
            });
        });
    });
}

$('.add-to-cart-button').on('click', function () {
    $('.basket_alert').show()
    $('.basket_alert').hide(5000)
})

$('.addToWish').on('click', function() {
    $('.alert_basket').show()
    $('.alert_basket').hide(5000)
})



$(document).ready(function () {
    
    

    initListaOrcamento();

    if ($('#cart-items').children().length == 0) {
        $('.basket-box').hide();
        $('.payment_box').hide();
        $('.favorite-info-box-basket').show();
    }

});




