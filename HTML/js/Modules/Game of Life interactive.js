$((function(){const interactive=$("table.interactive");let saveStates=[],currentState=0;function removeFutureSaves(){if(currentState<saveStates.length-1){for(let i=currentState+1;i<saveStates.length;i++)saveStates[i].remove();saveStates.splice(currentState+1,saveStates.length-currentState)}}for(let y=0;y<9;y++){const row=$("<tr>").appendTo(interactive);for(let x=0;x<7;x++)0==x&&0==y?$("<th>").appendTo(row):0==y&&x>0?$("<th>").text(String.fromCharCode(64+x)).appendTo(row):y>0&&0==x?$("<th>").text(y).appendTo(row):$("<td>").click((function(){$(this).toggleClass("white"),removeFutureSaves()})).contextmenu((function(){return $(this).toggleClass("dot"),removeFutureSaves(),!1})).append('<div class="box"></div>').appendTo(row)}$("button.reset").click((function(){$("table.interactive td").removeClass("white dot"),saveStates.forEach((x=>x.remove())),saveStates=[],currentState=0})),$("button.reset-grid").click((function(){$("table.interactive td").removeClass("white dot")})),$("button.save").click((function(){removeFutureSaves();let saveState=Array.from($("table.interactive td")).map((x=>$(x))).map((x=>x.attr("class")||""));console.log(saveStates);let stateNumber=saveStates.length;currentState=stateNumber;let button=$("<button>").text(stateNumber+1).click((function(){$("table.interactive td").each(((i,x)=>$(x).attr("class",saveState[i]))),currentState=stateNumber})).appendTo(".saves");saveStates.push(button)}))}));