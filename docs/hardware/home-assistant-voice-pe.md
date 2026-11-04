# Home Assistant Voice Preview Edition

**Nabu Casa** · 家庭助手 · 核查 2026-11-04

面向家庭爱好者的开放可配置语音终端

消费渠道：个人零售。

## 产品图片与结构参考

### 产品图

![Home Assistant Voice Preview Edition 官方产品图](../../assets/hardware/home-assistant-voice-pe/product.webp)

Home Assistant Voice Preview Edition 官方产品图 · 来源：[Nabu Casa · 官方图片](<https://www.home-assistant.io/voice-pe/>) · [原始图片](<https://www.home-assistant.io/images/voice-pe/vpe-top.webp>)

### 参考图

![Home Assistant Voice Preview Edition 官方外观、结构或使用参考](../../assets/hardware/home-assistant-voice-pe/reference.webp)

Home Assistant Voice Preview Edition 官方外观、结构或使用参考 · 来源：[Nabu Casa · 官方图片](<https://www.home-assistant.io/voice-pe/>) · [原始图片](<https://www.home-assistant.io/images/voice-pe/specs/side1.webp>)

### AI 生成爆炸示意

![Home Assistant Voice Preview Edition AI功能爆炸示意，内部模块为概念表达而非实际拆机](../../assets/hardware/home-assistant-voice-pe/ai-exploded.png)

**AI 生成 · 非实物拆机。** 内部为概念推断，不能作为元件布局、BOM 或维修依据。[生成提示词](../../content/hardware/prompts/home-assistant-voice-pe.txt)

> 依据官方外观参考与公开功能生成；未披露的内部布局只作概念模块，不构成BOM或真实结构证据。

> 保留官方图片原始内容和出处；画面宣传参数不是本轮独立实测。

> 分析为基于公开资料的案头研究与 AI 辅助判断，未经用户访谈、销量审计或实物拆机。需求、画像、竞争冷门度、审美及商业机会均为研究假设，不是投资结论。

## 销售与购买

- 状态：在售。官方硬件页提供购买入口；实际打开Seeed商品页显示In stock和US$59。它是可购买的完整语音终端，Preview为产品名称而非未开放预订。

- 地区：Seeed全球渠道（配送地以结账为准）

- 价格：US$59（所查Seeed渠道）。核查时官方地区参考价，保留原币种；订阅、税运、附件及优惠以结账为准，预订定金不等于整机价格。

- 中国大陆：本轮核实所列海外官方渠道；中国大陆同型号现货、保修及服务可用性未确认。进口前需核对供电、网络、配件和地区条款。

- [官方产品 / 商店](<https://www.home-assistant.io/voice-pe/>)

## AI 的实际作用

通过本地或云端语音模型识别请求，可连接本地大模型或AI供应商处理自然语言家居任务；机身主要承担音频采集和反馈。

服务与联网依赖：必须配合Home Assistant主机；本地大模型及通用语音识别需要额外算力，不应宣称小终端独立运行全部大模型。

## 是否冷门

细分专业（研究判断）：开放家庭语音终端是较窄爱好者市场，具有差异但需要配置服务；不是普通联网音箱换标签。

## 需求与市场

需求假设：一部分家庭希望语音控制可自主管理，减少对单一平台和云服务的依赖。应验证实际配置时间、语言识别成功率和家人是否愿意使用，开源本身不等于普通家庭无需学习。

### 任务与触发场景 · 研究判断

Voice Preview Edition的核心任务是在家里提供一个容易接近的语音入口，让已有家庭系统不必总依靠手机或浏览器操作。它本身不是装满所有能力的独立智能音箱；用户需要把声音入口、家庭主机和所选语音服务一起理解。需求应从已有自动化中哪些操作确实不方便开始。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 流程中的收益与代价 · 研究判断

对重视本地控制的人，独立语音终端可能减少寻找手机和打开应用的动作，但会增加主机维护、配置和故障定位。若家庭尚未形成稳定设备与服务体系，先买终端未必解决问题。必须比较完整安装和日常维护成本，不能只用一个低价硬件入口代表全部系统投入。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 需求如何验证 · 待验证

建议先挑选常用的少量家庭任务，与手机面板和实体开关比较启动、识别、执行和恢复步骤。观察家庭其他成员能否独立使用，以及配置者不在家时谁处理故障。当前没有入户使用研究，不把开源、可本地运行或可接大模型自动等同所有家庭都需要。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

## 用户画像

画像推断：已经使用Home Assistant的家庭爱好者或愿意维护本地主机的用户，属于消费级进阶人群。它不是企业开发板，但也不是独立即用音箱；家中其他成员可能更在意稳定而非可定制。

### 优先使用者 · 研究判断

优先画像是已有Home Assistant系统、愿意维护家庭网络和设备集成的个人爱好者或家庭技术管理者。其需求通常比一般音箱购买者更具体，例如希望知道请求如何处理、哪些操作可离线完成。这里的消费身份来自个人家庭用途，不意味着完全不需要技术经验。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 购买者与使用者 · 研究判断

购买和配置的人可能不是日常主要使用者，家人更关心设备是否听懂、执行是否一致以及失败时有没有明确反馈。研究应分别观察安装者与普通家庭成员，避免把配置者的技术熟练度当作整体易用性。支持某个功能和家人愿意持续使用，是两个不同判断。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 不适配与分层验证 · 待验证

没有家庭主机、不能维护软件或希望开箱即获得完整内容服务的人，需要先核对整体要求。建议纳入从未使用家庭自动化的试用者与已有系统用户比较，记录学习成本和求助次数。若配置工作明显超过家庭收益，应允许结论指向普通开关或更封闭的一体化方案。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

## 竞争与替代

竞争判断：与Echo、Google音箱及DIY语音卫星竞争，开放协议、可选本地处理和实体隐私开关提供差异。较窄用户群不代表低成本获客，文档、社区和售后能力常是产品可用性的组成部分。

### 直接与间接替代 · 研究判断

直接替代包括其他家庭语音终端，间接替代包括手机控制、墙面面板、实体按钮和商业智能音箱。它们对账号、云服务、设备集成和维护者的依赖不同，不能只比较麦克风或价格。应先固定家庭任务，再比较从发出请求到设备完成动作的全过程。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 具体差异与条件 · 研究判断

该产品的差异在于与Home Assistant的可配置语音体系相连，本地或云端识别以及模型接入可以按方案选择。可选择不等于每种组合都简单可靠，也不等于机身自己完成全部推理。若家庭只需要播放内容，商业音箱的服务整合可能反而更符合原任务。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 同条件比较方法 · 待验证

建议以相同房间、设备和任务集比较语音、手机及按钮三条路径，记录识别错误、执行失败、维护时间和其他成员接受度。还要在网络或主机不可用时观察剩余能力。当前没有实测对照或用户份额，不把可定制程度作为无条件胜过其他方案的结论。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

## 供应链

供应链分析：音频处理、麦克风、扬声器、旋钮、无线和外壳构成成品，官方公开部分设计但具体BOM价格未知。跨地区渠道、固件支持与用户主机性能差异会增加服务和兼容测试成本。

### 功能与交付拆分 · 研究判断

公开介绍支持把系统拆为音频采集和反馈终端、家庭主机、语音识别与任务处理、设备集成及可选外部模型。机身主要承担声音入口，完整体验并非全部在这块硬件内。供应链分析要区分终端生产与软件服务责任，不能把主机和云端算法画成机身里已确认的芯片。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 制造与服务约束 · 研究判断

制造与导入约束包括机壳声学、扬声器回放时的拾音、网络连接及终端和主机之间的兼容。对个人家庭用户，系统更新、组件版本和故障日志也会影响长期交付。原型能响应一次语音不能证明多房间或多成员场景稳定，必须在最终配置里回归验证。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 候选公司与导入 · 研究判断

候选公司可分别从音频模块工程和端侧语音SDK寻找，用于开发类似入口时评估样机。它们不等于原产品已采用的组件，更不代表无需家庭主机即可提供全部功能。应先说明目标主机、网络、语言和处理方案，再询问硬件、算法许可与维护的责任边界。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

## 技术路径

官方支持本地语音模型以及连接大模型服务。技术判断：语音前端、语音转写、意图处理和执行在不同设备或服务完成，必须明确部署边界；局部离线能力不能被描述为所有语言的完整离线助手。

### 已知功能与处理链路 · 研究判断

官方Assist资料描述语音控制体系，可连接不同本地或云端处理方案；语音终端负责采集和反馈，家庭系统完成后续处理。分析时应拆开唤醒、转写、意图或模型推理、设备执行与声音回复，不能因为某一步离线，就认定整个请求链路从不需要网络。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 主要技术约束 · 研究判断

技术难点在于不同环节的失败会以相似的用户体验出现：没有听懂、没有找到设备、动作没有执行或反馈丢失。配置自由也增加组合数量，需要明确当前运行的是哪条处理路径。模型能理解自然语言并不代表所有家庭设备都能安全、可靠地执行模糊请求。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 系统验证方法 · 待验证

建议对固定任务保留语音输入、识别文本、动作请求和设备反馈，并分别模拟弱网、主机重启、设备离线及服务不可用。测试还要包含扬声器回放和多人说话，记录延迟与恢复步骤。当前没有这些测试结果，不承诺任意平台组合的准确率、速度和稳定性。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

## 产品审美

审美判断：低矮方形机身、旋钮和物理断麦开关适合桌面，刻意减少屏幕与装饰。状态灯和按键反馈需要让非技术家人也理解，透明可维修设计与家居融入之间可以保持平衡。

### 形态与使用环境 · 研究判断

作为家庭语音入口，设计重点应是让人容易发现何时可以说话、何时正在处理以及是否完成。终端在生活空间里需要足够安静和易理解，不一定需要大屏或拟人角色。外形小巧只有在声音覆盖、反馈与摆放都合理时才有价值，不能仅凭产品照片判断融入家庭的程度。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 交互与身体体验 · 研究判断

交互评估应覆盖日常发令、取消、音量调整和失败重试，观察普通家庭成员是否知道下一步。配置界面与日常入口承担不同任务，不宜把技术设置堆进每次操作。实体反馈是否能在嘈杂或较远位置被理解，也需要与实际放置环境一起观察。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 长期维护与设计验证 · 待验证

建议在真实房间连续使用并记录移动摆位、充电或供电线整理、清洁和设备重启的步骤。长期体验还取决于系统更新后反馈是否一致，以及更换维护者是否容易交接。当前没有实物耐久与声学覆盖测量，不把极简外观直接等同容易维护。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

## 关键风险

风险判断：系统维护、模型服务费用和兼容性由用户部分承担，本地模式也可能受语言和算力限制。云模型连接会改变数据路径，配置错误或更新可能影响家居执行，不宜把Preview宣传成所有家庭成熟即用。

### 主要失败情形 · 研究判断

最大的产品理解风险是把语音卫星终端误认为完全独立的助手，忽略家庭主机、网络和识别服务。另一个风险是配置者离开后，其他成员无法排查失败。研究需要区分硬件故障、语音处理错误与设备集成问题，不能把所有失败都归到模型不够聪明。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 购买与持续服务 · 研究判断

本地与云端路径有不同资源和服务条件，选择某种方案并不意味着所有功能永久免费或全部数据留在机内。购买时应核对实际所需主机、服务权益、地区支持和更新方式。目录以个人可购买使用的终端收录，但不把开发者便利当成普通家庭的无条件适配。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 风险验证及停止条件 · 待验证

试用前应明确停止条件，例如主要任务需要频繁维护、家人无法理解失败反馈，或系统更新后核心操作失效且恢复困难。记录配置者和其他成员的时间成本，不以功能是否能实现代替是否值得使用。没有实际入户研究前，不给家庭可靠性或隐私完整性的保证。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

## 机会与验证

机会假设：围绕特定语言、无障碍操作或隐私偏好提供配置完善的家庭套餐，测试安装和故障恢复时间。若只服务爱好者，应以透明边界和长期维护建立信任，而不是夸大通用智能水平。

### 可检验的差异 · 研究判断

可探索的差异在于让开放家庭系统对普通成员也可用：让动作结果清楚、失败可定位、配置更容易交接。创新不一定是再接一个更大的模型，可能是减少用户需要理解的系统状态。应选择一个稳定的日常任务闭环，先证明语音入口比手机或按钮更省步骤。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 实现与商业约束 · 研究判断

实现约束包括平台变化、设备兼容、声音环境与持续维护。面向个人家庭的商业价值可能来自集成与支持，而不是仅出售一个外壳和麦克风。需要把硬件、软件和维护服务的成本分别计算；当前没有项目报价、家庭留存或付费支持数据，不能推测利润与市场规模。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

### 下一阶段验证 · 待验证

下一阶段可与已有系统的家庭共同测试少量高频任务，再邀请不参与配置的成员使用。记录误操作、帮助请求、更新后的变化和替代工具使用情况。若声音交互并未减少摩擦，结果应允许回到实体控制设计，而不是为了AI入口继续增加系统复杂度。

依据：[Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) · [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) · [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>)

## 对应供应链公司

能力候选用于选型研究，不代表本产品实际采用；未公开的供货关系不作推断。

- [seeed-studio](../supply-chain/seeed-studio.md) — **能力候选 · 非已采用** / 家庭语音终端开发与集成候选：Seeed公开模块与工程服务可作为类似语音入口的原型集成候选；本条存在其零售渠道资料，但渠道销售不等于代工或所有部件供货。具体硬件设计责任、音频调试、主机适配和维护范围仍需逐项目确认。

- [picovoice](../supply-chain/picovoice.md) — **能力候选 · 非已采用** / 端侧语音入口SDK候选：Picovoice公开唤醒、语音活动和意图相关SDK可用于新终端的软件路线评估。不同SDK的硬件与语言要求不同，不能当作该设备原有引擎或直接替换包；家庭主机、后续模型和设备执行仍需独立集成验证。

[浏览供应链目录](../supply-chain.md)

## 功能分层示意

这是功能关系，不是实物拆机、真实空间结构或已核实 BOM。

1. **音频终端**：双麦克风与扬声器。（官方披露）

2. **本地前端**：音频处理和唤醒功能。（官方披露）

3. **实体交互**：旋钮、按钮和断麦开关。（官方披露）

4. **外部智能**：Home Assistant主机与可选模型。（官方披露）

5. **家庭执行**：已配置设备和自动化接口。（官方披露）

## 来源

1. [Home Assistant Voice Preview Edition 官方购买页](<https://www.home-assistant.io/voice-pe/>) — 实际打开核查当前购买或预订入口，未实际下单；价格与交付按具体地区。

2. [Home Assistant 官方Assist说明](<https://www.home-assistant.io/voice_control/>) — 实际打开的官方技术与使用资料，宣传效果并非本轮独立实测。

3. [Seeed渠道商品与库存](<https://www.seeedstudio.com/Home-Assistant-Voice-p-6998.html>) — 实际打开的零售商一手库存页，显示In stock；渠道价与品牌建议价可能不同。

[返回目录](../hardware-market.md) · [网页分析](https://romanagent.github.io/Roman/#hardware/product/home-assistant-voice-pe)
