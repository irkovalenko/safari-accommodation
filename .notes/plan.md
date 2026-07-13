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

- Pick check-in and check-out dates.
- Look up the nightly rate(s) covering those dates and show the total price.
- Check whether the room is already booked for any overlapping night in that range — if
so, show it as unavailable.
- Booking form: guest name, email, number of guests.
- Confirmation with booking details and total.



