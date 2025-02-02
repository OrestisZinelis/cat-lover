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
