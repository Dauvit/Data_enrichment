# GoldenGATE statistical queries #

Notes on how to extract statistical information from GoldenGATE’s document repository.


## Available data and search terms ##


_Assembling statistics data queries as URLs._


A field name list is available in the following formats:
    - JSON: <http://plazi.cs.umb.edu/GgServer/srsStats/fields/json>
    - XML: <http://plazi.cs.umb.edu/GgServer/srsStats/fields/xml>
    - Text: <http://plazi.cs.umb.edu/GgServer/srsStats/fields/txt>

Use the fully qualified name, eg bib.author for an articles author, when building queries.


Define which fields go in the output:
```
    outputFields=<outFieldName1>+<outFieldName2>+...+<outFieldNameN>`
```


Define which fields to group the results by:
```
    groupingFields=<grpFieldName1>+<grpFieldName2>+...+<grpFieldNameN>
```


Define which fields to order the results by:
```
    orderingFields=<ordFieldName1>+<ordFieldName2>+...+<ordFieldNameN>
```


Restrict the results by the value of a specific field:
```  
    FP-<fieldName>=X (field value equals X)  
    FP-<fieldName>=X-Y (field value between X and Y, inclusive)  
    FP-<fieldName>=X- (field value equal to or larger than X)  
    FP-<fieldName>=-Y (field value less than or equal to Y)  
```


Specify a custom aggregate function for a field to use instead of default shown in field list:
```
    FA-<fieldName>=<aggregate>
```

Legal aggregate functions for all fields are `count`, `count-distinct`, `min`, `max`.

Additional legal aggregate functions for numbers only are `sum` and `avg`.


Filter by the aggregate over some field:
```
    AP-<fieldName>=X (aggregate value equals X)
    AP-<fieldName>=X-Y (aggregate value between X and Y, inclusive)
    AP-<fieldName>=X- (aggregate value equal to or larger than X)-
    AP-<fieldName>=-Y (aggregate value less than or equal to Y)
```

You cannot use the same field to group and aggregate results in a query.


Set output format:
```
    format=<formatName>
```

Legal format names are `JSON`, `XML`, and `CSV`.


## Building queries ##


Using the fields listed above, a query URL looks like (broken down for readability, single line for actual use):
```
   http://plazi.cs.umb.edu/GgServer/srsStats/stats
   ?outputFields=<outFieldName1>+<outFieldName2>+...+<outFieldNameN>
   &groupingFields=<grpFieldName1>+<grpFieldName2>+...+<grpFieldNameN>
   &orderingFields=<ordFieldName1>+<ordFieldName2>+...+<ordFieldNameN>
   &FP-<fieldName1>=X&...&FP-<fieldNameN>=Z
   &FA-<fieldName1>=<aggregate1>&...&FA-<fieldNameN>=<aggregateN>
   &AP-<fieldName1>=X&...&AP-<fieldNameN>=Z
   &format=<format>
```

For text as well as values in your output ensure you specify the desired name in both `groupingFields` as well as `outputFields`. Otherwise you will simply retrieve the aggregate value for that field. See examples below.
 

## Examples ###


For example to retrieve author, year of publication and specimen count for each author, restricting the query to the publication years 2004 and 2005 we can call:

<http://plazi.cs.umb.edu/GgServer/srsStats/stats?outputFields=bib.author+bib.year+matCit.specimenCount&FP-bib.year=2004-2005&format=json>


This will produce the not very helpful statistics:

```
{"labels": {
"DocCount": "DocCount",
"BibAuthor": "Author",
"BibYear": "Year",
"MatCitSpecimenCount": "SpecimenCount"
},
"data": [
{
"DocCount": "2911",
"BibAuthor": "66",
"BibYear": "5835874",
"MatCitSpecimenCount": "3083"
}
]
}
```


However, if we add the extra grouping commands for author and year as in this query URL:

http://plazi.cs.umb.edu/GgServer/srsStats/stats?outputFields=bib.author+bib.year+matCit.specimenCount&FP-bib.year=2004-2010&groupingFields=bib.author+bib.year&orderingFields=bib.year&format=json

We will get the more useful result:

```
{"labels": {
"DocCount": "DocCount",
"BibAuthor": "Author",
"BibYear": "Year",
"MatCitSpecimenCount": "SpecimenCount"
},
"data": [
{
"DocCount": "34",
"BibAuthor": "Charles R. Haddad",
"BibYear": "2010",
"MatCitSpecimenCount": "36"
},
{
"DocCount": "8",
"BibAuthor": "Dikow, T.",
"BibYear": "2010",
"MatCitSpecimenCount": "8"
},
{
"DocCount": "6",
"BibAuthor": "Hamm, C. A.",
"BibYear": "2010",
"MatCitSpecimenCount": "6"
},
{
"DocCount": "1",
"BibAuthor": "Hawkes, P. G.",
"BibYear": "2010",
"MatCitSpecimenCount": "1"
},
{
"DocCount": "51",
"BibAuthor": "Jeremy A. Miller",
"BibYear": "2010",
"MatCitSpecimenCount": "133"
},
{
"DocCount": "6",
"BibAuthor": "Joanna Gardzinska",
"BibYear": "2010",
"MatCitSpecimenCount": "6"
},
{
"DocCount": "13",
"BibAuthor": "Miko, L.",
"BibYear": "2010",
"MatCitSpecimenCount": "13"
},
{
"DocCount": "57",
"BibAuthor": "Paknia, O.",
"BibYear": "2010",
"MatCitSpecimenCount": "57"
},
{
"DocCount": "25",
"BibAuthor": "Peter Jaeger",
"BibYear": "2010",
"MatCitSpecimenCount": "25"
},
{
"DocCount": "23",
"BibAuthor": "Peter Jäger",
"BibYear": "2010",
"MatCitSpecimenCount": "41"
},
{
"DocCount": "2",
"BibAuthor": "Rabeling, Ch.",
"BibYear": "2010",
"MatCitSpecimenCount": "2"
},
…
```

In other words, not only do we know that 66 authors meet the query specification, but we now know their names too. This also allows exploration and reconciliation of issues such as the authors appearing under several names, for example *Peter Jaeger* and *Peter Jäger*.
