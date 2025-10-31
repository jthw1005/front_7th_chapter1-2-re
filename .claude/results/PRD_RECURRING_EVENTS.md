# Recurring Events Feature - Product Requirements Document

## Document Metadata
- **Version**: 1.0.0
- **Date**: 2025-11-01
- **Author**: PRD Creator Agent
- **Status**: Draft
- **Target Release**: 2025 Q4

## 1. Overview

### Purpose
Enable users to create, view, edit, and delete recurring calendar events with configurable repeat patterns (daily, weekly, monthly, yearly) to reduce manual data entry and improve productivity when managing repetitive events.

### Value Proposition
- **User Benefit**: Users can create recurring events once instead of manually creating dozens of individual events, reducing time spent on calendar management by up to 90% for repetitive tasks (e.g., weekly meetings, monthly reviews)
- **Business Value**: Increases application utility and user engagement by supporting a fundamental calendar feature expected in modern scheduling applications
- **Competitive Parity**: Matches standard functionality found in Google Calendar, Outlook, and other mainstream calendar applications

### Scope
**In Scope:**
- Creation of recurring events with four repeat types: daily, weekly, monthly, yearly
- Specification of repeat end date (required, maximum 2025-12-31)
- Visual differentiation of recurring events in calendar view via icon indicator
- Editing individual instances or entire recurring series
- Deleting individual instances or entire recurring series
- Special date handling for edge cases (monthly on 31st, yearly on February 29th)
- Exemption of recurring events from overlap detection logic

**Out of Scope:**
- Custom repeat intervals (e.g., every 2 weeks, every 3 months)
- Advanced repeat patterns (e.g., "first Monday of each month", "last Friday of quarter")
- Repeat end conditions other than specific date (e.g., after N occurrences, never)
- Modification of past event instances
- Recurring event templates or presets
- Timezone-aware recurrence calculations
- Recurring event exception dates (excluding specific dates from series)

### Success Metrics
- **Functional Success**: 100% of recurring event test scenarios pass acceptance criteria
- **User Adoption**: Recurring events comprise ≥30% of total events created within 30 days post-launch
- **Error Reduction**: <1% of recurring event creations result in incorrect date generation
- **Performance**: Generating 365 daily recurring events completes within 2 seconds
- **User Satisfaction**: ≥90% of users successfully create recurring events without errors on first attempt

## 2. User Stories

### US-001: Create Daily Recurring Event (Must-have)
As a calendar user, I want to create an event that repeats every day until a specified end date, so that I can track daily standup meetings without creating 365 individual events.

**Acceptance Criteria:**
- User selects "매일" (daily) repeat type from dropdown
- User specifies required end date (maximum 2025-12-31)
- System generates individual event instances for each day from start date through end date inclusive
- Each generated event instance displays repeat icon in calendar view

### US-002: Create Weekly Recurring Event (Must-have)
As a calendar user, I want to create an event that repeats every week on the same day of the week until a specified end date, so that I can schedule weekly team meetings.

**Acceptance Criteria:**
- User selects "매주" (weekly) repeat type from dropdown
- System generates events on the same day of the week (e.g., every Monday)
- End date specification required (maximum 2025-12-31)
- Generated events span from start date through end date

### US-003: Create Monthly Recurring Event (Must-have)
As a calendar user, I want to create an event that repeats every month on the same day of the month until a specified end date, so that I can schedule monthly reviews on the 15th of each month.

**Acceptance Criteria:**
- User selects "매월" (monthly) repeat type from dropdown
- System generates events on the same day number of each month
- If day number does not exist in a month (e.g., 31st in February), NO event is created for that month
- End date specification required (maximum 2025-12-31)

### US-004: Create Monthly Recurring Event on 31st (Must-have)
As a calendar user, I want to create a monthly recurring event on the 31st, so that only months with 31 days generate event instances (not the last day of shorter months).

**Acceptance Criteria:**
- User creates recurring event with start date on any 31st (e.g., January 31)
- User selects "매월" (monthly) repeat type
- System generates events ONLY on the 31st of months that have 31 days (January, March, May, July, August, October, December)
- System does NOT generate events for months with fewer than 31 days (February, April, June, September, November)

### US-005: Create Yearly Recurring Event on Leap Day (Must-have)
As a calendar user, I want to create a yearly recurring event on February 29th, so that the event only appears on actual leap years (not on February 28th in non-leap years).

**Acceptance Criteria:**
- User creates recurring event with start date February 29, 2024 (or any leap year)
- User selects "매년" (yearly) repeat type
- System generates events ONLY on February 29th in leap years
- System does NOT generate events on February 28th in non-leap years
- System does NOT generate events in non-leap years at all for this date

### US-006: Visually Identify Recurring Events (Must-have)
As a calendar user, I want to see a visual indicator on recurring events in the calendar view, so that I can quickly distinguish between single and recurring events.

**Acceptance Criteria:**
- All event instances belonging to a recurring series display a repeat icon
- Icon is visible in all calendar views (month, week)
- Icon appears consistently across all event instances in the series
- Single events (repeat type 'none') do NOT display the repeat icon

### US-007: Specify Recurring Event End Date (Must-have)
As a calendar user, I want to specify when a recurring event series should end, so that I can limit events to a specific time period (e.g., academic semester, project duration).

**Acceptance Criteria:**
- End date field is required when repeat type is not 'none'
- End date MUST be after or equal to start date
- End date MUST NOT exceed 2025-12-31
- Date picker enforces maximum date constraint
- System validates end date before event creation
- Invalid end date displays error message: "반복 종료 날짜는 시작 날짜 이후이며 2025-12-31 이전이어야 합니다"

### US-008: Edit Single Instance of Recurring Event (Must-have)
As a calendar user, I want to edit only one instance of a recurring event without affecting other instances, so that I can change the time of next week's meeting without altering future meetings.

**Acceptance Criteria:**
- User clicks edit on a recurring event instance
- System displays confirmation dialog: "해당 일정만 수정하시겠어요?"
- User selects "예" (Yes)
- System converts the single instance to standalone event (repeat.type = 'none')
- Edited event NO LONGER displays repeat icon
- Other instances in the series remain unchanged
- Other instances retain repeat icon

### US-009: Edit Entire Recurring Series (Must-have)
As a calendar user, I want to edit all instances of a recurring event simultaneously, so that I can change the weekly team meeting time for all future meetings at once.

**Acceptance Criteria:**
- User clicks edit on a recurring event instance
- System displays confirmation dialog: "해당 일정만 수정하시겠어요?"
- User selects "아니오" (No)
- System updates ALL instances sharing the same repeat.id
- All instances retain recurring event properties (repeat.type, repeat.endDate)
- All instances continue to display repeat icon
- Changes include: title, time, description, location, category, notificationTime

### US-010: Delete Single Instance of Recurring Event (Must-have)
As a calendar user, I want to delete only one instance of a recurring event without affecting other instances, so that I can remove a cancelled meeting from a recurring series.

**Acceptance Criteria:**
- User clicks delete on a recurring event instance
- System displays confirmation dialog: "해당 일정만 삭제하시겠어요?"
- User selects "예" (Yes)
- System deletes ONLY the selected event instance
- Other instances in the series remain unchanged
- Series count decreases by 1

### US-011: Delete Entire Recurring Series (Must-have)
As a calendar user, I want to delete all instances of a recurring event simultaneously, so that I can remove a cancelled weekly meeting series completely.

**Acceptance Criteria:**
- User clicks delete on a recurring event instance
- System displays confirmation dialog: "해당 일정만 삭제하시겠어요?"
- User selects "아니오" (No)
- System deletes ALL instances sharing the same repeat.id
- All instances are removed from calendar view
- No instances remain in the database

### US-012: Recurring Events Bypass Overlap Detection (Must-have)
As a calendar user, I want to create recurring events without overlap validation, so that I can schedule recurring events even if they coincide with existing events.

**Acceptance Criteria:**
- User creates recurring event that overlaps with existing events
- System does NOT display overlap warning
- System does NOT prevent event creation due to overlap
- All recurring event instances are created successfully
- Overlap detection logic is bypassed for all repeat types except 'none'

## 3. Functional Requirements

### FR-001: Repeat Type Selection in Event Form
**Priority**: Must-have

The event creation/editing form MUST include a repeat type selector.

- **UI Component**: Dropdown select element with label "반복 유형"
- **Options**:
  - Value: 'none', Label: "반복 안함" (default selected)
  - Value: 'daily', Label: "매일"
  - Value: 'weekly', Label: "매주"
  - Value: 'monthly', Label: "매월"
  - Value: 'yearly', Label: "매년"
- **Data Model**: Sets `repeat.type` field in Event/EventForm interface
- **Behavior**: Selection change triggers conditional display of repeat end date field

### FR-002: Repeat End Date Field
**Priority**: Must-have

When repeat type is not 'none', the form MUST display and require a repeat end date field.

