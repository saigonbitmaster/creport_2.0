# These are auto build and deploy workflows (CD) for creport on AWS VM instance

## There are 4 files corresponding to 4 auto build and deploy workflows for API , CMS , WEB
## What workflows do :

- Build code and upload results to github artifacts (expire in 1 day) , you can view and download artifacts from completed workflows at Actions --> Workflows
  --> choose completed workflow --> view uploaded artifact at bottom.
- Rsync artifacts (api/dist , cms/build , web/build) to AWS VM instance
- Restart service on AWS VM instance

## Workflows will be triggerd automatically when :
- Source code is merged from branch master --> staging (Pull Request is created -> reviewed -> closed) & code changes in api , cms , web folders
## To trigger workflows mannually you have to change default branch to "staging" (default is master):
- Settings --> Branches --> Default branch

## These workflows require following Actions secrets to run (Settings --> Actions --> Secrets):
- REMOTE_HOST=your AWS VM instance public IP
- REMOTE_USER=your ec2-user
- SSH_PRIVATE_KEY=your ec2-user ssh private key
- REACT_APP_LOGIN_URL=https://creport.bworks.app/api/auth/login
- REACT_APP_API_URL=https://creport.bworks.app/api
- ENV_MONGO_INITDB_ROOT_USERNAME=admin
- ENV_MONGO_INITDB_ROOT_PASSWORD=***
- ENV_CONNECTION_STRING=mongodb://admin:***@mongo:27017/creport2?authSource=admin&readPreference=primary
