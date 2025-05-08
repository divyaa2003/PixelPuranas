# Historical Events Explorer

A comprehensive web application that provides detailed information, images, and YouTube links for historical events.

## Features

- **Search Functionality**: Search for historical events by name or keyword
- **Detailed Information**: Get comprehensive details about each historical event
- **Visual Content**: View historical images related to each event
- **Video Resources**: Access YouTube videos about the events
- **Suggested Events**: Discover random historical events through suggestions
- **Recently Viewed**: Keep track of your recently viewed events

## Available Historical Events

The application includes information about the following historical events:

- Moon Landing (1969)
- Berlin Wall Fall (1989)
- World War II (1939-1945)
- French Revolution (1789-1799)
- American Revolution (1775-1783)
- Industrial Revolution (1760-1840)
- Civil Rights Movement (1954-1968)
- Cold War (1947-1991)
- Digital Revolution (1950s-Present)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm start
```

The application will be available at http://localhost:3000 in your web browser.

### Building for Production

Create a production build:

```bash
npm run build
```

## Technology Stack

- React.js - Frontend library
- Lucide React - Icon library

## Project Structure

- `src/components/` - React components
- `src/data/` - Historical events data
- `public/` - Static assets

## How to Use

1. Enter a historical event name or keyword in the search bar
2. Click on the "Search" button or press Enter
3. View the detailed information, images, and videos about the event
4. Use the "Back to Search" button to return to the main page
5. Explore suggested events by clicking on them

## Extending the Application

To add more historical events, edit the `src/data/historicalEvents.js` file following the existing data structure.

## License

This project is open source and available under the MIT License.
