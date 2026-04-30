# CS208 Full Stack Final Project

## Documentation

- Running the example project is documented [here](docs/example_project.md)
- An example README is provided [here](docs/README_example.md)

# Downtown Donuts Website Project

## Setup Intructions
1. Clone the repository
2. Run 'npm install' to install dependencies
3. Database setup
    1. Run './setup_scripts/install_db.sh' once per codespace
    2. Use the following for questions that the script asks:
        Switch to unix_socket authentication [Y/n] n
        Change the root password? [Y/n] Y
            Set the password to 12345
        Remove anonymous users? [Y/n] Y
        Disallow root login remotely? [Y/n] Y
        Remove test database and access to it? [Y/n] Y
        Reload privilege tables now? [Y/n] Y
    3. Run 'sudo service mariadb status' to make sure its running
    4. Run 'sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql' to create inital tables
    5. Run 'sudo mysql -u root -p -e 'show databases' to check if tables were created
4. Run npm start

## Design Decisions
    Decided to use dark green as the main color pallete for the website. I thought it paired with the gold outlines will make for a high modern feel. Took inpsiration from a lot of cafes around Eagle such as Rembrandts. 

    I wanted to add a slide show of the comments to the home page but it turned out to be more difficult than I thought it would be. The comment page was the hardest by far. spent a lot of time just braindstorming how it would look like. It was a bit difficult because I wanted to keep the theme going with the green background but the comments would be too hard to see. So I decided to put a picture in the background with made it easier too see and blended well with the cafe theme. 

    My first attempt at the comment was creating a popup window of what you wanted to say, similar to what google reviews had it. But then I realized that it just didn't feel right with a modern minimalism cafe. 

    I decided to create a footer in the layout with contact info and address center stage. I then created a terms of use and privacy page because I saw a lot of other websites have them so I thought I should have one too.
    
    I created the menu from scratch. Was honestly pretty easy, just had to figure out the formatting for the online and css to make it look clean. I wanted the navigation to be in the top right just because I feel like it more easy on the eyes than on the left. I didn't do to much with the branding styling. Just used the chalk white color for the fonts. 

    All of the photos used belong to their respective owners with their link in the citations.
## Edge Cases
    1. If the server/API are unreachable, then it is caught in the try/catch block and outputs the error: "Failed to load comments. Please try again later."

    2. Both the name and comment field are validated server-side using trim(). if a user inputs whitespace as the name or comment, then trim() will return an empty string and the server will return a message saying "A name is required or Comment cannot be blank"

    3. The server enforces a maximum character length of 100 for the name and 1000 characters for the comment. If the user exceeds these, then the server will return a message saying "Name must be under 100 characters long" or "Comment must be under 1000 characters long"

    4. An event listener disables the submit button on the form after the first click.

## Challenges & Learnings
    Oh man where do I begin. Lets start off with just css. I spent roughly 70% of my time of this project just trying to get the right format. The amout of classes for each page...

    Another challenge I had was figuring out how to do pagination. Just understanding how to calculate the number of comments in a page using offset and then calculate the total number of pages.

    I hate pug with a passion. You would write all this code and then refresh the website and it will just show all of these bugs. I understand why its like that but man it was fustrating to see that over and over again, espeically when it was just a simple indentation error. 

    One thing that I learned that I do value is just understanding how to format websites. I used flex a lot for the navigation and then for titles and different sections of the pages. it was cool too see the different ways you can format something and create somthing really cool.

    Another learning experience I had was understanding how mysql handles timestamps. I had a hard time understanding how created_at was being instantiated but I guess mysql does it automatically. As well as creating the timestamp automatically whenver a new row was inserted in the comment table so it didn't need to be manually passed in the query.

## Citations
https://smokymountainpizza.com/
https://rembrandtseagle.com/
https://pos.toasttab.com/es-us/blog/on-the-line/how-to-run-a-cafe
https://about.starbucks.com/stories/2026/inside-starbucks-chicago-cafe-makeover-softer-seating-local-design-invite-customers-to-stay/
https://www.w3schools.com/HTML/html_entities.asp
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
https://oneuptime.com/blog/post/2026-02-23-how-to-use-the-replace-function-for-string-sanitization/view
https://stackoverflow.com/questions/1144783/how-do-i-replace-all-occurrences-of-a-string
https://dev.mysql.com/doc/refman/8.0/en/timestamp-initialization.html
https://www.w3schools.com/sql/sql_insert.asp
https://github.com/Brick700/12.03-Lab---Full-Stack/blob/master/docs/example_project.md
https://drive.google.com/file/d/1Cw8CrTLj48oNBUr8jkXxvUJjCJ-sXiSZ/view