
//// Themes ////

var style_cookie_name = "style" ;
var style_cookie_duration = 30 ;

function getCookieName(){
	return style_cookie_name;
}

function getCookieDuration(){
	return style_cookie_duration;
}


//// Cart global variables ////

$cartData = {"total":0,"rows":[]};
$totalCost = 0; //T

function getCartData(){
	return $cartData;
}

function setCartData($newCartData){
	$cartData = $newCartData;
}

function getTotalCost(){
	return $totalCost;
}

function setTotalCost($newCost){
	$totalCost = $newCost;
}


//// Products ////

$allProducts = "";
$details = "";

retrieveAllProducts();

$favoriteProducts = startupFavorites();

// Not very efficient but the only way to retrieve the categories

for ($i=0; $i<$allProducts.length; $i++){
	if($allProducts[$i].namn != ""){
		enrichProduct($allProducts[$i].beer_id, $i);
	}
}

function getAllProducts(){
	return $allProducts;
}

function getFavoriteProducts(){
	return $favoriteProducts;
}

function retrieveAllProducts(){
	$.ajax({	 								// calls the API's url to retrieve all the products
		dataType: "json",
		type: "GET",
		url: "http://pub.jamaica-inn.net/fpdb/api.php",
		data:{
			username: "jorass",
			password: "jorass",
			action: "inventory_get"
		},
		async: false,
		success: function(response){ 			// the response is all the products retrieved from the API
					$allProducts = response.payload;
				}
	});	
}

function enrichProduct($productId, $pointer){	 // includes the group option to all products
	$.ajax({ 									// calls the API's url to retrieve product's data
		dataType: "json",
		type: "GET",
		url: "http://pub.jamaica-inn.net/fpdb/api.php",
		data:{
			username: "jorass",
			password: "jorass",
			action: "beer_data_get",
			beer_id: $productId
		},
		async: true,
		success: function(product){ 			// the response is the details of the product retrieved from the API									 
					if(product.payload.length > 0){	
						$allProducts[$pointer].varugrupp = product.payload[0].varugrupp;						
					}
				}			
	});		
}

function retrieveAllPurchases(){
	$allPurchases = ""; 
	$.ajax({ 									// calls the API's url to retrieve all the purchases
		dataType: "json",
		type: "GET",
		url: "http://pub.jamaica-inn.net/fpdb/api.php",
		data:{
			username: "jorass",
			password: "jorass",
			action: "purchases_get"
		},
		async: false,
		success: function(response){ 			// the response is all the products retrieved from the API
									
					$allPurchases = response.payload; 															
				}
	});
	return $allPurchases;
}

function retrieveProductDetails($productId){
	$details = "";
	$.ajax({							 		// calls the API's url to retrieve product's data
		dataType: "json",
		type: "GET",
		url: "http://pub.jamaica-inn.net/fpdb/api.php",
		data:{
			username: "jorass",
			password: "jorass",
			action: "beer_data_get",
			beer_id: $productId
		},
		async: false,
		success: function(product){ 			// the response is the details of the product retrieved from the API				
					$details = product.payload[0]; 
				}		
	});		
	return $details;
}