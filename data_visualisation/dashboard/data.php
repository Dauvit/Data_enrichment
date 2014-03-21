<?php

function hasCurl(){
    return function_exists('curl_version');
}

function get_institutions() {
    $data = [
        [
            ["Institution 1", 9],
            ["Institution 2", 8],
            ["Institution 3", 7]
        ]
    ];
    return $data;
}

function get_species() {
    $data = [
        [
            ["Adult male", 51],
            ["Adult female", 46],
            ["Other", 2]
        ]
    ];
    return $data;
}

function get_specimens() {
    $data = [
        "ticks" => ["2009", "2010", "2011", "2012", "2013", "2014"],
        "data" => [ [rand(4148, 5148), rand(500, 1000), rand(10, 64), 0, 2, 0] ]
    ];
    return $data;
}

function get_data_from_url($url, $timeout = 5) {
    if (!hasCurl())
        exit("Error: CURL is not enabled in PHP.");

    $curl_handle = curl_init();
    // Set the maximum timeout for cURL transfers to 5 seconds.
    curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, $timeout);
    // Return the result on successful cURL transfers.
    curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($curl_handle, CURLOPT_URL, $url);
    $result = curl_exec($curl_handle);
    curl_close($curl_handle);
    return $result;
}

/**
 * Get citations data from a CSV file and output as JSON.
 *
 * JSON is outputted in the format,
 *
 *  {
 *      "data": [
 *          [2, 6, 7, 10],
 *          [7, 5, 3, 4],
 *          [14, 9, 3, 8]
 *      ],
 *      "series": {
 *          ["label": "Author 1"],
 *          ["label": "Author 2"],
 *          ["label": "Author 3"]
 *      },
 *      "xlabels": ["2010", "2011", "2012", "2013"]
 *  }
 *
 * @param string $filename Path to CSV file.
 * @param string $delimiter Delimiter for reading CSV file.
 * @param string $maxseries Maximum number of series (i.e. authors) to
 *      output. The remaining series are put in series "Other".
 *
 */
function get_citations_from_file($filename, $delimiter=',', $maxseries = 10) {
    $header = NULL;
    $data = array();
    $authors = array("Other" => array());
    $authors_outher = array();
    $years = array();
    $nseries = 0;
    if (($handle = fopen($filename, 'r')) !== FALSE)
    {
        while (($row = fgetcsv($handle, 0, $delimiter)) !== FALSE)
        {
            if(!$header)
                $header = $row;
            else {
                $row = array_combine($header, $row);
                $author = $row['BibAuthor'];
                $year = $row['BibYear'];
                $specimen_count = intval($row['MatCitSpecimenCount']);

                // Create an array for each author.
                if (!in_array($author, $authors)) {
                    if ($nseries < $maxseries) {
                        $authors[$author] = array();
                        $nseries++;
                    }
                    // When we've reached the series limit, add remaining
                    // authors to the group "Others".
                    else if ( !in_array($author, $authors_outher) ) {
                        $authors_outher[] = $author;
                    }
                }
                // Keep a list of the years in the dataset.
                if (!in_array($year, $years)) {
                    $years[] = $year;
                }
                // Group selected authors in "Other".
                if ( in_array($author, $authors_outher) ) {
                    $author = "Other";
                }
                // Add the author and citation count per year.
                if ( in_array($year, $authors[$author]) )
                    $authors[$author][$year] += $specimen_count;
                else
                    $authors[$author][$year] = $specimen_count;
            }
        }
        fclose($handle);
    }
    else {
        exit("Failed to open file.\n");
    }

    // Construct data in the proper format for use with jqPlot.
    sort($years);
    ksort($authors);

    /// Set the series (authors).
    $data['series'] = array();
    foreach ($authors as $author => $val) {
        $data['series'][] = array("label" => $author);
    }

    /// Set the citation counts per author per year.
    $data['data'] = array();
    foreach ($authors as $author => $val) {
        if ( in_array($author, $authors_outher) ) {
            $author = "Other";
        }
        $citations = array();
        foreach ($years as $year) {
            $citations[] = isset($authors[$author][$year]) ? $authors[$author][$year] : 0;
        }
        $data['data'][] = $citations;
    }

    /// Set the X-axis labels.
    $data['xlabels'] = $years;

    return $data;
}

