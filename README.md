# b3k3n Documentation

- [Getting Started](#getting-started)
- [Folder Structure](#structure-and-naming)
- [Pages](#pages)

## Getting started

<a name="getting-started"></a>
To setup this repo locally, run following commands

### Clone repo

To setup this repo locally, run following commands

```sh
# Clone repo
$ git clone git@github.com:dalladirosa/b3k3n.git
$ cd b3k3n

# Install dependencies
# This will automatically run install all package
# dependencies and link all packages together
$ npm install
```

### Editor Integration

- [VSCode](https://code.visualstudio.com/) (**recommended**)
- [Webstrom](https://www.jetbrains.com/webstorm/) (**recommended**)

### Editor Plugins

- eslint
- prettier
- tailwindcss

<a name="structure-and-naming"></a>

## 2. Structure and Naming

- While the boilerplate does primarily rely on the standard file structure of a Next.js project (anchored around the /pages directory), a few additions have been made. The following outlines the full structure of the boilerplate:

  ```
  .
  ├── public
  ├── api
  │   ├── books.ts
  │   └── category.ts
  ├── /components
  │   └── Layout.tsx
  │   └── Navbar.tsx
  ├── /containers
  │   └── /home
  │       └── BookCard.tsx
  ├── /interfaces
  │   ├── books.interface.ts
  │   └── categories.interface.ts
  ├── pages
  │   ├── /api
  │   │   │
  │   │   └── books.tsx
  │   ├── /documents
  │   │   ├── [id]
  │   │   │   └── index.tsx
  │   │   └── index.tsx
  │   └── profile.tsx
  ├── styles
  │   ├── global.css

  ```

* `public`: Folder used for static files, see [Static File Serving](https://nextjs.org/docs/basic-features/static-file-serving).
* `api`: The api directory contains all services that take care of the communication between the React application (frontend) and an API (backend).
* `components`: The components directory contains reusable elements, modules, templates, and layouts.
* `containers`: The containers directory contains components that are used by pages.
  - always create a folder that uses the same name with the page
  - use `lower_snake_case` for the root folder
  - for the child folder use `CamelCase`
* `interfaces`: The hooks directory contains interfaces that are used by many pages.
* `pages`: Folder used for routing, see [Pages](https://nextjs.org/docs/basic-features/pages)
* `styles`: The styles directory contains styles that are used globally.

<a name="pages"></a>

## 3. Pages

In this project there are 3 pages

- [Home Page](#home-page)
- [Bookmarks Page](#bookmark-page)
- [Category Book Page](#category-page)

<a name="home-page"></a>

### Home Page

![alt text](/public/home_page.png)

<a name="bookmark-page"></a>

### Bookmarks Page

![alt text](/public/bookmark_page.png)

<a name="category-page"></a>

### Category Book Page

![alt text](/public/category_page.png)