- **UI Component**: Material-UI DatePicker with label "반복 종료"
- **Display Condition**: Visible only when `repeat.type !== 'none'`
- **Required Validation**: Field is required when repeat type is not 'none'
- **Format**: YYYY-MM-DD (ISO 8601 date format)
- **Minimum Value**: Start date of the event (repeat.endDate >= event.date)
- **Maximum Value**: 2025-12-31 (hard constraint)
- **Data Model**: Sets `repeat.endDate` field in Event/EventForm interface
- **Error Messages**:
  - Empty when required: "반복 종료 날짜를 선택해주세요"
  - Before start date: "반복 종료 날짜는 시작 날짜 이후여야 합니다"
  - After 2025-12-31: "반복 종료 날짜는 2025-12-31 이전이어야 합니다"

### FR-003: Recurring Event Generation - Daily
**Priority**: Must-have

When creating/updating an event with repeat type 'daily', the system MUST generate individual event instances for each day.

- **Algorithm**: For each date D from start date through end date (inclusive), create event instance on date D
- **Interval**: Exactly 1 day between consecutive events
- **Instance Count**: (end date - start date) + 1 days
- **Shared Identifier**: All instances MUST have identical `repeat.id` value (UUID format)
- **Individual Identifier**: Each instance MUST have unique `id` value
- **Date Format**: Each instance's `date` field uses YYYY-MM-DD format
- **API Endpoint**: POST /api/events-list with array of EventForm objects
- **Example**: Start: 2025-10-01, End: 2025-10-03 generates events on 2025-10-01, 2025-10-02, 2025-10-03 (3 events)

### FR-004: Recurring Event Generation - Weekly
**Priority**: Must-have

When creating/updating an event with repeat type 'weekly', the system MUST generate individual event instances every 7 days.

- **Algorithm**: For each date D = start date + (N * 7 days) where D <= end date, create event instance on date D
- **Interval**: Exactly 7 days between consecutive events
- **Day Preservation**: All instances occur on the same day of the week as the start date (e.g., if start is Monday, all instances are Mondays)
- **Shared Identifier**: All instances MUST have identical `repeat.id` value
- **Individual Identifier**: Each instance MUST have unique `id` value
- **API Endpoint**: POST /api/events-list with array of EventForm objects
- **Example**: Start: 2025-10-01 (Wednesday), End: 2025-10-22 generates events on 2025-10-01, 2025-10-08, 2025-10-15, 2025-10-22 (4 events)

### FR-005: Recurring Event Generation - Monthly
**Priority**: Must-have

When creating/updating an event with repeat type 'monthly', the system MUST generate individual event instances on the same day number of each month.

- **Algorithm**: For each month M from start month through end month, IF month M has day number D (where D is the day number of start date), create event instance on M-D
- **Day Number Preservation**: All instances occur on the same day number (1-31) as the start date
- **Missing Day Handling**: If a month does not have the required day number, NO event is created for that month (e.g., February never has day 30 or 31)
- **Shared Identifier**: All instances MUST have identical `repeat.id` value
- **Individual Identifier**: Each instance MUST have unique `id` value
- **API Endpoint**: POST /api/events-list with array of EventForm objects
- **Example 1**: Start: 2025-01-31, End: 2025-05-31 generates events on 2025-01-31, 2025-03-31, 2025-05-31 (3 events, skips Feb and Apr)
- **Example 2**: Start: 2025-01-15, End: 2025-04-15 generates events on 2025-01-15, 2025-02-15, 2025-03-15, 2025-04-15 (4 events)

### FR-006: Recurring Event Generation - Yearly
**Priority**: Must-have

When creating/updating an event with repeat type 'yearly', the system MUST generate individual event instances on the same month and day each year.

- **Algorithm**: For each year Y from start year through end year, IF date M-D exists in year Y (where M-D is the month-day of start date), create event instance on Y-M-D
- **Month-Day Preservation**: All instances occur on the same month and day as the start date
- **Leap Day Handling**: If start date is February 29, events are created ONLY in leap years (2024, 2028, etc.), NOT in non-leap years
- **Shared Identifier**: All instances MUST have identical `repeat.id` value
- **Individual Identifier**: Each instance MUST have unique `id` value
- **API Endpoint**: POST /api/events-list with array of EventForm objects
- **Example 1**: Start: 2024-02-29, End: 2028-02-29 generates events on 2024-02-29, 2028-02-29 (2 events, skips 2025, 2026, 2027)
- **Example 2**: Start: 2025-06-15, End: 2027-06-15 generates events on 2025-06-15, 2026-06-15 (2 events)

### FR-007: Repeat Identifier (repeat.id) Assignment
**Priority**: Must-have

All events in a recurring series MUST share a common repeat identifier to enable series-wide operations.

- **Field Name**: `repeat.id` (addition to RepeatInfo interface in src/types.ts)
- **Data Type**: String (UUID format, RFC 4122 compliant)
- **Generation**: Server-side using Node.js `crypto.randomUUID()`
- **Uniqueness**: Each recurring series has a globally unique `repeat.id`
- **Single Events**: Events with `repeat.type = 'none'` SHOULD NOT have `repeat.id` (undefined or null)
- **Series Membership**: All events with identical `repeat.id` belong to the same recurring series
- **Immutability**: `repeat.id` MUST NOT change after series creation (except when converting to single event)

### FR-008: Visual Indicator for Recurring Events
**Priority**: Must-have

The calendar view MUST display a visual icon to distinguish recurring events from single events.

- **Display Condition**: Icon displayed when `event.repeat.type !== 'none'`
- **Icon Component**: Material-UI RepeatIcon or equivalent
- **Icon Position**: Adjacent to event title within event card/cell
- **Icon Size**: 16x16 pixels
- **Icon Color**: Inherits from theme or uses neutral color (e.g., rgba(0, 0, 0, 0.6))
- **Accessibility**: Icon MUST have aria-label="반복 일정"
- **Views**: Icon displayed in both month view and week view
- **Hover Behavior**: Optional tooltip showing repeat pattern (e.g., "매주 반복")

### FR-009: Edit Confirmation Dialog for Recurring Events
**Priority**: Must-have

When a user attempts to edit a recurring event, the system MUST display a confirmation dialog to choose between editing single instance or entire series.

- **Trigger Condition**: Dialog displayed when editing event where `repeat.type !== 'none'`
- **Dialog Title**: "반복 일정 수정"
- **Dialog Content**: "해당 일정만 수정하시겠어요?"
- **Action Buttons**:
  - **Primary Button**: "예" (Yes) - Edit single instance only
  - **Secondary Button**: "아니오" (No) - Edit entire series
  - **Cancel Button**: "취소" - Close dialog without editing
- **Keyboard Navigation**: Enter key confirms primary action, Escape key cancels
- **Single Events**: Dialog MUST NOT appear for events with `repeat.type = 'none'`

### FR-010: Edit Single Instance of Recurring Event
**Priority**: Must-have

When user chooses to edit a single instance, the system MUST convert that instance to a standalone event.

- **Precondition**: User selected "예" (Yes) in edit confirmation dialog
- **Data Transformation**:
  - Set `repeat.type = 'none'`
  - Remove or nullify `repeat.id`
  - Set `repeat.interval = 1`
  - Remove or nullify `repeat.endDate`
  - Preserve all other fields (title, date, time, description, location, category, notificationTime)
- **API Endpoint**: PUT /api/events/:id with modified event data
- **Visual Change**: Repeat icon MUST disappear from edited event
- **Series Integrity**: Other events in series MUST remain unchanged
- **Success Notification**: "일정이 수정되었습니다." (standard edit message)

### FR-011: Edit Entire Recurring Series
**Priority**: Must-have

When user chooses to edit entire series, the system MUST update all instances sharing the same repeat.id.

- **Precondition**: User selected "아니오" (No) in edit confirmation dialog
- **Data Transformation**:
  - Update modifiable fields for ALL events with matching `repeat.id`
  - Modifiable fields: title, startTime, endTime, description, location, category, notificationTime
  - Preserve immutable fields: id (unique per instance), date (unique per instance), repeat.type, repeat.interval, repeat.endDate, repeat.id
- **API Endpoint**: PUT /api/recurring-events/:repeatId with updated event data
- **Server Behavior**: Server iterates through all events with `repeat.id = :repeatId` and updates modifiable fields
- **Response**: Returns count of updated events or array of updated events
- **Visual Preservation**: Repeat icon MUST remain visible on all instances
- **Success Notification**: "반복 일정 전체가 수정되었습니다."
- **Date Preservation**: Each instance retains its original date (do NOT regenerate dates)

### FR-012: Delete Confirmation Dialog for Recurring Events
**Priority**: Must-have

When a user attempts to delete a recurring event, the system MUST display a confirmation dialog to choose between deleting single instance or entire series.

