define(["require","exports"],(function(require,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MazeMap=void 0;exports.MazeMap=class{constructor(tableId){if(this.tableId=tableId,this.data=[],this.cells=[],this.table=document.getElementById(tableId),null===this.table)throw new Error("table not found")}render(){this.table.innerHTML="",this.cells=new Array(7).fill(0).map((()=>new Array(7).fill(0)));for(let y=0;y<7;y++){const tr=this.table.appendChild(document.createElement("tr"));for(let x=0;x<7;x++){const td=tr.appendChild(document.createElement("td"));for(let d=0;d<4;d++)0==(this.data[x][y]&1<<d)&&td.classList.add(`wall-${d}`);this.cells[x][y]=td}}}}}));