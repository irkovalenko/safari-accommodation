# Safari Accommodation

A mini-booking app, which will eventually grow with more functionality over time.

## Pages

The app currently contains 3 pages:

- **Admin page** — bookings overview
- **Guest page** — where a viewer starts the booking process
- **Booking page** — where the viewer is redirected after completing the required steps and availability checks on the guest page

## Screenshots

**Admin page**
<img width="2546" height="816" alt="Admin page" src="https://github.com/user-attachments/assets/fffe8a6d-a845-4e5c-b480-a2a8f46e6494" />

**Guest page (no data filled in)**
<img width="2104" height="816" alt="Guest page with no data filled in" src="https://github.com/user-attachments/assets/980fe2c1-496a-47da-98c9-750a3e540d3f" />

**Guest page with availability check error**
<img width="2104" height="1092" alt="Guest page with availability check error" src="https://github.com/user-attachments/assets/54fbf818-895f-4931-bef9-553b0702b734" />

**Guest page with availability check passed**
<img width="2468" height="1640" alt="Guest page with availability check passed" src="https://github.com/user-attachments/assets/8ad26059-ed59-478b-bb9a-fb65a1dac9ee" />

**Booking page with data filled in**
<img width="2446" height="1166" alt="Booking page with data filled in" src="https://github.com/user-attachments/assets/0263af81-f1c1-4a79-84c6-38a9ba58b26d" />

**Successfully created booking**
<img width="2446" height="1166" alt="Successfully created booking" src="https://github.com/user-attachments/assets/fe8e99f9-bf86-47c4-a238-d6bf40f43fb4" />

**Redirected to bookings overview (admin page)**
<img width="2592" height="1148" alt="Redirected to bookings overview" src="https://github.com/user-attachments/assets/f0180244-ed50-49db-8062-2b1e27066516" />

## Running locally

1. Download the repo and configure the `.env` file according to your local database setup (this project uses MySQL running in a Docker container).
2. Run the following commands:

```bash
   php artisan serve
   npm run dev
   php artisan migrate:fresh --seed
   npm install canvas-confetti
```
