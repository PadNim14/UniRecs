# Use an official Ubuntu runtime as a parent image
FROM ubuntu:latest

# Update the apt package index and install required packages
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-dev build-essential curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install Python packages
RUN python3 -m pip install pip==21.3.1 && \
    python3 -m pip install Flask pandas numpy \
    requests firebase-admin

# Install npm packages
RUN npm install

# Copy the start script to the container
COPY ./src/start.sh .

# Change permissions to allow execution of the start script
RUN chmod +x ./start.sh

# Set the command to run the start script
CMD ["./start.sh"]