- **Trigger Condition**: Dialog displayed when deleting event where `repeat.type !== 'none'`
- **Dialog Title**: "반복 일정 삭제"
- **Dialog Content**: "해당 일정만 삭제하시겠어요?"
- **Action Buttons**:
  - **Primary Button**: "예" (Yes) - Delete single instance only
  - **Secondary Button**: "아니오" (No) - Delete entire series
  - **Cancel Button**: "취소" - Close dialog without deleting
- **Keyboard Navigation**: Enter key confirms primary action, Escape key cancels
- **Single Events**: Dialog MUST NOT appear for events with `repeat.type = 'none'`

### FR-013: Delete Single Instance of Recurring Event
**Priority**: Must-have

When user chooses to delete a single instance, the system MUST delete only that specific event.

- **Precondition**: User selected "예" (Yes) in delete confirmation dialog
- **API Endpoint**: DELETE /api/events/:id
- **Server Behavior**: Delete event with specified id only
- **Series Integrity**: Other events in series MUST remain unchanged
- **Success Notification**: "일정이 삭제되었습니다." (standard delete message)
- **Calendar Update**: Deleted event disappears from view, other instances remain

### FR-014: Delete Entire Recurring Series
**Priority**: Must-have

When user chooses to delete entire series, the system MUST delete all instances sharing the same repeat.id.

- **Precondition**: User selected "아니오" (No) in delete confirmation dialog
- **API Endpoint**: DELETE /api/recurring-events/:repeatId
- **Server Behavior**: Delete all events where `repeat.id = :repeatId`
- **Response**: Returns count of deleted events
- **Success Notification**: "반복 일정 전체가 삭제되었습니다."
- **Calendar Update**: All instances disappear from calendar view

### FR-015: Bypass Overlap Detection for Recurring Events
**Priority**: Must-have

Recurring events MUST NOT trigger overlap validation during creation or editing.

- **Implementation Location**: Event validation logic in useEventForm or equivalent
- **Condition**: Skip overlap detection when `repeat.type !== 'none'`
- **Single Event Behavior**: Overlap detection MUST still apply for `repeat.type = 'none'`
- **Rationale**: Recurring events (e.g., daily standups) frequently overlap by design and should not be blocked
- **User Experience**: No overlap warning dialog for recurring events
- **Database**: Allow saving overlapping recurring events without error

### FR-016: Event Form State Management
**Priority**: Must-have

The event form MUST maintain proper state for repeat-related fields.

- **Initial State** (creation mode):
  - `repeat.type = 'none'`
  - `repeat.interval = 1`
  - `repeat.endDate = undefined`
  - `repeat.id = undefined`
- **Initial State** (edit mode, single event):
  - Load existing event's repeat values
- **Initial State** (edit mode, recurring event):
  - Load from first instance or any instance in series
- **Conditional Display**:
  - Repeat end date field visible only when `repeat.type !== 'none'`
- **Validation Triggers**:
  - On submit button click
  - On end date change (if repeat type is not 'none')
  - On repeat type change (validate end date if newly required)

### FR-017: Server-Side Event Storage
**Priority**: Must-have

The backend server MUST store recurring events as individual instances in the JSON database.

- **Storage Model**: Each recurring event instance is a separate Event object in the events array
- **Database File**: `src/__mocks__/response/realEvents.json` (production) or `src/__mocks__/response/e2e.json` (test)
- **Shared Fields**: All instances in a series have identical `repeat.id`
- **Unique Fields**: Each instance has unique `id` and `date`
- **ID Generation**: Server generates unique `id` using `crypto.randomUUID()` for each instance
- **No Meta-Series Object**: Do NOT create a separate "recurring event template" object
- **Query Pattern**: To find all instances in a series, query events where `repeat.id = targetRepeatId`

### FR-018: Backend API - Create Recurring Events
**Priority**: Must-have

The backend MUST provide an endpoint to create multiple event instances in a single request.

- **Endpoint**: POST /api/events-list
- **Request Body**: JSON array of EventForm objects (without id fields)
- **Request Validation**:
  - Body MUST be an array
  - Each element MUST conform to EventForm interface
  - All elements SHOULD have identical `repeat.id` (for recurring series)
- **Server Processing**:
  - For each EventForm in array, generate unique `id` using `crypto.randomUUID()`
  - Append all events to database array
  - Write to disk (realEvents.json or e2e.json depending on TEST_ENV)
- **Response**: 201 Created with JSON `{ events: Event[] }` containing all created events with assigned ids
- **Error Handling**: 400 Bad Request if validation fails, 500 Internal Server Error if write fails

### FR-019: Backend API - Update Recurring Series
**Priority**: Must-have

The backend MUST provide an endpoint to update all events in a recurring series.

- **Endpoint**: PUT /api/recurring-events/:repeatId
- **URL Parameter**: `:repeatId` - the repeat.id of the series to update
- **Request Body**: Partial Event object with fields to update (title, startTime, endTime, description, location, category, notificationTime)
- **Server Processing**:
  - Find all events where `repeat.id = :repeatId`
  - For each matched event, update specified fields
  - Preserve immutable fields (id, date, repeat.type, repeat.id, repeat.interval, repeat.endDate)
  - Write updated database to disk
- **Response**: 200 OK with JSON `{ updatedCount: number, events: Event[] }`
- **Error Handling**:
  - 404 Not Found if no events have matching repeatId
  - 400 Bad Request if request body is invalid
  - 500 Internal Server Error if write fails

### FR-020: Backend API - Delete Recurring Series
**Priority**: Must-have

The backend MUST provide an endpoint to delete all events in a recurring series.

- **Endpoint**: DELETE /api/recurring-events/:repeatId
- **URL Parameter**: `:repeatId` - the repeat.id of the series to delete
- **Server Processing**:
  - Filter out all events where `repeat.id = :repeatId`
  - Write updated database (without filtered events) to disk
- **Response**: 200 OK with JSON `{ deletedCount: number }`
- **Error Handling**:
  - 404 Not Found if no events have matching repeatId
  - 500 Internal Server Error if write fails

## 4. Non-Functional Requirements

### NFR-001: Performance - Event Generation
**Priority**: Must-have

Recurring event generation MUST complete within acceptable time limits to ensure responsive user experience.

- **Daily Events**: Generating 365 daily events (1 year) MUST complete within 2 seconds (server processing + database write)
- **Weekly Events**: Generating 52 weekly events (1 year) MUST complete within 1 second
- **Monthly Events**: Generating 12 monthly events (1 year) MUST complete within 500 milliseconds
- **Yearly Events**: Generating 10 yearly events MUST complete within 500 milliseconds
- **Measurement Point**: Time from POST request received to response sent (server-side)
- **Test Environment**: Standard development machine (not production-optimized)

### NFR-002: Performance - Series Update
**Priority**: Should-have

Updating an entire recurring series MUST complete within acceptable time limits.

- **Update Time**: Updating all instances in a 365-event series MUST complete within 3 seconds
- **Measurement Point**: Time from PUT request received to response sent
- **Scale**: Performance MUST NOT degrade significantly for series up to 500 events

### NFR-003: Performance - Series Delete
**Priority**: Should-have

Deleting an entire recurring series MUST complete within acceptable time limits.

- **Delete Time**: Deleting all instances in a 365-event series MUST complete within 2 seconds
- **Measurement Point**: Time from DELETE request received to response sent

### NFR-004: Data Integrity - Repeat ID Uniqueness
**Priority**: Must-have

Repeat IDs MUST be globally unique to prevent accidental cross-series operations.

- **Format**: UUID v4 (RFC 4122) generated by `crypto.randomUUID()`
- **Collision Probability**: Acceptable collision rate <1 in 1 billion
- **Validation**: Server MUST generate repeat.id, clients MUST NOT generate or override
- **Database Constraint**: No database-level uniqueness constraint (repeat.id is shared within series)

### NFR-005: Data Integrity - Individual Event ID Uniqueness
**Priority**: Must-have

Each event instance MUST have a globally unique id to enable individual operations.

- **Format**: UUID v4 (RFC 4122) generated by `crypto.randomUUID()`
- **Uniqueness**: All event ids MUST be unique across entire database
- **Generation**: Server-side only during event creation
- **Immutability**: Event id MUST NOT change after creation

### NFR-006: Browser Compatibility
**Priority**: Must-have

Recurring event UI components MUST function correctly in supported browsers.

- **Supported Browsers**:
  - Chrome/Edge ≥90
  - Firefox ≥88
  - Safari ≥14
- **Date Picker**: Material-UI DatePicker MUST render correctly in all supported browsers
- **Dialog Modals**: Edit/delete confirmation dialogs MUST display and function correctly
- **Icons**: Repeat icons MUST render correctly (SVG support required)

### NFR-007: Accessibility - Keyboard Navigation
**Priority**: Should-have

All recurring event UI interactions MUST be accessible via keyboard.

