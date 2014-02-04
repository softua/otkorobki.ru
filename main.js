function linear(progress) {
	return progress;
}

function animate(opts) {
	var start = new Date;
	var timer = setInterval(function() {
		var progress = (new Date - start) / opts.duration;
		if (progress > 1)
			progress = 1;
		opts.step(opts.delta(progress));
		if (progress == 1)
			clearInterval(timer);
	}, opts.delay || 10);
}

function move(elem, delta, pos, duration) {
	var from = elem.style.marginLeft.substring(0,
			elem.style.marginLeft.length - 2) * 1;
	var to = pos - from;
	animate({
		delay : 10,
		duration : duration || 1000,
		delta : delta,
		step : function(delta) {
			elem.style.marginLeft = (from + to * delta) + "px"
		}
	});
}

function setDeliveryOn(on) {

	if (on) {

		document.getElementById('delivery-img').src = "/i/switch-on.png";
		document.getElementById('deliveryType').value = "1";
		document.getElementById('delivery-address-widget').style.display = "block";
		document.getElementById('pickup-widget').style.display = "none";
	} else {

		document.getElementById('delivery-img').src = "/i/switch.png";
		document.getElementById('deliveryType').value = "0";
		document.getElementById('delivery-address-widget').style.display = "none";
		document.getElementById('pickup-widget').style.display = "block";
	}
}

function showDeliveryPopup(on) {

	el = document.getElementById('currentDeliveryAddress');

	if (on & (el.innerText == undefined || el.innerText.length == 0)) {

		document.getElementById('pickup-widget').style.display = "none";
		daWidget = document.getElementById('delivery-address-widget');
		daWidget.style.display = "block";
		window.showDistrictsPopup(daWidget.offsetLeft + 34, daWidget.offsetTop);
	} else if (on) {

		setDeliveryOn(true);
		document.getElementById('regionId').value = document
				.getElementById('deliveryDistrictId').value;
	} else {

		setDeliveryOn(false);
	}
}

function sliderClick(mouseEvent) {
	if (!mouseEvent)
		mouseEvent = window.event;
	var sourceElement = (mouseEvent.target) ? mouseEvent.target
			: mouseEvent.srcElement;
	var x = mouseEvent.clientX - sourceElement.offsetLeft;
	var diapason = 0;
	var pos = -10;
	if (x > 62 && x <= 124) {
		pos = 52;
		diapason = 1;
	} else if (x > 124 && x <= 186) {
		pos = 114;
		diapason = 2;
	} else if (x > 186 && x <= 248) {
		pos = 176;
		diapason = 3;
	} else if (x > 248) {
		pos = 238;
		diapason = 4;
	}

	document.getElementById('consigmentSize').value = diapason;
	move(document.getElementById('begunok'), linear, pos, 300);
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for ( var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}
};

function readSearchQuery() {

	if (getQueryVariable('delivery') == '1') {
		setDeliveryOn(true);
	}
	/*
	 * if (getQueryVariable('hot')=='on') {
	 * document.getElementById('hotElementId').checked='true'; }
	 */
	size = getQueryVariable('size');
	if (size == undefined) {
		size = 0;
	}
	var pos = -10;
	if (size == 1) {
		pos = 52;
	} else if (size == 2) {
		pos = 114;
	} else if (size == 3) {
		pos = 176;
	} else if (size == 4) {
		pos = 238;
	}
	cat = getQueryVariable('cat');
	if (cat == undefined) {
		cat = 0;
	}
	document.getElementById('consigmentSize').value = size;
	move(document.getElementById('begunok'), linear, pos, 300);
	document.getElementById('categoryId').value = cat;
};

function addClass(o, c){
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
    if (re.test(o.className)) return
    o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}
function removeClass(o, c){
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
    o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}

function linear(progress) {
  return progress;
}

