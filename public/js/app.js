// Variables

const Light_Button = document.querySelector('.light-button');
const Dark_Button = document.querySelector('.dark-button');

const Mobile_DarkButton = document.querySelector('.mobile-menu-dark');
const Mobile_LightButton = document.querySelector('.mobile-menu-light');

const Settings_Button = document.querySelector('.settings-button');
const Settings_Prompt = document.querySelector('.settings-prompt');

const Body = document.body;

let CurrentTheme_Button;
let CurrentTheme;

const Mobile_Button = document.querySelector('.mobile-button');
const Mobile_Menu = document.querySelector('.mobile-menu');

let isMenuOpen = false;
let isOpen = false;

//

// Functions

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function toggleTheme(ThemeCookie) {

  // Check for requested ThemeCookie //
  if (ThemeCookie === 'dark') {

    // Check if the settings prompt is open //
    if (isOpen === true) {
      Dark_Button.style.visibility = 'visible';
      Light_Button.style.visibility = 'hidden';
    }

    // Check if the mobile menu is open //
    if (isMenuOpen === true) {
      Mobile_DarkButton.classList.add('toggle');
      Mobile_LightButton.classList.remove('toggle');
    }

    Body.classList.replace('light', 'dark');

    CurrentTheme_Button = document.querySelector('.dark-button');
    CurrentTheme = 'dark';

    // Set cookie //
    setCookie('ThemeCookie', 'dark', 365);
  } else if (ThemeCookie == 'light') {

    // Check if the settings prompt is open //
    if (isOpen === true) {
      Dark_Button.style.visibility = 'hidden';
      Light_Button.style.visibility = 'visible';
    }

    // Check if the mobile menu is open //
    if (isMenuOpen === true) {
      Mobile_DarkButton.classList.remove('toggle');
      Mobile_LightButton.classList.add('toggle');
    }
    
    Body.classList.replace('dark', 'light');

    CurrentTheme_Button = document.querySelector('.light-button');
    CurrentTheme = 'false';

    // Set cookie //
    setCookie('ThemeCookie', 'light', 365);
  }
}

function toggleButton(ThemeCookie, enable) {

  // Check for requested state //
  if (enable === true) {
    // Check for requested ThemeCookie //
    if (ThemeCookie === 'dark') {
      Mobile_DarkButton.classList.add('toggle');
      Mobile_LightButton.classList.remove('toggle');
    } else {
      Mobile_DarkButton.classList.remove('toggle');
      Mobile_LightButton.classList.add('toggle');
    }
  } else {
    Mobile_DarkButton.classList.remove('toggle');
    Mobile_LightButton.classList.remove('toggle');
  }
}

function toggleMenu() {
  // Check if the menu is open //
  if (isMenuOpen === true) {
    Mobile_Menu.classList.remove('toggle');
    isMenuOpen = false;

    toggleButton(CurrentTheme, false);
  } else {
    Mobile_Menu.classList.add('toggle');
    isMenuOpen = true;

    toggleButton(CurrentTheme, true);
  }
}

//

// Check for Theme

const ThemeCookie = getCookie('ThemeCookie');

if (ThemeCookie === null) {
    toggleTheme('dark'); // Set ThemeCookie
}

if (ThemeCookie) {
    console.log('ThemeCookie is not null')
    Body.classList.replace('dark', ThemeCookie);

    if (isMenuOpen === true) {
      toggleButton(ThemeCookie, true);
    }

    CurrentTheme_Button = document.querySelector(`.${ThemeCookie}-button`);
    CurrentTheme = ThemeCookie;
} else {

    if (isMenuOpen === true) {
      toggleButton(ThemeCookie, true);
    }
    CurrentTheme_Button = document.querySelector(`.dark-button`);
    CurrentTheme = 'dark';
}

//

// -------------------------------------------------------------------- Settings prompt -------------------------------------------------------------------- //

Settings_Button.onclick = (event) => {

  // Check if the prompt is open //
  if (isOpen === true) {
    Settings_Prompt.classList.remove('show');
    Settings_Prompt.classList.add('hide');

    CurrentTheme_Button.style.visibility = 'hidden';
    isOpen = false;
  } else {
    Settings_Prompt.classList.remove('hide');
    Settings_Prompt.classList.add('show');

    CurrentTheme_Button.style.visibility = 'visible';
    isOpen = true;
  }
}

//