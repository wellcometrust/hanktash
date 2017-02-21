var run = window.location.pathname.match('object');

if (!run) { throw Error('Boooooooooooooooooom.'); };


var s = document.createElement('script');
s.src='http://code.jquery.com/jquery-3.1.1.js';
document.head.appendChild(s);
console.info('I am Hank');


s.onload = function() {
  var related = $('.record-related');
  var ass = related.clone();
  var assChildClone = ass.find('.columns.end').first().clone();
  var objNumber = $('.details-Object-Number dd').text().trim();

  if (objNumber.startsWith('A')) {
    ass.find('h2').text('Also stolen from Wellcome');
    ass.css({
      padding: '2em 0',
      margin: 0,
      background: 'white'
    });
    function createResultcard(title, imageSrc, href) {
      var resultcard = assChildClone.clone();
      resultcard.find('a').attr({ href: href });
      resultcard.find('.resultcard__title').text(title);
      resultcard.find('img').attr('src', imageSrc);
      return resultcard;
    }

    $.ajax('https://api.wellcomecollection.org/api/hack/record', { data: {accession_id: objNumber} }).then(resp => {
      var newThings = resp.adjacent_accessions.map(adjass => {
        return createResultcard(adjass.title, adjass.image_uri, adjass.uri);
      });

      ass.find('.columns.end').remove();
      ass.find('.nested.row').append(newThings);
      related.before(ass);
    });
  }

};