- **Form Fields**: Tab key navigates through repeat type dropdown and end date picker
- **Dialogs**: Tab key navigates through dialog action buttons
- **Dialog Confirmation**: Enter key confirms primary action (Yes), Escape key cancels
- **Date Picker**: Keyboard date entry and arrow key navigation supported
- **Focus Management**: Focus returns to triggering element after dialog close

### NFR-008: Accessibility - Screen Reader
**Priority**: Should-have

Recurring event features MUST be usable with screen readers.

- **Repeat Icon**: MUST have `aria-label="반복 일정"`
- **Repeat Type Dropdown**: MUST have associated `<label>` element
- **End Date Field**: MUST have associated `<label>` element
- **Dialog Announcements**: Dialog title and content MUST be announced when dialog opens
- **Error Messages**: Validation errors MUST be announced and associated with fields via `aria-describedby`

### NFR-009: Testability - Unit Test Coverage
**Priority**: Must-have

Recurring event logic MUST achieve high test coverage to ensure correctness.

- **Utility Functions**: ≥95% code coverage for date generation utilities (daily, weekly, monthly, yearly)
- **Edge Cases**: 100% coverage of special cases (monthly 31st, yearly Feb 29)
- **API Handlers**: ≥90% coverage of backend endpoints
- **Test Framework**: Vitest with jsdom environment (as per existing setup)

### NFR-010: Testability - Integration Tests
**Priority**: Must-have

End-to-end user flows MUST be covered by integration tests.

- **Test Scenarios**:
  - Create recurring event (all 4 types)
  - Edit single instance (converts to single event)
  - Edit entire series (preserves recurrence)
  - Delete single instance (preserves series)
  - Delete entire series (removes all)
  - Monthly 31st edge case validation
  - Yearly Feb 29 edge case validation
- **Test Data**: Use `src/__mocks__/response/e2e.json` for test data
- **MSW**: Mock API responses using handlers in `src/__mocks__/handlers.ts`

### NFR-011: Maintainability - Code Organization
**Priority**: Should-have

Recurring event code MUST follow existing project architecture patterns.

- **Utilities**: Date generation logic in `src/utils/eventUtils.ts` or new `src/utils/recurringEventUtils.ts`
- **Type Definitions**: Update `src/types.ts` to add `id` field to RepeatInfo interface
- **Hooks**: Extend `useEventOperations.ts` to handle recurring event API calls
- **Components**: Confirmation dialogs in separate component files under `src/components/`
- **Naming Conventions**: camelCase for files, PascalCase for React components

### NFR-012: Maintainability - Type Safety
**Priority**: Must-have

All recurring event code MUST use TypeScript with strict type checking.

- **No `any` Types**: Explicit types required for all function parameters and return values
- **Interface Compliance**: All Event and EventForm objects MUST conform to type definitions
- **Type Guards**: Use type guards when checking `repeat.type` values
- **Enum Safety**: RepeatType MUST remain a string union type (not enum) for JSON compatibility

### NFR-013: Error Handling - User-Facing Errors
**Priority**: Must-have

All error scenarios MUST provide clear, actionable user feedback in Korean.

- **Error Display**: Use notistack enqueueSnackbar with variant 'error'
- **Network Failures**: "네트워크 오류가 발생했습니다. 다시 시도해주세요."
- **Validation Errors**: Specific field-level error messages (see FR-002)
- **Server Errors**: "일정 처리 중 오류가 발생했습니다."
- **No Technical Details**: Error messages MUST NOT expose stack traces or internal errors to users

### NFR-014: Error Handling - Server Errors
**Priority**: Must-have

Backend MUST handle error conditions gracefully and log for debugging.

- **Logging**: Console.error for all caught exceptions with stack traces
- **Response Format**: JSON error responses with `{ error: string }` structure
- **Status Codes**:
  - 400: Client validation errors
  - 404: Resource not found (repeatId does not exist)
  - 500: Server-side errors (file write failures, unexpected exceptions)
- **Database Integrity**: Wrap file writes in try-catch to prevent partial writes

### NFR-015: Localization
**Priority**: Must-have

All user-facing text related to recurring events MUST be in Korean.

- **Form Labels**: "반복 유형", "반복 종료"
- **Repeat Options**: "반복 안함", "매일", "매주", "매월", "매년"
- **Dialogs**: "해당 일정만 수정하시겠어요?", "해당 일정만 삭제하시겠어요?"
- **Notifications**: "반복 일정 전체가 수정되었습니다", "반복 일정 전체가 삭제되었습니다"
- **Error Messages**: All validation and error messages in Korean
- **Accessibility Labels**: "반복 일정" (repeat icon aria-label)

## 5. User Interface Requirements

### UI-001: Event Form - Repeat Type Dropdown
**Component Type**: Material-UI Select

**Layout:**
- Position: Below category field, above notification time field
- Label: "반복 유형" (displayed above dropdown)
- Width: Full width of form (matches other form fields)

**Options (in order):**
1. "반복 안함" (value: 'none') - default selected
2. "매일" (value: 'daily')
3. "매주" (value: 'weekly')
4. "매월" (value: 'monthly')
5. "매년" (value: 'yearly')

**Behavior:**
- Single selection only
- On change, triggers validation and conditional display of end date field
- Stores value in `event.repeat.type`

**Accessibility:**
- `<label htmlFor="repeat-type">반복 유형</label>`
- `<select id="repeat-type" aria-required="false">`

### UI-002: Event Form - Repeat End Date Picker
**Component Type**: Material-UI DatePicker

**Layout:**
- Position: Directly below repeat type dropdown
- Label: "반복 종료" (displayed above picker)
- Width: Full width of form
- Display Condition: Visible only when `repeat.type !== 'none'`

**Configuration:**
- Format: YYYY-MM-DD
- Min Date: Event start date (`event.date`)
- Max Date: 2025-12-31 (hard-coded)
- Disabled Dates: Dates before start date
- Placeholder: "종료 날짜 선택"

**Behavior:**
- Opens calendar popup on click
- Validates on blur and on submit
- Stores value in `event.repeat.endDate`

**Error Display:**
- Below the date picker field
- Red text (error color from theme)
- Appears immediately on validation failure

**Accessibility:**
- `<label htmlFor="repeat-end-date">반복 종료</label>`
- `<input id="repeat-end-date" aria-required="true" aria-describedby="repeat-end-error">`
- `<span id="repeat-end-error" role="alert">{error message}</span>`

### UI-003: Calendar View - Recurring Event Icon
**Component Type**: Material-UI Icon (RepeatIcon or similar)

**Layout:**
- Position: Left of event title text within event card/cell
- Size: 16x16 pixels
- Spacing: 4px margin-right from title text

**Display Condition:**
- Visible when `event.repeat.type !== 'none'`
- Hidden when `event.repeat.type === 'none'`

**Styling:**
- Color: rgba(0, 0, 0, 0.6) or theme secondary color
- Vertical Alignment: Center-aligned with title text

**Accessibility:**
- `aria-label="반복 일정"`
- `role="img"`

**Optional Enhancement:**
- Tooltip on hover showing repeat pattern: "매일 반복", "매주 반복", "매월 반복", "매년 반복"

### UI-004: Edit Confirmation Dialog
**Component Type**: Material-UI Dialog

**Trigger:**
- Opens when user clicks edit button on event where `repeat.type !== 'none'`

**Dialog Structure:**
```
┌─────────────────────────────────────────┐
│ 반복 일정 수정                          │  (Dialog Title)
├─────────────────────────────────────────┤
│ 해당 일정만 수정하시겠어요?              │  (Dialog Content)
│                                         │
│  [취소]  [아니오]  [예]                │  (Actions)
└─────────────────────────────────────────┘
```

**Button Specifications:**
- **취소 (Cancel)**: Text button, secondary color, closes dialog without action
- **아니오 (No)**: Contained button, primary color, edits entire series
- **예 (Yes)**: Contained button, primary color, edits single instance

**Behavior:**
- Click outside dialog: Does NOT close (require explicit button click)
- Escape key: Closes dialog without action
- Enter key: Confirms "예" (primary action)

**Accessibility:**
- `aria-labelledby="edit-dialog-title"`
- `aria-describedby="edit-dialog-description"`
- Focus trap within dialog
- Focus returns to edit button on close

### UI-005: Delete Confirmation Dialog
**Component Type**: Material-UI Dialog

**Trigger:**
- Opens when user clicks delete button on event where `repeat.type !== 'none'`

**Dialog Structure:**
```
┌─────────────────────────────────────────┐
│ 반복 일정 삭제                          │  (Dialog Title)
├─────────────────────────────────────────┤
│ 해당 일정만 삭제하시겠어요?              │  (Dialog Content)
│                                         │
│  [취소]  [아니오]  [예]                │  (Actions)
└─────────────────────────────────────────┘
```

