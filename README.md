# Code Detective

A standalone static learning site with eight stages, 32 interactive lessons, eight local practical assignments, a query simulator, a field notebook, and human-instructor videos.

## Publish on GitHub Pages

1. Create a GitHub repository, for example `code-detective` (a public repository works with GitHub Free).
2. Upload **the contents of this folder** to the repository root. `index.html` must be at the top level, not inside another `code-detective` folder. Include `.nojekyll` when pushing with Git.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/(root)**, then **Save**.
6. Wait for deployment. Use the site URL displayed in Pages settings, typically `https://YOUR-USERNAME.github.io/code-detective/`.

No package install, build command, backend, API key, Sites account, or custom workflow is needed. All local asset paths are relative, so GitHub Pages repository subpaths work.

If using an existing repository, you can instead copy these files into its `docs/` folder and select `main` / `/docs` as the Pages source. Check for existing files before replacing that folder.

[GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Preview locally

From this folder:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Use an HTTP server rather than double-clicking `index.html`, because the course loads `curriculum.json` with fetch.

## Files

- `index.html`: page structure and entry point.
- `detective.css`: responsive styling.
- `detective.js`: lessons, query simulator, progress, notebook, video player.
- `curriculum.json`: all 40 lessons and practicals.
- `.nojekyll`: serves this as plain static content.
- `scripts/build_curriculum.py`: editable curriculum authoring source.
- `scripts/check.mjs`: curriculum and simulator checks.

To regenerate the curriculum after editing its Python source:

```sh
python3 scripts/build_curriculum.py
node scripts/check.mjs
```

Python and Node are only needed for authoring/checks; GitHub Pages serves the already-generated files.

## Progress and videos

Progress and notes stay in each visitor's browser. Moving from the previous site to a GitHub Pages URL starts a new browser-storage scope. Export your notebook on the old site first if you want a copy of your notes; it is a Markdown record, not an automatic progress import.

Videos are original external GitHub/Microsoft recordings. YouTube embeds load after clicking Play; original links are available if embedding is blocked. Google Fonts and videos need internet access; system fonts are used if fonts are unavailable. The site itself needs no hosted database or authentication.

Local practicals refer to the separate CodeQL security-agent project and require that project's tools. The browser query editor is a limited teaching simulator, not the CodeQL runtime. This folder includes the current course and supporting authoring files; earlier retired designs and synthetic videos are not part of the current app.
