var run = window.location.pathname.match('object');

if (!run) { throw Error('Boooooooooooooooooom.'); };


var s = document.createElement('script');
s.src='http://code.jquery.com/jquery-3.1.1.js';
document.head.appendChild(s);
console.info('I am Hank');


s.onload = function() {
  $('.record-details').css({
    'border-bottom': '0'
  });

  var related = $('.record-related');
  var ass = related.clone();
  var assChildClone = ass.find('.columns.end').first().clone();
  var objNumber = $('.details-Object-Number dd').text().trim();

  if (objNumber.startsWith('A')) {
    ass.find('h2').text('Henry Also Bought');
    ass.css({
      padding: '1.5em 0',
      margin: '0 0 0 -0.5em'
    });

    function createResultcard(title, imageSrc, href) {
      var resultcard = assChildClone.clone();
      resultcard.addClass('large-3 medium-4 small-6 columns end');
      resultcard.find('a').attr({ href: href });
      resultcard.find('.resultcard__title').text(title);
      resultcard.find('img').attr('src', imageSrc);
      return resultcard;
    }

    function createPanel() {
      // archives
      var archive = $.parseHTML('<li>Lister Institute archive</li>');
      $(archive).css({
        'background-image': 'url(/assets/icons/archive.svg)',
        'background-size': '.75rem .75rem',
        'background-repeat': 'no-repeat',
        'background-position': 'left center',
        'padding-left': '1rem'
      });

      // subjects
      var subjects = new Array();
      subjects.push($.parseHTML('<li>Surgery</li>'));
      subjects.push($.parseHTML('<li>Antispetics</li>'));
      subjects.forEach(function(subject) {
        $(subject).css({
          'background-image': 'url(/assets/icons/list.svg)',
          'background-size': '.75rem .75rem',
          'background-repeat': 'no-repeat',
          'background-position': 'left center',
          'padding-left': '1rem'
        });
      });

      // create panel
      var list = $('<ul />');
      list.append(archive);
      subjects.forEach(function(subject) {
        list.append(subject);
      });

      panelText = $('<div class="panel panel__text" />');
      panelText.append('<h4>Find out more</h4><p>Are you super-curious? Research the story behind this object at Wellcome Collection.</p>');
      panelText.append(list);

      panelLogo = $('<p style="text-align: right; padding: 0 1.5em 1.5em 0; margin: -0.5em 0 0 0"><img src="https://next.wellcomecollection.org/assets/images/wellcome-collection-black.png" width="100" /></p>');

      var panel = $('<div class="panel" style="margin: 3.85em 0" />');
      panel.append(panelText);
      panel.append(panelLogo);

      return panel;
    }

    $.ajax('https://api.wellcomecollection.org/api/hack/record', { data: {accession_id: objNumber} }).then(resp => {
      var newThings = resp.adjacent_accessions.map(adjass => {
        return createResultcard(adjass.title, adjass.image_uri, adjass.uri);
      });

      var panel = createPanel();

      ass.find('.columns.end').remove();
      ass.find('.nested.row').append(newThings);
      ass.find('.nested.row').append(panel);

      var section = $('<section style="background: white" />');
      var row = $('<div class="row" />');

      section.append(row);
      row.append(ass);
      row.append(panel);

      ass.wrap('<div class="columns medium-8" />');
      panel.wrap('<div class="columns medium-4" />');

      related.before(section);
    });
  }

};
