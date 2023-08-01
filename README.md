# MangaGoExtractor

*Pour Chloé*

## Why
This program is intended to extract from my read book list all the informations related to that book and then save them in both csv and xlsx(excel) format.

## How -Easy way ( not fully tested)

1. Click on 'Code' button and then Download the folder as zip
![Download Zip](https://github.com/NicolasAfou/MangaGoExtractor/blob/master/Docs/downloadZip.png)
2. extract the folder anywhere ( i recommand doing that under root so that the extracted folder would be located at /mangagoExtractor)
3. open with any text editors the file {extractFolder}/src/settings.json . Enter your unique id between the quotes. Ex: "1234567"

```json
{
    "userName": "",//optional, if empty, will have to enter manually at launch time
    "password":"",//optional, if empty, will have to enter manually at launch time
    "userId": ""//mandatory, otherwise the program wont be able to properly navigate on the website, can be found in profile settings 'Unique id'
}
```
4. navigate to {extractFolder}/scripts
5. execute macInstall.sh (double click or run from prefered command line)
    *Note: might need to change in the macInstall.sh the PROJECTPATH, default is 'PROJECT_PATH="/mangaGoExtractor and you might need to execute this file as admin"'*
    ```sh
    if [ $# -eq 0 ]; then
        PROJECT_PATH="/mangaGoExtractor" # to replace if necessary
    fi
    ```
    *Execute with terminal on mac*
   Open the terminal application. Navigate to the extracted folder by typing the command "cd /User/blabla/mangaGoExtractor"
   Then type sudo scripts/./macInstall.sh
   ```sh
   cd /User/myfolderPosition/mangaGoExtractor/scripts
   chmod +x macInstall.sh
   ./macInstall.sh
   ```
   
7. program should start and a browser should open.
8. ![Incorrect program](https://github.com/NicolasAfou/MangaGoExtractor/blob/master/Docs/NeedToRestart.png)
9. If Captcha image is shown as in the image above, program will need to be restarted(just click on Sign In, that will crash the program as we want it, then re-execute steps 5).
10. you will need to solve the captcha, and enter your username password if that was not done in the settings.json step.
11. program will run, the manga.csv and manga.xlsx should now have been generated at the root of the extract folder.
12. Something may have been gone wrong somewhere, in that case, contact IT Service.


## What is the macInstall going to do

1. will install homebrew, needed to install node
2. install node
3. build the project
4. start the project
5. uninstall node
6. uninstall homebrew
7. delete all downloaded node modules.

## Library use for the project

1. Puppeteer ( chrome base command line browser (maintened by google)).
2. xlsx node library (create excel and csv file)
