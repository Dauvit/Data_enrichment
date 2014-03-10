#! usr/bin/python
"""Hack to break out individual items of expertise from summary.

Examining who knows what for NBC hackathon.
Please, no PEP8 complaints about the long lines ;-)

Author:    David King <david.king@open.ac.uk>
Copyright: (c) Open University <http://open.ac.uk> 2014
Licence:   GPL v3 licence <http://www.gnu.org/licenses/>

"""

import csv
import re


def main():
    """Big function to do everything! It's a hack."""
    with open('summary_expertise.tsv', 'r') as source_data, \
        open('summarised_expertise.tsv', 'w',
             encoding='utf-8', newline='\n') as output_data:
        source_reader = csv.DictReader(source_data, delimiter='\t')
        output_writer = csv.writer(output_data, delimiter='\t')
        output_writer.writerow(
            ["Name",
             "Text mining: extracting useful information from text",
             "Development of ontologies",
             "Digital identification keys",
             "Geographic Information Systems",
             "Niche Modelling",
             "Natural language processing, parsing free form text",
             "Provenance annotation: you can use metadata to keep track of where results came from",
             "Semantic integration, mashups - you can write tools to discover, collect and integrate online data",
             "Taxonomic name resolution: you can use and adapt tools to map one set of names to another",
             "Documentation: you can make screencasts and write clear how-to documents",
             "Web service interfaces - you can design and implement interfaces to wrap existing tools",
             "Workflows: you can assemble web services (or other resources) into an executable workflow",
             "Visualization: you can adapt an existing visualization tool for new inputs and capabilities",
             "Processing structured data (XML, JSON, YAML, etc...)",
             "Something else - you can contribute to this project in ways we haven't imagined yet"])
        rows = (row for row in source_reader if len(row) > 0)
        for row in rows:
            summary = []
            summary.append(row['Your name'])
            expertise = row['Do you have expertise in any of the following areas?']
            if 'Text' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Development' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Digital' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Geographic' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Niche' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Natural' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Provenance' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Semantic' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Taxonomic' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Documentation' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Web' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Workflows' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Visualization' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Processing' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            if 'Something' in expertise:
                summary.append('X')
            else:
                summary.append(' ')
            output_writer.writerow(summary)


if __name__ == '__main__':
    main()
