# Add Car Flow

## Application Overview

Plan to validate the user flow for adding a car in the Hillel Qauto Garage, ensuring the car is created, visible with correct attributes, persists on reload, and can be removed for cleanup. Assumes environment provides BASE_URL and authenticated context via seed (tests/seed.spec.ts).

## Test Scenarios

### 1. Garage — Add Car

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add car — happy path and persistence

**File:** `tests/garage/add-car.spec.ts`

**Steps:**
  1. Navigate to BASE_URL then open Garage (side nav link 'Garage').
    - expect: Garage page loads with heading 'Garage'.
    - expect: Empty state visible if no cars: 'You don’t have any cars in your garage' (if not empty, plan to remove created car in cleanup).
  2. Click 'Add car'.
    - expect: 'Add a car' modal is visible.
  3. In 'Add a car' modal, keep defaults Brand='Audi', Model='TT'. Enter Mileage='12345'.
    - expect: 'Add' button becomes enabled.
  4. Click 'Add'.
    - expect: Success toast 'Car added' appears.
    - expect: A new car card appears in the list.
    - expect: Title displays 'Audi TT'.
    - expect: Mileage control shows value '12345'.
    - expect: 'Update' button is disabled until mileage value changes.
  5. Reload the Garage page.
    - expect: The car persists after reload (card remains present with 'Audi TT' and mileage '12345').
  6. Cleanup: Open the car actions (edit), click 'Remove car', confirm 'Remove'.
    - expect: Success toast 'Car removed' appears.
    - expect: Empty state message is visible again.

#### 1.2. Add car — input validation (mileage)

**File:** `tests/garage/add-car-validation.spec.ts`

**Steps:**
  1. Open Garage, click 'Add car' to open modal.
    - expect: 'Add a car' modal is visible.
  2. Leave Mileage empty.
    - expect: 'Add' button remains disabled.
    - expect: Optional inline validation appears near the mileage field.
  3. Type non-numeric characters into Mileage (e.g., 'abc' or '12a').
    - expect: Only digits are accepted or validation error is shown.
    - expect: 'Add' remains disabled.
  4. Enter a negative value (e.g., '-1').
    - expect: Validation prevents submission; 'Add' remains disabled.
  5. Enter an excessively large value (e.g., '9999999999999999').
    - expect: Value is constrained/validated; 'Add' remains disabled if invalid.
  6. Enter a boundary value (e.g., '0' for a brand-new car).
    - expect: 'Add' becomes enabled if product allows zero mileage; otherwise a validation message is shown and 'Add' stays disabled.
  7. Click 'Cancel' to close modal.
    - expect: Modal closes; no car is added.
