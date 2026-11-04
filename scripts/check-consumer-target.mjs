import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const data=JSON.parse(readFileSync(new URL('../content/hardware/catalog.json',import.meta.url),'utf8'));
const available=data.products.filter(p=>['on_sale','preorder'].includes(p.status));
const min=data.target?.minimumAvailableConsumerProducts||200;
assert(data.products.every(p=>['consumer','prosumer'].includes(p.audience)),'消费目录混入专业/开发用途条目');
assert(available.length>=min,`可购C端目录低于已完成的${min}款数量基线：当前${available.length}`);
assert(available.every(p=>['retail','preorder','consumer-fitting','rental'].includes(p.saleMode)),'可购产品缺少消费购买渠道');
const ids=new Set();const names=new Set();
for(const p of available){
 assert(!ids.has(p.id),'重复产品ID');ids.add(p.id);
 const key=(p.brand+'|'+p.name).toLowerCase().replace(/\s+/g,'');assert(!names.has(key),`重复品牌型号 ${p.name}`);names.add(key);
 assert(p.sources.some(s=>s.supports.includes('status')),`${p.id}缺销售依据`);
}
console.log(`消费收录与${min}款数量基线检查通过：${available.length}款可购C端产品，${new Set(data.products.map(p=>p.category)).size}类；${data.excludedProducts?.length||0}条专业记录不计入。`);
if(data.discoveryTarget?.desiredProducts)console.log(`扩展研究进度：${available.length} / ${data.discoveryTarget.desiredProducts} 款可订购；该目标独立于基础完整性校验，未核验线索不计数。`);
