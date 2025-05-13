
DatosImmobilaria = [];


function verMasImmobilaria(codImmbiliaria) {
    var estruc = "";
    $.each(DatosImmobilaria, function (i, Immobilaria) {
        if (Immobilaria.codImmbiliaria == codImmbiliaria) {
            estruc = "Codigo: <b>" + Immobilaria.codImmbiliaria + "</b><br>" +
                "Nombre: <b>" + Immobilaria.nombre + "</b><br>" +
                "Run: <b>" + Immobilaria.run + "</b><br>" +
                "Tipo Divisa: <b>" + Immobilaria.utm_uf_dolar + "</b><br>" +
                "Tipo Propiedad: <b>" + Immobilaria.tipoPropiedad + "</b><br>" +
                "Cantidad: <b>" + Immobilaria.cantidad + "</b><br>" +
                "Fecha: <b>" + Immobilaria.fecha + "</b>";
        }
    })
    Swal.fire({
        title: "Detalle de la Propiedad",
        html: estruc,
        icon: "info"
    });
}
$(document).ready (function(){
MostrarValores();

//guardas datos 
$('.formImnobiliaria').submit(function(e){
    var codImmbiliaria=DatosImmobilaria.length+1;
    var nombre = $('.txt_nombre').val();
    var run = $('.txt_run').val();
    var radio = $('input[type="radio"][name="indicadores"]:checked');
    var utm_uf_dolar = radio.val();
    var tipoPropiedad = radio.data('tipo');
    var cantidad = $('.txt_cantidad').val();
    var subtotal = $('.valor_subtotal').val();
    var descuentoM = $('.valor_descuento').val();
    var totalPago = $('.valor_total').val();
    var fechaFull = new Date();
    var fecha = fechaFull.getDate() + "/" + (fechaFull.getMonth() + 1) + "/" + fechaFull.getFullYear();

    DatosImmobilaria.push({
        "codImmbiliaria" : codImmbiliaria,
        "nombre": nombre,
        "run" : run,
        "tipoPropiedad" : tipoPropiedad ,
        "cantidad": cantidad,
        "utm_uf_dolar": utm_uf_dolar,
        "subtotal": subtotal,
        "descuentoM": descuentoM,
        "totalPago": totalPago,
        "fecha": fecha
    });
    Swal.fire({
            title: "Correcto",
            text: "Registro Insertado Correctamente!",
            icon: "success"
    });
    console.log(DatosImmobilaria)
    cargarTablaDatos();
    
    return false;
    
});

function cargarTablaDatos(){
 $('.cargarDatosImmobiliaria').empty();
 $.each(DatosImmobilaria, function(i, listaImmobiliaria){
    var estructura="<tr>"+
                                "<td>"+listaImmobiliaria.codImmbiliaria+"</td>"+
                                "<td>"+listaImmobiliaria.run+"</td>"+
                                "<td>"+listaImmobiliaria.nombre+"</td>"+
                                "<td>"+listaImmobiliaria.tipoPropiedad+"</td>"+
                                "<td>"+listaImmobiliaria.utm_uf_dolar+"</td>"+
                                "<td>"+listaImmobiliaria.cantidad+"</td>"+
                                "<td>"+listaImmobiliaria.fecha+"</td>"+
                                "<td>ED</td>"+
                                "<td>EL</td>"+
                                '<td onclick="verMasImmobilaria('+listaImmobiliaria.codImmbiliaria+')" >VM</td>'+
                                "</tr>";
            $('.cargarDatosImmobiliaria').append(estructura)


 })

}


 


function MostrarValores(){
$('input[type="radio"][name="indicadores"]').change(function(){
    ValorIndicador = $(this).val();
$.getJSON("https://www.mindicador.cl/api/" + ValorIndicador, function (data){

    ValorMostrar = data['serie'][0].valor;
    $('.valor_mostrar').text("["+ValorIndicador+"] = $"+ ValorMostrar+ " CLP " )
CalcularSubTotal();
})
})
}
    function CalcularSubTotal(){

     cantidad = $('.txt_cantidad').val();
     if(cantidad != 0){
     VSubtotal = ValorMostrar * cantidad;
     }
     else{
        VSubtotal = ValorMostrar
     }
        $('.valor_subtotal').text(" $"+VSubtotal+ " CLP ")

    $('input[type="radio"][name="indicadores2"]').change(function(){
    ValorIndicador2 = parseFloat($(this).val());
    
    ValorDescuento = VSubtotal * ValorIndicador2

    if (ValorIndicador2 > 0){
    $('.valor_descuento').text(ValorDescuento)

    }else{
        $('.valor_descuento').text("Sin descuento")
    }

    if (ValorIndicador2 > 0){
    $('.valor_total').text(VSubtotal - ValorDescuento)

    }else{
        $('.valor_total').text(VSubtotal)
    }
    
    })
    }   
});