function animate(opts) {
  var start = new Date;
  var timer = setInterval(function() {
    var progress = (new Date - start) / opts.duration;
    if (progress > 1) progress = 1;
    opts.step( opts.delta(progress) );
    if (progress == 1) clearInterval(timer);
  }, opts.delay || 10);
}

function clickLink(n) {
  var num=1;
  if (n==0) {
    if (selected==2) num=1;
    else if (selected==1) num=3;
    else if (selected==3) num=2;
  } else {
    if (selected==2) num=3;
    else if (selected==1) num=2;
    else if (selected==3) num=1;
  }
  caruselClick(num);
  return false;
}

function caruselClick(num) {
  if (num==selected) return;
  var n1,n2,n3;
  var from1, from2, from3, to1, to2, to3;
  var direction = 0; // вправо
  if (selected==2) { n1 = 1; n2 = 2; n3 = 3;  }
  else if (selected==1) { n1 = 3; n2 = 1; n3 = 2; }
  else if (selected==3) { n1 = 2; n2 = 3; n3 = 1; }
  if (num==n3) direction=1;
  var s1 = document.getElementById('carusel'+n1);
  var s2 = document.getElementById('carusel'+n2);
  var s3 = document.getElementById('carusel'+n3);

  if (direction==0) {
    from1 = 53;
    to1 = 170-53;
    from2 = 170;
    to2 = 500-170;
    from3 = 500;
    to3 = 53-500;
    removeClass(s1, 'left-fade');
    addClass(s2, 'right-fade');
    addClass(s3, 'left-fade');
    removeClass(s3, 'right-fade');
  } else {
    from1 = 53;
    to1 = 500-53;
    from2 = 170;
    to2 = 53-170;
    from3 = 500;
    to3 = 170-500;
    removeClass(s3, 'right-fade');
    addClass(s2, 'left-fade');
    addClass(s1, 'right-fade');
    removeClass(s1, 'left-fade');
  }

  animate({
    delay: 10,
    duration: 400,
    delta: linear,
    step: function(delta) {
      s1.style.left = (from1 + to1*delta) + "px";
      s2.style.left = (from2 + to2*delta) + "px";
      s3.style.left = (from3 + to3*delta) + "px";
    }
  });
  selected = num;
  var ll = document.getElementById('leftLink');
  var lr = document.getElementById('rightLink');
  if (selected==1) {
    ll.innerHTML='Дистрибьюторам';
    lr.innerHTML='Покупателям';
  } else if (selected==2) {
    ll.innerHTML='Производителям';
    lr.innerHTML='Дистрибьюторам';
  } else if (selected==3) {
    ll.innerHTML='Покупателям';
    lr.innerHTML='Производителям';
  }
};


<!-- Yandex.Metrika counter -->
function yandexMetrics (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter20300818 = new Ya.Metrika({id:20300818,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true});
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
};

function selectTab(tab) {

	  if (tab == 1) {

		  document.getElementById('ui-id-1').className="ui-state-default ui-corner-top ui-tabs-active ui-state-active";
		  document.getElementById('ui-id-2').className="ui-state-default ui-corner-top";
		  document.getElementById('ui-id-3').className="ui-state-default ui-corner-top";

		  document.getElementById('tabs-1').style.display="block";
		  document.getElementById('tabs-2').style.display="none";
		  document.getElementById('tabs-3').style.display="none";
	  } else if (tab == 2) {

		  document.getElementById('ui-id-1').className="ui-state-default ui-corner-top";
		  document.getElementById('ui-id-2').className="ui-state-default ui-corner-top ui-tabs-active ui-state-active";
		  document.getElementById('ui-id-3').className="ui-state-default ui-corner-top";

		  document.getElementById('tabs-1').style.display="none";
		  document.getElementById('tabs-2').style.display="block";
		  document.getElementById('tabs-3').style.display="none";
	  } else {

		  document.getElementById('ui-id-1').className="ui-state-default ui-corner-top";
		  document.getElementById('ui-id-2').className="ui-state-default ui-corner-top";
		  document.getElementById('ui-id-3').className="ui-state-default ui-corner-top ui-tabs-active ui-state-active";

		  document.getElementById('tabs-1').style.display="none";
		  document.getElementById('tabs-2').style.display="none";
		  document.getElementById('tabs-3').style.display="block";
	  }
};

