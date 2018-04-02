function customizeINIT() {
  var color1Elements = ['.panel', 'background-color'];
  var color2Elements = ['.panel', 'color'];
  var color3Elements = ['body', 'background-color'];

  if (typeof(Storage) === 'undefined') {
    console.log('No local Storage');
  } else {
    if(typeof(localStorage.color1) === 'undefined') {
      localStorage.color1 = '#ffffff';
      localStorage.color2 = '#701931';
      localStorage.color3 = '#cec7bf';
    }
    else {
      $('#color1').val(localStorage.color1);
      $('#color2').val(localStorage.color2);
      $('#color3').val(localStorage.color3);

      console.log(localStorage);

      updateColors(localStorage.color1, localStorage.color2, localStorage.color3);

      console.log('called');
    }
  }

  function updateColors(clr1, clr2, clr3) {
    localStorage.color1 = clr1;
    localStorage.color2 = clr2;
    localStorage.color3 = clr3;

    console.log($(color1Elements[0]));

    $(color1Elements[0]).css(color1Elements[1], clr1);
    $(color2Elements[0]).css(color2Elements[1], clr2);
    $(color3Elements[0]).css(color3Elements[1], clr3);
  }

  $('#saveCustomize').click(function() {
    updateColors($('#color1').val(),$('#color2').val(),$('#color3').val());
  });
}
