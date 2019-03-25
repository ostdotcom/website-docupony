# dev.ost.com 
This is the common documentation repository for OST Platform and KYC.


# Requirements

Installing gulp-cli (Needed to execute build tasks)

> npm install -g gulp-cli


Installing bundler (Needed for slate)

> gem install bundler


# Setup

1. Clone this repositiory

Run following commands inside root folder of this repositiory

2. Install npm dependencies

> npm install

3. Install slate and docusaurus dependencies. It also builds docs as a last step.

> gulp generate-all-docs

4. Start the server. It has live reload.

> gulp server-dev

5. For development purpose use this command on local machine 

> gulp generate-all-docs-local-server

For more gulp tasks read the gulpfile.js in root folder.
