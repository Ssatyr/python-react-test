# Survey Dashboard

## Overview

The Survey Dashboard is a web application that visualizes survey results using various types of charts. It fetches survey data from an API and displays it using pie charts, bar charts, and grouped bar charts. The application is built using React and Chart.js, and it incorporates Bootstrap for styling.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Google Cloud Setup](#google-cloud-setup)
- [Docker Setup](#docker-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)

## Features

- Fetches survey data from a Google Form
- Displays survey results using charts
- Provides a responsive design

## Prerequisites

- Node.js
- Python 3.7+
- Docker (optional, for containerization)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Ssatyr/survey-dashboard.git
   cd survey-dashboard
   ```

2. Install the dependencies:

   ```sh
   cd frontend
   npm install
   cd ..
   cd backend
   pip3 install requirements.txt
   ```

3. Set Up Credentials:

   - Place the downloaded OAuth 2.0 credentials JSON file in the backend directory and rename it to credentials.json.

4. Start the development server:

   ```sh
   cd backend
   uvicorn main:app --reload
   cd ..
   cd frontend
   npm run dev
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
   - Download the JSON file containing your credentials and save it in backend folder as `credentials.json`.

5. **Create a Google Form**:
   - Go to [Google Forms](https://forms.google.com/).
   - Create a new form or use an existing one.
   - Get the Form ID from the form's URL. It is the long string after `/d/` in the form URL (e.g., `https://docs.google.com/forms/d/your-form-id/edit`).

## Docker Setup

1. Ensure you have Docker and Docker Compose installed on your machine.

2. Place the downloaded `credentials.json` file in the `backend` directory.

3. Build the Docker images:

   ```sh
   docker-compose build
   ```

4. Start the Docker containers:

   ```sh
   docker-compose up
   ```

The application will be available at `http://localhost:3000`.

## Usage

1. Ensure your API server is running and accessible.
2. Open the application in your browser by navigating to `http://localhost:3000`.
3. View the visualized results.

## Project Structure

```plaintext
frontend/src/
│
├── components/
│   ├── SurveyDashboard.tsx
│   ├── AccordionItem.tsx
│   ├── GroupedBarChart.tsx
│
├── services/
│   └── api.ts
│
├── types/
│   └── index.ts
│
├── App.tsx
├── main.tsx
└── index.css


backend/src/
│
├── credential_handler.py
├── form.py
├── main.py
├── credentials.json
└── Dockerfile
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
