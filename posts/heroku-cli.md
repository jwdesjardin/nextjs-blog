---
title: Heroku CLI
date: "2021-01-02"
description: "Notes from deploying a project on heroku."
---

1. login to heroku

```
heroku login
```

2. create project ( must be unique name )

```
heroku create PROJECTNAME
```

3. create Procfile 

```
web: node server/server.js
```

4. heroku postbuild script

```
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```

5. add remote git repo

``` 
heroku git:remote -a PROJECTNAME
```

6. deploy to heroku

```
git push heroku master
```

7. add env variables to heroku