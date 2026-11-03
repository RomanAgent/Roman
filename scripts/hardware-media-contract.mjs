import assert from 'node:assert/strict';
export function assertMediaPath(path,id){
 assert(/^[a-z0-9-]+$/.test(id),'非法产品ID');
 assert(new RegExp(`^assets/hardware/${id}/[a-zA-Z0-9._-]+\\.(png|jpe?g|webp|avif|gif)$`,'i').test(path),'非法本地图片路径');
 assert(!path.includes('..'),'图片路径不能含相对跳转');
}
export function assertPromptPath(path,id){
 assert(new RegExp(`^content/hardware/prompts/${id}(?:-[a-zA-Z0-9_-]+)?\\.txt$`).test(path),'非法本地提示词路径');
}
export function assertImageSignature(bytes,path){
 const ext=path.split('.').pop().toLowerCase();
 const png=bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
 const jpg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
 const webp=bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP';
 const gif=/^GIF8[79]a$/.test(bytes.subarray(0,6).toString());
 const avif=bytes.subarray(4,8).toString()==='ftyp'&&/avif|avis/.test(bytes.subarray(8,64).toString());
 assert(({png,jpg,jpeg:jpg,webp,gif,avif})[ext],`图片签名与文件扩展名不符: ${path}`);
}
