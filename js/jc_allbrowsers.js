/**
 * js_allbrowsers - JavaScript JooCha Library
 *
 * Functions collection for work to all browsers. script use only JooCha Engine
 * 
 * @link    http://joocha.com
 * @license For open source use: GPLv3
 *          For commercial use: Commercial License
 * @author  John Chavchanidze
 * @version: 1.0.4
 *
 * See usage examples at http://joocha.com/examples
 */
 
       var EFF=(navigator.appName=='Microsoft Internet Explorer');
	   var COOKIE_POLICY_ACCEPTANCE=getCookie("cookie_policy_acceptance")
       var jc_userAgent=navigator.userAgent.toLowerCase();
       var jc_appName=navigator.appName.toLowerCase();

       var BrowserType=1,BrowserTypeIdx='IE';
       if(jc_appName=='opera'){BrowserType=2;BrowserTypeIdx='OP';}
       if(jc_appName=='netscape'){BrowserType=3;BrowserTypeIdx='NS';}
       if(jc_userAgent.indexOf("chrome")+1){BrowserType=4;BrowserTypeIdx='CH';}
       if(jc_userAgent.indexOf("firefox")+1){BrowserType=5;BrowserTypeIdx='FF';}
//-------------------------------------------------	   
//------- PROTOTYPEs ------------------------------------------	   
//-------------------------------------------------
Array.prototype.clear = function() 
{
  if(this.splice) this.splice(0, this.length);
};	   
//-------------------------------------------------
function jcLog(Msg)
{
	try{
		if(console)console.log(Msg);
	}catch(e)
	{
		alert(Msg);
	}
}
//-------------------------------------------------
function isElementVisible(el) {
    var rect     = el.getBoundingClientRect(),
        vWidth   = window.innerWidth || doc.documentElement.clientWidth,
        vHeight  = window.innerHeight || doc.documentElement.clientHeight,
        efp      = function (x, y) { return document.elementFromPoint(x, y) };     

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 
            || rect.left > vWidth || rect.top > vHeight)
        return false;

    // Return true if any of its four corners are visible
    return (
          el.contains(efp(rect.left,  rect.top))
      ||  el.contains(efp(rect.right, rect.top))
      ||  el.contains(efp(rect.right, rect.bottom))
      ||  el.contains(efp(rect.left,  rect.bottom))
    );
}
//-------------------------------------------------
function copyToClipboard(data)
{

/*    var IE=window.external&&(navigator.platform=="Win32"||(window.ScriptEngine&&ScriptEngine().indexOf("InScript")+1));
    var FF=navigator.userAgent.toLowerCase();
    var GC=(FF.indexOf("chrome")+1)?true:false;
    var FF=(FF.indexOf("firefox")+1)?true:false;
    var OP=window.opera&&window.print;
    var NS=window.netscape&&!OP;
*/
    if(window.clipboardData)
    {
		try{
			window.clipboardData.setData("Text",data);
		}catch(e)
		{
			console.log("Error clipboard setData: "+e);
		}
		/*
		Deprecated operation:
			e=Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
			b=Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
			b.addDataFlavor("text/unicode");
			o=Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
			o.data=data;
			b.setTransferData("text/unicode",o,data.length*2);
			t=Components.interfaces.nsIClipboard;
			e.setData(b,null,t.kGlobalClipboard);
		*/
	}else
    {
		var ta=document.createElement("textarea");
		ta.id="a"+Date.now();
		ta.style.position="fixed";
		ta.style.display="block";
		
		ta.style.left="0px";
		ta.style.top="0px";
		ta.style.width="100%";
		ta.style.height="100%";
		ta.style.bottom="0px";
		ta.style.right="0px";
		
		document.body.appendChild(ta);
		ta.value=data;
		ta.focus();
		ta.select();
		try {
			var successful = document.execCommand('copy');
			var msg = (successful ? 'successful' : 'unsuccessful');
			console.log('Copy command was ' + msg);
		}
		catch (err) {
			console.log('Oops, unable to copy');
		}
		//RemoveObjectEx(ta);
    }
        
return false;
}
//------------------------------------------------------------------------------
//-------- FUNCTION XML ----------------------------------------------------------------------
//------------------------------------------------------------------------------
function XMLFromString(txt)
{
	var xmlDoc;
	var ck=true;
	if(!txt) return null;

	if (window.DOMParser)
	{
		try{
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(txt,"text/xml");
			ck=false;
		}catch(e)
		{
			ck=true;
		}
	}
	if(ck) // Internet Explorer
	{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(txt);
	} 
	if(xmlDoc && xmlDoc.getElementsByTagName('parsererror').length>0)
	{
	    //error
	}
	return xmlDoc;
}
//------------------------------------------------------------------------------
function XMLErrno(xmlDom)
{
	if(xmlDom && xmlDom.getElementsByTagName('parsererror').length>0)
	{
	    return -1;
	}
return '0';
}
//------------------------------------------------------------------------------
function XMLError(xmlDom)
{
    var v;
	if(xmlDom && (v=xmlDom.getElementsByTagName('parsererror')).length>0)
	{
	    return v[0].innerHTML || v[0].childNodes[0].nodeValue || 'Parser Error';
	}
return '';
}

