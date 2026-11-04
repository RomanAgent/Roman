# Bosch Sensortec 博世传感器

博世传感器将惯性测量、可编程处理和融合软件放在紧密结合的系统中，适合个人硬件中的姿态、手势和活动输入。目录强调不同型号与软件变体的区别，不把自学习能力泛化到所有惯性器件。传感器可以帮助减少主控唤醒，但实际识别效果、漂移和续航仍取决于安装、佩戴与整机软件，公开渠道状态也不能视为即时供货保证。

核查 2026-11-04 · 德国 · 综合与跨地区供应商

按消费 MEMS 与智能传感系统覆盖分组，不借集团规模推断具体器件库存或服务承诺。

[官网](<https://www.bosch-sensortec.com/>) · [公开联系入口](<https://www.bosch-sensortec.com/en/about-us/contact>)

公开地区：德国 Reutlingen、全球官方销售与分销地区

能力：BHI360 可编程六轴惯性传感系统、传感融合、姿态和手势处理、面向眼镜与耳部设备的运动感知、不同变体的自学习与运动软件

## 公司定位与边界

### 官方｜测量与处理结合 · 官方资料

所核查系统把六轴惯性测量、可编程处理和预置融合软件结合，允许部分传感任务直接在器件侧运行。它不只是输出原始运动数据，但也不是通用大模型处理器；目录将姿态、手势和活动输入与最终用户建议分开，不因具有智能软件就推断完整产品能力。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>)

### 判断｜主控卸载的收益 · 研究判断

