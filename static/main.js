const URL_PARAMS = new URLSearchParams(window.location.search);
const TOKEN = URL_PARAMS.get('token');

//Show element
const show = (selector) => {
    document.querySelector(selector).style.display = 'block';
};

//Hide element
const hide = (selector) => {
    document.querySelector(selector).style.display = 'none';
};

if(TOKEN){
    hide('.unauthorized-content');
    show('.authorized-content');
};