//-----------------------------------------------------------------------------
function XMLElementByTag(dxml,tagnm,idx)//Modis tviton TAG Elementi
{
   var ret='';
   if (!idx) idx=0;
   if(dxml && dxml.getElementsByTagName)
   {
       ret=dxml.getElementsByTagName(tagnm);
	   if(ret && ret[idx])
	   {
			ret=ret[idx];
	   }
   }
   return ret;
}
//----------------------------------------------------
function XMLNodeByTag(dxml,tagnm,idx)//Modis Tag Elementis Child, dzveli saxeli XMLGetElementByTag
{
   var ret=XMLElementByTag(dxml,tagnm,idx);
   if(ret && ret.childNodes && ret.childNodes[0])return ret.childNodes[0];
   return ret;
}
//------------------------------------------------------------------------------
function XMLGetNodeValue(dxml,tagnm,idx)//childnode-idan value-s migeba. dzveli saxeli, XMLGetNodeValue, Large Values migeba;
{
   var ret='';
   if(tagnm)
   {
		var dxml2=XMLElementByTag(dxml,tagnm,0);
		if(dxml2)dxml=dxml2;
   }
   if(dxml && dxml.childNodes && dxml.childNodes.length)
   {
		if(idx && dxml.childNodes.length>idx)
		{
			if(dxml.childNodes[idx].nodeValue)ret+=dxml.childNodes[idx].nodeValue;
			else 
			if(dxml.childNodes[idx].value)ret+=dxml.childNodes[idx].value;
		}
		else
		{
			for(var i=0;i<dxml.childNodes.length;i++)
			if(dxml.childNodes[i].nodeValue)ret+=dxml.childNodes[i].nodeValue;
			else 
			if(dxml.childNodes[i].value)ret+=dxml.childNodes[i].value;
		}
   }
   return ret;
}
//------------------------------------------------------------------------------
function XMLElementValue(dxml,tagnm,idx)
{
   var ret=XMLGetNodeValue(dxml,tagnm,idx);
   return ret;
}

//------------------------------------------------------------------------------

function getInnerText(obj,htmldec)
{
  var vr=obj.innerText || obj.innerHTML.replace(/<[^>]+>/g,"");
  if(htmldec)return HtmlDecode(vr);
  return vr;
}
//------------------------------------------------------------------------------
function getInnerTextFromString(str,htmldec)
{
  var vr=str.replace(/<[^>]+>/g,"");
  if(htmldec)return HtmlDecode(vr);
  return vr;
}

