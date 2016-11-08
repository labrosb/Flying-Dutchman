
////// Starting Popup //////

$(window).bind("load", function() {
	
	$.msgBox({
		title: "Go Full Screen",
		content: "<br>This application is designed to be used <br> on a terminal instead of a browser. <br> For better experience it's recommended to use full screen mode pressing F11",
		alert: "confirm",
	});
	
});

////// Product menu events //////

$( "#products" ).on( 'click', '.product_overview', function () { 	// Click on a a product (use this metho because is dynamic content)
	
	$productId = $(this).attr("id");	 							// The product id of the product that that is chosen..
	
	$(this).addClass('animated bounceIn');
	$idCatch = $(this).attr('id');
	setTimeout(function(){ $("#"+$idCatch).removeClass('animated bounceIn');}, 600);
	
	productDetails ($productId);
});

$( "ul.categories_menu li" ).click(function() {		// Click on a category
	$category = $(this).attr("id");	 				// The category that is chosen..
	$categoryClass = $(this).attr("class");	
	$text = $(this).text();
	productCategoryClass = $categoryClass;
	$("#productsMenuTitle").html($text);
	$('#detailsInner').hide();
	$('#detailsLabel').fadeIn(600);
	$('#products').hide();
	$('#loading').show();	
	if($category == "myfavorites"){
		favorites();
	}else{
		productsOverview($category);				
								// Calls the function with the chosen category and the products.php file as arguments 
	}							//to retrieve the ids that correspond to it.
	
	$(this).addClass('animated bounceIn');
	setTimeout(function(){ $("#"+$category).removeClass('animated bounceIn');}, 2000);
});

$(window).load(function(){
	setTimeout(function(){$("#products").removeClass('animated zoomInDown');}, 500);
});



////// Languages events //////

$( "#english" ).click(function() {
	changeLang('en');
});

$( "#swedish" ).click(function() {
	changeLang('sv');
});



////// Cart checkout events  ////// -- the drag and drop events are in cart.js

$( "#checkout" ).click(function() {	
	if(getCartData()['rows'].length > 0){										
		$.msgBox({
			title: "Complete Transaction",
			content: "Choose way of Payment",
			type: "info",
			buttons: [{ value: "Cancel" },{ value: "Pay Cash" },{ value: "Pay by Card" }],
			success: function (myresult) {
						if ( (myresult == "Pay Cash") || (myresult == "Pay by Card") ){
							purchaseHandler();
							clearProduct();
						}
					}
		});
	}
});

function clearProduct() {
	$i = getCartData().total;
	setCartData({"total":0,"rows":[]});
	$totalCost = 0;
	$('#cartcontent').datagrid('loadData', getCartData());
	$('div.cart .total').html('Total: SEK'+$totalCost);
	$('.total2').html('Total: SEK'+$totalCost);
	$('.panel-body').css("visibility","hidden"); 
	$('.total').css("visibility","hidden"); 
}