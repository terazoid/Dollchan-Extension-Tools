$(() => {
  // if no Dollchan detected
  if (!$('#de-main').length) {
    $('#myModal').modal({
      backdrop: 'static',
      keyboard: false
    });
    return;
  }

  const getStorage = (key) => {
    return JSON.parse(window.localStorage.getItem(key) || '{}');
  }

  const setStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  const currentStyle = {};
  let selectedFeatures = getStorage('selectedFeatures');

  const inputChecked = (input) => {
    const checked = input.checked;
    const feature = input.dataset.feature;
    const style = input.dataset.style;
    const disableQuery = input.dataset.disable;
    const enableQuery = input.dataset.enable;
    if (checked) {
      $('head').append(`<style type="text/css" id=${ feature }>${ style }</style>`);
      currentStyle[feature] = style;
      selectedFeatures[feature] = true;
    } else {
      $(`#${ feature }`).remove();
      delete currentStyle[feature];
      delete selectedFeatures[feature];
    }
    if (disableQuery) {
      $(disableQuery).toggleClass('text-muted', checked)
        .find('input').prop('disabled', checked);
    }
    if (enableQuery) {
      $(enableQuery).toggleClass('text-muted', !checked)
        .find('input').prop('disabled', !checked);
    }
  }

  $('input[data-feature]').change((event) => {
    inputChecked(event.target);
    setStorage('selectedFeatures', selectedFeatures);
  });

  $('input[data-feature]').map((index, input) => {
    const feature = input.dataset.feature;
    if (selectedFeatures[feature]) {
      input.checked = true;
      inputChecked(input);
    }
  });

  $('#saveModal').on('show.bs.modal', (event) => {
    let x = Object.keys(currentStyle).reduce((previous, key) => {
      return previous + ' ' + currentStyle[key];
    }, '');
    $('#saveModal').find('textarea').text(x);
  });

  $('#btn-copy-result').click((event) => {
    $('#saveModal').find('textarea').focus().select();
    document.execCommand("copy");
  })
});
