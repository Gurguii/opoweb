<?php
$article_number = $_GET['articulo'];

if(is_null($article_number) || $article_number < 1 || $article_number > 169){
    return;
}

// Create a cURL request to fetch the content
$url = "https://www.laconstitucion.es/articulo-$article_number-de-la-constitucion-espanola.html";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$html = curl_exec($ch);
$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if($status_code != 200){
    echo json_encode(array("error" => "status code returned $status_code"));
    return;
}

// Parse the HTML using a PHP library like DOMDocument
$doc = new DOMDocument();
libxml_use_internal_errors(true);
$doc->loadHTML($html);

// Create a DOMXPath object
$xpath = new DOMXPath($doc);

// Query for elements with the class 'articulo'
$articleElements = $xpath->query('//*[@class="articulo"]');
$contentParagraphs = "";

foreach ($articleElements as $articleElement) {
    $paragraphElements = $xpath->query('p', $articleElement);
    foreach ($paragraphElements as $paragraphElement) {
        $contentParagraphs .= "<p class='ce_article_explanation_paragraph'>$paragraphElement->textContent</p>";
    }
}

// Testing - Query for <p> elements within the div of class "columnas titulo_txt" to extract an explanation of the article 
$explanationElements = $xpath->query('//*[@class="columnas titulo_txt"]');
$explanationParagraphs = "";

foreach($explanationElements as $paragraph){
    $paragraphElements = $xpath->query('p', $paragraph);
    foreach($paragraphElements as $paragraph){
        $explanationParagraphs .= "$paragraph->textContent";
    }
}

$data = array(
    'content' => $contentParagraphs,
    'explanation' => $explanationParagraphs
);

// Do something with the content
echo json_encode($data);
?>