手表、眼镜和耳部设备可能通过传感器侧处理减少主控唤醒，但收益取决于输出频率和算法复杂度。若主控仍需持续读取大量数据，额外处理未必省电；选型应比较完整系统的工作状态，而不是只看智能传感器自身的电流或能运行多少种算法。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>) · [BHI360 and BHI380 smart sensor systems](<https://www.bosch-sensortec.com/en/news/new-smart-sensor-systems-bhi360-and-bhi380.html>)

## 产品与技术能力

### 官方｜变体软件不同 · 官方资料

官方说明区分基本可编程融合与增加特定自学习、运动算法的变体，说明软件能力需要对应具体型号与配置。目录不会把某个系列发布中的全部功能自动写到每颗器件上，采购和验证都应锁定所需软件包，避免硬件相近却缺少目标算法的情况。

依据：[BHI360 and BHI380 smart sensor systems](<https://www.bosch-sensortec.com/en/news/new-smart-sensor-systems-bhi360-and-bhi380.html>)

### 官方｜眼镜感知任务分层 · 官方资料

眼镜应用页区分沉浸头显、显示眼镜和无显示眼镜，并给出不同的运动与交互需求。这支持按场景选择惯性、语音振动或其他传感器，但不是每副眼镜都需要全部模块；目录不会为了列供应商而替没有追踪需求的成品增加未披露功能。

依据：[Sensing solutions for XR headsets and glasses](<https://www.bosch-sensortec.com/en/applications-solutions/xr-headset-and-glasses>)

## 适用场景与匹配

### 判断｜腕部动作识别 · 研究判断

腕部手势可能减少触屏操作，但日常拿物、行走和乘车也会产生相似运动。候选验证应围绕用户愿意做的动作，比较误触发与学习负担，而不是只验证算法能识别预设手势；如果用户需要刻意夸张动作，传感器侧的低延迟未必转化为自然交互。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>)

### 判断｜头部与耳部姿态 · 研究判断

头部姿态可以服务空间音频或交互，但镜架和耳机的安装方向、松动与佩戴差异会影响输出。惯性融合也不能无限避免漂移，应根据任务考虑校准和其他输入；不能把器件支持头部追踪直接写成所有场景下稳定的空间定位或安全导航能力。

依据：[Sensing solutions for XR headsets and glasses](<https://www.bosch-sensortec.com/en/applications-solutions/xr-headset-and-glasses>)

## 合作与导入流程

### 判断｜先提供动作定义 · 研究判断

技术接洽应描述目标动作、安装方向、采样频率与允许误触发，并提供原始惯性数据。这样才能判断现成算法、可编程扩展还是外部主控更合适；只要求支持人工智能手势，容易忽略用户动作是否可区分，以及模型是否需要针对实际佩戴重新调整。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>) · [Contact Bosch Sensortec](<https://www.bosch-sensortec.com/en/about-us/contact>)

### 判断｜工具与许可确认 · 研究判断

开发前应确认传感器接口、固件版本、融合软件与定制工具的获取方式，并核对所需功能是否属于目标变体。公开下载和社区可以帮助启动，但不等于所有算法都可任意修改或商业使用；项目应保存配置与许可边界，避免后续更新破坏已验证的行为。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>) · [BHI360 and BHI380 smart sensor systems](<https://www.bosch-sensortec.com/en/news/new-smart-sensor-systems-bhi360-and-bhi380.html>)

## 质量与交付能力

### 判断｜安装与机械影响 · 研究判断

传感器焊接、主板刚度和外壳固定可能影响振动与测量，测试应在最终安装方向和接近量产结构中进行。对动作识别还需覆盖左右侧、松紧和不同用户，不能只在开发板上重复标准动作；数据质量与分类结果应同时检查，才能定位结构和算法问题。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>)

### 判断｜漂移与异常恢复 · 研究判断

质量验收应包含长时间运行、突然运动、休眠切换和重新佩戴，观察姿态是否需要重新校准及用户如何得知。若系统把不可靠姿态继续用于交互，可能产生误操作；应保留质量标志与恢复路径，不能只用启动后一小段平稳数据说明全天表现。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>) · [Sensing solutions for XR headsets and glasses](<https://www.bosch-sensortec.com/en/applications-solutions/xr-headset-and-glasses>)

## 商业与成本结构

### 判断｜软件价值与器件成本 · 研究判断

带处理与算法的器件可能减少主控工作和开发投入，但也需要更多版本管理与验证。成本应同时计算主控节省、电池变化、工具与算法维护，而不是只看器件单价；如果任务很简单，普通传感器加已有主控也可能更合理，需要用同一动作和功耗条件比较。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>) · [BHI360 and BHI380 smart sensor systems](<https://www.bosch-sensortec.com/en/news/new-smart-sensor-systems-bhi360-and-bhi380.html>)

### 判断｜公开库存的边界 · 研究判断

核查时产品页的渠道列表未显示可立即购买，不能据此承诺样片或量产现货，也不能反向认定整个产品已停止供应。项目应通过官方销售或授权渠道确认具体料号、数量与周期，并区分网页抓取状态和正式供货答复，目录不补造交期或起订量。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>) · [Contact Bosch Sensortec](<https://www.bosch-sensortec.com/en/about-us/contact>)

## 风险与替代路径

### 判断｜运动数据的健康外推 · 研究判断

活动或动作分类可以支持健身记录，但不能直接证明康复、情绪或疾病判断有效。器件和软件提供的是输入与分析基础，成品需要针对实际用户任务验证；目录不会把发布中的健康应用方向写成医学效果，也不从运动识别准确推导训练建议一定安全或正确。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>) · [BHI360 and BHI380 smart sensor systems](<https://www.bosch-sensortec.com/en/news/new-smart-sensor-systems-bhi360-and-bhi380.html>)

### 判断｜模型与佩戴迁移 · 研究判断

在一个位置训练的动作模型，换到不同表带、镜架或耳机结构后可能失效。团队应把佩戴变化和机械修改纳入回归，而不是只更新固件版本；尤其是微小手势，误触发来自日常动作的概率需要长期观察，短时演示无法替代真实使用中的稳定性证据。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>)

## 询价与验证清单

### 判断｜原始数据到虚拟输出 · 研究判断

验证可先记录原始惯性数据并离线评估动作，再将处理移到传感器侧，比较输出、主控唤醒和总耗电。若结果变化，应检查采样、窗口和配置，而非直接归因于芯片性能；逐层保留对照能够判断嵌入式处理是否确实减少了复杂度和资源消耗。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>)

### 判断｜候选关系需具体 · 研究判断

目录关联产品时应说明候选承担姿态、动作或佩戴感知中的哪一个模块，并列出尚未确认的安装与接口条件。没有品牌或供应商明确点名时，不推断某款手表、戒指或助听器采用博世传感器；常见行业使用和相似功能都不能代替具体型号的供货证据。

