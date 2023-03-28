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
    ·
    <a href="https://usemaven.app">Go to Website</a>
  </p>
</div>

## Run Maven on your local machine for testing
### Prerequisites

This release of Maven is verified working on:
* node v18.15.0
* yarn v1.22.19 (assuming that npm is installed)
* Backpack v0.5.2-latest-beta-3925
  * Ensure that Developer Mode is toggled on to be able to access the Simulator. Click your profile photo > Preferences > Developer Mode

### Installation

1. For your convenience, a ```serviceAccountKey.json``` has been included for demo purposes. This acts as a confidential access token to Maven's database.
2. Clone the repo
   ```sh
   git clone https://github.com/mapldx/maven
   ```
3. Make the start script executable
   ```sh
   chmod +x start.sh
   ```
4. Run the start script
   ```sh
   ./start.sh
   ```

### Notes
* /api, running on localhost:80 – Maven's back end routing and database interface
* /client, running on localhost:3000 – front end to create, manage, and view responses to forms and sites
* /layer, running on localhost:3001 – web and xNFT user-facing interfaces to respond to forms and open sites
* /xnft, running via Backpack Chrome Extension's Simulator – to interact with xNFT user-facing interface

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
Discord: mapldx (hashtag) 0123
