const authenticate = () => {
  const email = $('.email-input').val();
  const appName = $('.appName-input').val();
  const user = { email, appName };

  fetch('/api/v1/authenticate', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(response => appendToken(response, user))
    .catch(error => console.log(error));
};

const toggleButton = () => {
  const email = $('.email-input').val();
  const appName = $('.appName-input').val();
  if (email === '' || appName === '') {
    $('.submit-button').prop('disabled', true);
  } else {
    $('.submit-button').prop('disabled', false);
  }
};

const appendToken = (authorization, userInfo) => {
  const { token, admin } = authorization;
  const { email, appName } = userInfo;
  $('.display').empty();
  if (email.toLowerCase() === 'sweet' && appName.toLowerCase() === 'action') {
    return $('.display').append('<h1>SWEET ACTION</h1>');
  }
  $('.display').append(`<div class='authorization'>
    <p class='email'>EMAIL: ${email}</p>
    <p class='appName'>APP NAME: ${appName}</p>
    <p class='token'>TOKEN: ${token}</p>
    <p class='admin'>ADMIN PRIVILEGES: ${admin}</p>
    </div>`);
};

const clearFields = () => {
  $('.email-input').val('');
  $('.appName-input').val('');
};

$('.submit-button').on('click', authenticate).on('click', clearFields);
$('.email-input').on('input', toggleButton);
$('.appName-input').on('input', toggleButton);
