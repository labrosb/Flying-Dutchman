
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