function gotoPage(page) {

	pageInt = parseInt(page);
	if (isNaN(pageInt)) {
		pageInt = 1;
	}
	var url = document.location.search;
	url = url.replace(new RegExp("&page=[0-9]+", 'g'), "");
	url = url + "&page=" + pageInt;
	document.location.search = url;
};

function removeFilter(filter) {

var url = document.location.search;
url = url.replace(new RegExp("&" + filter + "=[0-9a-z]+", 'g'), "");
document.location.search = url;
};

function changeFilter(filter, value) {

var url = document.location.search;
url = url.replace(new RegExp("\\?" + filter + "=[0-9a-z]+&", 'g'), "");
url = url.replace(new RegExp("\\?" + filter + "=[0-9a-z]+", 'g'), "");
url = url.replace(new RegExp("&" + filter + "=[0-9a-z]+", 'g'), "");
if (url.length == 0) {
	url = "?" + filter + "=" + value;
} else {
	url = url + "&" + filter + "=" + value;
}

document.location.search = url;
};

function changeFilters(filter, value, filter2, value2) {

	var url = document.location.search;
	url = url.replace(new RegExp("&" + filter + "=[0-9a-z]+", 'g'), "");
	url = url.replace(new RegExp("\\?" + filter + "=[0-9a-z]+", 'g'), "?");
	url = url.replace(new RegExp("&" + filter2 + "=[0-9a-z]+", 'g'), "");
	url = url.replace(new RegExp("\\?" + filter2 + "=[0-9a-z]+", 'g'), "?");
	url = url + "&" + filter + "=" + value;
	url = url + "&" + filter2 + "=" + value2;
	document.location.search = url;
};

function redirectToMap() {
var url = document.location.search;
document.location.pathname = "map.htm";
};

function hideManFilterPopup(event) {
e = event.toElement || event.relatedTarget;

if (e.parentNode.parentNode.parentNode == this || e.parentNode.parentNode == this || e.parentNode == this || e == this) {
    return;
}
document.getElementById('manfilter-popup').style.display='none';
};

function hideStoreFilterPopup(event) {
e = event.toElement || event.relatedTarget;

if (e.parentNode.parentNode.parentNode == this || e.parentNode.parentNode == this || e.parentNode == this || e == this) {
    return;
}
document.getElementById('storefilter-popup').style.display='none';
};

function hideSizeFilterPopup(event) {
e = event.toElement || event.relatedTarget;

if (e.parentNode.parentNode.parentNode == this || e.parentNode.parentNode == this || e.parentNode == this || e == this) {
    return;
}
document.getElementById('sizefilter-popup').style.display='none';
};

function hideHotFilterPopup(event) {
e = event.toElement || event.relatedTarget;

if (e.parentNode.parentNode.parentNode == this || e.parentNode.parentNode == this || e.parentNode == this || e == this) {
    return;
}
document.getElementById('hotfilter-popup').style.display='none';
};

function hideSortFilterPopup(event) {
e = event.toElement || event.relatedTarget;

if (e.parentNode.parentNode.parentNode == this || e.parentNode.parentNode == this || e.parentNode == this || e == this) {
    return;
}
document.getElementById('sortfilter-popup').style.display='none';
};

function hideDelFilterPopup(event) {
e = event.toElement || event.relatedTarget;

if (e.parentNode.parentNode.parentNode == this || e.parentNode.parentNode == this || e.parentNode == this || e == this) {
    return;
}
document.getElementById('delfilter-popup').style.display='none';
};

function showSortPopup(left, top) {

	el = document.getElementById('sortfilter-popup');
	el.style.display='block';
	el.style.left = left + "px";
	el.style.top = top + "px";
};

