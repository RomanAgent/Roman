# Qualcomm 高通

高通适合在智能眼镜立项阶段作为主处理平台候选，公开的 AR1 方案同时覆盖影像、端侧推理、音频及连接。其价值在于各子系统共同设计与软件生态，而不是单颗芯片的算力数字。目录仅确认公开平台能力，具体成品是否采用、可开放哪些工具及采购条件仍需逐项证明。

核查 2026-11-04 · 美国 · 综合与跨地区供应商

按跨领域芯片平台与全球生态覆盖分组，不作为营收或供货能力排名。

[官网](<https://www.qualcomm.com/>) · [公开联系入口](<https://www.qualcomm.com/company>)

公开地区：美国、全球合作伙伴网络

能力：Snapdragon AR1 智能眼镜平台、Hexagon 端侧 AI 与影像处理、无线连接及平台软件

## 公司定位与边界

### 官方｜眼镜平台边界 · 官方资料

公开的眼镜平台把影像处理、端侧人工智能、音频和连接放在同一系统设计范围，适合拍摄与语音交互同时存在的产品。页面列出的显示支持属于平台能力，并不意味着每副采用该平台的眼镜都装有显示器，也不能据此判断具体品牌的内部配置。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>)

### 判断｜合作价值所在 · 研究判断

对小团队而言，高通的价值可能是减少相机、无线和推理之间的集成不确定性，但平台合作并不会代替产品定义。若需求只是低频唤醒和音频上传，采用影像能力很强的主平台可能增加软件、热设计及商务沟通负担，应先比较任务链而非品牌知名度。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>) · [About Qualcomm](<https://www.qualcomm.com/company>)

## 产品与技术能力

### 官方｜功能组合 · 官方资料

平台资料披露图像信号处理、神经网络计算与无线连接等能力，允许设计者把拍摄、视觉交互和音频协作组织在一个产品中。具体模型是否能完整落在端侧，仍受算子、内存和运行时约束，平台宣传中的人工智能支持不能直接等同于离线大模型能力。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>)

### 判断｜整机共同约束 · 研究判断

眼镜并不是缩小的手机：镜腿可分配的电池空间、接触皮肤的温升和天线布局都会限制工作方式。选型时应把连续录像、语音对话、照片上传分成不同负载曲线，再确认并发时哪个模块降频或暂停，不能仅依据单项功能演示推算全天体验。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>)

## 适用场景与匹配

### 判断｜适合的产品阶段 · 研究判断

对于已经确定要做第一视角摄像、手机协同和语音助手的眼镜，这类平台值得进入架构比较。对于没有摄像头的轻提示眼镜，则应先核对功耗与封装代价是否必要；平台可扩展性只有在用户确实需要这些功能时，才会转化为产品收益。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>)

### 判断｜不宜直接替代的系统 · 研究判断

助听器、微型戒指和只做单键录音的挂件具有不同的常开功耗与实时性要求，不应因同属可穿戴就套用眼镜平台。若将高通列为此类产品候选，应明确选择的是哪个音频或连接系列，并补充对应资料，而不能用眼镜页面支持跨产品线结论。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>) · [About Qualcomm](<https://www.qualcomm.com/company>)

## 合作与导入流程

### 判断｜技术接洽材料 · 研究判断

首次接洽宜提供镜架空间、相机接口、麦克风通道、目标手机系统和日常工作占空比，并附上拟部署模型的算子清单。这样可以把讨论从能否支持人工智能，推进到哪些处理留在眼镜、哪些交给手机，以及谁负责调试和维护这些接口。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>)

### 判断｜软件交付清单 · 研究判断

项目应在选平台前确认开发工具的获取方式、参考设计使用边界、相机调校支持和系统更新责任。公开网页没有承诺所有资料都能直接下载，也没有给出所有客户统一的支持等级；需要将可交付文档、版本节点和问题升级路径写入合作范围。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>) · [About Qualcomm](<https://www.qualcomm.com/company>)

## 质量与交付能力

### 判断｜热与射频验证 · 研究判断

质量验证要使用接近量产镜腿的样机，而非只在散热宽裕的评估板上运行。可把录像上传和持续语音设为组合负载，在不同佩戴姿态与环境温度下记录表面温升、掉帧及无线重传，再依据用户可接受的触感决定性能上限与降级策略。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>)

### 判断｜数据链路验证 · 研究判断

相机到模型再到手机的每一段都可能引入延迟或数据丢失。应为断连、重新配对、应用被系统挂起和升级失败设计测试，并确认敏感图像在缓存中的生命周期；芯片具有安全能力只是起点，成品仍需证明密钥管理、更新及删除流程实际有效。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>)

## 商业与成本结构

### 判断｜全周期费用 · 研究判断

