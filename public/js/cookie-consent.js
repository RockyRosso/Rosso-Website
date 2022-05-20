// Variables

const Cookie_Consent = document.querySelector('.cookie-consent');
const Cookie_Button = document.querySelector('.cookie-button');

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

// Check for cookie

const Cookie_Consent_Cookie = getCookie('consent-clicked');
console.log(Cookie_Consent_Cookie)

if (Cookie_Consent_Cookie === '' ) {
  Cookie_Consent.classList.add('show');
}

//

// Listen for button click

Cookie_Button.onclick = () => {
    Cookie_Consent.classList.remove('show');
  
    // Set cookie //
    setCookie('consent-clicked', 'clicked', 365);
};

//