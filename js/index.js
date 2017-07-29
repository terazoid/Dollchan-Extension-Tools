/* jshint esversion: 6 */

$(() => {
  // if no Dollchan detected
  if (!$('#de-main').length) {
    $('#myModal').modal({
      backdrop: 'static',
      keyboard: false
    });
    return;
  }

  // storage
  const getStorage = (key) => JSON.parse(window.localStorage.getItem(key) || '{}');
  const setStorage = (key, data) => window.localStorage.setItem(key, JSON.stringify(data));

  const currentStyle = {};
  let selectedFeatures = getStorage('selectedFeatures');

  const featureChnanged = (featureElement) => {
    const feature = featureElement.dataset.feature;
    const type = featureElement.dataset.type || 'checkbox';
    const isEnabled = $(featureElement).find(':checkbox').prop('checked');
    let style = featureElement.dataset.style || '';
    let value = true;

    if (!isEnabled) {
        $(`#${ feature }-style`).remove();
        delete currentStyle[feature];
        delete selectedFeatures[feature];
        if (type === 'color') {
          $(featureElement).find('.colorpicker-component').colorpicker('disable');
        }
    } else {
      if (type !== 'checkbox') {
        if (type === 'color') {
          $(featureElement).find('.colorpicker-component').colorpicker('enable');
          value = $(featureElement)
            .find('.colorpicker-component')
              .data('colorpicker').color.toHex();
        } else {
          value = $(featureElement).find(':text').val();
        }
        style = style.replace('%s', value);
      }
      selectedFeatures[feature] = value;
      currentStyle[feature] = style;
      if ($(`#${ feature }-style`).html(style).length === 0) {
        $('head').append(`<style type="text/css" id="${ feature }-style">${ style }</style>`);
      }
    }

    const disableQuery = featureElement.dataset.disable;
    if (disableQuery) {
      const disEl = $(disableQuery);
      disEl.toggleClass('text-muted', isEnabled);
      disEl.find('input').prop('disabled', isEnabled);
      disEl.find('.colorpicker-component').colorpicker(isEnabled ? 'enable' : 'disable');
    }
    const enableQuery = featureElement.dataset.enable;
    if (enableQuery) {
      const enEl = $(enableQuery);
      enEl.toggleClass('text-muted', !isEnabled);
      enEl.find('input').prop('disabled', !isEnabled);
      enEl.find('.colorpicker-component').colorpicker(!isEnabled ? 'enable' : 'disable');
    }

    setStorage('selectedFeatures', selectedFeatures);
  };

  const init = () => {
    // init inputs
    $('[data-feature]').map((index, featureElement) => {
      const feature = featureElement.dataset.feature;
      const defaultVal = featureElement.dataset.default;
      const type = featureElement.dataset.type || 'checkbox';
      const style = featureElement.dataset.style || '';
      const callback = featureChnanged.bind(null, featureElement);

      $(featureElement)
        .find(':checkbox')
          .change(callback)
          .prop('checked', feature in selectedFeatures);

      if (type === 'color') {
        let value = selectedFeatures[feature] || defaultVal;
        $(featureElement)
          .find('.colorpicker-component')
            .colorpicker({color: value})
            .on('changeColor', callback);
      }

      callback();
    });

    // init save dialog button
    $('#saveModal').on('show.bs.modal', (event) => {
      const x = Object.keys(currentStyle).reduce((previous, key) => {
        return previous + ' ' + currentStyle[key];
      }, '');
      $('#saveModal').find('textarea').text(x);
    });

    // init copy button
    $('#btn-copy-result').click((event) => {
      $('#saveModal').find('textarea').focus().select();
      document.execCommand("copy");
    });
  };



  init();
});
