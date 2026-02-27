# Netlichallenge premise

Your team has been tasked with building out a new Todo list feature in the Netlify app. The Todo list feature will allow different Netlify users to keep short launch checklists within the app.

A junior colleague has begun the skeleton of the new feature, but is unable to finish before heading out on vacation. Your task (should you accept it) is to complete the new todo feature so that it's ready for the next team demo. Please include some notes for your colleague about the major changes you made and why.

### Acceptance criteria (for demo)

- [x] Fetch existing todos
- [ ] Wire up the user select to show todos only for the currently selected user (in the "Team" dropdown) from the API
- [ ] Add new todos for the currently selected user
- [x] Display whether a todo is completed or not (checked vs. unchecked)
- [ ] Tests as needed
- [ ] As accessible as possible
- [ ] Matches [design mockups](https://www.figma.com/file/OwguZDbXYR33Iwxx1cYQSy/Code-Challenge?node-id=0%3A1) (feel free to push back and diverge if necessary)

### Design mockups

The designer on your team has completed the design mockups for this feature, they can be found [here](https://www.figma.com/file/0ffcoVtrfwIDIVajHuhzVY/Netlitodo). Feel free to make any notes of feedback you might give to the designer; however, please refrain from making comments or changes in the Figma file 🙂

### What we are looking for

The focus of this exercise is to assess your thought process and how you work. Don't worry about getting everything completely finished.

Our main priorities are to assess (technical):

- HTML
- CSS
- JavaScript
- React
- Testing
- Accessibility
- Performance

We will also be interested in (non-technical):

- Critical thinking
- Communication (documentation, reasoning)
- How you think

## Notes for your colleague

- Add the notes for the junior colleague that wrote the initial code here.

## Note for the interviewers

- Add notes about your approach for Netlify frontend team here.

## How to work with this repository

This is a basic Create React App that uses [`json-server`](https://github.com/typicode/json-server) to create a "fake" REST API for the purposes of persisting the todos.

To get started:

1. Clone the repo locally

3. Run `yarn install`

To run the app locally:

- Run `yarn start` in one tab; this should boot up http://localhost:3000 with the app UI
- Run `yarn server` in another, to start the `json-server` which you can check out at http://localhost:3004/todos or http://localhost:3004/users

Any trouble? Questions? Please don't hesitate to reach out in the Slack channel provided to you.
