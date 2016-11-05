	
function addProduct($id,$name,$price){
			
	function add(){
		for($i=0; $i<$cartData.total; $i++){
			$row = $cartData.rows[$i];
			if ($row.name == $name){
				$row.quantity += 1;
				return;
			}
		}
		$cartData.total += 1;
		$cartData.rows.push({
			id:$id,
			name:$name,
			quantity:1,
			price:$price,
			remove: '<div class="X" onclick="removeProduct(this, event)">X</a>'					
		});
	}
	add();

	$totalCost += $price;
	visualizeOnCart($totalCost);

}
		
function removeProduct(el, event) {
	$tr = $(el).closest('tr');
	$name = $tr.find('td[field=name]').text();
	$price = $tr.find('td[field=price]').text();
	$quantity = $tr.find('td[field=quantity]').text();
	for($i = 0; $i < $cartData.total; $i++){
		$row = $cartData.rows[$i];
		if ($row.name == $name) {
			$cartData.rows.splice($i, 1);
			$cartData.total--;
			if ($cartData.total == 0) {
				hideCartProducts();
			}
			break;
		}
	}
	$totalCost -=  $price * $quantity;
	reduceCartCost();
}
	
function purchaseHandler(){
	for( $i = 0; $i < $cartData.total; $i++ ){
		$id =  $cartData.rows[$i].id;										
		for( $q = 0; $q < $cartData.rows[$i].quantity; $q++ ){
			//call function to make each purchase
		}
	}
}		
			