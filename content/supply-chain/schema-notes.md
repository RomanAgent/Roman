# 供应链与深度分析数据约定

核查日：2026-11-04。公司目录为公开资料研究，不声称全球穷尽。实际供货关系必须有点名证据，能力候选不等于已采用。

公司分片 `companies-<group>.json` 为数组，每项：

```json
{
  "id":"ascii-slug", "name":"公司品牌名", "legalName":"公开主体名或品牌归属说明", "country":"总部所在国家/地区", "locations":["公开服务/生产地区"],
  "tier":"global|specialist|growth", "tierNote":"规模口径：只作目录分组，不杜撰员工/营收",
  "roles":["chip"], "capabilities":["具体产品/服务"], "productCategories":["glasses"],
  "website":"https://...", "contactUrl":"https://...", "checkedAt":"2026-11-04",
  "summary":"具体定位，70字以上",
  "analysis":{
    "positioning":[{"title":"定位","text":"至少70字的公司特定分析","evidence":"official|analysis","sourceIds":["s1"]}],
    "capability":[],"fit":[],"engagement":[],"quality":[],"commercial":[],"risks":[],"verification":[]
  },
  "sources":[{"id":"s1","title":"已打开的第一方页面","url":"https://...","note":"具体支持的事实","accessedAt":"2026-11-04"}]
}
```

roles 只用 chip, connectivity, sensing, optics, acoustics, display, power, motion, mechanical, pcb, manufacturing, engineering, software, testing, distribution。
每家公司至少2条已打开来源；analysis八项每项至少2段，每段70–160中文字符左右（不得模板堆字）。不虚构MOQ、报价、交期、认证、客户关系、产能、国内服务或代工厂。

产品深度分片 `content/hardware/deep/<group>.json` 为数组，每项：

```json
{"id":"现有产品ID","checkedAt":"2026-11-04","sources":[{"id":"s1","title":"产品原有或新核查资料","url":"https://...","note":"支持范围"}],"dimensions":{"demand":[{"title":"任务与触发场景","text":"针对本型号的实质分析，70–160字","evidence":"official|analysis|validation","sourceIds":["s1"]}],"userProfile":[],"competition":[],"supplyChain":[],"technology":[],"aesthetics":[],"risks":[],"opportunity":[]},"supplierLinks":[{"supplierId":"公司ID","role":"sensing","relationship":"candidate|disclosed","component":"具体功能模块","rationale":"具体匹配原因与关键不匹配/待确认条件，至少60字","sourceIds":["s1"],"supplierSourceIds":["s1"]}]}
```

产品八项每项至少3段，合计至少230中文字符，标题区分事实/判断/验证；每段均是具体型号的分析，不批量复制品类模版，不把待验证写成实测。保留原有短文摘要作对比，不修改research源字段。供应链至少3段：功能拆分、制造/供应约束、候选选型和证据缺口。每个产品至少2个真正匹配的候选公司跳转；可选已有自己组公司，公司源支持能力，产品源支持模块存在。disclosed必须公开点名本产品/系列供货或合作，不以常见方案猜测。至少2条来源；新增硬事实需本轮打开来源核验，原目录已有事实可沿用已核验资料并注明引用范围。

公开采用关系另需 `relationshipEvidence` 字段，至少30字符，说明公开资料点名的产品、公司、模块及覆盖边界；不能只写“官网确认”。candidate 不需要该字段。

禁止修改其他工作组文件、现有图片、主程序、脚本、README、构建产物和Git。各组可保存暂存脚本到/private/tmp，不进交付目录。
