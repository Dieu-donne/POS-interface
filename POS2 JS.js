var products = [
    { name: "indomie", cost: "2.50", Quantity_Available: "20", id:"snk001" },
    { name: "Orange", cost: "0.50", Quantity_Available: "20", id:"frt001" },
    { name: "Mango", cost: "0.70", Quantity_Available: "20", id:"frt002"},
    { name: "Pineapple", cost: "4.00", Quantity_Available: "20", id:"frt003"},
    { name: "Peanut Butter", cost: "15.00", Quantity_Available: "20", id:"ut001"},
    { name: "Bread", cost: "2.00", Quantity_Available: "20", id:"ffd001"},
    { name: "Snapple", cost: "9.00", Quantity_Available: "20", id:"snk002"},
    { name: "Croissant", cost: "3.00", Quantity_Available: "20", id:"snk003"},
    { name: "Welch", cost: "9.00", Quantity_Available: "20", id:"snk004"},
    { name: "Soda", cost: "3.50", Quantity_Available: "20", id:"snk005"},
    { name: "Smoothies", cost: "6.00", Quantity_Available: "20", id:"snk006"},
    { name: "Fruit Khebab", cost: "11.50", Quantity_Available: "20", id:"frt004"},
    { name: "Meat Khebab", cost: "3.00", Quantity_Available: "20", id:"ffd002"},
    { name: "Pringles", cost: "6.50", Quantity_Available: "20", id:"snk007"},
    { name: "Oreo", cost: "3.00", Quantity_Available: "20", id:"snk008"},
    { name: "Cake", cost: "120.00", Quantity_Available: "20", id:"ffd003"},
    { name: "Cup Cake", cost: "9.00", Quantity_Available: "20", id:"snk009"},
    { name: "Milk Shake", cost: "6.00", Quantity_Available: "20", id:"snk010"},
    { name: "Waffles", cost: "7.00", Quantity_Available: "20", id:"snk011"},
    { name: "Sandwich", cost: "3.50", Quantity_Available: "20", id:"snk012"},
    { name: "Salad Meal", cost: "9.00", Quantity_Available: "20", id:"ffd004"},
    { name: "Rock Buns", cost: "3.00", Quantity_Available: "20", id:"snk013"},
    { name: "Coffee Muffins", cost: "4.50", Quantity_Available: "20", id:"ffd005"},
    { name: "Pizza", cost: "60.00", Quantity_Available: "20", id:"ffd006"},
    { name: "Ceres", cost: "14.50", Quantity_Available: "20", id:"snk014"},
    { name: "Doughnuts", cost: "3.00", Quantity_Available: "20", id:"snk015"},
    { name: "Nkatie Burger", cost: "1.00", Quantity_Available: "20", id:"snk016"},
    { name: "Tumbler", cost: "65.00", Quantity_Available: "20", id:"ut002"},
    { name: "Bofrot", cost: "1.00", Quantity_Available: "20", id:"ffd007"},
    { name: "Tango", cost: "4.50", Quantity_Available: "20", id:"snk017"},
    { name: "Plantain Chips", cost: "1.50", Quantity_Available: "20", id:"snk018"}
    ],

    boughtItems = [],
    boughtItems2 = [],
    totalbox = [];
var prevbox = JSON.parse(localStorage.getItem('totalbox'));
    prevbox != null ? totalbox = prevbox : '';
   

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
})

$(document).ready(function () {
    var options = ''
    $(products).each(function (key, val) {
        options += '<option value="'+val.id+'">' + val.name + '</option>';
    });
    $('#myinputs').append(options);

});

function fill() {
    var prevData = JSON.parse(sessionStorage.getItem('bought')),
        prevData2 = JSON.parse(sessionStorage.getItem('bought2'));

    prevData != null ? boughtItems = prevData : '';
    prevData2 != null ? boughtItems2 = prevData2 : '';
    
    for(var i = 0; i < products.length; i++){
        if($("#myinputs").val() == products[i].id){
            var price = (products[i].cost)
        }
    }
    
    var costnumber = (products.indexOf($("#myinputs option:selected")) + 1),
        qty = document.getElementById('Quantity').value,
        total = 'GH₵' + ' ' + (qty*(price)).toFixed(2);
        
    totalbox.push((qty*(price)))
    localStorage.setItem('totalbox', JSON.stringify(totalbox))
    boughtItems.push([
        $("#myinputs option:selected").text(),
        'GH₵' + ' ' + price,
        qty,
        '<html><head link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><body><button  onclick="rowdel(this);"><i class="fa fa-window-close" style="font-size:24px;"></i></button></body></head></html>'
    ]);

    boughtItems2.push([
        $("#myinputs option:selected").text(),
        'GH₵' + ' ' + price,
        qty,
        total
    ]);

    sessionStorage.setItem('bought', JSON.stringify(boughtItems));
    sessionStorage.setItem('bought2', JSON.stringify(boughtItems2));
}

function tabfill(){
    var array = JSON.parse(sessionStorage.getItem('bought')),
        array2 = JSON.parse(sessionStorage.getItem('bought2')),
        table = document.getElementById('table');
        table2 = document.getElementById('table2');
    
    for(var i = 0; i < array.length; i++){

        var newRow = table.insertRow(table.length);
        for(var j = 0; j < 4; j++){

            var cell = newRow.insertCell(j);
            cell.innerHTML = array[i][j];
        }
    }
    

    for(var i = 0; i < array2.length; i++){

        var newRow = table2.insertRow(table2.length);
        for(var j = 0; j < 4; j++){

            var cell = newRow.insertCell(j);
            cell.innerHTML = array2[i][j];
        }
    }
}

function rowdel(r){
    var i=r.parentNode.parentNode.rowIndex;
    document.getElementById('oldtable').deleteRow(i-1);
    document.getElementById('oldtable2').deleteRow(i-1);
    delete boughtItems[i-2];
    sessionStorage.setItem('bought', JSON.stringify(boughtItems));
    console.log(i);
}

function clears(){
    sessionStorage.removeItem('bought');
    sessionStorage.removeItem('bought2');
    $("#oldtable tr").remove(); 
    $("#oldtable2 tr").remove(); 
    localStorage.removeItem('totalbox');
    totalbox = [];
}

function date(){
    var date1 = new Date();
    document.getElementById('date').innerHTML = date1.toUTCString();
}

function add(){
    inboxtotal = totalbox.reduce((a, b) => a + b, 0).toFixed(2)
    // window.alert(inboxtotal)
    document.getElementById('due').innerHTML = ' ' + inboxtotal;
}

function changedue(){
    var nmb = document.getElementById('change').value,
        change = nmb - inboxtotal;
    document.getElementById('chng').innerHTML = ' ' + change.toFixed(2);
    document.getElementById('paidtome').innerHTML = ' ' + nmb;  
}

function printit(){
    // window.print();
    var divToPrint=document.getElementById('DivIdToPrint');
    var newWin=window.open('','Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head><link rel="stylesheet" href="POS2 CSS.css"> <link rel="stylesheet" href="css/bootstrap-grid.min.css"/><link rel="stylesheet" href="css/bootstrap-reboot.min.css" /><link rel="stylesheet" href="css/bootstrap.min.css" /></head><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');
    newWin.document.close();
    setTimeout(function(){newWin.close();},10);
    }