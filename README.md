# Chill Vibes Music Player

Chill Vibes is a modern, feature-rich music player web application built with React. It offers a sleek interface for browsing, playing, and managing your music collection.

## Features

### Music Playback

- Play, pause, skip tracks, and control volume
- Adjustable playback speed (0.5x to 2x)
- Progress bar with time display
- Automatic transition to next song

### Library Management

- Browse a curated catalog of songs across different genres
- Search for songs by title or artist
- Filter songs by genre
- Add songs to your personal library
- Remove songs from your library
- Mark songs as favorites

### User Experience

- Responsive design that works on desktop and mobile devices
- Dark mode toggle for comfortable viewing in any environment
- Clean, intuitive interface
- Smooth animations and transitions

## How to Use

### Playing Music

- Click on a song in your library to play it
- Use the player controls at the bottom to:
  - Play/pause the current song
  - Skip to the previous or next song
  - Adjust volume
  - Change playback speed
- The progress bar shows the current position in the song and can be clicked to jump to a specific position

### Managing Your Library

1. **Browse Songs**:

   - Click the "Browse" button in the navigation bar
   - Browse through available songs
   - Use the search bar to find specific songs or artists
   - Use the filter button to filter songs by genre

2. **Add Songs to Library**:

   - While browsing, click the "+" button on a song to add it to your library

3. **Remove Songs from Library**:

   - In your library, click the trash icon on a song to remove it

4. **Favorite Songs**:
   - Click the heart icon on any song in your library to mark it as a favorite
   - Use the "Favorites" filter in the library to show only your favorite songs

### Customizing Your Experience

- Click the moon/sun icon in the navigation bar to toggle between light and dark mode
- Adjust playback speed using the speed control below the player

## Technologies Used

- React.js
- SCSS for styling
- FontAwesome for icons
- UUID for generating unique IDs

## Project Structure

```
chill-vibes/
├── public/               # Public assets
├── src/                  # Source files
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── images/           # Image assets
│   ├── styles/           # SCSS style files
│   ├── util/             # Utility functions
│   ├── App.js            # Main App component
│   ├── data.js           # Default song data
│   └── index.js          # Application entry point
└── README.md             # Project documentation
```

## Development

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
