$.ajax('http://localhost:8000/_search', {
  type: 'POST',
  contentType : 'application/json',
  data: JSON.stringify({
    "query": {
      "bool": {
        "must": [{
          "term": {
            "measurements.dimensions.units": "mm"
          }
        }, {
          "term": {
            "measurements.dimensions.dimension": "width"
          }
        }, {
          "term": {
            "multimedia.processed.large.format": "jpeg"
          }
        }]
      }
    }
  }),
  success: function(data) {
    const tings = data.hits.hits.map(hit => {
      const src = hit._source;
      const dims = (src.measurements.dimensions|| []).reduce((acc, dim) => {
        if (dim.units === 'mm') {
          acc[dim.dimension] = dim.value;
        }

        return acc;
      }, {});
      return {title: src.title[0].value, dims};
    });

    var posY = 0;
    tings.forEach(t => {
      if (t.dims.width && t.dims.heigh < 1000) {
        console.info(t.title);
        console.info(t.dims);
        console.info('----------------------');

        posY -= t.dims.height/100;
        addBlock(t.dims.width/100, t.dims.height/100, t.dims.depth/100, posY);
      }
    });
  }
});