**Button Specifications:**
- **취소 (Cancel)**: Text button, secondary color, closes dialog without action
- **아니오 (No)**: Contained button, error/red color, deletes entire series
- **예 (Yes)**: Contained button, error/red color, deletes single instance

**Behavior:**
- Click outside dialog: Does NOT close (require explicit button click)
- Escape key: Closes dialog without action
- Enter key: Confirms "예" (primary action)

**Accessibility:**
- `aria-labelledby="delete-dialog-title"`
- `aria-describedby="delete-dialog-description"`
- Focus trap within dialog
- Focus returns to delete button on close

### UI-006: Event Form - Validation Feedback

**Real-time Validation:**
- Repeat end date validates on blur (when user leaves field)
- Repeat end date validates on submit button click

**Error State Styling:**
- Invalid field: Red border (error color from theme)
- Error message: Red text below field
- Error icon: Optional red warning icon in field

**Success State:**
- Valid field: No special styling (default state)
- No success message needed

**Submit Button State:**
- Disabled when form has validation errors
- Enabled only when all required fields valid

## 6. Acceptance Criteria

### AC-001: Create Daily Recurring Event
**Given** a user is creating a new event
**When** the user selects repeat type "매일" and sets end date to 2025-10-07 with start date 2025-10-01
**Then** the system MUST:
- [ ] Create 7 individual event instances (one per day from Oct 1-7)
- [ ] Assign identical `repeat.id` to all 7 instances
- [ ] Assign unique `id` to each instance
- [ ] Set `repeat.type = 'daily'` on all instances
- [ ] Display repeat icon on all 7 instances in calendar view
- [ ] Complete creation within 2 seconds

### AC-002: Create Monthly Recurring Event on 31st
**Given** a user is creating a new event with start date 2025-01-31
**When** the user selects repeat type "매월" and sets end date to 2025-12-31
**Then** the system MUST:
- [ ] Create events ONLY on: Jan 31, Mar 31, May 31, Jul 31, Aug 31, Oct 31, Dec 31 (7 events)
- [ ] NOT create events in: Feb, Apr, Jun, Sep, Nov (months with <31 days)
- [ ] All instances share same `repeat.id`
- [ ] All instances display repeat icon

### AC-003: Create Yearly Recurring Event on Feb 29
**Given** a user is creating a new event with start date 2024-02-29 (leap year)
**When** the user selects repeat type "매년" and sets end date to 2028-02-29
**Then** the system MUST:
- [ ] Create events ONLY on: 2024-02-29, 2028-02-29 (2 events)
- [ ] NOT create events in: 2025, 2026, 2027 (non-leap years)
- [ ] All instances share same `repeat.id`
- [ ] All instances display repeat icon

### AC-004: Repeat End Date Validation - Missing
**Given** a user is creating a new event
**When** the user selects repeat type "매주" and leaves end date empty
**Then** the system MUST:
- [ ] Display error message: "반복 종료 날짜를 선택해주세요"
- [ ] Prevent form submission
- [ ] Highlight end date field with error styling
- [ ] Keep submit button disabled

### AC-005: Repeat End Date Validation - Before Start Date
**Given** a user is creating a new event with start date 2025-10-15
**When** the user selects repeat type "매월" and sets end date to 2025-10-10
**Then** the system MUST:
- [ ] Display error message: "반복 종료 날짜는 시작 날짜 이후여야 합니다"
- [ ] Prevent form submission
- [ ] Highlight end date field with error styling

### AC-006: Repeat End Date Validation - After Max Date
**Given** a user is creating a new event
**When** the user selects repeat type "매년" and attempts to set end date to 2026-01-01
**Then** the system MUST:
- [ ] Display error message: "반복 종료 날짜는 2025-12-31 이전이어야 합니다"
- [ ] Prevent form submission
- [ ] Date picker SHOULD disable dates after 2025-12-31 (if possible)

### AC-007: Edit Single Instance of Recurring Event
**Given** a recurring weekly event series with 4 instances exists
**When** user clicks edit on 3rd instance, selects "예" in confirmation dialog, and changes title to "Updated Title"
**Then** the system MUST:
- [ ] Display confirmation dialog with text "해당 일정만 수정하시겠어요?"
- [ ] Update ONLY the 3rd instance with new title
- [ ] Set `repeat.type = 'none'` on the 3rd instance
- [ ] Remove `repeat.id` from the 3rd instance
- [ ] Hide repeat icon on 3rd instance only
- [ ] Keep other 3 instances unchanged with original title and repeat icon
- [ ] Show notification: "일정이 수정되었습니다."

### AC-008: Edit Entire Recurring Series
**Given** a recurring monthly event series with 12 instances exists
**When** user clicks edit on any instance, selects "아니오" in confirmation dialog, and changes time from 10:00 to 14:00
**Then** the system MUST:
- [ ] Display confirmation dialog with text "해당 일정만 수정하시겠어요?"
- [ ] Update ALL 12 instances with new time 14:00
- [ ] Preserve `repeat.type`, `repeat.id`, `repeat.endDate` on all instances
- [ ] Keep repeat icon visible on all 12 instances
- [ ] Preserve unique `date` field on each instance (do NOT change dates)
- [ ] Show notification: "반복 일정 전체가 수정되었습니다."
- [ ] Complete update within 3 seconds

### AC-009: Delete Single Instance of Recurring Event
**Given** a recurring daily event series with 30 instances exists
**When** user clicks delete on 15th instance and selects "예" in confirmation dialog
**Then** the system MUST:
- [ ] Display confirmation dialog with text "해당 일정만 삭제하시겠어요?"
- [ ] Delete ONLY the 15th instance
- [ ] Keep other 29 instances unchanged
- [ ] Remove 15th instance from calendar view
- [ ] Keep repeat icon on remaining 29 instances
- [ ] Show notification: "일정이 삭제되었습니다."

### AC-010: Delete Entire Recurring Series
**Given** a recurring weekly event series with 52 instances exists
**When** user clicks delete on any instance and selects "아니오" in confirmation dialog
**Then** the system MUST:
- [ ] Display confirmation dialog with text "해당 일정만 삭제하시겠어요?"
- [ ] Delete ALL 52 instances
- [ ] Remove all instances from calendar view
- [ ] Show notification: "반복 일정 전체가 삭제되었습니다."
- [ ] Complete deletion within 2 seconds

### AC-011: Recurring Event Bypasses Overlap Detection
**Given** an existing event on 2025-10-15 from 10:00-11:00
**When** user creates a daily recurring event from 2025-10-01 to 2025-10-31 also at 10:00-11:00
**Then** the system MUST:
- [ ] NOT display overlap warning dialog
- [ ] Create all 31 recurring event instances successfully
- [ ] Allow overlapping event on 2025-10-15 to exist alongside original event
- [ ] Display both events in calendar view on 2025-10-15

### AC-012: Single Event Still Checks Overlap
**Given** an existing event on 2025-10-20 from 14:00-15:00
**When** user creates a single event (repeat type "반복 안함") on 2025-10-20 from 14:00-15:00
**Then** the system MUST:
- [ ] Display overlap warning dialog (existing behavior)
- [ ] Prevent or warn about event creation based on existing overlap logic
- [ ] NOT create the overlapping single event without user confirmation

### AC-013: Recurring Event Icon Visibility
**Given** calendar view displays events for October 2025
**When** the view includes both single events and recurring events
**Then** the system MUST:
- [ ] Display repeat icon on all events where `repeat.type !== 'none'`
- [ ] NOT display repeat icon on events where `repeat.type = 'none'`
- [ ] Render icon with 16x16 pixel size
- [ ] Position icon to left of event title
- [ ] Include `aria-label="반복 일정"` on icon for accessibility

### AC-014: End Date Field Conditional Display
**Given** user is on event creation/edit form
**When** user changes repeat type from "반복 안함" to "매일"
**Then** the system MUST:
- [ ] Show the repeat end date field
- [ ] Mark the field as required
- [ ] Set focus to the end date field (optional UX enhancement)

**When** user changes repeat type from "매주" to "반복 안함"
**Then** the system MUST:
- [ ] Hide the repeat end date field
- [ ] Remove required validation from end date
- [ ] Clear any end date value from form state (optional)

### AC-015: Weekly Recurrence Day Preservation
**Given** user creates weekly recurring event starting on Friday 2025-10-03
**When** end date is set to 2025-10-31
**Then** the system MUST:
- [ ] Create events on: Oct 3, Oct 10, Oct 17, Oct 24, Oct 31 (5 Fridays)
- [ ] NOT create events on other days of the week
- [ ] All instances fall on Friday

### AC-016: API Response - Create Recurring Events
**Given** frontend sends POST to /api/events-list with 10 EventForm objects
**When** server processes the request successfully
**Then** the server MUST:
- [ ] Return HTTP 201 Created status
- [ ] Return JSON body: `{ events: Event[] }` with 10 Event objects
- [ ] Each returned Event has unique `id` field (UUID format)
- [ ] All returned Events have identical `repeat.id` field
- [ ] Write all 10 events to database file
- [ ] Complete request within 2 seconds

