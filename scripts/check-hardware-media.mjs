import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {assertMediaPath,assertPromptPath,assertImageSignature} from './hardware-media-contract.mjs';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root));
const c=JSON.parse(read('content/hardware/catalog.json'));
const manifests=readdirSync(new URL('content/hardware/',root)).filter(f=>/^(media|generated)-.+\.json$/.test(f)).flatMap(f=>JSON.parse(read(`content/hardware/${f}`)));
const kindOrder={product:0,reference:1,'official-structure':1,'ai-exploded':2};
const hashes=new Set();
let imageCount=0;
for(const p of c.products){
 const images=p.images||[];
 assert(images.some(i=>i.kind==='product'),`${p.id} 缺少有来源的产品图`);
 assert(images.some(i=>['reference','official-structure'].includes(i.kind)),`${p.id} 缺参考图`);
 const ai=images.filter(i=>i.kind==='ai-exploded');assert.equal(ai.length,1,`${p.id} 需要一张已检查的AI爆炸示意`);
 const expected=manifests.filter(m=>m.id===p.id).flatMap(m=>m.images).sort((a,b)=>kindOrder[a.kind]-kindOrder[b.kind]);
 assert.deepEqual(images.map(({bytes,sha256,...m})=>m),expected,`${p.id} 媒体清单尚未同步`);
 for(const im of images){
  assert(im.verified===true,`${im.path} 尚未视觉核查`);
  assertMediaPath(im.path,p.id);
  const bytes=read(im.path);assertImageSignature(bytes,im.path);assert.equal(createHash('sha256').update(bytes).digest('hex'),im.sha256,`${im.path} 文件与记录不符`);
  assert(bytes.length>1000 && bytes.length<50*1024*1024,`${im.path} 大小异常`);
  assert(!bytes.subarray(0,200).toString().match(/<!doctype html|<html/i),`${im.path} 下载成了网页`);
  if(im.kind==='ai-exploded'){
   assert(!hashes.has(im.sha256),`${p.id} AI图片被其它型号复用`);hashes.add(im.sha256);
   assertPromptPath(im.promptPath,p.id);assert(existsSync(new URL(im.promptPath,root)),`${p.id} 缺提示词`);
   assert(im.referencePaths.length>0,`${p.id} 缺生成参考`);
   for(const ref of im.referencePaths){assertMediaPath(ref,p.id);assert(existsSync(new URL(ref,root)),`${p.id} 参考图不存在`);}
  } else {assert(im.sourceUrl&&im.sourceImageUrl&&im.credit,`${p.id} 缺图源`);}
  imageCount++;
 }
}
console.log(`图片完整性检查通过：${c.products.length}款产品均具备有来源的产品图、参考图及独立AI爆炸图，共${imageCount}张；来源、提示词与文件校验一致。`);
