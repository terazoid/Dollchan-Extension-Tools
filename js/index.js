$(() => {
  // if no Dollchan detected
  if (!$('#de-main').length) {
    $('#myModal').modal({
      backdrop: 'static',
      keyboard: false
    });
    return;
  }

  $('.feature-color').colorpicker({ /*options...*/ });

  const getStorage = (key) => {
    return JSON.parse(window.localStorage.getItem(key) || '{}');
  }

  const setStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  const currentStyle = {};
  let selectedFeatures = getStorage('selectedFeatures');

  const inputChanged = (input) => {
    const feature = input.dataset.feature;
    const value = input.value || input.checked;
    const def = input.dataset.default;
    if (value == def || !value) {
      $(`#${ feature }-style`).remove();
      delete currentStyle[feature];
      delete selectedFeatures[feature];
    } else {
      const style = input.dataset.style.replace('%s', value);
      currentStyle[feature] = style;
      selectedFeatures[feature] = value;
      if ($(`#${ feature }-style`).html(style).length === 0) {
        $('head').append(`<style type="text/css" id="${ feature }-style">${ style }</style>`);
      }
    }
    const disableQuery = input.dataset.disable;
    if (disableQuery) {
      $(disableQuery).toggleClass('text-muted', value)
        .find('input').prop('disabled', value);
    }
    const enableQuery = input.dataset.enable;
    if (enableQuery) {
      $(enableQuery).toggleClass('text-muted', !value)
        .find('input').prop('disabled', !value);
    }
  }

  $('input[data-feature]').change((event) => {
    inputChanged(event.target);
    setStorage('selectedFeatures', selectedFeatures);
  });

  $('input[data-feature]').map((index, input) => {
    const feature = input.dataset.feature;
    const value = selectedFeatures[feature];
    if (value) {
      if (input.type === 'checkbox') {
        input.checked = value;
      } else {
        input.value = value;
        $(input).parent('.feature-color').colorpicker('setValue', value);
      }
      inputChanged(input);
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
