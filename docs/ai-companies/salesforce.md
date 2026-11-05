# Salesforce

企业与业务流程 · 美国 · 核查 2026-11-05

面向企业客户关系与服务流程，将AI代理接入客服、销售、员工和现场服务等任务，并以构建、规则、观察和计费工具支持部署；核心是业务系统中的可控行动，不是单独聊天回答。

**业务入口：商务接洽**。Agentforce提供构建试用和企业采购入口，实际客服、销售或员工流程需要组织数据、权限与渠道配置；不同用例和计费方式不能混为统一免费产品。

公司与集团：Agentforce是Salesforce平台产品业务，本条不另把Einstein历史品牌、代理模板或Salesforce旗下其他应用算成独立AI公司。

地区口径：按官方全球办公室目录所列旧金山全球总部归类，不由地区页面语言或区域法人推定。

[公司官网](<https://www.salesforce.com/>) · [网页档案](https://romanagent.github.io/Roman/#ai/company/salesforce)

## 重点产品

### Agentforce

平台 · 已公开提供

为企业配置面向客户和员工的代理，连接业务数据与动作，在服务、销售及相关流程中提供回答、处理和升级转交。

目标用户：使用客户关系和服务系统的企业业务团队、管理员与实施伙伴。

AI作用：模型用于理解请求和推理，Agent Script将确定性业务逻辑与代理推理组合，配合动作和观测；不能把控制流程等同消除所有模型错误。

使用与交付：在Salesforce平台配置代理、动作、规则和渠道，构建访问需管理员权限，正式使用范围按合同与资源确定。

收费形式：公开提供按动作额度、对话或用户许可等计费方式；免费构建入口不等于生产运行无费用，具体用例按现行费率和合同确认。

产品边界：数据质量、身份权限和业务规则直接影响操作后果；需明确转人工和异常恢复，产品模板不能保证适合所有行业，也不能自动承担客户承诺。

[产品入口](<https://www.salesforce.com/agentforce/>) · [Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>) · [Agentforce计费方式](<https://www.salesforce.com/agentforce/pricing/>) · [Agent Script确定性逻辑与代理推理](<https://www.salesforce.com/agentforce/script/>) · [Agentforce观察与分析](<https://www.salesforce.com/agentforce/observability/>)

## 八维产品分析

下述八维聚焦Agentforce在企业服务流程中的构建、动作执行、规则控制与计费，结合Agent Script和观测能力；不分析Salesforce全部CRM产品，也不把所有模板、渠道和行业方案视为同等开放。

> 以公开一手资料开展案头研究，围绕列明的重点产品与工作流分析。官方能力与研究判断分开；没有实际注册、付费调用、性能测试、用户访谈或销量审计。未披露的收入、成本、模型依赖和运营结果不编造。

## 需求与市场

### 服务请求需要业务动作 · 研究判断

客户请求往往不止问一个问题，还要查询记录、更新状态或转给合适人员。Agentforce对应的需求是把理解语言与这些动作连接起来，价值应看问题是否真正解决，而不是对话持续更久或机器人回答更多。

依据：[Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>)

### 员工流程同样有边界 · 研究判断

请假、工单和现场服务等流程可以复用企业资料，但每类动作的权限和后果不同。研究应先选择边界清楚的任务，确认哪些判断能自动化、哪些需要人工决策，不能因为平台覆盖多个部门就假定同一代理适合全部场景。

依据：[Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>)

## 目标用户

### 业务团队与实施人员 · 研究判断

业务负责人定义服务规则，管理员配置数据和权限，实施人员连接现有系统。三者共同决定能否交付，因此产品采用不能只靠一个聊天演示；用户研究应检查规则变更后谁负责维护、测试和批准上线。

依据：[Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>) · [Agent Script确定性逻辑与代理推理](<https://www.salesforce.com/agentforce/script/>)

### 最终客户不关心代理品牌 · 研究判断

面对代理的客户主要关心问题是否解决、是否重复说明和能否找到人工。企业采购指标应包含这些体验，而不能只看自动处理比例；若客户被困在错误流程里，减少人工接入可能只是把成本转移给使用者。

依据：[Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>)

## 产品与工作流

### 动作与规则显式配置 · 研究判断

Agent Script把业务逻辑与模型推理组合，并可用变量保存关键信息。合理工作流应让身份确认、重要条件和批准路径保持明确，模型负责适合语义判断的部分，避免让复杂政策全部依赖一段长提示。

依据：[Agent Script确定性逻辑与代理推理](<https://www.salesforce.com/agentforce/script/>)

### 模拟与上线后观察 · 研究判断

官方提供模拟、执行步骤和观察入口，有助在发布前发现分支错误并在运行后追踪。研究应覆盖异常输入、重复请求和外部系统失败，观察是否安全停止或转人工，而不是只测试一次正常客服案例。

依据：[Agent Script确定性逻辑与代理推理](<https://www.salesforce.com/agentforce/script/>) · [Agentforce观察与分析](<https://www.salesforce.com/agentforce/observability/>)

## AI技术与依赖

### 确定性控制不能包办正确性 · 研究判断

固定步骤可以减少流程偏离，但输入理解、外部数据和动作结果仍可能有误。技术评价应分开检查语言理解、规则分支和系统执行，不把脚本化等同模型不再犯错，也不能仅凭审计日志存在就证明操作合理。

依据：[Agent Script确定性逻辑与代理推理](<https://www.salesforce.com/agentforce/script/>)

### 数据与身份是关键依赖 · 研究判断

代理回答和行动需要正确客户记录、权限及实时状态，底层资料质量会直接影响结果。应测试同名客户、缺失字段和权限变化等情形，确保系统不会用错误上下文执行动作；模板只提供起点，不能替代具体业务校验。

依据：[Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>) · [Agent Script确定性逻辑与代理推理](<https://www.salesforce.com/agentforce/script/>)

## 竞争与替代

### 与传统客服自动化比较 · 研究判断

传统聊天机器人和规则工作流在明确问题上已经可用，Agentforce需要证明对复杂表达和跨步骤任务的增量。比较应使用相同服务范围和转人工条件，避免用代理广泛承诺与旧系统狭窄配置作不公平对照。

依据：[Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>)

### 与独立代理平台比较 · 研究判断

已有Salesforce数据和流程的企业可能减少部分接入工作，其他组织则要考虑系统整合。选择应看现有架构、治理和服务需求，而不是因为代理名称新颖便替换成熟工具；单一问答场景也未必需要完整CRM平台。

依据：[Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>) · [Salesforce公司与平台定位](<https://www.salesforce.com/company/our-story/>)

## 商业模式

### 多种计费口径对应不同使用 · 研究判断

公开方案有按动作额度、对话和用户许可等方式，不能把一次对话与一次业务结果视为同一计费单位。采购应模拟典型任务及重试行为，再核对资源和渠道费用，本研究未获取实际账单，不估算自动化节省金额。

依据：[Agentforce计费方式](<https://www.salesforce.com/agentforce/pricing/>)

### 构建免费与运行成本分开 · 研究判断

免费构建或试用入口有助验证流程，但正式服务涉及调用、数据和实施。商业评估应包含持续规则维护、人工升级与故障恢复，避免仅用模型调用价格比较人力；产品是否合算取决于完成任务的整体成本和质量。

依据：[Agentforce计费方式](<https://www.salesforce.com/agentforce/pricing/>) · [Agent Script确定性逻辑与代理推理](<https://www.salesforce.com/agentforce/script/>)

## 体验与交付

### 转人工与上下文传递 · 研究判断

客户遇到复杂问题时，需要能够转到合适人员且不必从头解释。体验测试应检查代理保存的事实是否准确、人工能否理解已执行动作，以及用户是否知道当前处理者，避免表面连续的对话掩盖责任切换。

依据：[Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>)

### 给管理者可用的执行证据 · 研究判断

管理员需要从异常结果回到具体动作、变量和外部系统响应，才能修正规则。观察功能的价值应通过真实排查任务验证，不能只看仪表盘图表数量；过多指标若无法解释错误来源，也可能增加管理负担。

依据：[Agent Script确定性逻辑与代理推理](<https://www.salesforce.com/agentforce/script/>) · [Agentforce观察与分析](<https://www.salesforce.com/agentforce/observability/>)

## 风险与机会

### 错误行动比错误回答影响更大 · 研究判断

代理可能修改业务记录或形成客户预期，因此重要动作应具备明确权限、确认和恢复路径。机会在于让规则与模型各自承担合适职责，并在证据不足时转人工，而不是把全天自动服务宣传理解为永远不需要人的判断。

依据：[Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>) · [Agent Script确定性逻辑与代理推理](<https://www.salesforce.com/agentforce/script/>)

### 结果指标需要独立定义 · 研究判断

企业应预先定义解决问题、重复联系和错误处理等指标，再比较代理介入前后的流程。不能只用会话结束或自动化比例判断成功，也不能把某个客户案例外推到所有行业；本研究仅提供案头分析，未实测交付效果。

依据：[Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>) · [Agentforce计费方式](<https://www.salesforce.com/agentforce/pricing/>)

## 资料来源

- [Agentforce当前产品与场景](<https://www.salesforce.com/agentforce/>) — 已读取客服、销售、员工及现场服务任务，以及构建和代理工具入口。（核查 2026-11-05）

- [Agentforce计费方式](<https://www.salesforce.com/agentforce/pricing/>) — 已读取Flex Credits、Conversations、用户许可及免费构建入口，不将它们合并成单一价格。（核查 2026-11-05）

- [Agent Script确定性逻辑与代理推理](<https://www.salesforce.com/agentforce/script/>) — 已读取业务规则、变量、模拟和执行追踪；消除随机性等保证性宣传不作独立结论。（核查 2026-11-05）

- [Agentforce观察与分析](<https://www.salesforce.com/agentforce/observability/>) — 已打开代理监测分析产品页，不据可观测功能推定实际服务质量。（核查 2026-11-05）

- [Salesforce公司与平台定位](<https://www.salesforce.com/company/our-story/>) — 已读取客户关系平台与代理体系定位，不采用市场排名宣传。（核查 2026-11-05）

- [Salesforce全球办公室](<https://www.salesforce.com/uk/company/locations/?bc=OTH>) — 官方页面明确Worldwide Corporate Headquarters为San Francisco，已由协作研究核查。（核查 2026-11-05）

[返回AI目录](../ai-directory.md)
