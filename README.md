<div align="center">

# ROMAN

**经历与思考，持续记录。**

一份持续更新的个人档案，记录行业 AI 的演进、创业过程中的选择与思考，以及智能硬件方向的探索。

[浏览完整网站](https://romanagent.github.io/Roman/) · [GitHub 仓库](https://github.com/RomanAgent/Roman)

</div>

[![Roman 黑白界面预览](assets/preview.jpg)](https://romanagent.github.io/Roman/)

---

## 记录的三个方向

| 栏目 | 记录什么 | 首版内容 |
| --- | --- | --- |
| **01 · 行业 AI 历程** | 技术演进、关键节点与值得继续追问的问题 | 有一手资料来源的历史时间线，以及行业观察编辑初稿 |
| **02 · 我的创业经历** | 每段经历的背景、选择、行动、结果与复盘 | 序章编辑初稿、经历填写模板，等待真实材料逐篇补充 |
| **03 · 智能硬件方向** | 面向具体使用场景的想法、问题与后续验证 | 预留探索入口，随实际进展持续完善 |

## 01 · 行业 AI 历程

从早期的人工智能研究设想到深度学习、Transformer 与多模态模型，沿着关键技术节点理解行业变化。时间线中的历史事实附有原始论文或机构资料，编辑观察与事实分开呈现。

- [查看完整行业时间线与来源](docs/ai-history.md)
- [阅读行业观察初稿](content/ai-notes.md)

| 年份 | 关键节点 |
| --- | --- |
| 1956 | 达特茅斯夏季研究项目：人工智能成为共同研究议题 |
| 2012 | AlexNet：深度网络与 GPU 训练展示图像分类的新路径 |
| 2016 | AlphaGo：以 4∶1 战胜李世石，复杂决策能力走入公众视野 |
| 2017 | Transformer：注意力机制带来新的语言模型架构 |
| 2020 | GPT-3：大规模语言模型展示少样本学习能力 |
| 2022 | ChatGPT：自然语言对话成为大众体验生成式 AI 的入口 |
| 2023 | Llama 2：开放权重，在许可条件下支持研究与商业使用 |
| 2024 | GPT-4o：文本、视觉与音频的统一模型探索自然交互 |

各节点的一手资料与编辑观察见[完整时间线](docs/ai-history.md)。

时间线是经过选择的历史节点，不是完整行业史，也不代表最新市场全貌。后续可继续增加节点、修订观点并保留出处。

## 02 · 我的创业经历

这里会逐篇收录真实经历，把一次选择放回当时的背景中：为什么开始，采取了什么行动，发生了什么，以及后来如何理解它。

首版包含两篇用于确认展示方式的内容：

- **《为什么开始写这份创业手记》**：第一人称编辑初稿，等待本人确认与改写。
- **《一段创业经历，值得留下什么》**：填写模板，提供背景、选择、行动、结果、复盘五个记录角度。

尚未填入真实个人经历。首版文章中的日期是内容整理日期，不是创业事件发生日期。

[阅读全文](docs/journal.md) · [开始提交一段经历](content/journey-template.md)

## 03 · 智能硬件方向

为未来方向留下一份持续更新的研究记录：先描述使用场景与问题，再写下产品假设、验证方式和实际反馈。当前是栏目框架，尚未宣称存在已开发产品或验证结果。

[阅读智能硬件方向初稿](content/ai-notes.md#02--智能硬件先找到值得存在的场景)

## 本地预览

这是一个无第三方运行依赖的静态 HTML / CSS / JavaScript 项目。进入项目目录后运行：

```sh
python3 -m http.server 4173
```

然后打开 [本地预览](http://localhost:4173)。请通过 HTTP 服务访问，确保浏览器能读取内容文件。

## 内容维护

**JSON 是正文内容的唯一来源**，网站直接读取它们。便于在 GitHub 阅读的 Markdown 由脚本生成；请不要直接编辑生成文件，以免下次导出时被覆盖。

| 文件 | 用途 |
| --- | --- |
| [`content/ai-history.json`](content/ai-history.json) | AI 历史节点、编辑观察与来源；生成 [`docs/ai-history.md`](docs/ai-history.md) |
| [`content/ai-articles.json`](content/ai-articles.json) | 行业与智能硬件观察文章；生成 [`content/ai-notes.md`](content/ai-notes.md) |
| [`content/journal.json`](content/journal.json) | 创业手记文章及展示状态；生成 [`docs/journal.md`](docs/journal.md) |
| [`content/journey-template.md`](content/journey-template.md) | 逐篇提交真实经历的模板 |

修改 JSON 后，在项目目录执行以下命令，同步更新 GitHub 阅读版；此步骤使用 Node.js，无需安装任何依赖：

```sh
node scripts/export-content.mjs
```

将修改后的 JSON 和生成的 Markdown 一起提交。网页读取 JSON，GitHub 直接展示 Markdown，两种阅读方式保持相同的正文与资料来源。

提交新经历时，可以直接提供原始叙述。整理后核对事实、语气与公开范围，再发布到网站。历史事实保留出处；个人观点保留语境；未确认内容保持草稿标识。

网页由 GitHub Pages 展示，README 可直接在 GitHub 仓库中阅读。
