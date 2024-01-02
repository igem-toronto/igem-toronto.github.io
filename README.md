# Team Toronto 2023 Wiki

This repository **MUST** contain all coding assets to generate your team's
wiki (HTML, CSS, JavaScript, TypeScript, Python, etc).

Images, photos, icons and fonts **MUST** be stored on `static.igem.wiki` using
[uploads.igem.org](https://uploads.igem.org), and Videos **must** be embedded
from [iGEM Video Universe](https://video.igem.org).

For up-to-date requirements, resources, help and guidance, visit
[competition.igem.org/deliverables/team-wiki](https://competition.igem.org/deliverables/team-wiki).

## About this Template (See customizations at the bottom!)

### Files

The static assets are in the `static` directory. The layout and templates are
in the `wiki` directory, and the pages live in the `wiki > pages` directory.
Unless you are an experienced and/or adventurous human, you probably shouldn't change other files.

    |__ static/             -> static assets (CSS and JavaScript files only)
    |__ wiki/               -> Main directory for the pages and layouts
        |__ layout/         -> Directory for layout files
            |__ *.html      -> Actual layout files
        |__ pages/          -> Directory for all the pages
            |__ *.html      -> Actual pages of your wiki
    |__ .gitignore          -> Tells GitLab which files/directories should not be uploaded to the repository
    |__ .gitlab-ci.yml      -> Automated flow for building, testing and deploying your website.
    |__ LICENSE             -> License CC-by-4.0, all wikis are required to have this license - DO NOT MODIFY
    |__ README.md           -> File containing the text you are reading right now
    |__ app.py              -> Python code managing your wiki
    |__ dependencies.txt    -> Software dependencies from the Python code

### Technologies

  * [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/)
  * [Python](https://www.python.org): Programming language
  * [Flask](https://palletsprojects.com/p/flask/): Python framework
  * [Frozen-Flask](https://pythonhosted.org/Frozen-Flask): Library that builds the wiki to be deployed as a static website
  * [NodeJS](https://nodejs.org/en): Node to use tailwindcss as the CSS framework. Use the LTS version

### Building locally (advanced users)

To work locally with this project, follow the steps below:

#### Install
```bash
git clone https://gitlab.igem.org/2023/toronto.git
cd toronto
python3 -m venv venv
. venv/bin/activate # on Linux, MacOS; or
. venv\Scripts\activate # on Windows
pip install -r dependencies.txt
npm i
```

#### Execute
To run the page generation and provide live HTML/Content updates, run this:
```bash
python app.py
```
The page is now accessible under [http://localhost:3000](http://localhost:3000).

If you change the tailwindcss utility classes or anything else about tailwindcss,
you also need to run the following command in a separate terminal and keep it running:
```bash
npx tailwindcss -i ./static/input.css -o ./static/output.css --watch
```

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
{{ img('cdn("image_name_on_cdn.png")', 'alt text', 'source description') }}
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

```
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
