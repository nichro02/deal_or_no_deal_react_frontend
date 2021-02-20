# Project Overview
This is the frontend for my Deal or No Deal React app. Deal or No Deal was the first project I completed during my GA bootcamp. For my final project at GA, I wanted to try rebuilding it as a full-stack app to display the growth of my skills as a developer. As you will read in the problems/challenges section, I found it challenging to translate a game built almost entirely on DOM manipulation into a working full-stack app.

# User Stories
|As a user, I want to be able to|
|-|
|Sign up for a new account|
|Log into an existing account|
|Logout of my account|
|Play a game without being logged in|
|Be redirected to a homepage that displays high scores and comments upon login|
|Toggle between light mode and dark mode|
|View my profile, which displays my high scores and comments made|
|Update my player bio|
|Delete my profile|
|View other player's profiles|
|Start a game from the navbar or the homepage|
|Select a briefcase to start the game|
|Click on briefcases to eliminate prize values|
|Receive offers from the banker to sell my briefcase|
|Accept or reject those offers|
|Post comments|
|Update my comments|
|View other player's comments|
|Reply to comments|

# Screenshots and Wireframes
![Screenshot of game page] (public/game_screen.png)


# Tech Stack

## API
- Axios: I used axios to link my frontend to my backend.

## Architecture
- React: I built my frontend with React because it allowed me to build my app into specific components that I could then re-use as needed throughout the app.

## Styling
- Chakra: I decided to use Chakra to style my frontend. We had a lesson on Chakra in class and I liked that it was straightforward to use and has good documentation, so I decided to leverage Chakra in building my app. It facilitated the translation of my vision from my wireframes into a working app and would definitely consider using it again in the future.

# Problems/Challenges
* The biggest hurdle I had to overcome in the development of this app was just getting the board set up. The suitcases re-rendered every time state was updated, but they need to stay in the same location for the game. Thank you, Billie, for helping implement a fix for this issue.

* One unsolved problem that exists with the game in its current state is that when a player selects their suitcase to start the game, another suitcase automatically opens (unless the player selects that last suitcase before the bonus case). I'm working to update this logic.

* Another byproduct of the solution to freeze the cases in place is that I'm currently unable to "turn the board off." That is, a player can just keep selecting suitcase if they don't see the banker has called. A short term fix I'm working on is hiding the board when the board status is inactive, but I think it would be great to figure out a way to implement modals to enhance the player experience.

# Link to Deployed App
Link to come