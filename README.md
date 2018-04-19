# Doula Cooperative of Rochester
 
 Site: https://www.doulacooperative.org

 ## Getting Started
 ```
 $ npm run tools
 $ firebase login
 $ yarn install
 $ yarn serve
 ```

 ## Modify the Doula List
 1. Update: src/templates/partials/_doulas.pug
 2. Ensure any new profiles have a corresponding jpg and webp file in src/img/headshots (the filename needs to match the name key of the partial). Photos must be 200p wide by 280p tall (see: the-doulas.pug)
 3. Stop your server, then build and serve: `yarn serve`
 
 ## Deploy
 WARNING: Don't do this. Make sure your changes are set and the rest of the site is functional.

 ```
 $ yarn deploy
 ```