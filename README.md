# Event-Manager

Welcome to **Event-Manager**, a full-stack event-management application designed to simplify the  and discovery of events.  Whether you are an event organizer or an attendee, Event-Manager offers a set of features to enhance your event experience. Currently it includes only Astana city.

## Features

- **User Authentication**: JWT login and registration system for users and administrators.
- **Event Creation and Management**: Users can create, edit, and manage events with options to set dates, locations, descriptions and images. 
- **Events Dashboard**: Backend parses the current events data from sxodim.com using Celery and Redis. The scheduled task was set such that it parses the website every day at midnight for updated set of events.
- **Search and Filter**: Dynamic searching and filtering capabilities allow users to find events by name, date, or location.
- **RSVP and Ticketing**: Incoming: with Google Calendar API. There were issues with CORS and, time did not allow to finish, but if you are interested: I have cloned the repository and there I will continue the project for myself.

## Technologies Used

- **Frontend**: React.js, Next.js, Tailwind CSS
- **Backend**: Django, DRF
- **Database**: SQLite3 (PostgreSQL - Incoming)
- **Deployment**: Vercel (Frontend), Heroku (Backend) (Incoming)
- **APIs**: Google Maps API for event locations and calendar (Incoming)

## Getting Started

### Prerequisites

- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/event-manager.git
   cd event-manager
   npm install
   npm run dev

   localhost:3000/
   dashboard/ - All the events parsed from sxodim.com, all images are clickable and directs to the page with detailed information
   dashboard/<event_id> - Detailed information about the event


### Backend repo: 
https://github.com/aqbotash/event-management-system-backend
