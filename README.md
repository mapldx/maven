<div align="center">
  <img src="https://i.imgur.com/McsmHX9.png" alt="Logo" width="240">

  <p align="center">
    <br>
    Say hello to Web 3's easiest plug-and-play builder for token-gated one-page sites!
    <br />
    <br />
    <a href="https://docs.google.com/presentation/d/1b1A2Uo5lgdJJ40G6-UFn7rkhz1k6AtPPpvYk3NUOvJc/edit?usp=sharing">View Slide Deck</a>
    ·
    <a href="https://twitter.com/usemaven_">Follow on Twitter</a>
    ·
    <a href="https://twitter.com/mapldx">Get in Touch</a>
  </p>
</div>

## Run Maven on your local machine for testing
### Prerequisites

This release of Maven is verified working on:
* node v18.15.0
  <br> Due to an issue with Node itself, if an error occurs during any of the yarn functions that contains 'ERR_OSSL_EVP_UNSUPPORTED':
  ```sh
  export NODE_OPTIONS=--openssl-legacy-provider
  ```
* yarn v1.22.19 (assuming that npm is installed)
* Backpack v0.5.2-latest-beta-3925

### Installation

1. For your convenience, a ```serviceAccountKey.json``` has been included for demo purposes. This acts as a confidential access token to Maven's database.
2. Clone the repo
   ```sh
   git clone https://github.com/mapldx/maven
   ```
3. cd into each of the subdirectories ```api```, ```client```, ```layer```, and ```xnft```. Install dependencies in each:
   ```sh
   yarn install
   ```
4. Separately in each of ```api```, ```layer```, and ```xnft``` subdirectories, run using:
   ```sh
   yarn dev
   ```
5. In ```client``` subdirectory, run using:
   ```sh
   yarn dev --port=8080
   ```
6. The expected result is to have all four subdirectories be running a process simultaneously.

### Notes
* api subdirectory: Maven's back end routing and database interface
* client subdirectory: front end to create, manage, and view responses to forms and sites
* layer subdirectory: various user-facing interfaces to fill in forms and open sites
* xnft subdirectory: wrapper for Backpack xNFT compatability standard

## Built With

* ![Nuxtjs](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82)
* ![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

## Contributing

[Zachary Sy, @mapldx on Twitter](https://twitter.com/mapldx)<br>
Purdue University–Main Campus, IN<br>

LinkedIn: https://www.linkedin.com/in/zwcsy/<br>
Email: zacharycsy (at) gmail (dot) com<br>
Discord: zachio (hashtag) 0123
