# Visualisation of expertise #

## Background ##

A hack script to extract expertise from the summary information provided from the registration forms and to present the individual items in a more easily viewable form. 

The original summary information simply listed all items of expertise, using their full description, within one cell. this is not readily comprehensible. Hence, this script to present each item of expertise in its own cell, whic when highlighted makes the information far more readable.

The resulting table has now been posted to [Google docs](https://docs.google.com/a/naturalis.nl/spreadsheet/ccc?key=0Al6iKFRsaY54dExxTWtIOHZZMGR4Y0NFT1lpcWx3ZEE#gid=3) for online viewing and updating.

## Usage ##

It is a hack hence you need to: 

- first save the supplied `summary_expertise.xlsx` file as a tab separated value file with the same name but different extension, ie `summary_expertise.tsv`
- then run the script on that file
- then open the script’s output file, `summarised_expertise.tsv`, in Excel
- and add the formatting, ie usual trick of putting long column names at an angle to make them fit better, conditional formatting of the Xs, etc
- then save the edited version as an Excel file, ie `summarised_expertise.xlsx`

## Notes ##

The cumbersome usage is a result of Excel’s `.xlsx` really being a zip file and my not having the Python package `xlrd` installed on my laptop. Hence, I use the standard library `csv` package to read and write the files, which means I have to convert the Excel files into something `csv` can process. 

It is possible to extend the script’s functionality to carry over the additional information about other expertise and goals into the output file. This has not been done because the script’s original aim was to break out the individual items of expertise to visualise them better.

Fortunately, each item of expertise begins a with a unique keyword, if kept case sensitive. This permits the logic of the script to be a simple sequence of searches using those initial words as keywords. 


----

# Graphic visualisation of expertise #

I later took `summarised_expertise.tsv` and used it to build assorted gephi files to show strength of relationship across participants. See:

- `participants [Edges].csv`
- `participants [Nodes].csv`
- `participants.gephi`
- `participants.gexf`

The strength of relationship is based on shared items of expertise.

Based on `summarised_expertise.tsv`, all individuals' expertise was mapped against all other individuals' expertise and the number of items of expertise each participant shared was summed. This produced many links so for clarity if two participants shared only one item of expertise that relationship was pruned from the final result set.

The nodes of the resultant graph are the hackathon participants. The edges edges are the strength of relationship (similarity) between participants.

This data can be displayed to show which hackathon participants have similar expertise. This, in turn, can then be used to guide group formation, either to ensure the participants are in different groups to spread their skills or in the same group to consolidate their skills. 
 

----

Author
: [David King](david.king@open.ac.uk)


For
: [Naturalis hackathon](http://wiki.pro-ibiosphere.eu/wiki/Hackathon_%22Pimp_my_Data%22,_March_17-21_2014), 17–21 March 2014


Copyright
: © [Open University](http://open.ac.uk) 2014

Licence
: [GPL v3](http://www.gnu.org/licenses/) 
