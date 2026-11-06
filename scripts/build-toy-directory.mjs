import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const data=JSON.parse(await readFile(new URL('content/hardware/catalog.json',root),'utf8'));
const rows=data.products.filter(p=>p.category==='ai-toys');
assert(rows.length,'AI玩具目录不能为空');
for(const p of rows)assert(p.toyKind in data.toyKinds,`${p.id} 未归类玩法`);
const available=rows.filter(p=>['on_sale','preorder'].includes(p.status));
const labels={on_sale:'在售',preorder:'正式预售 / 延期交付',needs_check:'待核 / 缺货观察',discontinued:'停售观察',reservation:'预约 · 非产品订单',assisted_program:'资格申请'};
const md=s=>String(s).replaceAll('|',' / ').replaceAll('<','&lt;');
const latest=rows.map(p=>p.checkedAt).sort().at(-1);
const screen=JSON.parse(await readFile(new URL('content/hardware/toy-screening.json',root),'utf8'));
for(const x of screen){assert(x.name&&x.reason&&x.status&&x.checkedAt);assert.equal(new URL(x.url).protocol,'https:');}
const lines=['# AI玩具目录',`最新产品核查 ${latest} · ${rows.length} 份产品 / 系列档案 · ${available.length} 款可订购`,data.toyScope,data.toyCoverage,'[打开可筛选的AI玩具目录](https://romanagent.github.io/Roman/#hardware/toys) · [筛选记录与未纳入线索](ai-toy-screening.md)',...Object.entries(data.toyKinds).flatMap(([key,label])=>[
`## ${label}`,
['| 产品 / 系列 | 销售状态 | 国内购买情况 | 核查日期 |','| --- | --- | --- | --- |',...rows.filter(p=>p.toyKind===key).map(p=>`| [${md(p.name)}](hardware/${p.id}.md) | ${labels[p.status]} | ${md(p.china.note)} | ${p.checkedAt} |`)].join('\n')]),
'## 研究与去重口径','每款保留有来源的产品图、参考图、AI生成概念爆炸图、八维详析与供应链候选。图片不构成实物拆机，候选公司不代表原产品已采用。颜色、服装、相同硬件的角色皮肤与套餐不增加产品条目；不同实现仍按核心需求分组比较。',
'儿童与成人产品并列收录，不能从“玩具”二字推断适用年龄。是否需要订阅、手机、稳定联网，以及家庭如何管理录音和内容，均需按具体型号和地区条款核对。当前研究未开展儿童试用、用户访谈或产品安全测试。',
'[返回智能硬件目录](hardware-market.md)'];
await writeFile(new URL('docs/ai-toys.md',root),lines.join('\n\n')+'\n');
const statuses={reservation:'付费预约 · 非正式订单',waitlist:'候补 / 尚未开放', 'out-of-stock':'缺货 / 无可下单证据',discontinued:'停售 / 服务结束',unclear:'证据不足', 'not-ai':'AI能力不足以确认',duplicate:'合并 / 不重复计数',b2b:'非消费零售'};
const log=['# AI玩具筛选记录',`本轮记录 ${screen.length} 条未纳入或合并线索。它们不是新增在售产品，不计入可订购数量。`,'有发布报道、展商页面或加购按钮，不足以独立证明当前交付；需要结合库存、变体、服务和订购条件核对。记录仅反映核查时获得的证据，证据不足不等于认定产品或公司不存在。',...screen.map(x=>`## ${md(x.name)}\n\n**${statuses[x.status]||md(x.status)}** · 核查 ${x.checkedAt}\n\n${x.reason}\n\n[核查来源](<${x.url}>)`),'[返回AI玩具目录](ai-toys.md)'];
await writeFile(new URL('docs/ai-toy-screening.md',root),log.join('\n\n')+'\n');
const p=new URL('README.md',root);let s=await readFile(p,'utf8');
const block=`<!-- AI-TOYS:START -->\n\n## AI玩具\n\n[打开AI玩具目录](https://romanagent.github.io/Roman/#hardware/toys) · [GitHub分类阅读版](docs/ai-toys.md) · [未纳入与合并线索](docs/ai-toy-screening.md)\n\n[![AI玩具目录预览](assets/ai-toys-preview.png)](https://romanagent.github.io/Roman/#hardware/toys)\n\n当前 ${rows.length} 份产品 / 系列档案，${available.length} 款在售或正式预售；分为对话毛绒与挂件、机器人与电子宠物、互动学习与创作、实体游戏与对弈。每款提供图像、八维详析和供应链关联，可按玩法、销售状态及国内购买情况筛选。\n\n保留各产品原核查日期，最新 ${latest}。这是可核查产品目录，不代表全球全部品牌或SKU；换色和同硬件角色外观合并。\n\n<!-- AI-TOYS:END -->`;
if(s.includes('<!-- AI-TOYS:START -->'))s=s.replace(/<!-- AI-TOYS:START -->[\s\S]*?<!-- AI-TOYS:END -->/,block);
else s=s.replace('## 供应链公司目录',block+'\n\n## 供应链公司目录');
await writeFile(p,s);
console.log(JSON.stringify({aiToys:rows.length,available:available.length,screened:screen.length,latest}));
