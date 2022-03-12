# Time App

    The Time app is a simple app that includes local time, world clock, alarm clock, timer, and stopwatch.

## Introduction

    This is a simple time measuring app inspired by Apple IOS built-in Clock app which includes a world clock, alarm clock, stopwatch, and timer.
        - **Local Time** shows your local time, date, and time zone information.
        - **World Clock** shows the local time in different time zones around the world.
        - **Alarm Clock** allows you to set multiple alarms for any time of the day.
        - **Timer** can count down from a specified time.
        - **Stopwatch** can time full events and keep track of lap or split times.

## How to run the app

    - Option 1
        Click the following link to visit the application. (https://mish2j.github.io/time-app/)

    - Option 2
        Run the app locally using CLI.

        1. Download the app and open the folder in the terminal.
        2. Install all dependencies using the `npm i` command.
        3. Use the `npm start` command to run the app.

## Usage

    1. Local Time
        - Click on "Local time" in the menu and the corresponding tab will open with information about your local time.

    2. World Clock
        - Click on "World Clock" in the menu. A search bar will appear on the tab, where you can enter the name of the city.
        - Enter the name of the city and press Enter, or click the search icon. Cities with their names and local times will be listed below the search bar.
        - To remove a city from the list, click the close button (X) in the right corner of the list item.


    3. Alarm
        - To open the Alarm clock, click on "Alarm" in the menu.
        - To set an alarm, enter the hour and minute and then click the plus button (+) on the right.
        - To delete an alarm, click the bell icon in the right corner of the alarm time in the list below.

        When the time you have set arrives, you will be notified by a modal window. In this case, the alarm will be automatically removed from the list.

    4. Timer
        - To use the Timer, click on "Timer" in the menu.
        - To run the timer, set the duration of time and click the **START** button.
        - To stop the timer, click the **STOP** button.

    5. Stopwatch
        - To open the Stopwatch, click on "Stopwatch" in the menu.
        - Click **START** to run the stopwatch.
        - To pause the stopwatch, click **STOP**.
        - To record a lap, click **LAP**.
        - To clear the stopwatch, click **STOP** on the right, and a reset button will appear on the left. Click the ***RESET** button.

## Technologies

    - ReactJS v17.0.2
