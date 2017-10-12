const authenticate = () => {
  const email = $('.email-input').val();
  const appName = $('.appName-input').val();
  console.log('email', email);
  console.log('appName', appName);

  fetch('/api/v1/authenticate', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(result => console.log(result))
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

$('.submit-button').on('click', authenticate);
$('.email-input').on('input', toggleButton);
$('.appName-input').on('input', toggleButton);
