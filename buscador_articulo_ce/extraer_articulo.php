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
curl_close($ch);

// Parse the HTML using a PHP library like DOMDocument
$doc = new DOMDocument();
libxml_use_internal_errors(true);
$doc->loadHTML($html);

// Create a DOMXPath object
$xpath = new DOMXPath($doc);

// Query for elements with the class 'articulo'
$articleElements = $xpath->query('//*[@class="articulo"]');
$paragraphs = "";

foreach ($articleElements as $articleElement) {
    $paragraphElements = $xpath->query('p', $articleElement);
    foreach ($paragraphElements as $paragraphElement) {
        #$paragraphs .= $paragraphElement->textContent . "</br></br>";
        $paragraphs .= "<p class='extracted_doc_paragraph'>$paragraphElement->textContent</p>";
    }
}
// Do something with the content
echo $paragraphs;
?>