//---------------------------------------------------
var StandardTags=new Array("DIV","FONT","TABLE","TR","TD","BR","P","IMG","A","H","I","U","B","BUTTON","INPUT","EM","EMBED","OBJECT","FIELDSET","LEGEND","LI","MENU","LISTING","MARQUEE","OL","PRE","SELECT","OPTION","STRONG","TBODY","TFOOT","TEXTAREA","AREA","UL","STYLE");
var StandardTagsChanger=0;
//---------------------------------------------------
function ResetStandard1()
{
    StandardTags=new Array("DIV","FONT","TABLE","TR","TD","BR","P","IMG","A","H","I","U","B","BUTTON","INPUT","EM","EMBED","OBJECT","FIELDSET","LEGEND","LI","MENU","LISTING","MARQUEE","OL","PRE","SELECT","OPTION","STRONG","TBODY","TFOOT","TEXTAREA","AREA","UL","STYLE");
}
//----------------------------------------------------
function OF_Alpha(oDiv,opc)
{
if((!oDiv.style)||(oDiv.style=='undefined'))oDiv=document.getElementById(oDiv);
var a=Math.round(Math.max(0,100-opc*100));
if(a>100)a=100;if(a<0)a=0;
switch(BrowserType)
{
   case 1:oDiv.style.filter='alpha(opacity='+parseInt(a)+'); ';break;
   case 2:
   {
      oDiv.style.opacity=parseFloat(a/100);
      oDiv.style.filter='alpha(opacity='+parseInt(a)+'); ';
   }
   break;

default:
try
   {
      oDiv.style.opacity=parseFloat(a/100);
   }
catch(e)
   {
      oDiv.style.filter='alpha(opacity='+parseInt(a)+'); ';
   }
}

}
//---------------------------------------------------
function getInnerHTMLStandard1(obj,tagss)
{
if(!tagss)
{
   tagss=StandardTags;
   if(StandardTagsChanger)tagss=StandardTagsChanger;
}
  var res="";

  for(var i=0;i<tagss.length;i++) 
  if(tagss[i])
  {
      if(res!="")res=res+"|";
      tagss[i]=tagss[i].toUpperCase();
      res=res+tagss[i]+"|\\/"+tagss[i]+"|"+tagss[i].toLowerCase()+"|\\/"+tagss[i].toLowerCase();
  }; 
  res="<(?!"+res+")[\s]*[^>]+>";

  var regex = new RegExp(res,"gi");

  var vr=obj;
  if(obj)if(obj.innerHTML)vr=obj.innerHTML;
//alert(vr);
try{
  vr=vr.replace(regex,"");
}
catch(e){vr="";}
//(/<(?!SPAN|\/SPAN|DIV|\/DIV|FONT|\/FONT)[^>]+>/g,"");

//  vr=vr.replace("/<\S*[\s]*[^>]+></\1>/g","");
  return vr;
}
//---------------------------------------------------
function removeTagsWithContent(content,tg)
{
	var removeTags = new RegExp("<"+tg+"([^'\"]|\"(\\\\.|[^\"\\\\])*\"|'(\\\\.|[^'\\\\])*')*?<\\/"+tg+">","gi");

	while (removeTags.test(content)) {
		content = content.replace(removeTags, "");
	}
	
	return content;
}
//---------------------------------------------------
function removeCommentsWithContent(content)
{
	var removeTags = new RegExp("<\!\-\-([^'\"]|\"(\\\\.|[^\"\\\\])*\"|'(\\\\.|[^'\\\\])*')*?\-\->","gi");

	while (removeTags.test(content)) {
		content = content.replace(removeTags, "");
	}
	
	return content;
}

