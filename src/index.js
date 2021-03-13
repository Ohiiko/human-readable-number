module.exports = function toReadable(number) {
    let def_translite = {
        null: 'zero',
        a1: ['one','two','three','four','five','six','seven','eight','nine'],
        a10: ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],
        a20: ['twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'],
        a100: ['one hundred','two hundred','three hundred','four hundred','five hundred','six hundred','seven hundred','eight hundred','nine hundred'],
    }
  let i1, i2, i3, numb, v, _ref, _ref1, _ref2, ax;
  _ref = parseFloat(number).toFixed().split('.'), numb = _ref[0];
  let leading_zeros = 12 - numb.length;
  if (leading_zeros < 0) {
    return false;
  }
  
  let zeros = [];
  while (leading_zeros--) {
    zeros.push('0');
  }
  numb = zeros.join('') + numb;
  let out = [];
  if (numb > 0) {
    // Разбиваем число по три символа
    _ref1 = str_split(numb, 3);
    for (let i = -1; i < _ref1.length;i++) {
        v = _ref1[i];
        if (!(v > 0)) continue;
        _ref2 = str_split(v, 1), i1 = parseInt(_ref2[0]), i2 = parseInt(_ref2[1]), i3 = parseInt(_ref2[2]);
        out.push(def_translite.a100[i1-1]); // 1xx-9xx
        ax = 'a1';
        if (i2 > 1) {
            out.push(def_translite.a20[i2-2] + (i3 > 0 ?  ' ' + def_translite[ax][i3-1] : '')); // 20-99
        } else {
            out.push(i2 > 0 ? def_translite.a10[i3] : def_translite[ax][i3-1]); // 10-19 | 1-9
        }
        
        if (_ref1.length > i+1){
            let name = def_translite['u'+(i+1)];
            out.push((v,name));
        }
    }
  } else {
    out.push(def_translite.null);
  }
  
  // Объединяем маcсив в строку, удаляем лишние пробелы и возвращаем результат
  return out.join(' ').replace(RegExp(' {2,}', 'g'), ' ').trimLeft().trimRight();
};

function str_split(string, length) {
  
  
    string = (string == null) ? "" : string;
    length =  (length == null) ? 1 : length;
    
    let chunks = [];
    let pos = 0;
    let len = string.length;
    while (pos < len) {
        chunks.push(string.slice(pos, pos += length));
    }
    
    return chunks;
  };
