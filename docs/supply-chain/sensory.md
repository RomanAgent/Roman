# Sensory

Sensory提供可集成进设备的语音、声音和生物特征算法。其唤醒与转写能力可作为消费硬件交互层的候选，需与声学、主控和应用共同设计；官网客户标志只反映公司展示，不能自动成为本目录某款产品的实际采用证据。

核查 2026-11-04 · 美国 · 细分专业供应商

按嵌入式语音与感知算法专业定位分组；联系页提供美国地址，不由客户标志推断具体项目关系或公司规模。

[官网](<https://sensory.com/>) · [公开联系入口](<https://sensory.com/contact-us/>)

公开地区：美国加州Santa Clara公开联系地址

能力：端侧唤醒词与指令、端侧语音转写、声音事件识别、说话人与人脸验证算法

## 公司定位与边界

### 处于感知与应用之间的算法层 · 官方资料

Sensory的公开产品覆盖唤醒、指令、转写以及声音和身份相关功能，强调设备侧运行。它应作为算法供应商理解，不是通用大模型公司，也不是提供整机物料的代工厂。自由对话仍需要语言推理、应用任务和输出等其他环节，不能把端侧唤醒成功等同完整助手已经实现。

依据：[Sensory Smart Wake Word 产品说明](<https://sensory.com/product/smart-wake-word/>) · [Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>)

### 适合作为交互入口比较对象 · 研究判断

对需要常时聆听但电量有限的消费设备，研究价值在于把启动交互与后续复杂请求分层，比较什么时候需要唤醒、什么时候需要转写，以及何时才值得调用其他服务。是否采用仍取决于设备资源、目标语言和授权条件，公司的行业经验不能代替本项目验证。

依据：[Sensory Smart Wake Word 产品说明](<https://sensory.com/product/smart-wake-word/>) · [Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>) · [Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)

## 产品与技术能力

### 端侧转写与后续服务分开 · 官方资料

转写页说明音频可在设备侧处理，输出文本还可选择进入本地或云端应用。这支持混合架构研究，但不表示所有后续推理都在端侧，也不意味着原始音频在任意集成方式下绝不会外传。应按照实际配置和接口确认数据流，而不是只引用页面的隐私宣传。

依据：[Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>)

### 模型与平台需逐项选择 · 研究判断

公开资料描述不同模型、语言和平台选项，项目应把准确性、内存、处理负载和响应时间作为共同约束。设备是否具备合适的音频采集链路同样关键；小型耳机、桌面音箱和移动机器人不能共用一套未经调试的声学假设。具体芯片支持还应向技术团队核对当前版本。

依据：[Sensory Smart Wake Word 产品说明](<https://sensory.com/product/smart-wake-word/>) · [Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>) · [Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)

## 适用场景与匹配

### 家庭与随身交互场景 · 研究判断

语音终端、穿戴设备和陪伴机器人可以把唤醒、声音事件或有限指令作为候选模块。评价应先明确用户想在双手被占用、视线移开或屏幕不方便时完成什么任务，再选择所需能力。若产品日常主要使用触屏，持续语音监听带来的功耗和误触发可能缺少足够收益。

依据：[Sensory Smart Wake Word 产品说明](<https://sensory.com/product/smart-wake-word/>) · [Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)

### 身份能力的额外条件 · 研究判断

说话人或人脸验证与一般语音识别承担不同任务，不应因它们来自同一家供应商就直接用于支付、门禁或其他高影响操作。需要单独定义失败处理、欺骗样本和用户恢复路径，并核对目标用途的要求。本目录仅记录算法能力，未验证任何具体识别系统的安全性。

依据：[Sensory Smart Wake Word 产品说明](<https://sensory.com/product/smart-wake-word/>) · [Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)

## 合作与导入流程

### 从演示请求到具体适配 · 研究判断

联系页说明可以申请个性化演示并讨论定制模型。准备材料应包含使用场景、目标平台、音频规格、语言以及当前最常见失败样本，让对方能够判断是模型、声学还是系统调度问题。演示应使用团队自己的设备或相近约束，避免只在供应商优化好的环境里评价。

依据：[Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)

### 明确算法与整机责任 · 研究判断

项目对接时应划分唤醒、回声处理、转写、应用执行和用户反馈的责任，约定日志和复现材料如何交换。算法供应商不能自动承担麦克风装配偏差或无线服务故障。若由其他模组厂集成，也应核对软件授权、固件更新和售后问题究竟由哪个主体负责。

依据：[Sensory Smart Wake Word 产品说明](<https://sensory.com/product/smart-wake-word/>) · [Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>) · [Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)

## 质量与交付能力

### 把公开指标转成项目测试 · 研究判断

语音转写页面提供厂商测试及条件，可用作测试设计参考，但不能直接承诺用户在真实房间获得相同性能。建议记录设备、模型、口音、距离、噪声和播放音量，分别统计误唤醒、漏唤醒与任务完成，而不是只记录文本是否看起来流畅或某个安静片段是否成功。

依据：[Sensory Smart Wake Word 产品说明](<https://sensory.com/product/smart-wake-word/>) · [Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>)

### 量产后仍需要回归验证 · 研究判断

更换麦克风、外壳开孔、扬声器或固件调度都可能影响语音交互。应在生产版本上保留固定测试集及异常录音采集规则，并在更新后复测。当前没有取得该公司的项目验收报告或本目录设备实测，因此不对各终端的语音准确率、可靠性与认证结果作保证。

依据：[Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>) · [Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)

## 商业与成本结构

### 许可和系统成本分开核算 · 研究判断

本地转写可能减少上传音频的带宽与某些云调用，但会增加设备资源和集成需求。询价应区分标准模型、定制模型、部署平台、设备数量及维护服务，再与替代架构比较长期成本。官网没有可通用于所有终端的采购单价，本目录不根据品牌客户数量推测授权费或折扣。

依据：[Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>) · [Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)

### 避免只比较一次开发费用 · 研究判断

还应询问模型更新、迁移到新芯片、增加语言和量产问题支持是否另行计费，谁保存训练和测试材料，以及结束合作后的运行权利。对于创业公司，最小验证投入和后续放量的成本曲线都重要。这里提出需要书面确认的条款，不声称供应商已经提供某种固定商业条件。

依据：[Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)

## 风险与替代路径

### 宣传中的广泛合作不等于逐型号证据 · 研究判断

官网展示的品牌标志和案例只能按原文覆盖范围使用，不能反向写成每个同品牌新品都装有Sensory算法。若资料只谈公司合作而没有产品名称，也应保留未确认状态。供应链目录中的候选关系用于寻找可能方案，不可以让读者误以为已经得到原厂BOM或采购合同。

依据：[Sensory Smart Wake Word 产品说明](<https://sensory.com/product/smart-wake-word/>) · [Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>)

### 替代架构的取舍 · 研究判断

可比较其他端侧SDK、芯片厂算法、自研或云端语音服务；比较单位应是一段完成的用户任务及其错误恢复成本。端侧方案并不自动覆盖持续变化的知识和复杂请求，云端方案也不必承担每次唤醒。应把可离线完成的操作和需要网络的能力明确分开设计。

依据：[Sensory Smart Wake Word 产品说明](<https://sensory.com/product/smart-wake-word/>) · [Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>)

## 询价与验证清单

### 技术询问必须可执行 · 待验证

确认目标芯片与系统支持、模型大小和运行资源、可用语言、音频输入约束、唤醒词定制方式以及本地失败如何反馈。带真实扬声器回放和多说话人样本测试，并记录模型版本与参数，使供应商能够复现。没有这些条件时，不应只凭成功演示决定整机设计。

依据：[Sensory Smart Wake Word 产品说明](<https://sensory.com/product/smart-wake-word/>) · [Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>) · [Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)

### 商业交付必须能追溯 · 待验证

要求正式说明许可主体、商业部署范围、定制成果权利、版本维护与问题升级流程，并将样机验证和量产验收分开。之后如果取得点名具体型号的公开合作证据，再把对应关系升级为公开披露。当前资料足以记录能力与联系入口，不足以确认任意现有产品的供应商。

依据：[Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)

## 关联硬件产品

> 能力候选表示该公司公开业务与产品所需功能相关，用于重新选型或询价；不表示该产品已经采用该公司的零件或服务。公开披露关系必须有点名资料，仍不代表全部型号、批次或完整BOM。

## 来源

- [Sensory Smart Wake Word 产品说明](<https://sensory.com/product/smart-wake-word/>)：已打开，支持端侧唤醒与定制交互定位，不将客户标志作逐产品证据。

- [Sensory Speech-to-Text 技术与平台说明](<https://sensory.com/product/speech-to-text/>)：已打开，支持端侧转写、可选云端后续处理和平台/模型取舍；性能数字未独立验证。

- [Sensory 联系与定制合作说明](<https://sensory.com/contact-us/>)：已打开，提供合作方向、演示申请与美国Santa Clara地址；未提交询问。

[返回供应链目录](../supply-chain.md)
