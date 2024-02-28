# iGEM Toronto Website adapted from the iGEM Toronto 2023 Wiki

## Overview
### Files

The static assets are in the `static` directory. The layout and templates are
in the `wiki` directory, and the pages live in the `wiki > pages` directory.

    |__ static/             -> static assets (CSS and JavaScript files only)
    |__ wiki/               -> Main directory for the pages and layouts
        |__ layout/         -> Directory for layout files
            |__ *.html      -> Actual layout files
        |__ pages/          -> Directory for all the pages
            |__ *.html      -> Actual pages of your wiki
    |__ .gitignore          -> Tells Git which files/directories should not be uploaded to the repository
    |__ .github/
        | _ workflows
            |_ build-and-deploy.yml      -> Automated flow for building, testing and deploying your website
    |__ README.md           -> File containing the text you are reading right now
    |__ app.py              -> Python code managing our wiki
    |__ citations.py        -> Python code for the citation extension
    |__ navigation.json     -> Configuration for the main navigation bar
    |__ dependencies.txt    -> Software dependencies from the Python code
    |__ package.json        -> Software dependencies from JavaScript (mainly TailwindCSS)
    |__ package-lock.json   -> Pinned software dependencies from JavaScript (mainly TailwindCSS)

### Technologies

  * [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/)
  * [Python](https://www.python.org): Programming language
  * [Flask](https://palletsprojects.com/p/flask/): Python framework
  * [Frozen-Flask](https://pythonhosted.org/Frozen-Flask): Library that builds the wiki to be deployed as a static website
  * [NodeJS](https://nodejs.org/en): Node to bundle tailwindcss as the CSS framework. Use the LTS version

## Setup
```bash
git clone https://github.com/igem-toronto/igem-toronto.github.io.git
python3 -m venv venv
. venv/bin/activate # on Linux, MacOS; or
. venv\Scripts\activate # on Windows
pip install -r dependencies.txt
npm install
```

## Run for Development
To run the page generation and provide live HTML/Content updates, run this:
```bash
npm start
```
The page is now accessible under [http://localhost:3000](http://localhost:3000).

## Build for Production
To statically build the website using Flask Freeze run
```bash
npm run build
```

A directory called public is created whose contents can be published to a server.

## Custom Extensions
### Bibtex Citations
For citations, you can use the bibtex.bib file to store your citations. To use them, you can use the following syntax:
```
{{ cite('citekey') }}
```
in places you would use \cite{citekey} in latex. The citations are automatically numerated
by their first appearance. All citations will be included a reference section at the at the
bottom of the page.

### Headings
For headings, you can use one of the following four macros. The top one
must only be used once in a page, at the top, while the others can be used
multiple times.

* heading(txt)
* subheading(txt)
* subsubheading(txt)
* subsubsubheading(txt)

These will create headings with the appropriate size and color. Subheading and subsubheading
will appear in the page navigation bar, while heading and subsubsubheading will not.


### CDN
All images, videos, and other static assets should be stored on the cdn. You can use the
macro cdn('name_of_file') to get the url of the files you uploaded via [uploads.igem.org](https://uploads.igem.org).

### Images
For images, you can use the img macro:

```
{{ img('path/to/image', 'alt text', 'source description if external') }}
```

You should embed images only from the cdn. Then you can use

```
{{ img(cdn("image_name_on_cdn.png"), 'alt text', 'source description') }}
```

Side-by-side is possible by wrapping content that should be side-by-side in
a div with class “side-by-side”, like this:

```html
<div>
    <div class="side-by-side">
        <p>
            This is some text that will be on the left side.
        </p>
        {{ img('cdn("image_name_on_cdn.png")', 'alt text', 'source description') }}
    </div>
</div>
```

### Banner
You can insert a banner like the one on the description page. To do so, use the
banner(header, description) macro in the banner block. Look at the description page
for an example.


### Subpages and subheadings
Subpages and subheadings are managed through a list called subpages. It is passed
around as json with the following schema:

```json
[
    {
        "heading": "heading of the subpage",
        "key": "key of the subpage",
        "subheadings": [
            {
                "text": "text of the subheading",
                "key": "key of the subheading",
                "subsubheadings": [
                    {
                        "text": "test of the subsubheading",
                        "key": "key of the subsubheading"
                    }
                ]
            }
        ]
    }
]
```
