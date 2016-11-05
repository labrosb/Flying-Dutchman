function productsMenuSet(products,$startTime){	
	$productOverview = "";
	for ( $i = 0; $i < products.length; $i++){
		
		$id = products[$i].id;
		$name = products[$i].name;
		$name2 = products[$i].name2;
		if (($name2 == "") || ($name2 == " ")) {
			$seperator = "";
		}else{
			$seperator = " - ";
		}		
		$productdraft = '<div id="productId"><p>' + $id + '</p></div> <div id="price"><p>' + products[$i].price + ' Kr</p></div>';
		$productdraft += '<div id = "pic_area"> <img class="productPic" id = "img_'+$id+'" src="view/styles/product_images/' + $id + '.png"> </div>';
		$productdraft += "<div id = 'label'><p>" + $name + $seperator + $name2 + "</p></div>" ;
		$productOverview += "<div id = '" + $id + "' class = 'product_overview'>" + $productdraft + "</div>"
	}
	$('#products').hide();
	$('#loading').show();
	$('#products').html($productOverview);
	for ( $i = 0; $i < products.length; $i++){
		$id = products[$i].id;		
		$("#img_"+$id).error(function() {		// Click on a category
			this.src = 'view/styles/product_images/alt.png';
		});	
	}

	$('#products').fadeIn(600);
	$('#loading').hide();
	
	$.getScript("view/cart.js");	

$endTime = Date.now();

console.log("delay--> "+  ($endTime - $startTime));
}

function updateDetailsField($volume, $alcohol, $origin, $producer, $eco){

	$('#volumeField').html($volume + " ml");
	$('#alcoholField').html($alcohol);
	$('#originField').html($origin);
	$('#producerField').html($producer);

	$('#detailsLabel').hide();
	$('#detailsInner').hide();
	$('#detailsInner').show();		

	$('#detailsInner table').addClass("animated zoomInRight");

	setTimeout(function(){ $("#detailsInner table").removeClass('animated zoomInRight');}, 1000);

	if ($eco == 1){
		$('#eco').addClass("animated rubberBand");
		$('#eco').show();
		setTimeout(function(){ $("#eco").removeClass('animated rubberBand');}, 1000);
	}else{
		$('#eco').hide();
	}	
}	