/**
 * Get citations data from a CSV file and output as JSON.
 *
 * JSON is outputted in the format,
 *
 *  {
 *      "data": [
 *          [2, 6, 7, 10],
 *          [7, 5, 3, 4],
 *          [14, 9, 3, 8]
 *      ],
 *      "series": {
 *          ["label": "Author 1"],
 *          ["label": "Author 2"],
 *          ["label": "Author 3"]
 *      },
 *      "xlabels": ["2010", "2011", "2012", "2013"]
 *  }
 *
 * @param string $filename Path to CSV file.
 * @param string $delimiter Delimiter for reading CSV file.
 * @param string $maxseries Maximum number of series (i.e. authors) to
 *      output. The remaining series are put in series "Other".
 *
 */
function get_citations_from_url($url, $delimiter=',', $maxseries = 10) {
    $header = NULL;
    $data = array();
    $authors = array("Other" => array());
    $authors_outher = array();
    $years = array();
    $nseries = 0;
    $citations = get_data_from_url($url);
    $citations = explode(PHP_EOL, $citations);

    if (!count($citations) > 1)
        exit("Expected more data.\n");

    foreach ($citations as $row)
    {
        $row = str_getcsv($row, $delimiter);

        if (!$header)
            $header = $row;
        else {
            if ( count($row) != count($header) )
                continue;

            $row = array_combine($header, $row);
            $author = $row['BibAuthor'];
            $year = $row['BibYear'];
            $specimen_count = intval($row['MatCitSpecimenCount']);

            // Create an array for each author.
            if (!in_array($author, $authors)) {
                if ($nseries < $maxseries) {
                    $authors[$author] = array();
                    $nseries++;
                }
                // When we've reached the series limit, add remaining
                // authors to the group "Others".
                else if ( !in_array($author, $authors_outher) ) {
                    $authors_outher[] = $author;
                }
            }
            // Keep a list of the years in the dataset.
            if (!in_array($year, $years)) {
                $years[] = $year;
            }
            // Group selected authors in "Other".
            if ( in_array($author, $authors_outher) ) {
                $author = "Other";
            }
            // Add the author and citation count per year.
            if ( in_array($year, $authors[$author]) )
                $authors[$author][$year] += $specimen_count;
            else
                $authors[$author][$year] = $specimen_count;
        }
    }

    // Construct data in the proper format for use with jqPlot.
    sort($years);
    ksort($authors);

    /// Set the series (authors).
    $data['series'] = array();
    foreach ($authors as $author => $val) {
        $data['series'][] = array("label" => $author);
    }

    /// Set the citation counts per author per year.
    $data['data'] = array();
    foreach ($authors as $author => $val) {
        if ( in_array($author, $authors_outher) ) {
            $author = "Other";
        }
        $citations = array();
        foreach ($years as $year) {
            $citations[] = isset($authors[$author][$year]) ? $authors[$author][$year] : 0;
        }
        $data['data'][] = $citations;
    }

    /// Set the X-axis labels.
    $data['xlabels'] = $years;

    return $data;
}

function get_georef() {
    $data = [
        ["latLng" => [52.50, 13.39], "name" => "Citation 1"],
        ["latLng" => [53.56, 10.00], "name" => "Citation 2"],
        ["latLng" => [48.13, 11.56], "name" => "Citation 3"]
    ];
    return $data;
}

$data = array();

$maxseries = isset($_GET['maxseries']) ? $_GET['maxseries'] : 10;

foreach ($_GET as $key => $value) {
    if ( $key == 'institutions') {
        $data[$key] = get_institutions();
    }
    else if ( $key == 'species') {
        $data[$key] = get_species();
    }
    else if ( $key == 'specimens') {
        $data[$key] = get_specimens();
    }
    else if ( $key == 'citations') {
        //$data[$key] = get_citations_from_file("citations.csv", ',', $maxseries);
        $url = "http://plazi.cs.umb.edu/GgServer/srsStats/stats?outputFields=bib.author+bib.year+matCit.specimenCount&FP-bib.year=2004-2010&groupingFields=bib.author+bib.year&orderingFields=bib.year&format=csv";
        $data[$key] = get_citations_from_url($url, ',', $maxseries);
    }
    else if ( $key == 'georef') {
        $data[$key] = get_georef();
    }
}

print json_encode($data);