//---------------------------------------------------
function removeTagsAlone(content,tg)
{
	var removeTags = new RegExp('<(/)*('+tg+')(.*?)>','gi');

	while (removeTags.test(content)) {
		content = content.replace(removeTags, "");
	}
	
	return content;
}
//---------------------------------------------------
function HTMLFilter(htmlcode,tagss,remlist,alonList)
{
if(!tagss)
{
   tagss=StandardTags;
   if(StandardTagsChanger)tagss=StandardTagsChanger;
}
/*  var res="\r\n\r\n";

  for(var i=0;i<tagss.length;i++) 
  if(tagss[i])
  {
      if(res!="")res=res+"|";
      tagss[i]=tagss[i].toUpperCase();
      res=res+tagss[i]+"|\\/"+tagss[i];//+"|"+tagss[i].toLowerCase()+"|\\/"+tagss[i].toLowerCase();
  }; 
  res="<(?!"+res+")[\s]*[^>]+>";

  var regex = new RegExp(res,"gim");
*/
  var vr=htmlcode;
  if(typeof htmlcode == "object")if(htmlcode.innerHTML)vr=htmlcode.innerHTML;

  vr=removeCommentsWithContent(vr);
  
//tegebi romlebic tavis kontentianad ishleba  
if(!remlist)remlist=['xml','script','object','o:','st1:','style'];
for(var i=0;i<remlist.length;i++){
	vr=removeTagsWithContent(vr,remlist[i]);
}

if(!alonList)alonList=['meta','link'];
for(var i=0;i<alonList.length;i++){
	vr=removeTagsAlone(vr,alonList[i]);
}


  return trim(vr);
}
//---------------------------------------------------
function cleanWordContent(wordContent)
{
 return HTMLFilter(wordContent);

}
//---------------------------------------------------
function isObjectVisibility(obj,tcnt)
{
if(document.getElementById(obj))obj=document.getElementById(obj);
  if(!tcnt)tcnt=3;
  var pob=obj;
  while(pob)
  {
    try{if(pob.style.visibility=='hidden')return false;
    }catch(e){}
    pob=pob.offsetParent;
    tcnt--;
    if(tcnt<=0)break;
  }
return true;
}
//---------------------------------------------------
function isObjectDisplay(obj,tcnt)
{
if(document.getElementById(obj))obj=document.getElementById(obj);
  if(!tcnt)tcnt=3;
  var pob=obj;
  while(pob)
  {
    try{if(pob.style.display=='none')return false;
    }catch(e){}
    pob=pob.offsetParent;
    tcnt--;
    if(tcnt<=0)break;
  }
return true;
}
//---------------------------------------------------
function isObjectShown(obj,tcnt)
{
if(document.getElementById(obj))obj=document.getElementById(obj);
  if(!tcnt)tcnt=3;
  var pob=obj;
  while(pob)
  {
    try{if(pob.style.display=='none'){return false;}
    }catch(e){}
    try{if(pob.style.visibility=='hidden'){return false;}
    }catch(e){}

    pob=pob.offsetParent;
    tcnt--;
    if(tcnt<=0)break;
  }
return true;
}