function showDeliveryPopupAndReload() {

	 el = document.getElementById('currentDeliveryAddress');

	  if (el.innerText == undefined || el.innerText.length == 0) {

		  daWidget = document.getElementById('delivery-address-widget');
		  window.showDistrictsPopupAndReload(daWidget.offsetLeft + 34, daWidget.offsetTop);
	  } else {

		  changeFilter('delivery', 1);
	  }
};

function showPriceRanges(storeId, goodsId, regionId, packageSize) {

	if (document.getElementById(storeId + '-' + goodsId).innerText.length == 0) {
		document.getElementById('wannaMoreLink-' + storeId + '-' + goodsId).innerText='Скрыть';
		window.loadPrices(storeId, goodsId, regionId, packageSize);
	} else {
		document.getElementById('wannaMoreLink-' + storeId + '-' + goodsId).innerText='Хотите дешевле?';
		document.getElementById(storeId + '-' + goodsId).innerText='';
	}

};

function addSearchEventListeners() {

	manfilterDiv = document.getElementById("manfilter");
	if (manfilterDiv != undefined) {
		manfilterDiv.addEventListener('mouseout', hideManFilterPopup, true);
	}
	storefilterDiv = document.getElementById("storefilter");
	if (storefilterDiv != undefined) {
		storefilterDiv.addEventListener('mouseout', hideStoreFilterPopup, true);
	}
	hotfilterDiv = document.getElementById("hotfilter");
	if (hotfilterDiv != undefined) {
		hotfilterDiv.addEventListener('mouseout', hideHotFilterPopup, true);
	}
	document.getElementById("sizefilter").addEventListener('mouseout', hideSizeFilterPopup, true);
	document.getElementById("sortfilter-popup").addEventListener('mouseout', hideSortFilterPopup, true);
	document.getElementById("delfilter").addEventListener('mouseout', hideDelFilterPopup, true);
};


function addOrderItem(add, goodsId) {

	el = document.getElementById('orderItemCount-' + goodsId);
	if (add) {
		el.value=(parseInt(el.value) + 1) + '';
	} else {
		el.value=(parseInt(el.value) - 1) + '';
	}
};

function redirectToSearch() {
	var url = document.location.search;
	document.location.pathname = "search.htm";
};

function gotoOrderPage(storeId, catId, page) {
	pageInt = parseInt(page);
	if (isNaN(pageInt)) {
		pageInt = 1;
	}
	var url = '/s/'+ storeId + "-" + catId + "-" + pageInt + ".htm";
	window.location.pathname = url;
};

function gotoWelcomePage(catId, page) {
	pageInt = parseInt(page);
	if (isNaN(pageInt)) {
		pageInt = 1;
	}
	var url = "/welcome-" + catId + "-" + pageInt + ".htm";
	window.location.pathname = url;
};

function addSubscriber(email, regionId) {

	 window.saveSubscriber(email, regionId);
	 document.getElementById('subscriberBox').style.display='none';
	 document.getElementById('subscriberBtn').style.display='none';
	 document.getElementById('subscriberSuccess').style.display='block';
};

function gotoManPage(manId, catId, page) {
	pageInt = parseInt(page);
	if (isNaN(pageInt)) {
		pageInt = 1;
	}
	var url = '/m/'+ manId + "-" + catId + "-" + pageInt + ".htm";
	window.location.pathname = url;
};

function checkEnter(e) {

	if (e.keyCode == 13) {
		window.loginAsync(document.getElementById('j_username').value, document.getElementById('j_password').value);
    }
	};

function gotoCatPage(catId, page) {
		pageInt = parseInt(page);
		if (isNaN(pageInt)) {
			pageInt = 1;
		}
		var url = '/cat/' + catId + "-" + pageInt + ".htm";
		window.location.pathname = url;
};

function showPanel(id, show) {

	  if (show) {

		  document.getElementById(id).style.display='block';
	  } else {

		  document.getElementById(id).style.display='none';
	  }
};

