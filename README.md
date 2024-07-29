# Survey Dashboard

## Overview

The Survey Dashboard is a web application that visualizes survey results using various types of charts. It fetches survey data from an API and displays it using pie charts, bar charts, and grouped bar charts. The application is built using React and Chart.js, and it incorporates Bootstrap for styling.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Google Cloud Setup](#google-cloud-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)

## Features

- Fetches survey data, possible answers, and question titles from an API.
- Displays survey results using pie charts for choice-based questions.
- Displays survey results using bar charts for rating-based questions.
- Groups and displays subquestion results using grouped bar charts.
- Provides an accordion interface for easy navigation of survey questions.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/survey-dashboard.git
   cd survey-dashboard
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Google Cloud Setup

1. **Create a Google Cloud Project**:

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project.

2. **Enable Google Forms API**:

   - In the Google Cloud Console, navigate to the API & Services Dashboard.
   - Click on "Enable APIs and Services".
   - Search for "Google Forms API" and enable it.

3. **Setup OAuth Consent Screen**:

   - In the API & Services section, click on "OAuth consent screen".
   - Select "External" and fill out the required information.

4. **Create OAuth 2.0 Credentials**:

   - Go to the Credentials page in the API & Services section.
   - Click on "Create Credentials" and select "OAuth 2.0 Client IDs".
   - Configure the consent screen and create the credentials.
   - Download the JSON file containing your credentials and save it as `credentials.json`.

5. **Create a Google Form**:
   - Go to [Google Forms](https://forms.google.com/).
   - Create a new form or use an existing one.
   - Get the Form ID from the form's URL. It is the long string after `/d/` in the form URL (e.g., `https://docs.google.com/forms/d/your-form-id/edit`).

## Usage

1. Ensure your API server is running and accessible.
2. Open the application in your browser by navigating to `http://localhost:3000`.
3. Browse through the survey questions and view the visualized results.

## Project Structure

```plaintext
src/
│
├── components/
│   ├── SurveyDashboard.tsx
│   ├── QuestionAccordion.tsx
│   ├── PieChartComponent.tsx
│   ├── BarChartComponent.tsx
│   ├── GroupedBarChartComponent.tsx
│
├── services/
│   └── api.ts
│
├── types/
│   └── index.ts
│
├── App.tsx
├── index.tsx
└── index.css
```

## Components

- SurveyDashboard.tsx: Main dashboard component that fetches data and renders the survey results.
- QuestionAccordion.tsx: Component for rendering each survey question in an accordion.
- PieChartComponent.tsx: Component for rendering pie charts.
- BarChartComponent.tsx: Component for rendering bar charts.
- GroupedBarChartComponent.tsx: Component for rendering grouped bar charts.

## Services

- api.ts: Contains functions for fetching survey data, possible answers, and question titles from the API.

## Types

- main.ts: Contains TypeScript interfaces used throughout the project.

## Main Entry

- App.tsx: Main application component.
- index.tsx: Renders the main application component.
- index.css: Global styles for the application.

## Dependencies

- React
- Chart.js
- React-Chartjs-2
- Axios
- Bootstrap
