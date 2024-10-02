"""
Citation module reading citations from a bibtex file and providing them to cite
in the wiki.

Author: Henrik S. Zimmermann <henrik.zimmermann@utoronto.ca>
"""

from __future__ import annotations

from bs4 import BeautifulSoup
import subprocess
import os


class CitationLoader:
    """
    Loads citations from a bibtex file and provides them to cite in the wiki.

    name_to_refernce -  a dict that maps the name of a citation to the actual
                        fields.
    """
    name_to_reference: dict[str, dict[str, str]]

    def __init__(self, file=None) -> None:
        """
        Open the bibtext file and use bibtextparser to parse it. Populate the
        citations dict.
        """
        if file is None:
            proc = subprocess.run(
                "pandoc --csl=nature.csl --citeproc --wrap=none -f markdown -t html template.md",
                capture_output=True,
                text=True,
                shell=True,
                cwd=os.path.join(os.path.dirname(os.path.realpath(__file__)), "static", "citations"))
            
            content = proc.stdout.strip().replace("\n", "")
        else:
            with open(file) as f:
                content = f.read().strip().replace("\n", "")
        
        soup = BeautifulSoup(content, "html.parser")
        refs = soup.find_all("div", {"class": "csl-entry"})

        print(f"Loaded {len(refs)} citations")

        self.name_to_reference = dict()
        for tag in refs:
            assert tag["id"].startswith("ref-")
            name = tag["id"][4:]

            # A bit hacky, but this removes two outer dives
            # <div ...><div ...>text</div></div> -> test
            ref = "".join(map(str, tag.contents[0].contents))
            self.name_to_reference[name] = ref

    def citer(self) -> Citer:
        """
        Return a citer associated with the loaded citations from this loader.
        """
        return Citer(self)

    def __str__(self) -> str:
        """
        Return a string representation of the citations.
        """
        return str(self.name_to_reference)


class Citer:
    """
    Citer class that can be used to cite references from a CitationLoader.
    A new citer has to be used for each page to reset the citation counter.

    citation_loader - the loader to use for the citations.
    citation_to_number - a dict that maps the name of a citation to the number.
    """
    citation_loader: CitationLoader
    citation_to_number: dict[str, int]

    def __init__(self, citation_loader: CitationLoader) -> None:
        """
        Initialize the citer with the citation loader and prepare the
        citation_to_number dict.
        """
        self.citation_loader = citation_loader
        self.citation_to_number = {}

    def cite(self, name: str) -> str:
        """
        Cite the reference with the given name. If the reference has not been
        cited before, assign it a new sequential number.
        """
        if name in self.citation_to_number:
            number = self.citation_to_number[name]
        else:
            number = len(self.citation_to_number) + 1
            self.citation_to_number[name] = number

        return self.citation_to_number[name]

    def reset(self):
        """
        Reset the citer to start from the beginning.
        """
        self.citation_to_number = {}

    def last_number(self) -> int:
        return len(self.citation_to_number)

    def references(self) -> str:
        """
        Return the mentioned references sorted in citation order.
        """
        sorted_keys = sorted(self.citation_to_number.keys(),
                                key=lambda x: self.citation_to_number[x])
        sorted_citations = [self.citation_loader.name_to_reference[key]
                            for key in sorted_keys]

        return sorted_citations