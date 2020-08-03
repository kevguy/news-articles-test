# Coherent Frontend Test

## Introduction

- **Name:** Kevin Lai
- **Time Taken:** 3 hours (30 mins for writing this)
- **Demo:** None

## Installation

This is a ReactJS application developed using [Create React App](https://github.com/facebook/create-react-app). To run the application, install the independencies first:

```sh
npm install
# or
yarn install
```

## How to run

Make sure you have a file `.env` in the project directory to supply the News API key:

**.env**
```
NODE_PATH=src/
REACT_APP_NEWS_API_KEY=<YOUR_API_KEY_HERE>
```

The `NODE_PATH` is 100% necessary for specifying absolute paths for import in the `src` folder.

### Option 1

You can run the application by simply starting the application:

```sh
yarn start
# or
npm run start
```

Go to http://localhost:3000

### Option 2

Run the built app by building it first and then serve the app using `serve`:

```sh
yarn build
# If you don't have serve installed
yarn add global serve
serve -s build

# Or
npm run build
npm install -g serve
serve -s build
```

Go to http://localhost:5000

### Option 3

Tun the built app using Docker:

```sh
docker build . -t sample-app
docker run -d -p 8080:80 sample-app
```

Go to http://localhost:8080

## How to test

Simply execute the following command:

```
yarn test
# or
npm run test
```

## Structure

Here's an overview of the folder structure:

| Name | Type | Summary |
|:-----|:-----|:-----|
| build | Folder | The folder storing all the compiled files and everything needed to run the server with NodeJS |
| src | Folder | The folder that stores all the source code, details will be covered later |
| .env.example | File | Contains the necessary config, including a sample API key |
| package.json | File | Contains all the dependencies need to be installed and some info about the Node application |
| README.md | File | This file |

## Source Code

### Setup (`src/index.js`)

The application and Redux and Router and everything are set up here.

### App (`src/app.js`)

The shell of the application is set up here.

### News API Instance (`src/axios-news.js`)

This file creates an Axios instance for fetching news articles from the News API.

### Redux Store (`src/store`)

The folder contains the actions and reducers for the Redux store.

### News Result Container (`src/containers/NewsResult`)

Contains the component for showing the new articles.

### Higher Order Components (`src/hoc`)

Contains the higher order components for 

- `Aux`: for showing siblings 
- `asyncComponent`: async components
- `withErrorHandler`: an error component wrapper for catching errors

### UI Component (`src/components/UI`)

Contains components for modals, backdrops and a spinner

### Toolbar (`src/components/Toolbar`)

The tool bar of the application, including a search input field.

### Layout (`src/components/Layoug`)

Contains the component for arranging the `Toolbar` and `NewsResult`.

### Article (`src/components/Article`)

The card component for showing the news article.

## Requirements

- Create a single page application that displays news articles from newsapi.org
- Required languages: HTML, CSS, ReactJS.
- The application must be compatible on desktop, tablets, and mobile phones.
- Assets such as application icons and colour reference can be found in zip file. 

## Acceptance Criteria Evaluation

### Display 100 news articles from Washington Post and New York Times.

**Status:** Done

  - Use card component to display each news article.
  - Here is the API for generating news articles. (News API Documentation)
  - You will need to register your own API key in order to access the API.
  - Data should be stored in a local data model.

100 news articles are fetched when the application starts and stored inside the Redux store. And the news articles to be shown to users are shown in grids of card components.

### Header should stay on page top when scrolling.

**Status:** Done

The Toolbar component (`src/components/Navigation/Toolbar`) sticks on top when scrolling.

### Implement infinite scrolling.

**Status:** Done

  - Each pagination should display only 10 news articles.
  
The requirements didn't specify if I should 
 
   - fetch 100 articles first and then present search results locally 10 by 10, OR
   - fetch 10 articles that are relevant to search query first, then get 10 more during infinite scroll
 
I went for Option 1 because [newsapi.org](https://newsapi.org) only offers 3 endpoints (`/top-headlines`, `everything` and `sources`), none of which are relevant to searching. And to go for Option 2 means I'll have to inevitably keep polling more more data til I get 10 search results, so I went to Option 1 instead.
  
The infinite scrolling is done using [react-infinite-scroller](https://github.com/danbovey/react-infinite-scroller). I made sure the application have zero errors, except two, which are [workarounds](https://github.com/danbovey/react-infinite-scroller) to reset pagination using this component. Therefore, you can safely ignore those warnings and errors.

### Each card component should have hyperlink linking to the news article.

**Status:** Done

When the card component (`src/components/Article`) is clicked, the news article will be opened on a new tab.

### Search bar on header component is used to filter news articles by matching keywords.

**Status:** Done

  - When performing search, only list out news with titles and descriptions that contains the keywords in the search bar.
  - Search is performed as the user is typing in the search bar

Fuse.js is used to conduct fuzzy search on relevant fields of the news articles (`title` and `description`). And there are Redux actions to feed the user's input to Fuse.js for searching.

## Bonus Requirements

**Codes are properly separated in different components and services.**

I separated components into higher order components (`src/hoc`), containers (`src/containers`) and generic UI components (`src/components/UI`) and the others (`src/components`).

**Proper SEO tags and open graph tags.**

- There are alt text (also known as "alt attributes") for each image.
- In `public/index/html`, there's a `<title>` tag and a `<description>` tag.

```html
<title>Simple News Articles Query</title>
<meta name="description" content="A simple news article query page for Coherent's coding test.">
```

**Use Redux for development**

Redux is used for storing news articles and filtered results. Redux Thunk is used for async requests.

**Use Styled Components or CSS pre-processors.**

CSS Modules are used. It's enabled by `create-react-app` by default if CSS files are named in `FILE_NAME.module.css`.

**Show loading indicator when fetching data.**

A spinner is created for

- when news articles are being fetched
- when 10 more articles are to be shown during infinite scroll

**Progressive web application (PWA) to cache API responses and image for offline access.**

I didn't do it because even if I do, I'll have to demo it using in a `https` environment. But I'm familiar with writing my own service worker and learned it from Jake Archibald and Michael Wales' [course](https://www.udacity.com/course/offline-web-applications--ud899) back in 2016, and since then I'm also familiar with generating one using Workbox. My own website https://borecast.com is a PWA, you can have a look.

**Performance optimization, avoid unnecessary calculation or rendering.**

Although the search results and the original list of news articles are separate, which effectively means I have stored some duplicates, I made sure pagination is done by doing shallow copy of the search results using `Array.slice`, so I'm only storing references and not another duplicate of the news articles.

I also have a habit of using UI libraries like `material-ui`, but I chose to write my own CSS here since this is just a simple application and I want to keep the application small. If you look at the `build` folder, it's about 1.3mb, but most of it goes to static assets like images, the bundle size itself is only about 250Kb:

You verify it by running the following command:

```
yarn analyze
# or
npm run analyze`
```

## Any other interesting features that can show your skills. 

1. I have documented most of my code
2. I used `prop-types` to safeguarding data I'm passing to props of different components.
3. I wrote tests for both Redux and almost all of the components using `jest` and `enzyme`. (Running using `yarn test`)
4. I added a Dockerfile to containerize the application.


## Issue

The News API doesn't have The New York Times available anymore. Therefore, when you open the application, all you see are articles from The Washington Post. You can go to `src/store/actions/news_actions` to make changes to the `queryOptions` to show othre news sources instead.

## Room for Improvements

**React Hooks**

Honestly speaking, I haven't written a single line of React for about two years, I'm most a Vue guy, as reflected [here](https://stackoverflow.com/users/story/5836921), and I haven't caught up to the frontend world as often as I used to, so I was only wielding the React knowledge that I still know to make this application happen. One improvement I'd like to make when I have time to using React hooks instead of Redux.

**CI/CD**

I mostly use Gitlab and their free CI service to test and deploy my application to Kubernetes. But since I'm hosting the code here on Github, I didn't do it.
