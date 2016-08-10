function getData()
{
var data = '{"data":{"parent":'


+'['+

'{"pin":"4567","provider":"Caterpillar","name":"Maria Lawson",'+
' "child":['+
'{"id":"1", "name":"Veronique Lawson"},'+
'{"id":"2", "name":"Bonnie Lawson"},'+
'{"id":"3", "name":"Ben Lawson"}'+
']'+
'},'+

'{"pin":"1111","provider":"Caterpillar","name":"Jay Singh",'+
' "child":['+
'{"id":"1", "name":"Mahindra Singh"},'+
'{"id":"2", "name":"Jaya Singh"}'+
']'+
'},'+


'{"pin":"1234","provider":"Caterpillar","name":"Johan Creosote",'+
' "child":['+
'{"id":"1", "name":"Bambi Creosote"},'+
'{"id":"2", "name":"Walter Creosote"}'+
']'+
'},'+

'{"pin":"1234","provider":"Monkeys","name":"Peter Williams",'+
' "child":['+
'{"id":"1", "name":"James Williams"},'+
'{"id":"2", "name":"Serena Williams"}'+
']'+
'},'+

'{"pin":"1234","provider":"Monkeys","name":"Yuja Wang",'+
' "child":['+
'{"id":"1", "name":"Seow Wang"},'+
'{"id":"2", "name":"An Wang"}'+
']'+
'},'+

'{"pin":"0000","provider":"Monkeys","name":"Sally Sparrow",'+
' "child":['+
'{"id":"1", "name":"Sophia Sparrow"},'+
'{"id":"2", "name":"Mika Sparrow"}'+
']'+
'}'+


']'+

'}}';


var obj = eval ("(" + data + ")");

return obj ;
}

function getParentData(enteredPin)
{
	var result;
	var data = getData();
	var parents = data.data.parent;
	for (var i = 0; i < parents.length; i++)
		{
			if(enteredPin == parents[i].pin)
			{
				result = parents[i];
				break;
			
			}
		}	
	
	return result;
}


function isValidParent(enteredPin)
{
	var result = false;
	var data = getData();
	var parents = data.data.parent;

	for (var i = 0; i < parents.length; i++)
		{
			if(enteredPin == parents[i].pin)
			{
				result = true;
				break;
			
			}
		}


	return result;

}

function isValidParentX(enteredPin)
{
	  try{
	  var result = false;
	  var Connect = new XMLHttpRequest();
	  Connect.open("GET", "data.xml", false);
	  Connect.setRequestHeader("Content-Type", "text/xml");
	  Connect.send(null);
	  var TheDocument = Connect.responseXML;
	  Connect = null;
	  var data = TheDocument.childNodes[0];
	  var parents = data.getElementsByTagName("parent");
	  for (var i = 0; i < parents.length; i++)
	  {
		if(parents[i].attributes[0].value == enteredPin)
		{
		result = true;
		break;
		}
	  }
	  return result;
}
  catch (e) {
       alert(e.message);

	return false;
}

}