function showPanelAndHidePrev(id, show) {

	if (window.prevPanelId != undefined) {
		prev = document.getElementById(window.prevPanelId);
		if (prev != undefined) {

			 prev.style.display='none';
		}
	}

	el = document.getElementById(id);
	if (el != undefined) {

		  if (show) {

			  el.style.display='block';
			  window.prevPanelId=id;
		  } else {

			  el.style.display='none';
		  }
	}

};

function onCategoriesMenuMouseOut(event) {
    
    var e = event.toElement || event.relatedTarget;
    if (e.parentNode == this || e == this) {
       return;
    }
    showPanelAndHidePrev(null, false);
};

function switchSliderItem(num) {

	if (num > 3) {

		num=1;
	}

	for(var i=1; i < 4; i++) {

		if (i == num) {
			document.getElementById("sliderItem" + i).style.display='block';
			document.getElementById("sliderLink" + i).className='active';
			window.currentSliderItem = i;
		} else {
			document.getElementById("sliderItem" + i).style.display='none';
			document.getElementById("sliderLink" + i).className='';
		}
	}
};

function switchGoodsSliderItem(num) {

	if (num > 6) {

		num=1;
	}

	for(var i=1; i < 7; i++) {

		if (i == num) {
			document.getElementById("goods-list-" + i).style.display='block';
			document.getElementById("goodsSliderLink" + i).className='active';
			window.currentGoodsSliderItem = i;
		} else {
			document.getElementById("goods-list-" + i).style.display='none';
			document.getElementById("goodsSliderLink" + i).className='';
		}
	}
};

function switchHeaderItem(num) {

	if (num > 3) {

		num=1;
	}

	if (num < 1) {

		num=3;
	}

	for(var i=1; i < 4; i++) {

		if (i == num) {
			document.getElementById("header-item-" + i).style.display='block';
			window.currentHeaderItem = i;
		} else {
			document.getElementById("header-item-" + i).style.display='none';
		}
	}
};

function setVisible(id, visible) {

	el = document.getElementById(id);
	if (visible) {

		el.style.display='block';
	} else {

		el.style.display='none';
	}
};

function setClassName(id, classname) {

	el = document.getElementById(id);
	el.className=classname;
};

function updateTotalPrice(price, goodsId) {

	elCount = document.getElementById(goodsId + "-count");
	var value = parseInt(elCount.value);
	if (value < 1 || isNaN(value)) {

		value = 1;
	}
	elPrice = document.getElementById(goodsId + "-price");
	var totalPrice = price * value;
	elPrice.innerText=totalPrice.toFixed(2) + " р."
	elCount.value = value + "";
}

function addItem(price, goodsId, add) {

	elCount = document.getElementById(goodsId + "-count");
	var value = parseInt(elCount.value);
	if (add) {

		value = value + 1;
	} else {

		value = value - 1;
	}
	if (value < 1 || isNaN(value)) {

		value = 1;
	}

	elPrice = document.getElementById(goodsId + "-price");
	var totalPrice = price * value;
	elPrice.innerText=totalPrice.toFixed(2) + " р."

	elCount.value = value + "";
}

function selectSearchStore(storeId) {

	if (window.last_selected_store != undefined) {

		document.getElementById(window.last_selected_store).checked=false;
	}

	window.last_selected_store = 'check-' + storeId;

	document.getElementById('store_id').value=storeId + "";
}

function getY(oElement){
	var iReturnValue = 0;
	while( oElement != null ) {
	iReturnValue += oElement.offsetTop;
	oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

function getX(oElement){
	var iReturnValue = 0;
	while( oElement != null ) {
	iReturnValue += oElement.offsetLeft;
	oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

function stopVideo(id) {

	el = document.getElementById(id);
	var url = el.getAttribute('src');
	el.setAttribute('src', '');
	el.setAttribute('src', url);
}