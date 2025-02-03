# GlobalWebIndex Engineering Challenge

## Exercise: CatLover

Create a React application for cat lovers which is going to build upon thecatapi.com and will have 3 views.
The **first** view displays a list of 10 random cat images and a button to load more. Clicking on any of those images opens a modal view with the image and the information about the cat’s breed if available. This would be a link to the second view below - the breed detail. The modal should also contain a form to mark the image as your favourite (a part of the third view as well). Make sure you can copy-paste the URL of the modal and send it to your friends - they should see the same image as you can see.

The **second** view displays a list of cat breeds. Each breed opens a modal again with a list of cat images of that breed. Each of those images must be a link to the image detail from the previous point.

The **third** view allows you do the following things:

- Display your favourite cats
- Remove an image from your favourites (use any UX option you like)

You can find the API documentation here: https://developers.thecatapi.com/
We give you a lot of freedom in technologies and ways of doing things. We only insist on you using React.js. Get creative as much as you want, we WILL appreciate it. You will not be evaluated based on how well you follow these instructions, but based on how sensible your solution will be. In case you are not able to implement something you would normally implement for time reasons, make it clear with a comment.

## Submission

Once you have built your app, share your code in the mean suits you best
Good luck, potential colleague!

# CatLover <img src="./public/cat.svg" alt="Logo" width="36" height="36" style="vertical-align: middle; margin-left: 10px;" />

A React application for **cat lovers**. Display cat images, mark them as favorites and check the breed info!

## Images

https://drive.google.com/drive/folders/1Hk-IBP0zuDrCln5mtZLDH-mOTxQ7oaqS?usp=drive_link

## Tech Stack

- React
- React Router
- TypeScript
- Vite
- Axios
- TanStack Query
- Tailwind CSS
- Material UI

## API

Get your API key from [The Cat API](https://developers.thecatapi.com/), then set `VITE_CAT_API_KEY` inside the `.env` file.

## Installation

1. Clone the repo

```sh
git clone https://github.com/OrestisZinelis/cat-lover
```

2. Navigate to the project directory e.g.

```sh
cd cat-lover
```

3. Install dependencies

```sh
yarn
```

or

```sh
npm install
```

4. Create a `.env` file in the root directory and add your API key:

`VITE_CAT_API_KEY=your_api_key_here`

## Development

Start the development server:

```sh
yarn dev
```

This will launch the app on http://localhost:5173

## Build

Build the project for production:

```sh
yarn build
```

This will generate the build files in the dist/ directory.

## Linting

Lint the project files using ESLint:

```sh
yarn lint
```

## Preview

Preview the built project:

```sh
yarn preview
```

## License

This project is licensed under the **MIT** License
