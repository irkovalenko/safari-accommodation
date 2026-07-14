---
name: Safari Accommodation App - Bookings and Rates
description: "Simple app with 2 pages: admin page with all bookings overview and guest page. Guest page must enable a visitor to book a stay within the available dates."

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
4. Proceed step redirecting to booking check and then confirmation (then the booking must be added to the admin page)

# Used resources
1) api refresher from The Codeholic - https://www.youtube.com/watch?v=_iuxZygxz98



'searching'   → dropdowns + dates + "Proceed" button
'unavailable' → error message + "Try different dates" button (back to 'searching')
'available'   → shows total price + guest info form + "Confirm Booking" button
'confirmed'   → booking confirmation details (guest name, dates, room, total)