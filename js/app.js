// Variables

const Light_Button = document.querySelector('.light-button');
const Dark_Button = document.querySelector('.dark-button');
const Body = document.body;

const Settings_Button = document.querySelector('.settings-button');
const Settings_Prompt = document.querySelector('.settings-prompt');

const Cookie_Concent = document.querySelector('.cookie-consent');
const Cookie_Button = document.querySelector('.cookie-button');

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

//

// Check for Theme

const Theme = getCookie('theme')

if (Theme === null) {
    Light_Button.classList.remove('show-light');
    Light_Button.classList.add('hide-light');

    Dark_Button.classList.add('show-dark');
    Dark_Button.classList.remove('hide-dark');
}

if (Theme) {
    console.log('Theme is not null')
    Body.classList.replace('dark', Theme);

    // Check for theme //
    if (Theme === 'dark') {
        Light_Button.classList.remove('show-light');
        Light_Button.classList.add('hide-light');

        Dark_Button.classList.add('show-dark');
        Dark_Button.classList.remove('hide-dark');
    } else {
        Light_Button.classList.add('show-light');
        Light_Button.classList.remove('hide-light');

        Dark_Button.classList.remove('show-dark');
        Dark_Button.classList.add('hide-dark');
    }
}

//

// Check for cookie

const Cookie_Consent_Cookie = getCookie('consent-clicked');
console.log(Cookie_Consent_Cookie)

if (Cookie_Consent_Cookie === '' ) {
  Cookie_Concent.classList.add('show');
}

//

// Click event listener

Dark_Button.onclick = () => {
    // Replace class //
    Body.classList.replace('dark', 'light');
    // Remove and add classes //
    Light_Button.classList.add('show-light');
    Light_Button.classList.remove('hide-light');

    Dark_Button.classList.remove('show-dark');
    Dark_Button.classList.add('hide-dark');
    // Set local storage //
    setCookie('theme', 'light', 365);
    console.log('Clicked');
}

Light_Button.onclick = () => {
    console.log('Clicked');
    // Replace class //
    Body.classList.replace('light', 'dark');
    // Remove and add classes //
    Light_Button.classList.remove('show-light');
    Light_Button.classList.add('hide-light');

    Dark_Button.classList.add('show-dark');
    Dark_Button.classList.remove('hide-dark');
    // Set local storage //
    setCookie('theme', 'dark', 365);
    console.log('Clicked');
}

// Settings prompt //
Settings_Button.onclick = () => {
  console.log('Clicked');
  console.log(isOpen);
  // Check if the prompt is open //
  if (isOpen === true) {
    Settings_Prompt.classList.remove('show');
    Settings_Prompt.classList.add('hide');
    isOpen = false;
  } else {
    Settings_Prompt.classList.remove('hide');
    Settings_Prompt.classList.add('show');
    isOpen = true;
  }
}

// Cookie consent //
Cookie_Button.onclick = () => {
  Cookie_Concent.classList.remove('show');

  // Set cookie //
  setCookie('consent-clicked', 'clicked', 365);
};

//