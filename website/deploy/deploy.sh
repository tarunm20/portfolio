#!/bin/bash

echo "Executing deployment script"

#Create build and move into deploy folder
npm run build
rm -R ./build
mv ../build ./

#Launch gcloud deploy
gcloud app deploy app.yaml