//---------------------------------------------------
function RemoveObjectEx(obj,par2)
{
	if(!obj)return false;
	
     var par=obj.parentNode;
     if(par)
     {
          par.removeChild(obj);
          return true;
     }
	 if(par2)
	 {
        par2.removeChild(obj);
        return true;
	 }
return false;
}
//---------------------------------------------------
function HideObjectEx(obj)
{
if(document.getElementById(obj))obj=document.getElementById(obj);
    try{obj.style.display='none';
    }catch(e){}
    try{obj.style.visibility='hidden';
    }catch(e){}

}
//---------------------------------------------------
function ShowObjectEx(obj)
{
if(document.getElementById(obj))obj=document.getElementById(obj);
    try{obj.style.display='';
    }catch(e){}
    try{obj.style.visibility='visible';
    }catch(e){}

}
//---------------------------------------------------
function InvertShowObject(obj,nnn)
{
if(!nnn)nnn=3;
if(document.getElementById(obj))obj=document.getElementById(obj);
   if(isObjectShown(obj,nnn))
       HideObjectEx(obj);
   else 
      ShowObjectEx(obj);
}
//-------------------
var GlobalEventList={};
var GlobalEventCounter=0;
function AddEventOnObject(obj,onevv,fnc,uniqalControl)//function(event){return EP_onkeydown(event,nid)}
{
 if(!uniqalControl)uniqalControl=false;
 var oo;
 if(typeof obj !== "object")
 {
	try{
	oo=document.getElementById(obj);
	}catch(e){console.log("AddEventOnObject: "+e);}
 }
 if(!oo)oo=obj;
 obj=oo;
 
 GlobalEventCounter++;
 if(!obj.id)obj.id="ForEvent"+GlobalEventCounter;
 if(!(obj.id in GlobalEventList))GlobalEventList[obj.id]={};
 
 if(uniqalControl){
    if(GlobalEventList[obj.id][onevv] && GlobalEventList[obj.id][onevv]!=undefined){
		RemoveEventOnObject(obj,onevv,GlobalEventList[obj.id][onevv]["function"]);
	}
 }
 GlobalEventList[obj.id][onevv]={"object":obj,"position":GlobalEventCounter,"event":onevv,"function":fnc};
 
try{
  if(oo.addEventListener)
      oo.addEventListener(onevv,fnc,false);
  else
      oo.attachEvent('on'+onevv,fnc);
  }catch(e)
  {
	console.log("AddEventOnObject: "+e);
	{
		switch(onevv)
		{
			case "load":oo.onload=fnc;
			break;
			default:		
				console.log("This event "+onevv+" does not work");
		}
	}
  }
return obj.id;
}
//-------------------
function RemoveEventOnObject(obj,onevv,fnc)//function(event){return EP_onkeydown(event,nid)}
{
 var oo;
 try{
 oo=document.getElementById(obj); 
 }catch(e){}
 if(!oo)oo=obj;
obj=oo;

 if(!fnc){
	if(GlobalEventList[obj.id][onevv] && GlobalEventList[obj.id][onevv]!=undefined)
		RemoveEventOnObject(obj,onevv,GlobalEventList[obj.id][onevv]["function"]);
 }
 else 
 
try{
  if(oo.removeEventListener){
      oo.removeEventListener(onevv,fnc,false);
	  }
  else {
      oo.detachEvent('on'+onevv,fnc);
	 }
  }catch(e)
  {
     oo.detachEvent('on'+onevv,fnc);
  }

}

//-------------------
function AddEventByString(obj,onevv,fncParam)//function(event){return EP_onkeydown(event,nid)}
{
   return AddEventOnObject(obj,onevv,function(e){var event=e || window.event;var target=(event.target != null ? event.target : event.srcElement); eval(fncParam);});
}
//---------------------------------------------------
function GetObjectEventList(el){
	var vid=(((typeof el)=="object") && el.id?el.id:el);
	if(vid in GlobalEventList)return GlobalEventList[vid];
return [];	
}
//---------------------------------------------------
function CheckObjectEvent(el,ev){
	var pointer=GetObjectEventList(el);
	if(pointer.length<=0)return false;
	
	if(ev in pointer){
		return pointer[ev];
	}
	return false;
}
//---------------------------------------------------
var classEvent={
  add:function(obj,etype,fp,cap)
  {
       cap=cap||false;
       if(obj.addEventListener)obj.addEventListener(etype,fp,cap);
       else 
       if(obj.attachEvent)obj.attachEvent("on"+etype,fp);
  },
  remove:function(obj,etype,fp,cap)
   {
        cap=cap||false;
       if(obj.removeEventListener)obj.removeEventListener(etype,fp,cap);
       else
       if(obj.detachEvent)obj.detachEvent("on"+etype,fp);
  }
};
//---------------------------------------------------
function InitUnselectable(obj)
{
var oo=document.getElementById(obj); 
   AddEventOnObject(obj,'selectstart','return false;');
if(oo.MozUserSelect)  oo.MozUserSelect='none';
if(oo.webkitUserSelect)  oo.webkitUserSelect='none';
if(oo.oUserSelect)  oo.oUserSelect='none';
if(oo.UserSelect)  oo.UserSelect='none';
if(oo.khtmlUserSelect)  oo.khtmlUserSelect='none';

   
}

