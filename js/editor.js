

function editorPC () {

  function menuClass(el) {
    var enable = false, visible = false;
    this.onEnable = function() {
    }
    this.onDisable = function() {
    }
    Object.defineProperty(this, 'enable', {
      get: function() { return enable; },
      set: function(newValue) { 
        if (typeof newValue !== "boolean") throw 'A propriedade enable só aceita valor booleano.';
        enable = newValue;
        if (enable) this.onEnable.call(el);
        else this.onDisable.call(el);
      },
      enumerable: true,
      configurable: false
    });
    this.onShow = function(menu) {
    }
    this.onHide = function(menu) {
    }
    Object.defineProperty(this, 'target', {
      get: function() { return el; },
    });
    Object.defineProperty(this, 'visible', {
      get: function() { return enable; },
      set: function(newValue) { 
        if (typeof newValue !== "boolean") throw 'A propriedade visible só aceita valor booleano.';
        var classes = el.className.split(' '),
        showIndex = classes.indexOf('show');
        visible = newValue;
        if (visible) {
          if (showIndex <= 0 ) {
            el.className = (classes.join(' ')+' show').trim();
          }
          this.onShow.call(el);
        } else {
          if (showIndex >= 0 ) {
            classes.splice(showIndex, 1);
            el.className = classes.join(' ');
          }
          this.onHide.call(el);
        }
      },
      enumerable: true,
      configurable: false
    });
  }

  var elMenuButton = document.getElementById('btOptions'),
  elMoreButton = document.getElementById('btMore'),
  menuOptions = new menuClass(document.getElementById('options')),
  menuMore= new menuClass(document.getElementById('more'));
  elMenuButton.addEventListener('click',function(){menuOptions.visible = true;menuMore.visible = false});
  elMoreButton.addEventListener('click',function(){menuMore.visible = true;menuOptions.visible = false;});
  document.getElementsByTagName('main')[0].addEventListener('click',function(){menuMore.visible = false;menuOptions.visible = false});
  document.getElementById('headerTitle').addEventListener('click',function(){menuMore.visible = false;menuOptions.visible = false});

}

window.addEventListener('load', function () {teste = new editorPC()} );






