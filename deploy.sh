#!/bin/bash

echo "Changing directory to UI..."
cd ui

echo "Install React Dependencies..."
npm install --

echo "Build React Production version..."
npm run build

cd ..

echo "Removing Build folder from server..."
rm -rf build

echo "Moving compiled UI to server..."
mv -v ui/build .

git add .
git commit -m "Deploying..."
git push