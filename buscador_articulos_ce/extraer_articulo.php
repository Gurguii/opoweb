<?php
function checkArticleNumber(Array $articles){
    foreach($articles as $article){
        if(is_null($article) || $article < 1 || $article > 169){
         return false;
        }
    }
    return true;
}

$articleNumber = $_GET['articulos'];
$articles = array();

if(str_contains($articleNumber, '-')){
    $n1 = explode('-',$articleNumber)[0];
    $n2 = explode('-',$articleNumber)[1];
    if(!checkArticleNumber(array($n1, $n2))){
        echo json_encode(array("error" => "invalid article/s"));
        return;
    }
    for($i = $n1; $i <= $n2; ++$i){
        array_push($articles, $i);
    }
}else if(!checkArticleNumber(array($articleNumber))){
    echo json_encode(array("error" => "invalid article/s"));;
    return;
}else{
    array_push($articles, $articleNumber);
}

// At this point valid values are within $articles array, it might
// be a single element or multiple ones if user used '-' to indicate 
// a range of articles to extract.

$extractedDocs = array();

foreach($articles as $articleNumber){

    // Request
    $url = "https://www.laconstitucion.es/articulo-$articleNumber-de-la-constitucion-espanola.html";
    $curlHandler = curl_init($url);
    curl_setopt($curlHandler, CURLOPT_RETURNTRANSFER, true);
    $extractedHTML = curl_exec($curlHandler);
    $statusCode = curl_getinfo($curlHandler, CURLINFO_HTTP_CODE);
    curl_close($curlHandler);

    // Check
    if($statusCode != 200){
        array_push($extractedDocs, array("error" => "status code returned $statusCode"));
        continue;    
    }

    // Extract desired HTML
    $doc = new DOMDocument();
    libxml_use_internal_errors(true);
    $doc->loadHTML($extractedHTML);
    $xpath = new DOMXPath($doc);

    // Extract a summary of the article
    $articleElements = $xpath->query('//*[@class="articulo"]');

    $divContent = "<div id='extracted_article_summary_div_$articleNumber'><h1 class='ce_article_title'>Artículo $articleNumber de la Constitución Española</h1>";
    
    foreach ($articleElements as $articleElement) {
        $paragraphElements = $xpath->query('p', $articleElement);
        foreach ($paragraphElements as $paragraphElement) {
            $divContent .= "<p class='ce_article_explanation_paragraph ce_article_explanation_paragraph_$articleNumber'>$paragraphElement->textContent</p>";
        }
    }

    $divContent .= "<button id='extracted_article_copy_button_$articleNumber'>Copiar</button><button id='extracted_article_show_button_$articleNumber'>Mostrar explicación</button><button id='extracted_article_delete_button_$articleNumber'>Eliminar</button></div><div id='extracted_article_explanation_$articleNumber' hidden><h1>Explicación</h1>";
    
    // Extract an explanation of what the article is about
    $explanationElements = $xpath->query('//*[@class="columnas titulo_txt"]');

    foreach($explanationElements as $paragraph){
        $paragraphElements = $xpath->query('p', $paragraph);
        foreach($paragraphElements as $paragraph){
            $divContent .= "<p>$paragraph->textContent</p>";
        }
    }

    $divContent .= "</div>";

    array_push($extractedDocs, array(
        'article' => $articleNumber,
        'html' => $divContent,
    ));
}

echo(json_encode($extractedDocs));
?>