依据：[BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>) · [Contact Bosch Sensortec](<https://www.bosch-sensortec.com/en/about-us/contact>)

## 关联硬件产品

> 能力候选表示该公司公开业务与产品所需功能相关，用于重新选型或询价；不表示该产品已经采用该公司的零件或服务。公开披露关系必须有点名资料，仍不代表全部型号、批次或完整BOM。

- [Amazfit Active 2 (Round)](../hardware/amazfit-active-2-round.md) — **能力候选 · 非已采用** / 日常运动与姿态输入候选：本型号包含惯性和运动输入，博世传感系统可用于比较安装、采样和主控卸载路线，但没有供货点名。需要在真实腕围、动作和佩戴条件下验证，不能把预置算法当作 Zepp 的实际实现；运动输入也不等同生成式训练计划或医学效果。

- [Amazfit Balance 2](../hardware/amazfit-balance-2.md) — **能力候选 · 非已采用** / 运动与姿态输入候选：本型号需要运动输入，博世惯性传感与处理可用于新设计比较，但没有实际供货证据。需在真实腕围、佩戴和活动中验证安装、采样与功耗，不能把其预置算法当作 Zepp 的现用实现；传感能力也不提供语音语言、手机回复或训练建议服务。

- [Circular Ring 2](../hardware/circular-ring-2.md) — **能力候选 · 非已采用** / 戒指活动与运动输入候选：本型号披露运动输入，博世低功耗传感路线可用于新设计比较，但必须按戒指空间与功耗选择具体器件。当前未确认采用，也不能由候选六轴平台推断戒指一定含陀螺仪；安装、手指动作与算法需要验证，器件能力不等于基线解释或健康建议有效。

- [RingConn Gen 2](../hardware/ringconn-gen-2.md) — **能力候选 · 非已采用** / 活动与运动输入的低功耗候选：本型号包含运动输入，博世传感路线可用于比较安装、采样和主控分工，但必须按指环空间与电池选择具体器件。当前未确认供货，不能由候选六轴平台推断现有戒指配置；运动数据能力不等于呼吸洞察模型、测试聊天功能或医学效果。

- [WHOOP 5.0](../hardware/whoop-5.md) — **能力候选 · 非已采用** / 训练与活动记录的运动输入候选：本型号需要活动与运动信息，博世传感路线可作为新设计候选，需验证佩戴位置、安装、采样与主控功耗。当前没有实际采用证据，预置运动算法不等于 WHOOP 的负荷模型；器件也不提供会员服务或语言指导，不能由同类腕带常见方案推断供货。

- [Oticon Intent](../hardware/oticon-intent.md) — **能力候选 · 非已采用** / 头部与身体动作线索的惯性感知候选：本款公开采用动作线索，Bosch六轴惯性与融合能力可作为相近佩戴设备的运动输入研究方向。通用姿态数据并不等于用户意图，必须确认封装功耗、佩戴位置、声音同步及模型接口；未确认Intent采用BHI器件，也不能将BHI380自学习能力套给所有候选配置。

- [Maven Pet Health Tracker](../hardware/maven-pet-health-tracker.md) — **能力候选 · 非已采用** / 动作与状态采集器件候选：Bosch Sensortec公开动作感知器件可作为新佩戴方案的输入研究入口。它只能支持相关模块选型，不能由运动器件能力推断呼吸或心率等完整指标，更不能认定Maven实际采用；需在动物佩戴和完整数据链路中验证。

- [Invoxia Biotracker Edition 2026](../hardware/invoxia-biotracker-2026.md) — **能力候选 · 非已采用** / 佩戴动作感知模块候选：Bosch Sensortec公开动作传感能力可用于新犬只佩戴方案的输入研究，但不能由此推断完整生命体征测量或AI日记效果。需要按佩戴位置与动物活动验证数据链路，本目录没有Invoxia此型号实际采用该公司器件的证据。

## 来源

- [BHI360 Smart IMU](<https://www.bosch-sensortec.com/en/products/smart-sensor-systems/bhi360>)：支持六轴、可编程处理、融合与 SDK；页面渠道库存未显示可立即购买，不据此承诺现货。

- [Sensing solutions for XR headsets and glasses](<https://www.bosch-sensortec.com/en/applications-solutions/xr-headset-and-glasses>)：支持头部追踪、佩戴和手势等模块需求，具体推荐器件仍需逐型号确认。

- [BHI360 and BHI380 smart sensor systems](<https://www.bosch-sensortec.com/en/news/new-smart-sensor-systems-bhi360-and-bhi380.html>)：支持不同变体的软件范围与传感器侧处理目的，不把 BHI380 自学习软件直接归给所有 BHI360 配置。

- [Corporate information](<https://www.bosch-sensortec.com/en/corporate-information.html>)：支持德国 Reutlingen 主体与地址。

- [Contact Bosch Sensortec](<https://www.bosch-sensortec.com/en/about-us/contact>)：支持销售、技术社区及分销联系入口。

[返回供应链目录](../supply-chain.md)
