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
    objNumber = objNumber.replace('A', '');

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

      if (imageSrc) {
        resultcard.find('img').attr('src', imageSrc);
      }
      else {
        resultcard.find('img').remove();
      }

      return resultcard;
    }

    function createPanel(collections, subjects) {
      // archives
      const collectionsEls = collections.slice(0, 3).map(col => $(`<li>${col.title}</li>`));
      collectionsEls.forEach(col => {
        col.css({
          'background-image': 'url(/assets/icons/archive.svg)',
          'background-size': '.75rem .75rem',
          'background-repeat': 'no-repeat',
          'background-position': 'left center',
          'padding-left': '1rem'
        });
      });
      console.info(collections, collectionsEls);

      // subjects
      const subjectsEls = subjects.map(sub => $(`<li>${sub.name}</li>`));

      subjectsEls.forEach(function(subject) {
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
      collectionsEls.forEach(c => list.append(c));
      subjectsEls.forEach(function(subject) {
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

    var q1 = $.ajax('https://api.wellcomecollection.org/api/hack/smg_record/accession', { data: {accession_id: objNumber} }).then(resp => {
      var data = resp.sort(function(a, b) {
        if (a.image_uri) {
          return -1;
        }
        else {
          return 1;
        }
      });

      data = data.filter(item => {
        og_url = $('meta[property="og:url"]').attr('content');
        if (item.uri != og_url) {
          return true;
        }
        else {
          return false;
        }
      });

      var newThings = data.slice(0, 4).map(adjass => {
        return createResultcard(adjass.title, adjass.image_uri, adjass.uri);
      });


      var person = $('ul.related-people li:first').text().trim();
      var q2 = $.ajax('https://api.wellcomecollection.org/api/hack/collection', { data: {q: person} }).then(resp => {
        var collections = resp.collections;
        var subjects = resp.subjects;
        var panel = createPanel(collections, subjects);

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

    });

  }

};
