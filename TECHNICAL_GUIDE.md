# Way2Campus - Technical Implementation Guide

## Overview
Way2Campus is a modern, responsive web application designed for students and drivers of DRIEMS UNIVERSITY. It facilitates real-time communication between college bus drivers and students to eliminate the uncertainty of commuting.

This document serves as a technical breakdown of the frontend architecture (currently implemented) and the proposed backend architecture required to achieve true real-time GPS tracking.

## Frontend Architecture (Current Implementation)

The frontend is built with **Next.js (App Router)** and **React**, styled with **Tailwind CSS**, and uses **Framer Motion** for fluid animations.

### 1. State Management
The application uses React's local state to manage the user journey. 
*   **Onboarding (`Onboarding.tsx`)**: Captures the user's role (`Student` vs `Driver`) and their designated `Bus Number`.
*   **Routing (`app/page.tsx`)**: Acts as a state machine, routing the user from the `Welcome` screen to `Onboarding` and finally to the `Dashboard`.

### 2. Component Structure
The dashboard is conditionally rendered based on the user's role:
*   **`DriverDashboard.tsx`**: A simplified, high-contrast UI allowing drivers to quickly tap status buttons (On Route, Delay, Puncture, Emergency) without distraction.
*   **`StudentDashboard.tsx`**: A view focused on consumption, displaying ETAs, a timeline of upcoming bus stops, and a button to view the live map.
*   **`RouteMap.tsx`**: A mock visualization of the bus route utilizing SVG and Framer Motion to simulate live tracking.
*   **`Notifications.tsx`**: A slide-up feed that alerts students to status changes pushed by the driver.

---

## Proposed Backend Architecture (Real-Time GPS Tracking)

To transform this frontend prototype into a fully functional real-time tracking system, the following backend architecture is required.

### 1. The Real-Time Database / WebSocket Server
A standard REST API is insufficient for live tracking due to latency. The backend must support WebSockets for continuous, bidirectional data flow.
*   **Recommended Technologies**: Node.js with `Socket.io`, Firebase Realtime Database, or Supabase Realtime.
*   **Purpose**: To act as the central hub receiving GPS pings from drivers and instantly broadcasting them to the subscribed students.

### 2. Driver Location Broadcasting (Publishing)
When a driver logs in and starts a route:
1.  The app requests Location Permissions from the driver's device.
2.  It utilizes the browser's native `navigator.geolocation.watchPosition()` API to continuously monitor the device's latitude and longitude.
3.  Every 3-5 seconds, the app sends a WebSocket payload to the server containing: `{ busNumber: "15", lat: 20.4625, lng: 85.8829, timestamp: "..." }`.

### 3. Student Map Rendering (Subscribing)
When a student logs in and opens `RouteMap.tsx`:
1.  The app establishes a WebSocket connection to the server, subscribing to updates specifically for their `busNumber`.
2.  The mock SVG map is replaced with a real map library (e.g., **React-Leaflet** for open-source Maps, or **Mapbox GL JS**).
3.  As the WebSocket receives new coordinate payloads, the frontend updates the React state, causing the Bus marker on the map to smoothly transition to the new location.

### 4. Status Notifications Architecture
When a driver taps "Heavy Traffic (Delay)":
1.  An HTTP POST request or WebSocket event is sent to the backend.
2.  The backend processes this event and triggers a Push Notification (using Firebase Cloud Messaging or similar) to all students subscribed to that bus.
3.  The frontend intercepts this push notification and updates the `Notifications.tsx` feed and the ETA displayed on the `StudentDashboard.tsx`.
