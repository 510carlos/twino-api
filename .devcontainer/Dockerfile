# Start with an Ubuntu slim base image
FROM ubuntu:20.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Create a 'node' user with home directory /home/node
RUN groupadd -r node && useradd -r -g node -m -d /home/node -s /bin/bash node

# Install sudo and give 'node' passwordless sudo privileges
RUN apt-get update && apt-get install -y sudo && \
    echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Install Node.js (Choose your preferred version)
ARG NODE_VERSION=18.x
RUN apt-get update && apt-get install -y curl software-properties-common && \
    curl -sL https://deb.nodesource.com/setup_${NODE_VERSION} | bash - && \
    apt-get install -y nodejs

# Install global Node.js packages
RUN npm install -g cypress pnpm mongosh yarn

# Install specific pnpm version
RUN npm install -g pnpm@9.0.5

# Install Cypress dependencies and other utilities
RUN apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb \
    vim \
    wget \
    zsh \
    jq

# Install Google Chrome
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install ./google-chrome-stable_current_amd64.deb -y && \
    rm google-chrome-stable_current_amd64.deb

# Install the Google Cloud SDK
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    apt-get update && apt-get install -y google-cloud-sdk

# Install Python 3.9 and pip
RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y python3.9 python3.9-distutils python3.9-venv && \
    apt-get install -y python3-pip && \
    update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 1 && \
    apt-get clean

# Install Python packages
RUN pip install scipy
RUN pip install aider-chat

# MongoDB Database Tools Installation
RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add - && \
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list && \
    apt-get update && apt-get install -y mongodb-database-tools

# MongoDB Shell Installation
RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add - && \
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list && \
apt-get update && apt-get install -y mongodb-mongosh

# Install Git
RUN apt-get update && apt-get install -y git

# Set PATH
ENV PATH="/home/node/.npm-global/bin:${PATH}"

# Set permissions and switch to 'node' user for subsequent commands
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Change to 'node' user
USER node

# Install oh-my-zsh for the 'node' user
RUN sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"

# Set Zsh as the default shell for the 'node' user
USER root
RUN chsh -s $(which zsh) node

# Switch back to 'node' user for any further commands
USER node
