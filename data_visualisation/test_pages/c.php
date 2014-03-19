<?php
$results = file_get_contents('http://vbrant.ipd.uka.de/RefBank/rbk/name');
echo $results;

echo "\n-----------------\n";


$url = 'http://vbrant.ipd.uka.de/RefBank/rbk/name';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
echo "the response is {$response}";

?>
