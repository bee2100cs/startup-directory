# Startup Directory
A Startup directory similar to YCombinator built with React 19, Next.js 15, Sanity, Tailwind CSS, ShadCN, and TypeScript.

The App allows entrepreneurs to submit their startup ideas, browse other pitches, and get their idea out there. ALso, the App will let founders to raise funds
from fans via crypto wallets.

## Tech Stack
- React 19
- Next.js 15
- Sanity
- TailwindCSS
- ShadCN
- TypeScript

## Features
👉 Display Latest startups dynamically using Sanity's Content API
👉 Authenticate users using Github and NextAuth
👉 Pitch Submission
👉 View Pitches
👉 Search Pitches
👉 Pitch Details Page
👉 Editor's Featured Pitches
👉 View Counter

# How To Use This project locally

## Prerequisites
- git
- Node.js
- npm

## Clone the Repo
```
git clone git@github.com:bee2100cs/startup-directory.git 
cd startup-directory
```

## Installation
```
npm install
```

## setup Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION='vX'
SANITY_TOKEN=

AUTH_SECRET= 
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```
Replace the placeholder values with your actual Sanity credentials. You can obtain these credentials by signing up & creating a new project on the Sanity website.

## Running the Project
```
npm run dev
```
Open http://localhost:3000 in your browser to view the project.

