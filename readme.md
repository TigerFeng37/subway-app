
## OVERVIEW

This is a NYC subway train arrivals app focused on simplicity and efficiency. It is designed for the user that already knows how to navigate the subway system, and thus simply wants to know when the next train is departing -- so they know if they need to jog for that last block to catch it.

The app interacts with the custom PHP / Laravel backend (see repo mta-subway) to retrieve station information and upcoming arrivals.

## USER INTERFACE

The app UI is simple. There is one screen which shows the two closest subway stations to the user. Initially, the nearest station is "in focus" with upcoming train arrivals shown, organized by general destination / heading (for example, Manhattan, Bronx, Coney Island, etc.). The user can tap on one of these cards to see more details (the exact destination of each train) and further upcoming train arrivals. The user can tap on the other close-by station to switch that station to be in focus. The two stations will swap, and the user will now see upcoming arrivals for the second-closest station.

![Three screenshots of the app, showing the user interface](/screenshots/app_screenshots.png?raw=true)
