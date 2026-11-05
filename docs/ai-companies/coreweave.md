# CoreWeave

算力与推理基础设施 · 美国 · 核查 2026-11-05

为AI模型团队和企业提供GPU计算、存储、网络与运行管理，把训练和推理工作负载部署到专用云基础设施；同时整合开发工具，但基础设施可用不保证模型质量，公开实例价格也不等于完整项目成本或立即有容量。

**业务入口：商务接洽**。提供AI云平台、公开费率和商务接洽，正式GPU容量需按地区、实例和合同开通；最新硬件展示、报价入口与实际可获得容量不能混同。

公司与集团：官方确认2025-05-05完成收购Weights & Biases，现作为CoreWeave Forge中的产品；若另列该业务须保留上层归属。本条聚焦云基础设施，NVIDIA硬件及伙伴关系不作为整体被收购的证据。

地区口径：按官方收购公告中的CoreWeave美国主体、Livingston新泽西发布地及美国云业务口径归类，不据此断言当前唯一总部。

[公司官网](<https://www.coreweave.com/>) · [网页档案](https://romanagent.github.io/Roman/#ai/company/coreweave)

## 重点产品

### CoreWeave Cloud基础设施

基础设施 · 已公开提供

提供GPU计算、AI存储与集群网络，结合Kubernetes等运行管理承载模型训练和推理，为需要持续算力的组织交付云环境。

目标用户：模型训练团队、AI应用与平台工程团队，以及需要规模化GPU资源的企业。

AI作用：平台提供模型训练与推理所需计算和调度资源，并支持观察和故障处理；AI行为主要来自客户模型与应用，不是云服务自动保证任务正确。

使用与交付：通过云账户和商务容量安排部署工作负载，具体硬件、地区、网络和存储需配置；大规模集群交付按合同确认。

收费形式：公开列按需、Spot和其他容量方式，计算之外还有存储及网络等费用；长期承诺、区域和实例条件影响总成本，不能只引用单卡小时价。

产品边界：资源可用性、集群通信、存储吞吐与任务恢复影响实际效果；最新硬件宣布或示范不代表所有用户可即时获得相同配置，也不保证长期成本优势。

[产品入口](<https://www.coreweave.com/platform>) · [CoreWeave云平台当前组成](<https://www.coreweave.com/platform>) · [CoreWeave当前云费率](<https://www.coreweave.com/pricing>) · [CoreWeave官方运行文档](<https://docs.coreweave.com/>) · [Weights &amp; Biases归属及当前Forge迁移](<https://www.coreweave.com/companies/weights-and-biases>)

## 八维产品分析

分析围绕CoreWeave GPU云的计算、存储、网络与容量交付，Weights & Biases只用于归属和软件衔接边界；不评价全部Forge单品，不把云基础设施当作独立基础模型，也不使用厂商benchmark预测项目成本或成功。

> 以公开一手资料开展案头研究，围绕列明的重点产品与工作流分析。官方能力与研究判断分开；没有实际注册、付费调用、性能测试、用户访谈或销量审计。未披露的收入、成本、模型依赖和运营结果不编造。

## 需求与市场

### AI任务需要可用的完整集群 · 研究判断

训练和推理不只需要GPU，还依赖存储、网络和运行管理，任何环节不足都可能让资源等待。CoreWeave的需求是提供协同基础设施，价值应看完整任务是否稳定完成，而不是仅拥有最新加速卡或更高峰值参数。

依据：[CoreWeave云平台当前组成](<https://www.coreweave.com/platform>)

### 容量规划与弹性之间的取舍 · 研究判断

团队既希望随时扩展，又需要控制长期支出，按需和承诺容量满足不同情境。需求研究应基于实际任务持续性和排队情况，不能因为AI规模增长就推定每家客户都需要长期锁定大量资源。

依据：[CoreWeave当前云费率](<https://www.coreweave.com/pricing>)

## 目标用户

### 模型团队与平台工程师 · 研究判断

研究人员关注训练结果，平台人员负责运行、存储和故障处理，二者共同决定云服务价值。产品采用应观察他们如何共享任务状态和资源信息，避免只让研究者评价运行速度而忽略运营负担。

依据：[CoreWeave云平台当前组成](<https://www.coreweave.com/platform>) · [CoreWeave官方运行文档](<https://docs.coreweave.com/>)

### 企业采购与使用者分工 · 研究判断

大规模容量采购可能由财务、基础设施和安全团队参与，实际开发者却面对日常调度和数据访问。评估需要让各方理解同一交付范围，尤其地区、隔离和服务支持不能只在商务阶段确认而不传给使用团队。

依据：[CoreWeave当前云费率](<https://www.coreweave.com/pricing>) · [CoreWeave云平台当前组成](<https://www.coreweave.com/platform>)

## 产品与工作流

### 数据准备与任务部署连接 · 研究判断

工作负载进入云端前需要镜像、数据和资源配置，运行后还要保存结果与检查点。研究应检查这些步骤能否重复和恢复，不能把实例启动成功当作训练或推理服务已经准备好，数据移动也可能是主要准备成本。

依据：[CoreWeave官方运行文档](<https://docs.coreweave.com/>) · [CoreWeave云平台当前组成](<https://www.coreweave.com/platform>)

### 从实验到持续生产服务 · 研究判断

短期实验可容忍中断，生产推理和长期训练需要不同容量与恢复安排。工作流应保留模型和环境版本、监控与故障策略，不能把一次演示运行的资源配置直接当作持续服务标准，特别是Spot等资源条件需要单独理解。

依据：[CoreWeave当前云费率](<https://www.coreweave.com/pricing>) · [CoreWeave官方运行文档](<https://docs.coreweave.com/>)

## AI技术与依赖

### 计算网络存储共同影响吞吐 · 研究判断

GPU性能只是集群表现的一部分，数据读取、节点通信和并行策略会影响有效利用。技术比较应使用相同模型、精度与任务规模，观察实际完成时间和恢复，不应将单卡规格或厂商利用率指标推广到全部负载。

依据：[CoreWeave云平台当前组成](<https://www.coreweave.com/platform>)

### 运行管理不能保证模型有效 · 研究判断

平台可以观察和管理资源，模型训练是否合理、推理输出是否正确仍依赖客户方法。评估应区分基础设施故障、软件错误和模型质量，不能因为云任务完成就认为科学实验或业务应用已经通过验证。

依据：[CoreWeave官方运行文档](<https://docs.coreweave.com/>) · [CoreWeave云平台当前组成](<https://www.coreweave.com/platform>)

## 竞争与替代

### 与综合云及自建集群比较 · 研究判断

替代方案包括综合云厂商、自建数据中心和其他GPU服务，CoreWeave强调AI工作负载专用基础设施。选择应看所需规模、支持和迁移条件，而不是只比较某个公开小时价或最新硬件首发新闻。

依据：[CoreWeave云平台当前组成](<https://www.coreweave.com/platform>) · [CoreWeave当前云费率](<https://www.coreweave.com/pricing>)

### 专用云与模型API不同 · 研究判断

购买GPU容量意味着客户承担更多模型部署与运行责任，直接调用模型API则将部分工作交给提供方。团队应先明确需要控制哪一层，不能把底层计算价格与完成答案的API价格直接比较而忽略软件及运维。

依据：[CoreWeave云平台当前组成](<https://www.coreweave.com/platform>) · [CoreWeave官方运行文档](<https://docs.coreweave.com/>)

## 商业模式

### 多项资源构成总费用 · 研究判断

公开价格区分实例、地区和购买方式，存储与网络也可能单独影响支出。预算应使用真实运行时长、闲置和数据流量，不能只引用单卡价格推算整体项目，更不应将预期折扣和未取得容量当作已实现成本。

依据：[CoreWeave当前云费率](<https://www.coreweave.com/pricing>)

### 软件收购带来组合但非强制绑定 · 研究判断

W&B已完成并入并在Forge中提供，但官方仍说明其可跨云使用。商业分析应区分所有权和技术绑定，不能说使用实验追踪必须迁到CoreWeave计算，也不能把品牌统一理解为所有旧账户和自托管部署同时改变。

依据：[Weights &amp; Biases归属及当前Forge迁移](<https://www.coreweave.com/companies/weights-and-biases>)

## 体验与交付

### 故障恢复决定长任务体验 · 研究判断

长时间训练中，检查点、任务重启和异常定位会影响用户真正损失多少时间。体验测试应包含节点或软件失败，观察团队能否恢复到明确状态，不能只看正常运行时的速度或仪表盘是否丰富。

依据：[CoreWeave云平台当前组成](<https://www.coreweave.com/platform>) · [CoreWeave官方运行文档](<https://docs.coreweave.com/>)

### 容量与账单应透明可理解 · 研究判断

用户需要知道已分配资源、等待原因和当前消耗，采购承诺也应与运行界面一致。研究应测试缩容、停止和账单归属，避免资源不用了却仍产生未预期费用；公开报价页不能替代账户中真实可用配置。

依据：[CoreWeave当前云费率](<https://www.coreweave.com/pricing>)

## 风险与机会

### 资源依赖与迁移需要准备 · 研究判断

训练和服务依赖云端资源时，模型、数据和运行配置应有清楚备份与迁移路径。产品机会在可靠交付和恢复，而不是仅提供更多容量；组织仍需确认敏感资料、区域和外部依赖，不能用基础设施规模替代治理。

依据：[CoreWeave云平台当前组成](<https://www.coreweave.com/platform>) · [CoreWeave官方运行文档](<https://docs.coreweave.com/>)

### 用自身工作负载验证供应承诺 · 研究判断

应在采购前运行代表性任务，检查质量、成本和故障恢复，再决定容量承诺。目录不采用厂商领先排名、客户数量或性能倍数作保证，也不把未来机架宣布、合作协议或收购预期当作现有交付成果。

依据：[CoreWeave当前云费率](<https://www.coreweave.com/pricing>) · [Weights &amp; Biases归属及当前Forge迁移](<https://www.coreweave.com/companies/weights-and-biases>)

## 资料来源

- [CoreWeave云平台当前组成](<https://www.coreweave.com/platform>) — 已读取GPU、Kubernetes、存储、网络和验证工作负载入口，不采用利用率、速度和可靠性对比数字。（核查 2026-11-05）

- [CoreWeave当前云费率](<https://www.coreweave.com/pricing>) — 已读取按需、Spot、地区和联系销售条目，计算/存储/网络分开，不编造项目统一报价。（核查 2026-11-05）

- [CoreWeave官方运行文档](<https://docs.coreweave.com/>) — 已读取部署、管理和观察工作负载的官方文档入口，未实际创建资源。（核查 2026-11-05）

- [Weights &amp; Biases归属及当前Forge迁移](<https://www.coreweave.com/companies/weights-and-biases>) — 明确2025-05-05完成收购，2026-09-30部分SaaS登录转Forge，自托管不同；本条不重复分析全部W&amp;B功能。（核查 2026-11-05）

- [CoreWeave完成收购公告](<https://investors.coreweave.com/news/news-details/2025/CoreWeave-Completes-Acquisition-of-Weights--Biases/default.aspx>) — 已读取美国公司及Livingston发布地、美国欧洲云业务和收购完成事实，不采用融资和客户规模推断效果。（核查 2026-11-05）

[返回AI目录](../ai-directory.md)
