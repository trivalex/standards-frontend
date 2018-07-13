[![Built with pwa–starter–kit](https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit "Built with pwa–starter–kit")
[![Build status](https://api.travis-ci.org/Polymer/pwa-starter-kit.svg?branch=master)](https://travis-ci.org/Polymer/pwa-starter-kit)

> ## 🛠 Status: In Development
> PWA Starter Kit is currently in development. It's on the fast track to a 1.0 release, so we encourage you to use it and give us your feedback, but there are things that haven't been finalized yet and you can expect some changes.
>
> See the list of Known Issues and TODOs, below, for updates.

# What it is

* LIVE: [https://standards-frontend.firebaseapp.com/](https://standards-frontend.firebaseapp.com/) 

A work in progress PWA, architectured after [#useThePlatform](https://twitter.com/hashtag/usetheplatform?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Ehashtag) or like [Youtube](https://www.youtube.com/)

# What it not is

Completed

# Architecture

* [App Shell Architecture](https://developers.google.com/web/fundamentals/architecture/app-shell)
* [PRPL Pattern](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
* [RAIL Performance](https://developers.google.com/web/fundamentals/performance/rail)

# installation

* bash in project root
    
    * ```npm install```

* Current CORS Workaround:

    * install a CORS extension in your browser like this one: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

# Build
### [Documentation Link](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#build)
* bash in project root

    * ```polymer build```

# Dev Hosting/Preview
### [Documentation Link](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#serve)
* bash in project root
    * ```polymer serve```

# Local Production preview
### [Documentation Link](https://firebase.google.com/docs/cli/)
* Requires a local build
* bash
    * ```npm i -g firebase-tools```
* bash in project root
    * ```firebase serve```
        * configured in ```firebase.json```

# Deployment

* Contact me :)