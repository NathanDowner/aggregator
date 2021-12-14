<div id="top"></div>


<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Aggregator</h3>

  <p align="center">
    A simple way to follow your favourite RSS feeds!
    <br />
    <br />
    <a href="https://aggregator-one.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/NathanDowner/aggregator/issuess">Report Bug</a>
    ·
    <a href="https://github.com/NathanDowner/aggregator/issuesss">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This project was initially inspired by a challene I saw somewhere on the internet a while back. I actually began building it however, when I was tracking news about a particular country across multiple sources, and decided it would be a lot easier to have feeds from those sources all in one place to go through. It is the first of many more projects to be added to my github in an attempt to make sure I have work to show for myself apart from projects built for my employers.


Without signing in with your google account, you'll still have access to the general application in order to see how it works with some sample feeds and sources. However, you will not be able to add or edit any data.


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Tailwindcss](https://tailwindcss.com)
* [Firebase](https://firebase.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

You'll need to have [node](https://nodejs.dev) installed, and either npm or [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) (preferred).
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/NathanDowner/aggregator.git
   ```
3. Install dependencies
   ```sh
   yarn install
   ```
   or
    ```sh
   npm install
   ```
   
4. Supply your Firebase env variables to satisfy the firebaseConfig object in the [firebase.js file][firebase-file](#)
   ```js
   const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREABSE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
   };
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Add 'Saved Articles' section
- [ ] Add scroll-to-top
- [ ] Add dark mode
- [ ] Allow user to select different icons when creating feeds
See the [open issues](https://github.com/NathanDowner/aggregator/issuess) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

While this is a personal project, any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Nathan Downer - [@Nathan_Downer]https://twitter.com/Nathan_Downer) - nathandowner123@gmail.com

Project Link: [https://github.com/NathanDowner/aggregator](https://github.com/NathanDowner/aggregator)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Hero Icons](https://heroicons.com)
* [Headless UI](https://headlessui.dev)
* [react-masonry-css](https://www.npmjs.com/package/react-masonry-css)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/aggregator_screenshot.png
[firebase-file]: firebase.js