### AC-017: API Response - Update Recurring Series
**Given** a recurring series with `repeat.id = "abc-123"` containing 20 instances exists
**When** frontend sends PUT to /api/recurring-events/abc-123 with `{ title: "New Title" }`
**Then** the server MUST:
- [ ] Return HTTP 200 OK status
- [ ] Return JSON body: `{ updatedCount: 20, events: Event[] }`
- [ ] Update `title` field to "New Title" on all 20 instances
- [ ] Preserve all other fields on all instances
- [ ] Write updated database to disk
- [ ] Complete request within 3 seconds

### AC-018: API Response - Delete Recurring Series
**Given** a recurring series with `repeat.id = "xyz-789"` containing 15 instances exists
**When** frontend sends DELETE to /api/recurring-events/xyz-789
**Then** the server MUST:
- [ ] Return HTTP 200 OK status
- [ ] Return JSON body: `{ deletedCount: 15 }`
- [ ] Remove all 15 instances from database
- [ ] Write updated database to disk
- [ ] Complete request within 2 seconds

### AC-019: API Error - Invalid Repeat ID
**Given** no events exist with `repeat.id = "nonexistent"`
**When** frontend sends PUT to /api/recurring-events/nonexistent
**Then** the server MUST:
- [ ] Return HTTP 404 Not Found status
- [ ] Return JSON body: `{ error: "Recurring event series not found" }` or similar message

### AC-020: Form Validation - All Fields Valid
**Given** user fills out event creation form with:
- Title: "Team Meeting"
- Date: 2025-10-15
- Time: 10:00-11:00
- Repeat: "매주"
- End Date: 2025-12-31
**When** user clicks submit button
**Then** the system MUST:
- [ ] Enable submit button (no validation errors)
- [ ] Send POST to /api/events-list
- [ ] Display success notification after API response
- [ ] Close event form dialog
- [ ] Refresh calendar view showing new recurring events

## 7. Edge Cases and Error Scenarios

### EC-001: Monthly Recurrence - February
**Scenario**: User creates monthly recurring event on January 30
**Start Date**: 2025-01-30
**Repeat Type**: "매월"
**End Date**: 2025-04-30

**Expected Behavior**:
- System creates events on: Jan 30, Mar 30, Apr 30 (3 events)
- System does NOT create event on Feb 30 (date does not exist)
- No error displayed to user
- Series contains 3 events instead of 4

**Implementation Note**: Date validation logic MUST check `new Date(year, month, day)` validity before creating instance

### EC-002: Yearly Recurrence - Non-Leap Year Feb 29
**Scenario**: User creates yearly recurring event starting on leap day
**Start Date**: 2024-02-29
**Repeat Type**: "매년"
**End Date**: 2026-12-31

**Expected Behavior**:
- System creates event ONLY on 2024-02-29 (1 event)
- System does NOT create events in 2025 or 2026 (non-leap years)
- No error displayed to user
- Series contains 1 event instead of 3

**Implementation Note**: Leap year check required: `(year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)`

### EC-003: End Date Same as Start Date
**Scenario**: User creates recurring event where end date equals start date
**Start Date**: 2025-10-15
**Repeat Type**: "매일"
**End Date**: 2025-10-15

**Expected Behavior**:
- System creates exactly 1 event instance on 2025-10-15
- Event has `repeat.type = 'daily'` and displays repeat icon
- No validation error (end date >= start date is valid)
- Technically a "recurring series" of length 1

**User Education**: Consider adding info tooltip: "종료 날짜가 시작 날짜와 같으면 1개의 일정만 생성됩니다"

### EC-004: Network Failure During Series Creation
**Scenario**: Network disconnects while creating 100-event recurring series
**Trigger**: POST /api/events-list fails mid-request

**Expected Behavior**:
- Frontend displays error notification: "네트워크 오류가 발생했습니다. 다시 시도해주세요."
- No partial events created (request failed before server processing or server rolled back)
- User can retry event creation
- Form data preserved (user does not need to re-enter)

**Implementation Note**: Consider client-side retry logic or server-side transaction rollback

### EC-005: Editing Converted Single Instance
**Scenario**: User previously edited a recurring event instance (converted to single event), now tries to edit it again
**Precondition**: Event has `repeat.type = 'none'` but originally was part of series

**Expected Behavior**:
- Edit button opens normal edit form (no confirmation dialog)
- Dialog MUST NOT appear (event is now single event)
- Changes save via PUT /api/events/:id
- No series-wide update occurs

**Implementation Note**: Confirmation dialog trigger MUST check current `repeat.type`, not event history

### EC-006: Deleting Last Remaining Instance in Series
**Scenario**: User deletes all but one instance individually, then deletes the last instance
**Precondition**: Series originally had 10 instances, user deleted 9 individually, 1 remains

**Expected Behavior**:
- Delete confirmation dialog still appears (event still has `repeat.type !== 'none'`)
- User selects "예" (single instance): Deletes last instance, series ceases to exist
- User selects "아니오" (entire series): Deletes last instance (only one exists with this repeat.id)
- Both choices result in same outcome (0 instances remain)

### EC-007: Concurrent Edit of Same Series
**Scenario**: Two users simultaneously edit the same recurring series
**Trigger**: User A sends PUT /api/recurring-events/abc-123 at same time as User B

**Expected Behavior**:
- Server processes requests sequentially (file locking or transaction control)
- Last write wins (User B's changes overwrite User A's changes, or vice versa based on timing)
- Both users receive success response
- User A's changes may be overwritten without warning (limitation of file-based storage)

**Known Limitation**: File-based JSON storage does not support concurrent write conflict detection

**Future Enhancement**: Consider adding `version` field for optimistic locking

### EC-008: Creating Recurring Event Spanning Max Date
**Scenario**: User creates recurring event that would extend beyond 2025-12-31
**Start Date**: 2025-12-01
**Repeat Type**: "매월"
**End Date**: 2025-12-31

**Expected Behavior**:
- System creates events on: Dec 1, Dec 31 (2 events)
- System does NOT attempt to create events in 2026 (beyond max date constraint)
- End date validation prevents user from entering 2026+ dates

**Implementation Note**: End date picker max date MUST be enforced client-side and server-side

### EC-009: Deleting Individual Event from Database Manually
**Scenario**: Developer or admin manually removes event from JSON file without using API
**Precondition**: Series has 10 instances, developer deletes instance #5 directly from JSON

**Expected Behavior**:
- Series now has 9 instances (gap in sequence)
- Update series: Updates remaining 9 instances (skips deleted instance, no error)
- Delete series: Deletes remaining 9 instances (no error about missing instance)
- Frontend displays 9 events in calendar view

**Implementation Note**: Server MUST NOT assume all instances exist when operating on series

### EC-010: Repeat ID Collision (Extremely Unlikely)
**Scenario**: UUID generator produces duplicate repeat.id (probability ~1 in 1 billion)
**Trigger**: Two series accidentally assigned same repeat.id

**Expected Behavior**:
- Update series by repeat.id: Updates BOTH series (unintended)
- Delete series by repeat.id: Deletes BOTH series (unintended)
- Data corruption occurs

**Mitigation**:
- Use `crypto.randomUUID()` for cryptographically strong UUIDs (extremely low collision probability)
- No server-side detection or prevention (acceptable risk given probability)

**Recovery**: Manual database correction required if collision occurs

### EC-011: Extremely Large Series (Performance Edge Case)
**Scenario**: User creates daily recurring event for maximum duration
**Start Date**: 2025-01-01
**End Date**: 2025-12-31
**Total Events**: 365 events

**Expected Behavior**:
- Creation completes within 2 seconds (per NFR-001)
- All 365 events stored in database
- Calendar view renders all instances (may be slow depending on view range)
- Update series completes within 3 seconds (per NFR-002)
- Delete series completes within 2 seconds (per NFR-003)

**Performance Monitoring**: Test with maximum size series during QA

### EC-012: Browser Back Button During Form Submission
**Scenario**: User clicks submit to create recurring series, then immediately clicks browser back button
**Trigger**: POST /api/events-list in progress when navigation occurs

**Expected Behavior**:
- Request may complete on server (events created)
- User navigates away from form, may not see success notification
- On returning to calendar, created events are visible (fetch retrieves them)
- OR request is cancelled mid-flight, no events created

**Implementation Note**: No special handling required; user can refresh to see current state

### EC-013: Invalid Repeat ID in API Request
**Scenario**: Malicious client sends PUT /api/recurring-events/invalid-uuid-format
**Trigger**: repeatId parameter is not valid UUID format

**Expected Behavior**:
- Server attempts to find events with `repeat.id = "invalid-uuid-format"`
- No events found (UUIDs are generated by server, never match malformed string)
- Server returns 404 Not Found with error message
- No events modified

