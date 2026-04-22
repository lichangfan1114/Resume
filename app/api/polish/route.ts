import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// 模型选用 Sonnet 4.6：润色任务对语感要求高，Haiku 容易出现动词太平的问题。
const MODEL = "claude-sonnet-4-6";
const MAX_INPUT_CHARS = 2000;

const SYSTEM_PROMPT = `你是一位资深的双语简历写作顾问，曾为硅谷、北上广头部公司员工改写过数千份简历。你擅长把平淡的描述改写得专业、有力、可信，让 HR 和面试官愿意深入了解候选人。

## 核心原则

1. **保真**：严格保持原意。绝不编造事实、数字、公司、职位、时间。原文没有的数据不能加。
2. **动词为先**：用主动、具体、有力量的动词（主导、推动、建立、设计、重构、协同、优化、落地）；避免空泛动词（负责、参与、帮助、做了、完成）。
3. **量化优先**：原文有数据就保留并突出；原文没有但能从描述推断出「明显的规模感」时可以用「高频」「大规模」「多地区」「核心」等定性描述，但绝不能编造具体数字。
4. **结构化**：一两个短句完成一个要点，避免冗长的复合句。
5. **简洁**：删掉「我」「我们」「的时候」「一些」「进行」「等等」等填充词。

## 反模式 → 改写示例

❌ 原：负责数据分析工作，参与了一些项目。
✅ 改：主导数据分析流程的搭建，推动多个关键业务项目落地。

❌ 原：我做了前端开发，用 React 写了一些页面。
✅ 改：基于 React 重构核心产品页面，提升加载性能与代码可维护性。

❌ 原：帮助团队解决了一些技术问题。
✅ 改：识别并排查团队核心技术瓶颈，推动线上稳定性持续改善。

❌ 原：做了很多调研，最后给老板出了报告。
✅ 改：主导竞品与用户研究，产出策略报告并获得管理层采纳。

❌ 原：在学校成绩不错，参加了一些社团。
✅ 改：GPA 处于专业前列，主导 XX 社团活动并组织多场校级活动。

## 输出要求

- 只输出润色后的文本本身
- 保持与原文相近的长度（±30%）
- 保持原文语言（中文→中文，英文→英文）
- 不要加引号、markdown 标记、前后解释、任何附加说明
- 不要重复 context hint 或原文`;

const CONTEXT_HINTS: Record<string, string> = {
  bio: "场景：这是简历顶部的一句话个人简介（50-100 字为宜）",
  experience: "场景：一段工作经历的描述，要突出角色、负责范围、关键成就",
  project: "场景：一个项目经历的描述，要突出你的贡献、技术栈、产出影响",
  education: "场景：学历的补充说明，可提及奖项、GPA、关键课程、研究方向",
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI 服务未配置（服务端缺少 ANTHROPIC_API_KEY）" },
      { status: 503 },
    );
  }

  let body: { text?: string; context?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 });
  }

  const text = (body.text ?? "").trim();
  const context = typeof body.context === "string" ? body.context : "generic";

  if (!text) {
    return NextResponse.json({ error: "请先填写内容再润色" }, { status: 400 });
  }
  if (text.length > MAX_INPUT_CHARS) {
    return NextResponse.json(
      { error: `文本过长（${text.length} 字），请缩短到 ${MAX_INPUT_CHARS} 字以内` },
      { status: 400 },
    );
  }

  const hint = CONTEXT_HINTS[context] ?? "场景：简历中的一段描述";
  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        {
          role: "user",
          content: `${hint}

原文：
${text}`,
        },
      ],
    });

    const result = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    if (!result) {
      return NextResponse.json(
        { error: "AI 未返回有效内容，请重试" },
        { status: 502 },
      );
    }

    return NextResponse.json({ result });
  } catch (err) {
    console.error("[polish] error:", err);
    const msg = err instanceof Error ? err.message : "未知错误";
    return NextResponse.json(
      { error: `润色失败: ${msg}` },
      { status: 500 },
    );
  }
}