//---------------------------------------------------
function GetObjectMethods(obj)
{
  var methods = [];
  for (var m in obj) 
  {
    if (typeof obj[m] == "function") 
	{
        methods.push(m);
    }
  }
return methods;//.join(","));
}
//---------------------------------------------------
function scriptRunAfterInnerHTML(body_el, tag) {
    // Finds and executes scripts in a newly added element's body.
    // Needed since innerHTML does not run scripts.
    //
    // Argument body_el is an element in the dom.

    function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toUpperCase() ===
              name.toUpperCase();
    };

    function evalScript(elem, id, callback) {
        var data = (elem.text || elem.textContent || elem.innerHTML || "" ),
            head = document.getElementsByTagName("head")[0] ||
                      document.documentElement;

        var script = document.createElement("script");
        script.type = "text/javascript";
        if (id != '') {
            script.setAttribute('id', id);
        }

        if (elem.src != '') {
            script.src = elem.src;
            head.appendChild(script);
            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onreadystatechange = callback;
            script.onload = callback;
        } else {
            try {
                // doesn't work on ie...
                script.appendChild(document.createTextNode(data));      
            } catch(e) {
                // IE has funky script nodes
                script.text = data;
            }
            head.appendChild(script);
            callback();
        }
    };

    function walk_children(node) {
        var scripts = [],
          script,
          children_nodes = node.childNodes,
          child,
          i;

        if (children_nodes === undefined) return;

        for (i = 0; i<children_nodes.length; i++) {
            child = children_nodes[i];
            if (nodeName(child, "script" ) &&
                (!child.type || child.type.toLowerCase() === "text/javascript")) {
                scripts.push(child);
            } else {
                var new_scripts = walk_children(child);
                for(j=0; j<new_scripts.length; j++) {
                    scripts.push(new_scripts[j]);
                }
            }
        }

        return scripts;
    }

    var i = 0;
    function execute_script(i) {
		if(i==0 && scripts.length<1)return '';
		if(!scripts || !scripts[i] || scripts[i]===undefined)return '';
	
        script = scripts[i];
        if (script.parentNode) {script.parentNode.removeChild(script);}
        evalScript(scripts[i], tag+"_"+i, function() {
            if (i < scripts.length-1) {
                execute_script(++i);
            }                
        });
    }

    // main section of function
    if (tag === undefined) tag = 'scriptRunAfterInnerHTML_tmp';

    var scripts = walk_children(body_el);

    execute_script(i);
}
//===============================
//========= Cookie ==============
//===============================
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

////-----Close Browser Tabs Add Events ---------------
function xchgCloseEvent(els){
	for(i=0;i<els.length;i++)if(els[i].type!="hidden" && els[i].style.display!="none"){
    AddEventOnObject(els[i],"change",function(ev){
			window.onbeforeunload = function(event) {
				event = event || window.event;
				var confirmClose = "Are you sure?";
				// For IE and Firefox prior to version 4
				if (event) {
					event.returnValue = confirmClose;
				}
				// For Safari
				return confirmClose;
			}
		});
		};//for
}

/*
Sample:
xchgCloseEvent(document.getElementsByTagName("input"));
*/
function winOpen(mthd, url, data, target) {
  var form = document.createElement("form");
  form.action = url;
  form.method = mthd;
  form.target = target || "_self";
  if (data) {
    for (var key in data) {
      var input = document.createElement("textarea");
      input.name = key;
	  input.setAttribute("data-typeof",typeof data[key]);
      input.value = (typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key]);
      form.appendChild(input);
    }
  }
  var ua=URLToArray(url);
  if(ua){
	for (var key in ua)
	if(typeof ua[key] !== "function"){
      var input = document.createElement("input");
	  input.type = "text";
      input.name = key;
	  input.setAttribute("data-typeof",typeof ua[key]);
      input.value = (typeof ua[key] === "object" ? JSON.stringify(ua[key]) : ua[key]);
      form.appendChild(input);
	}
  }
  form.style.display = 'none';
  document.body.appendChild(form);
  form.submit();
};

//--------------------------------------------------------
 var waitUntilLoad = function (fn, obj, interval) {
    interval = interval || 100;

    var shell = function () {
            var timer = setInterval(
                function () {
                    var check;

                    try { check = (obj.innerHTML!==''); } catch (e) { check = false; }

                    if (check) {
                        clearInterval(timer);
                        delete timer;
                        fn();
                    }
                },
                interval
            );
        };

    return shell;
};