**Validation**: Optional UUID format validation on server (regex check), but not strictly necessary

### EC-014: Editing End Date of Existing Recurring Series
**Scenario**: User edits entire series and changes end date from 2025-10-31 to 2025-10-15
**Precondition**: Series has 31 daily instances (Oct 1-31)

**Expected Behavior** (Current Design):
- Edit entire series updates metadata on existing instances
- Does NOT regenerate series or delete instances beyond new end date
- All 31 instances remain with new end date value

**Limitation**: Current design stores individual instances, not a template
- Changing end date does not retroactively remove instances
- Instances beyond new end date still exist but have inconsistent metadata

**User Guidance**: To shorten a series, user must individually delete unwanted instances or delete entire series and recreate

**Future Enhancement**: Consider adding "regenerate series" functionality

## 8. Dependencies

### Internal Dependencies
- **Frontend Hooks**:
  - `useEventOperations.ts`: Extend to support POST /api/events-list, PUT /api/recurring-events/:repeatId, DELETE /api/recurring-events/:repeatId
  - `useEventForm.ts`: Add repeat end date validation, conditional field display logic

- **Utility Functions**:
  - `src/utils/eventUtils.ts`: Add recurring event generation functions (daily, weekly, monthly, yearly)
  - New file `src/utils/dateValidation.ts` (optional): Leap year check, day-in-month validation

- **Type Definitions**:
  - `src/types.ts`: Add `id?: string` field to RepeatInfo interface

- **Components**:
  - New component: `RecurringEventEditDialog.tsx` (or add to existing dialog component)
  - New component: `RecurringEventDeleteDialog.tsx`
  - Event form component: Add repeat type dropdown and end date picker

### External Dependencies
- **Material-UI Components**:
  - `@mui/material/Select`: Repeat type dropdown
  - `@mui/x-date-pickers/DatePicker`: Repeat end date picker
  - `@mui/material/Dialog`: Edit/delete confirmation dialogs
  - `@mui/icons-material/Repeat`: Recurring event icon

- **Backend Framework**:
  - Express.js: Add new route handlers for bulk and series operations
  - Node.js `crypto.randomUUID()`: UUID generation for repeat.id and event id
  - Node.js `fs`: File read/write for JSON database

### Data Dependencies
- **Database Schema**:
  - Update `src/__mocks__/response/realEvents.json` structure to include events with repeat.id
  - Update `src/__mocks__/response/e2e.json` for test data

- **Test Data**:
  - MSW handlers in `src/__mocks__/handlers.ts`: Add handlers for new endpoints
  - Test fixtures: Sample recurring events with various repeat types

### Third-Party Services
- **None**: All functionality implemented using existing dependencies

## 9. Constraints and Assumptions

### Technical Constraints
- **Maximum End Date**: 2025-12-31 (hard-coded, cannot be extended without code change)
- **Repeat Interval**: Fixed at 1 (every 1 day/week/month/year, no custom intervals like "every 2 weeks")
- **Storage Model**: File-based JSON (no database transactions, limited concurrency support)
- **Date Timezone**: All dates treated as local dates (YYYY-MM-DD), no timezone conversion
- **Test Environment**: Fake timers set to 2025-10-01 (tests must account for this)

### Business Constraints
- **Scope Limitation**: Only 4 repeat types supported (daily, weekly, monthly, yearly)
- **End Condition**: Only "specific date" end condition supported (no "after N occurrences" or "never")
- **Overlap Policy**: Recurring events exempt from overlap detection (business decision)
- **Localization**: Korean language only (no internationalization)

### Assumptions
- **User Understanding**: Users understand that monthly 31st only occurs in months with 31 days (minimal user education provided)
- **Leap Year Knowledge**: Users understand that Feb 29 only occurs in leap years (no warning provided)
- **Database Integrity**: JSON database file is not manually edited by users (admin edits may cause inconsistencies)
- **Single User Context**: File-based storage assumes low concurrency (not enterprise multi-user scale)
- **Browser Support**: Users access application via modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- **Network Reliability**: Users have stable internet connection during event creation (no offline support)
- **Data Volume**: Users create reasonable series sizes (<500 events per series)
- **Existing Codebase**: Current event form, calendar view, and API structure are functional and tested

### Data Assumptions
- **Event ID Format**: All event IDs are UUID v4 format
- **Date Format**: All dates in YYYY-MM-DD format (ISO 8601)
- **Time Format**: All times in HH:MM 24-hour format
- **Repeat ID Presence**: Only recurring events have repeat.id field; single events have undefined or null
- **Series Completeness**: All instances in a series have been created successfully (no partial series in normal operation)

### User Behavior Assumptions
- **Intentional Edits**: Users who edit single instance intend to convert it to single event (no accidental conversions)
- **Delete Confirmation**: Users read and understand confirmation dialog text before selecting option
- **End Date Selection**: Users select reasonable end dates that generate manageable series sizes
- **Form Completion**: Users fill out all required fields before attempting submission

## 10. Out of Scope

### Features Explicitly Excluded
- **Custom Repeat Intervals**: "Every 2 weeks", "Every 3 months", "Every 6 months"
- **Advanced Repeat Patterns**: "First Monday of each month", "Last Friday of quarter", "Weekdays only"
- **Multiple End Conditions**: "After 10 occurrences", "Never end", "On a specific count"
- **Exception Dates**: Ability to exclude specific dates from recurring series (e.g., skip holidays)
- **Recurring Event Templates**: Saving recurring patterns as reusable templates
- **Bulk Exception Handling**: "Edit all future events" vs "Edit all past events"
- **Timezone Support**: Creating recurring events in different timezones
- **Import/Export**: Importing .ics files or exporting recurring events
- **Recurring Event Summary View**: Dedicated UI showing all series metadata in one place

### Technical Features Excluded
- **Database Migration**: No migration from current single events to recurring format
- **Versioning**: No event version history or audit trail
- **Optimistic Locking**: No conflict detection for concurrent edits
- **Batch Operations**: No UI for bulk editing multiple series at once
- **Search by Recurrence**: No filtering calendar by repeat type
- **Performance Optimization**: No lazy loading or pagination of large series
- **Offline Support**: No service worker or IndexedDB caching

### User Experience Features Excluded
- **Drag-and-Drop**: No drag-to-reschedule for recurring events
- **Visual Timeline**: No Gantt chart or timeline view of series
- **Series Preview**: No "preview all events" before confirming creation
- **Smart Suggestions**: No AI-suggested repeat patterns based on event title
- **Quick Actions**: No "Make recurring" button on existing single events

### Testing Features Excluded
- **Performance Benchmarks**: No automated performance regression tests
- **Load Testing**: No concurrent user simulation tests
- **Accessibility Audit**: No automated WCAG compliance checking
- **Cross-Browser Testing**: No automated Selenium/Playwright tests across browsers

### Future Considerations (Post-MVP)
- **Edit Future Events**: "Edit this and all future events" option
- **Recurrence Exceptions**: Individual date exclusions without deleting instance
- **Custom Business Days**: "Every weekday" or "Every business day" options
- **Smart Rescheduling**: When editing series, automatically adjust future instances
- **Series Analytics**: Statistics on recurring event attendance/completion

## 11. Acceptance Testing Strategy

### Unit Test Requirements

**Test File**: `src/__tests__/unit/recurringEventUtils.spec.ts`

**Test Coverage**:
1. **Daily Recurrence**:
   - [ ] Generates correct count of events (end - start + 1 days)
   - [ ] Each event has unique date incremented by 1 day
   - [ ] All events share same repeat.id
   - [ ] Each event has unique id

2. **Weekly Recurrence**:
   - [ ] Generates events every 7 days
   - [ ] All events fall on same day of week as start date
   - [ ] End date boundary handled correctly (includes last week if within range)

3. **Monthly Recurrence**:
   - [ ] Generates events on same day number each month
   - [ ] Skips months without required day (e.g., Feb 30, Feb 31)
   - [ ] Handles January 31 → February (no event) → March 31 correctly
   - [ ] Handles February in leap years vs non-leap years

4. **Yearly Recurrence**:
   - [ ] Generates events on same month-day each year
   - [ ] Feb 29 leap year logic: only creates events in leap years
   - [ ] Feb 29 non-leap year: does NOT create Feb 28 event

5. **Edge Cases**:
   - [ ] Start date = end date creates exactly 1 event
   - [ ] Invalid date combinations return empty array or throw error
   - [ ] Large series (365 events) generates correctly
   - [ ] repeat.id uniqueness across multiple series

### Integration Test Requirements

**Test File**: `src/__tests__/integration/recurringEvents.spec.tsx`

**Test Scenarios**:
1. **Create Recurring Event Flow**:
   - [ ] User selects repeat type → end date field appears
   - [ ] User fills form and submits → POST /api/events-list called
   - [ ] Success notification appears
   - [ ] Calendar view refreshes and displays all instances with repeat icon

