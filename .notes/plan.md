---
name: Safari Accommodation App - Bookings and Rates
description: "Simple app with 3 pages: admin page with all bookings overview, guest page with searching the appropriate accommodation and mini-booking page. User selects accommodation, room and dates in Guest.jsx. The availability check is performed -> if it's passed, then the total price and the rate per night is presented along with the button <Proceed to booking>; otherwise the warning is displayed that the user must select different dates. The user get's redirected to mini-booking confirmation page where he fills the missing booking data -> confetti and redirection to admin page where all bookings are visible."

---

# Database part

## Create models and relationships

ACCOMMODATION
uuid - primary key
name (varchar)
description (varchar)
location (varchar)

ROOMS
uuid - primary key
accommodation_id - BelongsToOne
type_id (foreign id)
description (varchar)
max_guests (int)

RATES
uuid - primary key
room_id - foreing in - BelongsToOne
start_date - beginning of the date range
end_date - end of the date range
price_per_night - float

BOOKINGS
uuid - primary key
guest_name
email
number_of_guests
check_in
check_out
total_price
booking_date


## Create a database seeder

It has to fill the tables with at least one row of data. Since the dataset is really small, no separate factories files were created. All logic is placed directly in the seeder.

# Booking an accommodation (Guest page)

REQUIREMENTS
- Pick check-in and check-out dates.
- Look up the nightly rate(s) covering those dates and show the total price.
- Check whether the room is already booked for any overlapping night in that range — if
so, show it as unavailable.
- Booking form: guest name, email, number of guests.
- Confirmation with booking details and total.

STEPS APPLIED
1. Created a form for user input - accommodation, room, check_in_date, check_out_date (this way multiple accommodations can be handled in the future), like in booking.com (Guest.jsx in frontend, AccommodationController and separate endpoint in api api/accommodations)
2. Added the calculation of the stay for user before he proceeds.
3. Handle the availability check based on bookings (+separate AvailabilityController and endpoint)

- create a separate endpoint Route::post('/rooms/{room}/availability', [AvailabilityController::class, 'checkAvailability'])
- new function checkAvailability to AvailabilityController
- incorporate this to in frontend so the user cannot proceed until he selects the room when it is available


4. Proceed to booking (after availability check) step redirecting to booking form, then confirmation (then the booking must be added to the admin page).

BookingForm and Button were extracted to separate components since otherwise Guest.jsx and Booking.jsx would be quite big. Button is reused in multiple places.


# To do when there is a time for polishing things

- Handle Bookings.jsx url - now the already filled data travel in url via query parameters. As a result, url looks clumsy.
- Handle currencies - maybe a separate table so user can select it. Now the dollar sign is just added in frontend.
- Authentification layer since currently admin page is visible for everyone without context, user must be able to create account or make a booking as guest while a user with admin scope sees all bookings. (Laravel breeze?)

From additonal things given in task description, I would definitely go for all of them, except writing a test, so:
- Add a second room type and see how your availability/pricing logic needs to change.
- Admin CRUD for rates. -> complete RateController with frontend for Index, Create (with button for store request), Edit (with delete button)
- Booking confirmation email (Laravel mail). -> event listener to booking store
- Booking cancellation that frees the room.
- A simple visual calendar showing booked vs. free dates. -> that would be an upgrade to already existing calendar in Guest.jsx for check_in_on and check_out_on dates.


# Used resources
1) api refresher from The Codeholic - https://www.youtube.com/watch?v=_iuxZygxz98