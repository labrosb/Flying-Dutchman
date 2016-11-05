	
	function changeLang($lang)
    {
        $langData = getAllElementsWithAttribute();

        if($langData.length == 0)
            return;

        $langPack = "";
        if($lang == "en")
            $langPack = $langPack_en;
        else
            $langPack = $langPack_sv;

        for($i = 0; $i < $langData.length; $i++)
            $langData[$i].innerHTML = $langPack[$langData[$i].getAttribute("data-inter")];
		
	//------------------Exception Start--------------------//
		if(typeof $productCategoryClass != 'undefined'){
			$text = $("."+$productCategoryClass).text(); 		
			$('#productsMenuTitle').html($text); 
		}
	//------------------Exception End--------------------//
    }

    function getAllElementsWithAttribute()
    {
    $matchingElements = [];
    $allElements = document.getElementsByTagName('*');
    for ($i = 0, $n = $allElements.length; $i < $n; $i++)
    {
        if ($allElements[$i].getAttribute("data-inter") !== null)
            $matchingElements.push($allElements[$i]);
    }
    return $matchingElements;
    }