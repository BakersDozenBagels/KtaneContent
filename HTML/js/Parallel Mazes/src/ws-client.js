var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))};define(["require","exports"],(function(require,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.WSClient=void 0;exports.WSClient=class{constructor(url){this.url=url,this._socket=null,this.nextRequestId=0,this.connectionPromise=null,this.onConnect=null,this.callHandlers=new Map,this.eventHandlers=new Map}get socket(){if(!this._socket)throw new Error("Not connected");return this._socket}get whenConnected(){if(!this.connectionPromise)throw new Error("Not connected");return this.connectionPromise}connect(){return __awaiter(this,void 0,void 0,(function*(){if(this._socket)return this.connectionPromise;this._socket=new WebSocket(this.url),this.connectionPromise=new Promise((resolve=>this.onConnect=resolve)),this._socket.onopen=()=>this.onConnect(),this._socket.onmessage=response=>{var _a;const raw=null===(_a=response.data)||void 0===_a?void 0:_a.toString();if(!raw)return;let json;try{json=JSON.parse(raw)}catch(_){return}if("object"==typeof json&&json)if("event"===json.type){if(!this.eventHandlers.has(json.event))return;for(const handler of this.eventHandlers.get(json.event))handler(json.data)}else{if("success"!==json.type&&"error"!==json.type)return;{const{id:id}=json;if(!this.callHandlers.has(id))return;const{resolve:resolve,reject:reject}=this.callHandlers.get(id);this.callHandlers.delete(id),"success"===json.type?resolve(json.result):reject(json.reason)}}},yield this.connectionPromise}))}call(method,args){return __awaiter(this,void 0,void 0,(function*(){const id=this.nextRequestId;this.nextRequestId+=1;const promise=new Promise(((resolve,reject)=>this.callHandlers.set(id,{resolve:resolve,reject:reject})));return yield this.whenConnected,this._socket.send(JSON.stringify({id:id,method:method,args:args})),promise}))}onEvent(event,handler){return __awaiter(this,void 0,void 0,(function*(){this.eventHandlers.has(event)||this.eventHandlers.set(event,new Set),this.eventHandlers.get(event).add(handler)}))}removeEventHandler(event,handler){return __awaiter(this,void 0,void 0,(function*(){this.eventHandlers.has(event)&&this.eventHandlers.get(event).delete(handler)}))}}}));