平台成本应同时计算芯片、配套存储、电源、板层、调校和后续软件维护，而不是只索取处理器单价。参考设计减少的是某些研发工作，未必减少眼镜定制结构和认证支出；采购比较应保留相同的工作负载与支持范围，才有可比性。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>) · [About Qualcomm](<https://www.qualcomm.com/company>)

### 判断｜供应与授权确认 · 研究判断

公开公司资料不足以确定某个创业团队可获得的报价、起订量或交期。商务验证应围绕具体料号、区域销售主体、生命周期通知、授权分销和软件许可进行，特别要区分样片获取与量产供货承诺，不把开发阶段的支持当作长期履约保证。

依据：[About Qualcomm](<https://www.qualcomm.com/company>)

## 风险与替代路径

### 判断｜生态依赖风险 · 研究判断

如果核心影像和人工智能流程依赖专有运行时，迁移平台时可能需要重新量化模型、调校传感器及调整应用接口。项目应保存自有数据集和模块边界，确认可导出的调试信息，避免将所有差异化能力锁在只有供应方能修改的演示程序里。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>) · [About Qualcomm](<https://www.qualcomm.com/company>)

### 判断｜功能宣传风险 · 研究判断

同一平台可以服务多种眼镜形态，因此不能看到平台支持双目显示，就替没有显示的成品补上屏幕；也不能从人工智能加速器推断录音摘要在本地完成。对外资料应分别列出芯片能力、成品启用功能与云端依赖，防止三者混为一谈。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>)

## 询价与验证清单

### 判断｜首轮验证路径 · 研究判断

验证可先选一个完整任务，例如按键拍照后询问画面内容，测量从触发到可听答案的全链路时间，并同时记录功耗和失败原因。随后替换不同光照与网络环境，确认瓶颈来自成像、模型还是云服务，再决定是否有必要提升处理器等级。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>)

### 判断｜进入设计冻结条件 · 研究判断

进入设计冻结前应取得目标平台的软件版本、相机兼容性、关键接口及支持责任清单，并用真实结构样机完成重复测试。只有在性能预算、供应条件和可维护性同时满足时，平台候选才适合成为项目选型；当前目录不据此认定任何未点名成品的供货关系。

依据：[Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>) · [About Qualcomm](<https://www.qualcomm.com/company>)

## 关联硬件产品

> 能力候选表示该公司公开业务与产品所需功能相关，用于重新选型或询价；不表示该产品已经采用该公司的零件或服务。公开披露关系必须有点名资料，仍不代表全部型号、批次或完整BOM。

- [Oakley Meta HSTN](../hardware/oakley-meta-hstn.md) — **能力候选 · 非已采用** / 相机、音频与无线协同的眼镜主平台：本型号包含摄像、多麦克风和手机协同，高通 AR1 的公开定位与这一任务组合相关，可作为新设计平台候选。现有来源未点名本型号使用该平台，仍需验证镜腿热预算、相机调校和服务接口；候选能力不能替代实际供货或兼容授权证据。

- [Oakley Meta Vanguard](../hardware/oakley-meta-vanguard.md) — **能力候选 · 非已采用** / 运动相机眼镜的影像与音频主平台：本型号需要摄像、多麦克风和手机协同，高通的眼镜平台能力与这一功能组合相关，可作为重设计候选。仍需验证运动画面处理、结构热预算及外部运动服务接口；现有来源没有明确点名采用，平台本身也不能提供已授权的 Garmin 或 Meta 集成。

- [Ray-Ban Meta Wayfarer（Gen 2）](../hardware/ray-ban-meta-gen-2.md) — **能力候选 · 非已采用** / 相机、声音与无线协同主平台：本型号包含摄像、多麦克风和手机协同，高通的相机眼镜平台与这类任务组合相关，可作为重设计候选。现有产品来源未明确点名采用，仍需核对代次、热预算、传感器调校及 Meta 服务接口；不能把其他代产品的公开关系直接迁移过来。

- [Ray-Ban Meta（Gen 3）](../hardware/ray-ban-meta-gen-3.md) — **能力候选 · 非已采用** / 第三代相机眼镜主平台的重设计候选：第三代仍需要摄像、多麦音频与手机协同，高通眼镜平台可作为相应主控路线比较。现有来源没有点名第三代采用，必须重新核对具体平台、热预算、相机与服务接口；不能把其他代次或同集团眼镜的芯片关系直接沿用到本型号。

- [Rokid AI Glasses Style](../hardware/rokid-ai-glasses-style.md) — **能力候选 · 非已采用** / 相机与语音眼镜主平台候选：Style 具有相机、声音输入和手机协同，高通的眼镜平台可作为对应主控路线比较。当前来源只披露双芯片思路而未点名具体采用，需确认芯片分工、相机接口、热预算和 Rokid 服务兼容；该候选不是对现有主板的识别或直接替换建议。

## 来源

- [Snapdragon AR1 Gen 1 Platform](<https://www.qualcomm.com/xr-vr-ar/products/ar-series/snapdragon-ar1-gen-1-platform>)：支持眼镜平台定位、双 ISP、端侧 AI、音频、连接与显示能力；不证明目录内所有眼镜均采用。

- [About Qualcomm](<https://www.qualcomm.com/company>)：支持集团平台业务与全球生态定位；法务签约主体及具体采购入口需按业务确认。

[返回供应链目录](../supply-chain.md)