/*
function menu(e) {
    if (e.querySelector('.submenu').style['display'] == 'block') {
        e.querySelector('.submenu').style['display'] = '';
    } else {
        var subs = document.querySelectorAll('.submenu');
        for (x in subs) {
            subs.item(x).style['display'] = '';
        }
        e.querySelector('.submenu').style['display'] = 'block';
    }
}

function toggleFullScreen(element) {
    if (!element) {
        element = document.documentElement;
    }
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
function novo() {
    if (oExit.changed) {
        if (!confirm(oExit.message + '\n\nTem certeza que deseja fechar a prestação atual?')) {
            return false;
        }
    }
    displayResult('<faperj><fomento processo=""><modalidade/><outorgado></outorgado><projeto><nome/><endereco/><outorga data=""/><auxilio><valor>0</valor></auxilio></projeto><aplicacao tipo="proprio"><valor>0</valor></aplicacao><aplicacao tipo="corrente"><valor>0</valor></aplicacao><aplicacao tipo="capital"><valor>0</valor></aplicacao><aplicacao tipo="rendimento"><valor>0</valor></aplicacao><carta><drd/><rdc/><ttb/><dcd/><cds/><tcc/><cbi/><cec/><eaf/><ebc/></carta></fomento></faperj>', 'editor', document.body, false);
    document.querySelector("input[name='tipo']").click();
    oExit.changed = false;
    return true;
}
function salvar(name) {
    oExit.changed = false;
    var s = document.getElementById('salvarXML');
    if (typeof (name) !== 'undefined') {
        s.action += name ? "?name=" + name : '';
        xml.getElementsByTagName('faperj').item(0).setAttribute('arquivo', name);
        xml.getElementsByTagName('faperj').item(0).setAttribute('ver', '1.6');
    }
    document.getElementById('tXML').innerHTML = convertXMLEntities((new XMLSerializer).serializeToString(xml));
    s.submit();
    displayObjResultText(xml, 'editor', document.body, false);
}
function fechar() {
    if (oExit.changed) {
        if (!confirm(oExit.message + '\n\nTem certeza que deseja fechar a prestação atual?')) {
            return false;
        }
    }
    removeNode(xml.querySelector('fomento'));
    displayObjResultText(xml, 'editor', document.body, false);
    oExit.changed = false;
    return true;
}
function insereTransf(tipo) {
    tipo = convertXMLEntities(tipo);
    xml.getElementsByTagName('fomento').item(0).innerHTML += '<transferencia tipo="' + tipo + '" data="" id="idt' + Math.random().toString(16).slice(2) + '"><destino></destino></transferencia>';
    displayObjResultText(xml, 'editor', document.body);
}
function insereColaborador() {
    xml.getElementsByTagName('fomento').item(0).innerHTML += '<servico id="ids' + Math.random().toString(16).slice(2) + '"><beneficiado><nome></nome><endereco></endereco><identidade><emissor></emissor><expedicao></expedicao></identidade></beneficiado><valor></valor><descricao></descricao></servico>';
    displayObjResultText(xml, 'editor', document.body);
}
function insereBem(id, nf, nfdata, desc, qtd, un, local, origem) {
    id = convertXMLEntities(id);
    desc = convertXMLEntities(desc);
    qtd = convertXMLEntities(qtd);
    un = convertXMLEntities(un).replace(/\./gi, '').replace(/\,/gi, '');
    local = convertXMLEntities(local);
    xml.querySelector('[id=' + id + ']').innerHTML += '<bem origem="' + origem + '" id="idb' + Math.random().toString(16).slice(2) + '"><notafiscal numero="' + nf + '" data="' + nfdata + '" /><descricao>' + desc + '</descricao><qtd>' + qtd + '</qtd><preco>' + un + '</preco><localizacao>' + local + '</localizacao></bem>';
    displayObjResultText(xml, 'editor', document.body);
}
function insereDespesaDetalhada(tipo, documento, pagamento, valor, favorecido, cheque) {
    documento = convertXMLEntities(documento);
    pagamento = convertXMLEntities(pagamento);
    valor = convertXMLEntities(valor).replace(/\./gi, '').replace(/\,/gi, '');
    favorecido = convertXMLEntities(favorecido);
    xml.getElementsByTagName('fomento').item(0).innerHTML += '<despesa tipo="' + tipo + '" id="' + 'idd' + Math.random().toString(16).slice(2) + '"><documento>' + documento + '</documento><pagamento>' + pagamento + '</pagamento><valor>' + valor + '</valor><favorecido>' + favorecido + '</favorecido><cheque>' + cheque + '</cheque></despesa>';
    displayObjResultText(xml, 'editor', document.body);
}
function alteraDespesaDetalhada(el, id, campo, valor) {
    var parent = el.parentNode
      , elCampo = parent.parentNode.parentNode.parentNode.querySelector('[name=' + campo + ']');
    parent.innerHTML = "";
    parent.appendChild(elCampo.cloneNode());
    var input = parent.firstChild
    input.removeAttribute("name");
    input.value = (typeof (valor) !== 'undefined' ? valor : (el.innerText || el.textContent).trim());
    input.focus();
    input.onchage = function() {
        var valor = (input.getAttribute('type').toLowerCase() == 'date' ? convertDate(input.value) : input.value);
        valor = (campo.toLowerCase() == 'valor' ? valor.replace(/\./gi, '').replace(/\,/gi, '') : valor);
        valor = convertXMLEntities(valor);
        xml.querySelector('[id=' + id + '] > ' + campo).innerHTML = valor;
        displayObjResultText(xml, 'editor', document.body);
    }
    ;
    input.onblur = input.onchage;
}
function insereDespesa(tipo, valor) {
    tipo = convertXMLEntities(tipo);
    valor = convertXMLEntities(valor).replace(/\./gi, '').replace(/\,/gi, '');
    xml.getElementsByTagName('fomento').item(0).innerHTML += "<despesa tipo='" + tipo + "'><valor>" + valor + "</valor></despesa>";
    displayObjResultText(xml, 'editor', document.body);
}
function removeNode(el) {
    try {
        el.parentNode.removeChild(el);
    } catch (e) {}
    displayObjResultText(xml, 'editor', document.body);
}
function insereNode(el, content) {
    el.innerHTML += content;
    displayObjResultText(xml, 'editor', document.body);
}
function transfTotal() {
    for (var z = 0; z < xml.getElementsByTagName('transferencia').length; z++) {
        var transf = xml.getElementsByTagName('transferencia')[z];
        var t = 0;
        var el = document.getElementById(transf.getAttribute('id'));
        for (var x = 0; x < transf.getElementsByTagName('bem').length; x++) {
            var bem = transf.getElementsByTagName('bem').item(x);
            t = t + (bem.getElementsByTagName('preco')[0].innerHTML * bem.getElementsByTagName('qtd')[0].innerHTML);
        }
        try {
            el.getElementsByTagName('tfoot').item(0).getElementsByTagName('td').item(2).innerHTML = "R$ " + (t / 100).formatMoney(2, ",", ".");
        } catch (e) {}
    }
}
function loadXMLString(txt) {
    if (window.DOMParser) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(txt, "text/xml");
    } else {
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(txt);
    }
    return xmlDoc;
}
function loadXMLDoc(filename) {
    if (window.ActiveXObject) {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else {
        xhttp = new XMLHttpRequest();
    }
    xhttp.open("GET", filename, false);
    xhttp.send("");
    agora = new Date(xhttp.getResponseHeader('date'));
    return xhttp.responseXML;
}
function displayObjResultText(oXML, fXSL, el) {
    displayResult((new XMLSerializer).serializeToString(oXML), fXSL, el, false);
    transfTotal();
}
function displayResult(tXML, fXSL, el, temp) {
    var oXML = loadXMLString(tXML);
    var xsl = loadXMLDoc(fXSL + '.xsl');
    if (!temp) {
        xml = (new DOMParser).parseFromString((new XMLSerializer).serializeToString(oXML), "text/xml");
        var tagFAPERJ = xml.querySelector('faperj');
        if (tagFAPERJ) {
            tagFAPERJ.setAttribute('data', agora.getFullYear() + '-' + ("0" + (agora.getMonth() + 1)).slice(-2) + '-' + ("0" + agora.getDate()).slice(-2));
            tagFAPERJ.setAttribute('hora', ("0" + agora.getHours()).slice(-2) + ':' + ("0" + agora.getMinutes()).slice(-2) + ':' + ("0" + agora.getSeconds()).slice(-2));
        }
    }
    // code for IE
    if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        var ex = oXML.transformNode(xsl);
        el.innerHTML = ex;
    } else if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(oXML, document);
        el.innerHTML = '';
        el.appendChild(resultDocument);
    }
    transfTotal();
    var eInput = document.querySelectorAll('input');
    for (var i = 0; i < eInput.length; i++) {
        eInput[i].addEventListener('change', function(e) {
            if (e.target.getAttribute('id') != 'fXML')
                oExit.changed = true;
        });
    }
}
function convertDate(data) {
    pattern = /^\d{2}\/\d{2}\/\d{4}$/g;
    if (pattern.test(data)) {
        return data.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, '$3-$2-$1');
    } else {
        return data;
    }
}
function convertXMLEntities(valor) {
    valor = valor.replace(/\&/gi, '&#38;');
    valor = valor.replace(/'/gi, '&#39;');
    valor = valor.replace(/\</gi, '&#60;');
    valor = valor.replace(/\>/gi, '&#62;');
    valor = valor.replace(/\n/g, '\\n');
    return valor;
}
function convertXMLEntitiesToPost(valor) {
    valor = valor.replace(/\&/gi, '&#38;');
    return valor;
}
function convertSave(tXML) {
    if (tXML.length > 0) {
        var oXML = loadXMLString(tXML);
        try {
            var pattern = /<\s*faperj.*?>/
              , matches = pattern.exec(tXML);
            pattern = /ver=\".*?\"/;
            matches = pattern.exec(matches[0]);
            pattern = /(\d{1,}\.|\d{1,}){1,}/;
            matches = pattern.exec(matches[0]);
        } catch (e) {
            matches = Array('');
        }
        switch (matches[0]) {
        case '':
            var oOutorgado = oXML.querySelector('faperj > fomento > outorgado');
            if (oOutorgado.getAttribute('tipo') == 'PF') {
                oOutorgado.innerHTML = '<pessoafisica vinculo="I" cpf="' + (oOutorgado.querySelector('pesquisador').getAttribute('cpf') ? oOutorgado.querySelector('pesquisador').getAttribute('cpf') : '') + '"><nome>' + oOutorgado.querySelector('pesquisador').innerHTML + '</nome><vinculo><instituicao cnpj=""><nome>' + oOutorgado.querySelector('instituicao').innerHTML + '</nome><departamento>' + oOutorgado.querySelector('departamento').innerHTML + '</departamento><endereco>' + oOutorgado.querySelector('endereco').innerHTML + '</endereco><telefone ddd="' + oOutorgado.querySelector('telefone').getAttribute('ddd') + '">' + oOutorgado.querySelector('telefone').innerHTML + '</telefone><email>' + oOutorgado.querySelector('email').innerHTML + '</email></instituicao></vinculo></pessoafisica>';
            } else if (oOutorgado.getAttribute('tipo') == 'PJ') {
                oOutorgado.innerHTML = '<pessoajuridica cnpj="' + (oOutorgado.querySelector('pesquisador').getAttribute('cpf') ? oOutorgado.querySelector('pesquisador').getAttribute('cpf') : '') + '"><razao>' + oOutorgado.querySelector('pesquisador').innerHTML + '</razao><representante></representante><endereco>' + oOutorgado.querySelector('endereco').innerHTML + '</endereco><telefone ddd="' + oOutorgado.querySelector('telefone').getAttribute('ddd') + '">' + oOutorgado.querySelector('telefone').innerHTML + '</telefone><email>' + oOutorgado.querySelector('email').innerHTML + '</email></pessoajuridica>';
            }
            try {
                oXML.querySelector('faperj > fomento > carta').innerHTML += "<eaf/>";
                oXML.querySelector('faperj > fomento > carta').innerHTML += "<cbi/>";
                oOutorgado.removeChild(oOutorgado.querySelector('pequisador'));
                oOutorgado.removeChild(oOutorgado.querySelector('instituicao'));
                oOutorgado.removeChild(oOutorgado.querySelector('departamento'));
                oOutorgado.removeChild(oOutorgado.querySelector('endereco'));
                oOutorgado.removeChild(oOutorgado.querySelector('telefone'));
                oOutorgado.removeChild(oOutorgado.querySelector('email'));
            } catch (e) {}
            if (oOutorgado.getAttribute('tipo') == 'PF') {
                var oTransfs = oXML.querySelectorAll('faperj > fomento > transferencia');
                for (var i = 0; i < oTransfs.length; i++) {
                    if (oTransfs[i].getAttribute('tipo') == 'I' || oTransfs[i].getAttribute('tipo') == 'J')
                        oTransfs[i].querySelector('destino').innerHTML = '';
                    else if (oTransfs[i].getAttribute('tipo') == 'E')
                        oTransfs[i].querySelector('destino').innerHTML = '<instituicao><endereco>' + oTransfs[i].querySelector('endereco').innerHTML + '</endereco><nome>' + oTransfs[i].querySelector('instituicao').innerHTML + '</nome></instituicao>';
                    var oBens = oTransfs[i].querySelectorAll('bem');
                    for (var w = 0; w < oBens.length; w++) {
                        if (oBens[w].getAttribute('origem') == 'nacional')
                            oBens[w].setAttribute('origem', 'B');
                        else if (oBens[w].getAttribute('origem') == 'importado')
                            oBens[w].setAttribute('origem', 'E');
                    }
                }
            }
            break;
        case '1.3':
            if (!oXML.querySelector('faperj > fomento > carta > eaf')) {
                oXML.querySelector('faperj > fomento > carta').innerHTML += "<eaf/>";
            }
            if (!oXML.querySelector('faperj > fomento > carta > cbi')) {
                oXML.querySelector('faperj > fomento > carta').innerHTML += "<cbi/>";
            }
            break;
        case '1.4':
            var oDesp = oXML.querySelectorAll('faperj > fomento > despesa'), x;
            for (x in oDesp) {
                oDesp[x].innerHTML += "<cheque></cheque>";
                oDesp[x].innerHTML = (oDesp[x].innerHTML ? oDesp[x].innerHTML : '').replace(/<cheque>(.*)<\/cheque>(<cheque\/>)+/g, '<cheque>$1<\/cheque>');
            }
            break;
        case '1.5':
            break;
        case '1.6':
            var oModelos = oXML.querySelectorAll('faperj > fomento > *[print = true]');
            for (var x = 0; x < oModelos.length; x++) {
                let oModelo = oModelos[x];
                oModelo.removeAttribute('print');
            }
            break;
        }
    }
    return (new XMLSerializer).serializeToString(oXML);
}
function ExitPageConfirmer(message) {
    this.message = message;
    this.changed = false;
    window.onbeforeunload = function() {
        if (this.changed) {
            return this.message;
        }
    }
    .bind(this);
}
oExit = new ExitPageConfirmer("Você ainda não salvou as alterações.");
Number.prototype.formatMoney = function(c, d, t) {
    var n = this
      , c = isNaN(c = Math.abs(c)) ? 2 : c
      , d = d == undefined ? "." : d
      , t = t == undefined ? "," : t
      , s = n < 0 ? "-" : ""
      , i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + ""
      , j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
;

function printModel(xml, modelo, temp=false) {
    alert('ATENÇÃO:\n\nNão utilizar papel timbrado.\nNão imprimir frente e verso.');
    var oWin = window.open('');
    if (temp) {
        displayResult((new XMLSerializer).serializeToString(xml), modelo, oWin.document.body, true)
    } else {
        displayObjResultText(xml, modelo, oWin.document.body);
    }
    oWin.setTimeout(function() {
        oWin.print();
        oWin.close();
    }, 800);
}
*/
