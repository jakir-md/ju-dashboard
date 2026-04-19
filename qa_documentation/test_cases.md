##Resource Dashboard Test Cases

TC_01:
Feature: Load Resources
Input: Open dashboard
Expected: All resources displayed as cards

TC_02:
Feature: Resource Details
Input: View resource card
Expected: Shows name, type, capacity, availability

TC_03:
Feature: Book Now Button
Input: Click “Book Now”
Expected: Opens booking form

##Booking Interface Test Cases

TC_04:
Feature: Booking Form Open
Input: Select resource
Expected: Booking form appears

TC_05:
Feature: Empty Field Validation
Input: Leave fields empty and submit
Expected: Error message shown

TC_06:
Feature: Successful Booking
Input: Valid name, date, time
Expected: Booking success message

TC_07:
Feature: Loading State
Input: Submit booking
Expected: Loading indicator displayed

##Schedule Viewer Test Cases

TC_08:
Feature: Load Bookings
Input: Open schedule page
Expected: All bookings displayed

TC_09:
Feature: Booking Details
Input: View booking list
Expected: Shows user, date, time correctly

TC_10:
Feature: Delete Booking
Input: Click delete button
Expected: Booking removed from list

TC_11:
Feature: No Refresh Update
Input: Add/delete booking
Expected: Table updates without full page reload
