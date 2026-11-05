# Liquid AI

基础模型 · 美国 · 核查 2026-11-05

Liquid AI围绕受内存、能耗和延迟约束的设备开发基础模型，提供文本、多模态和专用任务模型组合。其价值需结合目标硬件评估，开放权重也不等于无条件商业许可或整个应用完全离线。

**业务入口：公开产品入口**。当前模型库提供可下载模型与端侧运行文档，但部分决策模型仅通过API提供；具体格式、许可和设备兼容须按型号核对。

公司与集团：Liquid AI及其LFM、Nanos等模型系列作为一个公司档案，不将合作芯片厂商或社区格式转换项目列为其子公司。

地区口径：按官方隐私政策列明的美国马萨诸塞州Cambridge公司联系地址记录，不把网站邮寄地址进一步认定为全部研发或服务部署地点。

[公司官网](<https://www.liquid.ai/>) · [网页档案](https://romanagent.github.io/Roman/#ai/company/liquid-ai)

## 重点产品

### Liquid Foundation Models 端侧模型组合

模型 · 已公开提供

面向文本、视觉、语音和分类决策等任务提供不同模型与运行格式，让开发者按输入输出和目标设备选择可本地部署的能力。

目标用户：开发手机、电脑、边缘设备应用的工程团队及需要本地推理的企业。

AI作用：模型承担生成、图像理解、语音处理或分类路由等不同任务；能力依型号而定，不能把多模态家族的全部输入输出合并为任意一款模型能力。

使用与交付：通过官方模型库及相应运行框架部署，模型与格式支持各异，部分决策型号仅提供托管API而不开放权重。

收费形式：采用LFM Open License的模型带年收入商业门槛，达到门槛需另签商业许可；部署硬件和应用维护费用另计，不提供统一项目报价。

产品边界：下载权重不等于无条件开源商用，也不保证适配任意处理器；量化后的质量、峰值内存和持续运行表现需实测，端侧推理不代表应用所有模块都不联网。

[产品入口](<https://docs.liquid.ai/lfm/models/complete-library>) · [Liquid Foundation Models当前模型矩阵](<https://docs.liquid.ai/lfm/models/complete-library>) · [LFM Open License官方指南](<https://docs.liquid.ai/lfm/help/model-license>) · [Liquid硬件评估指南](<https://docs.liquid.ai/guides/hardware-evaluation>)

## 八维产品分析

八维聚焦Liquid Foundation Models端侧模型组合、运行格式与商业授权边界，不覆盖所有托管API价格和定制合作；不将公司长期研究愿景当成每个已发布模型都具备的功能。

> 以公开一手资料开展案头研究，围绕列明的重点产品与工作流分析。官方能力与研究判断分开；没有实际注册、付费调用、性能测试、用户访谈或销量审计。未披露的收入、成本、模型依赖和运营结果不编造。

## 需求与市场

### 事实｜硬件约束是模型设计的起点 · 官方资料

Liquid将内存、耗电和响应时间视为设备端智能的限制，并强调模型与硬件协同设计。它的产品定位不能简化成更便宜的云端聊天接口；本条关注将可用能力放进具体设备的路径，公司关于长期自适应智能的愿景则不作为每个公开模型已实现功能。

依据：[Liquid AI公司定位与硬件协同设计](<https://www.liquid.ai/company>)

### 判断｜先找必须在设备完成的任务 · 研究判断

断网可用、降低交互等待或减少原始资料上传，可能构成选择端侧模型的理由，但并非所有应用都需要自带模型。创业团队应先明确哪个动作受网络或硬件限制，再判断小模型能否达到要求；若主要任务仍依赖实时联网资料，本地推理只是整个流程的一部分。

依据：[Liquid AI公司定位与硬件协同设计](<https://www.liquid.ai/company>) · [Liquid Foundation Models当前模型矩阵](<https://docs.liquid.ai/lfm/models/complete-library>)

## 目标用户

### 事实｜模型库按任务和运行格式分层 · 官方资料

官方将文本、视觉、音频、全模态、决策和专用小模型分别列出，并提示运行框架支持范围不同。选择者主要是负责应用集成的开发团队，不能仅因某个文字模型能运行，就推定相同设备及工具链也能直接运行语音或视觉系列。

依据：[Liquid Foundation Models当前模型矩阵](<https://docs.liquid.ai/lfm/models/complete-library>)

### 验证｜让产品团队和硬件团队共同验收 · 待验证

端侧应用既要完成用户任务，也要容纳在真实设备的资源预算内。验证应让算法、移动端和硬件人员共同使用目标机器，观察加载、并行应用和长时间交互，而不只查看开发电脑上的输出；本研究没有测试设备，也未验证任何型号的速度优于竞品。

依据：[Liquid硬件评估指南](<https://docs.liquid.ai/guides/hardware-evaluation>)

## 产品与工作流

### 事实｜先确定输入输出再选择部署路径 · 官方资料

官方建议先选符合任务输入输出的模型家族，再按运行位置选择框架和格式；模型矩阵区分官方与部分社区转换版本，并非每个型号支持全部路线。部分决策模型只通过API提供，因此公开模型库也不能被概括为所有产品均可下载并完全离线运行。

依据：[Liquid Foundation Models当前模型矩阵](<https://docs.liquid.ai/lfm/models/complete-library>)

### 判断｜本地和云端职责需要明确划分 · 研究判断

应用可以把简单任务交给本地模型，把需要外部资料或更高能力的步骤留给其他服务，但这应是明确的产品设计。用户需要知道什么时候会发起网络请求，开发者也需记录降级和重试行为；采用端侧模型的品牌并不能代替对实际数据流向的检查。

依据：[Liquid Foundation Models当前模型矩阵](<https://docs.liquid.ai/lfm/models/complete-library>) · [Liquid AI隐私政策与公司联系地区](<https://www.liquid.ai/privacy-policy>)

## AI技术与依赖

### 事实｜评估包含量化与内存行为 · 官方资料

硬件指南要求测量延迟、吞吐和不同上下文下的峰值内存，并比较量化选择带来的质量与性能取舍。参数规模只是选型线索，不足以描述实际应用表现；指南中针对部分家族的架构说明也不能被无差别套用到全部模态与未来模型。

依据：[Liquid硬件评估指南](<https://docs.liquid.ai/guides/hardware-evaluation>)

### 验证｜在真实使用条件下测持续表现 · 待验证

除短请求外，还应关注多轮输入增长、设备发热、后台占用和模型重新加载是否改变体验。量化可能让模型更容易装入内存，却需要重新核对任务错误；测试应固定设备、模型文件与任务样本，避免将一种运行环境的结果推广成所有处理器上的结论。

依据：[Liquid硬件评估指南](<https://docs.liquid.ai/guides/hardware-evaluation>)

## 竞争与替代

### 判断｜对比对象不只是大型云模型 · 研究判断

Liquid同时面对其他端侧模型、专用识别算法和现有规则系统。简单分类不一定需要生成式模型，复杂研究也未必适合小型本地模型；合理比较应围绕任务是否完成、设备资源和维护工作，不能仅凭设备端或液态网络的名称判定技术路线更先进。

依据：[Liquid Foundation Models当前模型矩阵](<https://docs.liquid.ai/lfm/models/complete-library>) · [Liquid AI公司定位与硬件协同设计](<https://www.liquid.ai/company>)

### 验证｜比较整个应用而不是单个输出 · 待验证

选型可让候选模型处理同一批实际输入，记录未完成任务、纠错负担及硬件占用，并保留原有不使用模型的方案。若端侧推理节省网络等待却增加下载和维护困难，优势可能被抵消；创业判断需要依赖这种完整流程证据，而不是一次流畅的演示。

依据：[Liquid硬件评估指南](<https://docs.liquid.ai/guides/hardware-evaluation>)

## 商业模式

### 事实｜开放许可带商业收入条件 · 官方资料

官方指南说明，适用LFM Open License的公开模型在企业年收入低于一千万美元时可按条件免费商用，达到门槛需另签商业许可。这不是标准Apache许可，衍生模型和下游商业使用也有边界；具体项目应核对所选模型实际许可，而不按开放权重四字决定。

依据：[LFM Open License官方指南](<https://docs.liquid.ai/lfm/help/model-license>)

### 判断｜部署成本会从调用转向维护 · 研究判断

端侧方案可能减少部分远程推理支出，同时增加模型分发、设备适配和问题定位工作。面向企业客户销售时，还要检查客户是否需要独立商业许可；因此收入规模与交付方式可能影响商业安排，不能把可免费下载解释成创业产品长期没有模型相关成本。

依据：[LFM Open License官方指南](<https://docs.liquid.ai/lfm/help/model-license>) · [Liquid硬件评估指南](<https://docs.liquid.ai/guides/hardware-evaluation>)

## 体验与交付

### 判断｜等待发生的位置影响使用体验 · 研究判断

用户可能不再等待网络，却需要首次下载、模型加载和输入处理。产品应让这些阶段清晰可见，并提供任务无法完成时的解释；对于便携设备，使用者还会关心能否与其他应用同时工作，这些感受比单一输出速度更接近用户实际判断。

依据：[Liquid硬件评估指南](<https://docs.liquid.ai/guides/hardware-evaluation>) · [Liquid Foundation Models当前模型矩阵](<https://docs.liquid.ai/lfm/models/complete-library>)

### 验证｜界面需要诚实表达端侧能力 · 待验证

如果模型只支持文字，界面不应以整个家族的多模态宣传承诺语音和图像能力；如果某个步骤转用API，也应说明连接与资料要求。可检查离线、低电量和不支持文件时的交互，本研究仅核公开资料，没有安装应用或提交用户信息进行体验验证。

依据：[Liquid Foundation Models当前模型矩阵](<https://docs.liquid.ai/lfm/models/complete-library>) · [Liquid AI隐私政策与公司联系地区](<https://www.liquid.ai/privacy-policy>)

## 风险与机会

### 判断｜机会在受约束设备的明确动作 · 研究判断

创业机会可能是把一个经常发生、输入相对明确的动作放到用户设备上，例如资料整理或特定分类，而不是复制通用聊天界面。差异来自设备交互、任务资料和错误恢复；模型只是实现选择，是否有需求仍要通过实际使用频率和付费责任验证。

依据：[Liquid AI公司定位与硬件协同设计](<https://www.liquid.ai/company>) · [Liquid Foundation Models当前模型矩阵](<https://docs.liquid.ai/lfm/models/complete-library>)

### 验证｜模型发布与应用隐私分开核查 · 待验证

公开权重的许可、托管服务的数据政策和最终应用的资料路径是不同事项，任何一项都不能替代其余核查。升级模型或转换格式后还需重新验证行为与兼容性；本目录不将公司效率或隐私定位写成性能保证，也不对具体企业给出许可适用结论。

依据：[LFM Open License官方指南](<https://docs.liquid.ai/lfm/help/model-license>) · [Liquid AI隐私政策与公司联系地区](<https://www.liquid.ai/privacy-policy>)

## 资料来源

- [Liquid AI公司定位与硬件协同设计](<https://www.liquid.ai/company>) — 已打开效率优先、设备限制及硬件共同设计说明，研究愿景不等于每款模型功能。（核查 2026-11-05）

- [Liquid Foundation Models当前模型矩阵](<https://docs.liquid.ai/lfm/models/complete-library>) — 已打开当前模态、运行框架及模型格式矩阵，部分模型仅API可用。（核查 2026-11-05）

- [LFM Open License官方指南](<https://docs.liquid.ai/lfm/help/model-license>) — 已打开2026年10月15日更新的收入门槛、下游客户及商业许可说明；仅适用于明确采用该许可的模型。（核查 2026-11-05）

- [Liquid硬件评估指南](<https://docs.liquid.ai/guides/hardware-evaluation>) — 已打开设备上延迟、内存、量化质量取舍的评估步骤，未运行实际模型。（核查 2026-11-05）

- [Liquid AI隐私政策与公司联系地区](<https://www.liquid.ai/privacy-policy>) — 已打开2026年9月30日版，确认美国联系地址与托管服务资料规则；不将其等同自主本地部署的数据路径。（核查 2026-11-05）

[返回AI目录](../ai-directory.md)
