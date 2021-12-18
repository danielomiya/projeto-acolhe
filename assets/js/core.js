/**
 * Checks whether the request returned a successful response.
 * @param {Response} response
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Parses the response if it has a body
 * @param {Response} response
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
  document.forms['contact-form'].addEventListener('submit', e => {
    e.preventDefault();
    const submitter = e.target.querySelector('input[type="submit"], button');
    if (submitter) submitter.classList.add('no-click');

    const form = new FormData(e.target);
    form.append('userAgent', navigator.userAgent);

    fetch(e.target.action, {
      body: form,
      method: e.target.method,
      redirect: 'follow',
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(() => {
        e.target.reset();
        swal({
          icon: 'success',
          title: 'Enviado!',
          text: 'Em breve entraremos em contato com você! :)'
        });
        if (submitter) submitter.classList.remove('no-click');
      });
  });
});