2. **Edit Single Instance Flow**:
   - [ ] User clicks edit on recurring event → confirmation dialog appears
   - [ ] User selects "예" → PUT /api/events/:id called
   - [ ] Event converts to single event (repeat.type = 'none')
   - [ ] Repeat icon disappears from edited event only
   - [ ] Other instances remain unchanged

3. **Edit Entire Series Flow**:
   - [ ] User clicks edit on recurring event → confirmation dialog appears
   - [ ] User selects "아니오" → PUT /api/recurring-events/:repeatId called
   - [ ] All instances updated with new data
   - [ ] Repeat icons remain on all instances

4. **Delete Single Instance Flow**:
   - [ ] User clicks delete on recurring event → confirmation dialog appears
   - [ ] User selects "예" → DELETE /api/events/:id called
   - [ ] Single instance removed from calendar
   - [ ] Other instances remain visible

5. **Delete Entire Series Flow**:
   - [ ] User clicks delete on recurring event → confirmation dialog appears
   - [ ] User selects "아니오" → DELETE /api/recurring-events/:repeatId called
   - [ ] All instances removed from calendar

6. **Validation Errors**:
   - [ ] Missing end date when repeat type is not 'none' → error message shown
   - [ ] End date before start date → error message shown
   - [ ] End date after 2025-12-31 → error message shown

### End-to-End Test Requirements

**Test File**: `src/__tests__/e2e/recurringEvents.e2e.spec.tsx`

**User Flows**:
1. **Complete Creation to Deletion Cycle**:
   - [ ] Create daily recurring event (7 days)
   - [ ] Verify all 7 instances appear in calendar
   - [ ] Edit 4th instance individually
   - [ ] Verify 4th instance converts to single event
   - [ ] Delete entire series
   - [ ] Verify all instances (including converted one) removed

2. **Monthly 31st Edge Case**:
   - [ ] Create monthly recurring event on Jan 31 through May 31
   - [ ] Verify events created on Jan 31, Mar 31, May 31 only
   - [ ] Verify NO event on Feb 28 or Feb 29
   - [ ] Verify NO event on Apr 30

3. **Yearly Feb 29 Edge Case**:
   - [ ] Create yearly recurring event on Feb 29, 2024 through 2028
   - [ ] Verify events created on 2024-02-29, 2028-02-29 only
   - [ ] Verify NO events in 2025, 2026, 2027

### API Test Requirements

**Test File**: `src/__tests__/api/recurringEventsAPI.spec.ts`

**Endpoint Tests**:
1. **POST /api/events-list**:
   - [ ] Success: Returns 201 with all events including generated ids
   - [ ] Validation: Returns 400 if body is not an array
   - [ ] Validation: Returns 400 if EventForm objects are malformed
   - [ ] Performance: Completes within 2 seconds for 365 events

2. **PUT /api/recurring-events/:repeatId**:
   - [ ] Success: Returns 200 with updatedCount and updated events
   - [ ] Not Found: Returns 404 if repeatId does not exist
   - [ ] Validation: Returns 400 if request body is invalid
   - [ ] Idempotency: Multiple identical requests produce same result

3. **DELETE /api/recurring-events/:repeatId**:
   - [ ] Success: Returns 200 with deletedCount
   - [ ] Not Found: Returns 404 if repeatId does not exist
   - [ ] Idempotency: Second delete returns 404 or deletedCount: 0

### Manual Test Checklist

**UI/UX Testing**:
- [ ] Repeat type dropdown renders all 5 options in correct Korean
- [ ] End date picker appears/disappears when repeat type changes
- [ ] End date picker enforces min/max dates via disabled dates
- [ ] Repeat icon displays on all recurring events in month view
- [ ] Repeat icon displays on all recurring events in week view
- [ ] Edit confirmation dialog text is correct: "해당 일정만 수정하시겠어요?"
- [ ] Delete confirmation dialog text is correct: "해당 일정만 삭제하시겠어요?"
- [ ] Dialog buttons are labeled correctly: "취소", "예", "아니오"
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader announces dialog content (manual test with NVDA/JAWS)

**Cross-Browser Testing**:
- [ ] Chrome 90+: All features function correctly
- [ ] Firefox 88+: All features function correctly
- [ ] Safari 14+: All features function correctly (especially date picker)

**Performance Testing**:
- [ ] Create 365 daily events: completes within 2 seconds
- [ ] Update 365-event series: completes within 3 seconds
- [ ] Delete 365-event series: completes within 2 seconds
- [ ] Calendar renders 100+ events without lag

## 12. Glossary

### Domain Terms

**Recurring Event (반복 일정)**
An event that repeats at regular intervals (daily, weekly, monthly, or yearly) until a specified end date. Each occurrence is stored as a separate event instance sharing a common repeat identifier.

**Event Instance (일정 인스턴스)**
A single occurrence of a recurring event. For example, in a weekly recurring event series, each individual week's event is an instance.

**Recurring Series (반복 시리즈)**
The complete set of all event instances that share the same repeat.id. For example, a daily event from Oct 1-7 is a series of 7 instances.

**Single Event (단일 일정)**
An event with `repeat.type = 'none'` that occurs only once and is not part of a recurring series.

**Repeat Type (반복 유형)**
The pattern of recurrence: 'none' (no repeat), 'daily' (매일), 'weekly' (매주), 'monthly' (매월), or 'yearly' (매년).

**Repeat End Date (반복 종료 날짜)**
The last date on which a recurring event instance should occur. Required for all recurring events, maximum value is 2025-12-31.

**Repeat ID (반복 식별자)**
A UUID that uniquely identifies a recurring series. All event instances in the same series share this identifier, enabling series-wide operations.

**Convert to Single Event (단일 일정으로 변환)**
The process of editing a single instance of a recurring event, which removes it from the series and sets its `repeat.type = 'none'`, causing it to lose the repeat icon.

### Technical Terms

**UUID (Universally Unique Identifier)**
A 128-bit identifier conforming to RFC 4122, generated by Node.js `crypto.randomUUID()`. Format: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx` where x is hexadecimal digit.

**EventForm**
TypeScript interface representing event data without an id field, used for event creation. Includes title, date, time, description, location, category, repeat info, and notification time.

**Event**
TypeScript interface extending EventForm with an id field, representing a stored event with a unique identifier.

**RepeatInfo**
TypeScript interface containing recurrence configuration: type (RepeatType), interval (number), endDate (string), and id (string UUID).

**Overlap Detection (겹침 감지)**
Validation logic that checks if a new/edited event's time range conflicts with existing events. Recurring events bypass this check.

**Leap Year (윤년)**
A year divisible by 4 (except century years not divisible by 400). Leap years have 366 days including February 29. Examples: 2024, 2028 (leap years); 2025, 2026, 2027 (non-leap years).

**Day Number (일자 번호)**
The day component of a date (1-31). Used in monthly recurrence to identify which day of the month to repeat (e.g., "15th of each month").

**Month-Day (월-일)**
The combination of month and day components of a date (MM-DD). Used in yearly recurrence to identify which date to repeat each year (e.g., "June 15" = 06-15).

### UI Component Terms

**Material-UI (MUI)**
React component library used for UI elements including Select, DatePicker, Dialog, and Icons.

**DatePicker**
Material-UI component for date selection, providing calendar popup and date validation.

**Dialog**
Modal window component used for confirmation prompts (edit/delete recurring event decisions).

**RepeatIcon**
Material-UI icon component displayed on recurring events to visually distinguish them from single events.

**Snackbar Notification (알림 메시지)**
Temporary notification message displayed at bottom of screen to confirm actions (event created/updated/deleted). Implemented using notistack library.

### API Terms

**MSW (Mock Service Worker)**
Library used in tests to intercept and mock HTTP requests, defined in `src/__mocks__/handlers.ts`.

**Express Route Handler**
Backend function that processes API requests (GET, POST, PUT, DELETE) and returns responses.

**File-Based Storage**
Backend storage mechanism using JSON files (`realEvents.json`, `e2e.json`) instead of a database.

**Bulk Operation (일괄 작업)**
API operation that affects multiple events in a single request (e.g., POST /api/events-list creates multiple events).

### Test Terms

**Vitest**
Testing framework used for unit, integration, and end-to-end tests in this project.

**Fake Timers**
Test utility that simulates specific dates/times. Tests run with system time set to 2025-10-01 UTC.

**Acceptance Criteria (인수 기준)**
Objective, testable conditions that must be met for a feature to be considered complete.

**Edge Case (엣지 케이스)**
Unusual or extreme scenarios that test boundary conditions (e.g., February 30, leap day in non-leap years).

---

**PRD Version History**:
- 1.0.0 (2025-11-01): Initial draft - comprehensive recurring events specification
