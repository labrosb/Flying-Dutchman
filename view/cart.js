$(function(){
	$('#cartcontent').datagrid({
		singleSelect:true
	});
			
	$('.product_overview').draggable({
		revert:true,
		proxy:'clone',
		onStartDrag:function(){
			$(this).draggable('options').cursor = 'not-allowed';
			$(this).draggable('proxy').css('z-index',10);
			$("#addAnimation").removeClass("animated zoomOutDown");
			$('#addAnimation').html(" ");
		},
		onStopDrag:function(){
			$(this).draggable('options').cursor='move';
		}
	});
			
			
	$('.cart').droppable({
		onDragEnter:function(e,source){
			$(source).draggable('options').cursor='auto';
		},
		onDragLeave:function(e,source){
			$(source).draggable('options').cursor='not-allowed';
		},
		onDrop:function(e,source){
			var id = $(source).find('p:eq(0)').html();
			var name = $(source).find('p:eq(2)').html();
			var price = $(source).find('p:eq(1)').html();
			var photo = $("#img_"+id).attr("src");
					
			addProduct(id, name, parseFloat(price.split(' Kr')[0]));
					
			$('#addAnimation').html(' <img src="'+photo+'"/>');
			$('#addAnimation').addClass('animated zoomOutDown');
		}
	});
			
	$('#cartcontent').datagrid('loadData', getCartData());

});

function visualizeOnCart($totalCost){
	$('.panel-body').css("visibility","visible"); 
	$('.total').css("visibility","visible"); 
	$('#cartcontent').datagrid('loadData', getCartData());
	$('div.cart .total').html('Total: SEK'+$totalCost.toFixed(2))	
}

function hideCartProducts(){
	$('.panel-body').css("visibility","hidden"); 
	$('.total').css("visibility","hidden"); 
}

function reduceCartCost(){
	$('#cartcontent').datagrid('loadData', getCartData());
	$('div.cart .total').html('Total: SEK'+$totalCost.toFixed(2));
}