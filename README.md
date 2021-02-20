# Project Overview
This is the frontend for my Deal or No Deal React app. Deal or No Deal was the first project I completed during my GA bootcamp. For my final project at GA, I wanted to try rebuilding it as a full-stack app to display the growth of my skills as a developer. As you will read in the problems/challenges section, I found it challenging to translate a game built almost entirely on DOM manipulation into a working full-stack app.

# User Stories

# Wireframes


# Tech Stack

# Problems/Challenges
* The biggest hurdle I had to overcome in the development of this app was just getting the board set up. The suitcases re-rendered every time state was updated, but they need to stay in the same location for the game. Thank you, Billie, for helping implement a fix for this issue.

* One unsolved problem that exists with the game in its current state is that when a player selects their suitcase to start the game, another suitcase automatically opens (unless the player selects that last suitcase before the bonus case). I'm working to update this logic.

* Another byproduct of the solution to freeze the cases in place is that I'm currently unable to "turn the board off." That is, a player can just keep selecting suitcase if they don't see the banker has called. A short term fix I'm working on is hiding the board when the board status is inactive, but I think it would be great to figure out a way to implement modals to enhance the player experience.

# Link to Deployed App
Link to come