#!/bin/bash

# Start the Python backend
cd /backend
python base.py &
cd ..

# Start the Node.js frontend
cd /frontend
npm start
