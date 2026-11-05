# Sourcegraph

编程与开发 · 美国 · 核查 2026-11-05

面向拥有多仓库和复杂代码资产的软件组织，以代码索引、跨仓库搜索和AI调查帮助人及开发代理理解系统；重点是组织级上下文和可追溯回答，而非再提供一个独立通用聊天入口。

**业务入口：商务接洽**。企业代码平台以预约演示和合同采购为主要入口，另有公开代码搜索；私有仓库的AI功能需部署、授权和相应额度。

公司与集团：Amp已于2025年12月公开宣布从Sourcegraph独立为Amp Frontier Corporation，本条只分析Sourcegraph当前代码上下文平台，不把Amp当作其现行产品。

地区口径：按2026年6月12日官方隐私政策明确的美国运营口径归类；公司同时有全球团队，不断言单一固定总部。

[公司官网](<https://sourcegraph.com/>) · [网页档案](https://romanagent.github.io/Roman/#ai/company/sourcegraph)

## 重点产品

### Sourcegraph Deep Search 与代码上下文平台

平台 · 已公开提供

对组织已索引代码开展自然语言调查，追踪仓库、文件和历史变化，并把可检查的代码上下文提供给工程师与外部代理。

目标用户：跨团队维护大型代码库的工程师、平台与安全团队。

AI作用：代理围绕索引的代码图进行检索与推理，官方说明可在沙箱计算结果集合并展示文件和提交来源；索引覆盖与权限决定可调查范围。

使用与交付：通过企业部署接入代码托管平台，可经界面及MCP等入口使用；私有数据的访问仍需管理员配置。

收费形式：企业计划采用年度合同并含AI功能额度，按组织范围扩展；额外额度、部署方式与支持级别应向官方确认。

产品边界：引用代码能帮助复核但不保证语义结论正确；未索引仓库、过期分支和缺失运行配置可能形成盲区，重大变更仍需测试与维护者判断。

[产品入口](<https://sourcegraph.com/deep-search>) · [Sourcegraph当前平台](<https://sourcegraph.com/>) · [Deep Search工作机制](<https://sourcegraph.com/deep-search>) · [Sourcegraph企业合同与额度](<https://sourcegraph.com/pricing>)

## 八维产品分析

以下围绕Sourcegraph对复杂代码库的索引、调查与代理上下文供给，以及企业部署和合同方式展开；不分析已独立的Amp，也不将传统代码搜索的全部功能一概描述为生成式人工智能。

> 以公开一手资料开展案头研究，围绕列明的重点产品与工作流分析。官方能力与研究判断分开；没有实际注册、付费调用、性能测试、用户访谈或销量审计。未披露的收入、成本、模型依赖和运营结果不编造。

## 需求与市场

### 组织知识散落在代码中 · 研究判断

跨服务系统的行为可能分散在多个仓库和历史提交里，单个工程师很难一直掌握。Deep Search所对应的需求是帮助定位证据与关联关系，价值应体现为更少遗漏和更清楚的调查路径，而不是回答看起来像资深同事。

依据：[Deep Search工作机制](<https://sourcegraph.com/deep-search>)

### 重复调查的成本 · 研究判断

安全检查、遗留迁移和故障分析常反复提出相似问题，但所需代码集合会随项目变化。研究建议记录工程师为找到完整影响范围付出的步骤，判断统一索引是否减少重复准备，而不能从搜索覆盖数量直接推断业务价值。

依据：[Sourcegraph当前平台](<https://sourcegraph.com/>) · [Deep Search工作机制](<https://sourcegraph.com/deep-search>)

## 目标用户

### 维护大型代码资产的人 · 研究判断

平台更适合需要跨项目理解接口、依赖和历史的维护者，而非只有一个小仓库的初学者。平台团队和安全人员也可能成为用户，因为他们需要组织级视图；不同角色所需的访问权限和结果粒度必须分别设计。

依据：[Deep Search工作机制](<https://sourcegraph.com/deep-search>)

### 管理员参与交付 · 研究判断

企业搜索需要接入代码托管、同步索引和权限，管理员不是一次性安装后即可退出。采购评估应让代码所有者参与确认可见范围，尤其外部代理经接口调用时，要检查其身份是否与实际请求人的权限保持一致。

依据：[Sourcegraph企业合同与额度](<https://sourcegraph.com/pricing>) · [Sourcegraph当前平台](<https://sourcegraph.com/>)

## 产品与工作流

### 先调查再改动 · 研究判断

自然语言问题触发跨仓库调查，结果应带回文件、提交和差异等证据。这个工作流有助于在动手改代码前形成影响范围，但用户仍要判断来源是否属于正确分支和运行环境，不能直接把检索结果等同完整系统行为。

依据：[Deep Search工作机制](<https://sourcegraph.com/deep-search>)

### 向其他代理提供上下文 · 研究判断

平台可通过MCP等接口让已有开发代理访问代码知识，因此不必替换团队所有编辑器。研究应追踪外部代理是否真正引用并验证上下文，以及请求失败时的降级行为；接通接口本身不足以证明代理变得更准确。

依据：[Sourcegraph当前平台](<https://sourcegraph.com/>) · [Sourcegraph企业合同与额度](<https://sourcegraph.com/pricing>)

## AI技术与依赖

### 索引与推理分工 · 研究判断

Deep Search官方强调索引代码图，并描述在沙箱中对结果集合进行计数、排名和联接。技术比较要分开评估检索覆盖、集合运算与自然语言解释，避免把计算得到的数字和模型推断的原因混为同一可靠程度。

依据：[Deep Search工作机制](<https://sourcegraph.com/deep-search>)

### 更新与权限决定边界 · 研究判断

代码索引再广也可能缺少刚产生的分支、运行配置或外部服务状态。实际部署应检查同步时延、删除和权限变更如何传播，并明确哪些问题需要结合日志等其他资料，不能认为仓库图自动包含全部生产真相。

依据：[Deep Search工作机制](<https://sourcegraph.com/deep-search>) · [Sourcegraph企业合同与额度](<https://sourcegraph.com/pricing>)

## 竞争与替代

### 与原生代码搜索比较 · 研究判断

替代方案包括代码托管平台搜索、工程师本地检索和内部知识文档。Sourcegraph的差异在跨仓库上下文与调查链条，但若组织规模很小或文档已经清楚，专门平台的接入与维护成本可能超过收益。

依据：[Sourcegraph当前平台](<https://sourcegraph.com/>)

### 与编辑器代理协作 · 研究判断

编辑器代理通常围绕当前工作环境开展修改，组织级代码平台则尝试补充更广上下文。二者既可能竞争也可能配合，比较应观察同一跨服务问题的遗漏、引用和验证过程，而不是把所有代码AI产品当作可以直接互换。

依据：[Deep Search工作机制](<https://sourcegraph.com/deep-search>) · [Sourcegraph企业合同与额度](<https://sourcegraph.com/pricing>)

## 商业模式

### 合同与额度双重约束 · 研究判断

企业方案以年度合同和AI额度组织销售，组织要同时理解平台基础能力与推理消耗。评估应检查频繁调查、外部代理调用和大范围搜索如何影响额度，避免只按用户席位估算；本研究没有客户账单或采购折扣证据。

依据：[Sourcegraph企业合同与额度](<https://sourcegraph.com/pricing>)

### 上下文基础设施的黏性 · 研究判断

接入大量代码资产后，平台可能成为调查与代理工作流的共同依赖。持续价值应来自可靠索引和可用证据，而非单纯难以迁移；采购者应事先了解数据导出、接口和停止服务后的替代路径，再决定部署深度。

依据：[Sourcegraph当前平台](<https://sourcegraph.com/>) · [Sourcegraph企业合同与额度](<https://sourcegraph.com/pricing>)

## 体验与交付

### 引用是否容易复核 · 研究判断

来源不是装饰，工程师需要能从回答回到确切文件和提交，并区分事实、计算与推断。体验测试应实际点开引用，检查是否能重现调查结论，以及权限不足时是否清楚提示，而不是只看回答的长度与语言流畅度。

依据：[Deep Search工作机制](<https://sourcegraph.com/deep-search>)

### 规模下的查询体验 · 研究判断

跨仓库调查可能返回大量相似结果，排序、聚合和缩小范围会影响用户是否真的能做决定。建议使用典型迁移清单或历史故障测试，观察查全率与等待过程；厂商展示的大规模能力不等于每次查询都无需人工筛选。

依据：[Deep Search工作机制](<https://sourcegraph.com/deep-search>)

## 风险与机会

### 错误上下文的传播 · 研究判断

如果外部代理把过期或不完整结果当作依据，索引中的一个盲点可能被后续代码修改放大。机会在于把来源时间、分支、权限和不确定范围传递到调用端，使使用者能判断证据是否足够，而不是只输出一个确定答案。

依据：[Sourcegraph当前平台](<https://sourcegraph.com/>) · [Deep Search工作机制](<https://sourcegraph.com/deep-search>)

### 产品边界持续变化 · 研究判断

Amp独立说明代码工具的组织归属会变化，目录和采购不能沿用旧品牌印象。应以当前合同、产品文档和支持路径识别交付主体，同时保留历史迁移信息；过去同源的产品不代表今天共享账号、计费或安全保障。

依据：[Amp独立公司公告](<https://ampcode.com/news/amp-frontier-corporation>) · [Sourcegraph企业合同与额度](<https://sourcegraph.com/pricing>)

## 资料来源

- [Sourcegraph当前平台](<https://sourcegraph.com/>) — 已读取Deep Search、Code Search、MCP与批量变更等当前入口。（核查 2026-11-05）

- [Deep Search工作机制](<https://sourcegraph.com/deep-search>) — 已读取跨仓库调查、代码图、沙箱计算和可核查来源；客户引语不是本研究性能实测。（核查 2026-11-05）

- [Sourcegraph企业合同与额度](<https://sourcegraph.com/pricing>) — 已读取年度合同、AI额度、单租户与自托管选项，未获取定制报价。（核查 2026-11-05）

- [Amp独立公司公告](<https://ampcode.com/news/amp-frontier-corporation>) — 2025-12-02明确从Sourcegraph分拆为独立研究公司，只用于归属边界。（核查 2026-11-05）

- [Sourcegraph运营地区说明](<https://sourcegraph.com/terms/privacy>) — Data Transfers明确servers and operations位于美国，团队在全球。（核查 2026-11-05）

[返回AI目录](../ai-directory.md)
