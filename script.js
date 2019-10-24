
$(document).ready(function(){

    $("#newOffBtn").on("click", function(e){
        $("#newForm").toggle();
    });

    $("#getAll").click(getOffers);

        function getOffers(){
        $('tableBody').html('');
        $.ajax({
            method: 'get',
            url: 'https://alfa.propertygrouppoland.pl/q/andrzejswiezy/getAll',
            datatype: 'json',
            success: function(data) {
                $.each(data.data, function(i, data){
                    $('#tableBody').append("<tr><td>" + data.id + "</td><td>" + data.city + "</td><td>" + data.street + "</td><td>" + data.property + "</td><td>" + data.apartment + "</td><td>" + data.price + "</td><td>" + data.type + "</td><td>" + data.description + "</td><td><i class='far fa-edit editOff' data-offid='"+ data.id +"'></i><i class='fas fa-trash deleteOff' data-offid='"+ data.id +"'></i></td></tr>");                         
                });
                loadButtons();
            }
        });    
    };
    
    $("#submitOffer").on("click", function(e) {
        let data = {
            city: $($("#newForm")[0].city).val(),
            street: $($("#newForm")[0].street).val(),
            property: $($("#newForm")[0].property).val(),
            apartment: $($("#newForm")[0].apartment).val(),
            price: $($("#newForm")[0].price).val(),
            type: $($("#newForm")[0].type).val(),
            description: $($("#newForm")[0].description).val(),
        }
        console.log(data);
            
        $.ajax({
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url:"https://alfa.propertygrouppoland.pl/q/andrzejswiezy/create",
            data: JSON.stringify(data),
            success: function(data) {
                console.log(data);
            }
        });
        
        $("#newForm").trigger("reset");
        $("#newForm").toggle();
        e.preventDefault();
        setTimeout(function() {
            location.reload()
          }, 1000)
    });
    
    function getOneOffer(id){
        $.ajax({
            url: 'https://alfa.propertygrouppoland.pl/q/andrzejswiezy/get/' + id,
            method: 'get',
            dataType: 'json',
            success: function(data) {
                $($("#updateForm")[0].offerId).val(data.data.id);
                $($("#updateForm")[0].updateCity).val(data.data.city);
                $($("#updateForm")[0].updateStreet).val(data.data.street);
                $($("#updateForm")[0].updateProperty).val(data.data.property);
                $($("#updateForm")[0].updateApartment).val(data.data.apartment);
                $($("#updateForm")[0].updatePrice).val(data.data.price);
                $($("#updateForm")[0].updateType).val(data.data.type);
                $($("#updateForm")[0].updateDescription).val(data.data.description);
                $("#updateForm").show();
            }
        });
    }

    function loadButtons() {
        $(".editOff").click(function(e){
            getOneOffer($($(this)[0]).data("offid"));
            e.preventDefault();
        })
        $(".deleteOff").click(function(e){
            deleteOffer($($(this)[0]).data("offid"));
            e.preventDefault();
            setTimeout(function() {
                location.reload();
            }, 100)
        })
    }   
      

    $("#updateOff").on("click", function(e) {
        let data = {
            //id: $($("#updateForm")[0].offerId).val(), 
            city: $($("#updateForm")[0].updateCity).val(),
            street: $($("#updateForm")[0].updateStreet).val(),
            property: $($("#updateForm")[0].updateProperty).val(),
            apartment: $($("#updateForm")[0].updateApartment).val(),
            price: $($("#updateForm")[0].updatePrice).val(),
            type: $($("#updateForm")[0].updateType).val(),
            description: $($("#updateForm")[0].updateDescription).val(),
        }
        console.log(data);

        $.ajax({
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url: 'https://alfa.propertygrouppoland.pl/q/andrzejswiezy/update',
            data: JSON.stringify(data),
            success: function(data) {
                console.log(data);
            }
        });
        
        $("#updateForm").trigger("reset");
        $("#updateForm").toggle();
        e.preventDefault();
    });

    function deleteOffer(id){
        $.ajax({
            method: 'DELETE',
            contentType: 'application/json',
            dataType: 'json',
            url: 'https://alfa.propertygrouppoland.pl/q/andrzejswiezy/delete/' + id,
            succes: function(data) {
                console.log(data);
            }
                  });
    }

    $("#deleteAll").click(function () {
        $.ajax({
            method: 'DELETE',
            contentType: 'application/json',
            dataType: 'json',
            url: 'https://alfa.propertygrouppoland.pl/q/andrzejswiezy/deleteAll',
                  });

            setTimeout(function() {
                location.reload()
                },100)
    });
});