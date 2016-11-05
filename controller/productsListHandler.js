
function productsOverview($category){	
	$products = [];
	$cnt = 0;
	for($i = 0; $i < getAllProducts().length; $i++) {
		$search = getAllProducts()[$i].varugrupp;
		if($search != undefined){  //creates a list with the products that match clicked category
			if ($search.match($category)) { 
				$products[$cnt++] = {
					id: getAllProducts()[$i].beer_id,
					name: getAllProducts()[$i].namn,
					name2: getAllProducts()[$i].namn2,
					price: getAllProducts()[$i].price
				};	
			}
		}	
	}
	productsMenuSet($products);	
}

function productDetails($productId){
	$product = retrieveProductDetails($productId);
	updateDetails($product);
}

function updateDetails($product){
	$eco = $product.ekologisk;
	$volume = $product.volymiml;
	$alcohol = $product.alkoholhalt;
	$origin = $product.ursprunglandnamn;
	$producer = $product.producent;
	updateDetailsField($volume, $alcohol, $origin, $producer, $eco);
}

function startupFavorites($startTime){
	$purchaseList = retrieveAllPurchases();
	$favoriteProducts = setFavoriteProducts($purchaseList);
	makeFavoritesMenu($favoriteProducts,$startTime);
	return $favoriteProducts;
}

function favorites(){
	makeFavoritesMenu( getFavoriteProducts() );
}

function setFavoriteProducts($purchaseList){
    $seen = {};
    $ids = [];
	$purchases = [];
    $j = 0;
    for ($i = 0; $i < $purchaseList.length; $i++) {	// creates a new array with product ids that found in the transactions (unique ids) 
        $item = $purchaseList[$i].beer_id;
        if($seen[$item] !== 1) {
            $seen[$item] = 1;
            $ids[$j++] = $item;
        }
    }		
	for($i = 0; $i < $ids.length; $i++) {
		$counter = 0;
		for($j = 0; $j < $purchaseList.length; $j++) {
			if($ids[$i] == $purchaseList[$j].beer_id){		//calculates purchases per id
				$counter++;
			}
		}
		$purchases[$i] = $counter;		//purchases array corresponds to the ids array
    }		
	$topDrinksIds = [];
	$max = 100000;
	$thisMax = 0;
	$pointer = "";
	$topNumber = 6;
	for($c = 0; $c < $topNumber; $c++) {	//calculating the top 6 purchased by user products
		for($i = 0; $i < $purchases.length; $i++) {		
			if($thisMax < $purchases[$i]) {			
				$thisMax = $purchases[$i];
				$pointer = $i;
			}						
		}
		if($ids[$pointer] <= 0){  //because of existing invalid products in the database 
			$topNumber++;
		}
		else{	
			$topDrinksIds[$c] = $ids[$pointer];
		}
		$purchases[$pointer] = 0; // array the 6 id's of the most purchased products by the user. 
		$max = $thisMax;
		$thisMax = 0;	
	}
	$topDrinks = [];
	$cnt = 0; //using counter because $i is not consistant.
	for($i = 0; $i < $topDrinksIds.length; $i++){
		for($j = 0; $j < getAllProducts().length; $j++) {
			if($topDrinksIds[$i] == getAllProducts()[$j].beer_id){		
				$topDrinks[$cnt++] = {
					id: getAllProducts()[$j].beer_id,
					name: getAllProducts()[$j].namn,
					name2: getAllProducts()[$j].namn2,
					price: getAllProducts()[$j].price
				};	
				break;					
			}
		}	
	}
	return $topDrinks;
}

function makeFavoritesMenu($products,$startTime){
	productsMenuSet($products,$startTime);	 			
}