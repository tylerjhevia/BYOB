const authenticate = () => {
  const email = $('.email-input').val();
  const appName = $('.appName-input').val();
  const user = { email, appName };

  fetch('/api/v1/authenticate', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json()).then(response => appendToken(response))
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

const appendToken = authorization => {
    const {token, admin} = authorization
    $('.display').empty();
    $('.display').append(`<div class='authorization'>
    <p class='token'>Token: ${token}</p>
    <p class='admin'>Admin privileges: ${admin}</p>
    </div>`)

}

$('.submit-button').on('click', authenticate);
$('.email-input').on('input', toggleButton);
$('.appName-input').on('input', toggleButton);
